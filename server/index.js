import 'dotenv/config'
import express from 'express'
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser'
import helmet from 'helmet'
import cors from 'cors'
import rateLimit from 'express-rate-limit'
const {MONGODB_URI,JWT_SECRET,CLIENT_URL='http://localhost:5173',PORT=5000,NODE_ENV,ADMIN_EMAIL,ADMIN_PASSWORD}=process.env
if(!MONGODB_URI||!JWT_SECRET||JWT_SECRET.length<32){console.error('MONGODB_URI va kamida 32 belgili JWT_SECRET kerak');process.exit(1)}
const {Schema}=mongoose,OID=Schema.Types.ObjectId
const User=mongoose.model('User',new Schema({email:{type:String,unique:true},hash:String,role:{type:String,enum:['parent','admin'],default:'parent'}},{timestamps:true}))
const Kid=mongoose.model('Kid',new Schema({parent:{type:OID,index:true},name:String,age:Number,color:String,interests:[String],stars:{type:Number,default:0},stats:{type:Schema.Types.Mixed,default:{}}},{timestamps:true,minimize:false}))
const Msg=mongoose.model('Msg',new Schema({name:String,email:String,msg:String},{timestamps:true}))
const Audit=mongoose.model('Audit',new Schema({user:OID,action:String,target:String},{timestamps:true}))
const CATS=['letters','math','colors','animals','logic','emotions','audio']
const app=express();app.set('trust proxy',1)
app.use(helmet(),cors({origin:CLIENT_URL,credentials:true}),express.json({limit:'20kb'}),cookieParser())
const lim=n=>rateLimit({windowMs:15*60*1000,limit:n,standardHeaders:true,legacyHeaders:false})
app.use('/api',lim(600))
// CSRF: o'zgartiruvchi so'rovlar faqat bizning frontend originidan
app.use('/api',(q,s,n)=>q.method==='GET'||q.headers.origin===CLIENT_URL?n():s.status(403).json({error:'Origin ruxsat etilmagan'}))
const w=f=>(q,s,n)=>f(q,s,n).catch(n)
const S=v=>typeof v==='string'?v.trim():''
const kidOut=k=>({id:String(k._id),parent:String(k.parent),name:k.name,age:k.age,interests:k.interests,color:k.color,stars:k.stars,stats:k.stats||{}})
const ck={httpOnly:true,sameSite:NODE_ENV==='production'?'none':'lax',secure:NODE_ENV==='production'}
const sign=u=>jwt.sign({id:String(u._id)},JWT_SECRET,{expiresIn:'7d'})
const me=async u=>({user:{id:String(u._id),email:u.email,role:u.role},kids:(await Kid.find({parent:u._id})).map(kidOut)})
const log=(u,action,target='')=>Audit.create({user:u._id,action,target})
// Rol har so'rovda bazadan o'qiladi (tokenga ishonilmaydi)
const auth=async(q,s,n)=>{try{const{id}=jwt.verify(q.cookies.kk||'',JWT_SECRET);q.user=await User.findById(id);if(!q.user)throw 0;n()}catch{s.status(401).json({error:'Kirish kerak'})}}
const admin=(q,s,n)=>q.user.role==='admin'?n():s.status(403).json({error:"Ruxsat yo'q"})
const setCk=(res,u)=>res.cookie('kk',sign(u),{...ck,maxAge:7*864e5})
app.post('/api/auth/register',lim(20),w(async(q,s)=>{
 const email=S(q.body.email).toLowerCase(),pw=typeof q.body.password==='string'?q.body.password:''
 if(!/^\S+@\S+\.\S+$/.test(email)||email.length>120)return s.status(400).json({error:"Email noto'g'ri"})
 if(pw.length<8||pw.length>72)return s.status(400).json({error:"Parol 8–72 belgi bo'lsin"})
 if(await User.findOne({email}))return s.status(409).json({error:'Bu email band'})
 const u=await User.create({email,hash:await bcrypt.hash(pw,12)}) // rol doim 'parent'
 setCk(s,u).json(await me(u))}))
app.post('/api/auth/login',lim(20),w(async(q,s)=>{
 const u=await User.findOne({email:S(q.body.email).toLowerCase()}),pw=typeof q.body.password==='string'?q.body.password:''
 if(!u||!(await bcrypt.compare(pw,u.hash)))return s.status(401).json({error:'Email yoki parol xato'})
 if(u.role==='admin')await log(u,'admin.login')
 setCk(s,u).json(await me(u))}))
app.post('/api/auth/logout',(q,s)=>s.clearCookie('kk',ck).json({ok:1}))
app.get('/api/me',auth,w(async(q,s)=>s.json(await me(q.user))))
app.post('/api/kids',auth,w(async(q,s)=>{
 const name=S(q.body.name).slice(0,30),age=Math.floor(+q.body.age),ints=Array.isArray(q.body.interests)?q.body.interests.filter(x=>CATS.includes(x)):[]
 if(!name||!(age>=1&&age<=7))return s.status(400).json({error:"Ism va yosh (1–7) kerak"})
 if(await Kid.countDocuments({parent:q.user._id})>=10)return s.status(400).json({error:'Eng ko\'pi 10 ta profil'})
 const k=await Kid.create({parent:q.user._id,name,age,color:/^#[0-9a-f]{6}$/i.test(S(q.body.color))?S(q.body.color):'#f08a3c',interests:[...new Set(ints)]});s.json({kid:kidOut(k)})}))
app.delete('/api/kids/:id',auth,w(async(q,s)=>{const r=await Kid.deleteOne({_id:S(q.params.id),parent:q.user._id});s.json({deleted:r.deletedCount})}))
app.post('/api/kids/:id/record',auth,w(async(q,s)=>{
 const b=q.body,slug=S(b.slug),sc=Math.floor(+b.sc),tot=Math.floor(+b.tot),lv=Math.floor(+b.level)
 if(!/^[a-z-]{1,40}$/.test(slug)||!(tot>=1&&tot<=30)||!(sc>=0&&sc<=tot)||!(lv>=0&&lv<=6))return s.status(400).json({error:'Noto\'g\'ri natija'})
 const k=await Kid.findOne({_id:S(q.params.id),parent:q.user._id});if(!k)return s.status(404).json({error:'Topilmadi'})
 const o=k.stats?.[slug]||{plays:0,correct:0,total:0}
 k.stats={...k.stats,[slug]:{level:lv,plays:o.plays+1,correct:o.correct+sc,total:o.total+tot,last:Date.now()}};k.stars+=sc;k.markModified('stats');await k.save();s.json({kid:kidOut(k)})}))
app.post('/api/contact',lim(5),w(async(q,s)=>{
 const name=S(q.body.name).slice(0,60),email=S(q.body.email).slice(0,120),msg=S(q.body.msg).slice(0,1000)
 if(!name||!/^\S+@\S+\.\S+$/.test(email)||!msg)return s.status(400).json({error:"Maydonlarni to'ldiring"})
 await Msg.create({name,email,msg});s.json({ok:1})}))
const A=express.Router();A.use(auth,admin)
A.get('/users',w(async(q,s)=>s.json({users:(await User.find({role:'parent'},'email createdAt').lean()).map(u=>({id:String(u._id),email:u.email})),kids:(await Kid.find()).map(kidOut)})))
A.delete('/users/:id',w(async(q,s)=>{const u=await User.findOne({_id:S(q.params.id),role:'parent'});if(!u)return s.status(404).json({error:'Topilmadi'});await Kid.deleteMany({parent:u._id});await u.deleteOne();await log(q.user,'user.delete',u.email);s.json({ok:1})}))
A.get('/messages',w(async(q,s)=>s.json({messages:(await Msg.find().sort('-createdAt').limit(100).lean()).map(m=>({id:String(m._id),name:m.name,email:m.email,msg:m.msg,at:m.createdAt}))})))
A.get('/audit',w(async(q,s)=>s.json({audit:(await Audit.find().sort('-createdAt').limit(100).lean()).map(a=>({action:a.action,target:a.target,at:a.createdAt}))})))
app.use('/api/admin',A)
app.use((e,q,s,n)=>{console.error(e);s.status(500).json({error:'Server xatosi'})})
await mongoose.connect(MONGODB_URI)
if(ADMIN_EMAIL&&ADMIN_PASSWORD?.length>=8){const em=ADMIN_EMAIL.toLowerCase(),a=await User.findOne({role:'admin'})
 if(!a){await User.create({email:em,hash:await bcrypt.hash(ADMIN_PASSWORD,12),role:'admin'});console.log('Admin yaratildi')}
 else if(a.email!==em||!(await bcrypt.compare(ADMIN_PASSWORD,a.hash))){a.email=em;a.hash=await bcrypt.hash(ADMIN_PASSWORD,12);await a.save();console.log('Admin .env bo\'yicha yangilandi')}}
app.listen(PORT,()=>console.log('API :'+PORT))
