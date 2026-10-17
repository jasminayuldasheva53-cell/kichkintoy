import {createContext,useContext,useState,useEffect,createElement} from 'react'
const BASE=import.meta.env.VITE_API_URL||''
export const api=async(p,o={})=>{const r=await fetch(BASE+'/api'+p,{credentials:'include',headers:{'Content-Type':'application/json'},...o,body:o.body?JSON.stringify(o.body):undefined});const d=await r.json().catch(()=>({}));if(!r.ok)throw new Error(d.error||'Xatolik');return d}
const Ctx=createContext()
export const useApp=()=>useContext(Ctx)
export function AppProvider({children}){
 const [s,setS]=useState({user:null,kids:[],active:null,guest:null,loading:true})
 const apply=d=>setS(x=>({...x,user:d.user,kids:d.kids||[],loading:false}))
 useEffect(()=>{api('/me').then(apply).catch(()=>setS(x=>({...x,loading:false})))},[])
 const kid=s.user?(s.kids.find(k=>k.id===s.active)||s.kids[0]):s.guest
 const A={user:s.user,kid,mykids:s.kids,loading:s.loading,
  async register(email,password){try{apply(await api('/auth/register',{method:'POST',body:{email,password}}));return null}catch(e){return e.message==='Failed to fetch'?"Server bilan aloqa yo'q":e.message}},
  async login(email,password){try{const d=await api('/auth/login',{method:'POST',body:{email,password}});apply(d);return{role:d.user.role}}catch(e){return{err:e.message==='Failed to fetch'?"Server bilan aloqa yo'q":e.message}}},
  async logout(){try{await api('/auth/logout',{method:'POST'})}catch{}setS(x=>({...x,user:null,kids:[],active:null}))},
  async addKid(k){try{const d=await api('/kids',{method:'POST',body:k});setS(x=>({...x,kids:[...x.kids,d.kid],active:d.kid.id}))}catch(e){alert(e.message)}},
  async delKid(id){try{await api('/kids/'+id,{method:'DELETE'});setS(x=>({...x,kids:x.kids.filter(k=>k.id!==id)}))}catch(e){alert(e.message)}},
  selectKid:id=>setS(x=>({...x,active:id})),
  setGuest:k=>setS(x=>({...x,guest:{id:'guest',stars:0,stats:{},...k}})),
  record(slug,sc,tot,level){const f=k=>{const o=k.stats[slug]||{plays:0,correct:0,total:0};return{...k,stars:k.stars+sc,stats:{...k.stats,[slug]:{level,plays:o.plays+1,correct:o.correct+sc,total:o.total+tot,last:Date.now()}}}}
   setS(x=>x.user?{...x,kids:x.kids.map(k=>k.id===kid?.id?f(k):k)}:{...x,guest:x.guest&&f(x.guest)})
   if(s.user&&kid)api('/kids/'+kid.id+'/record',{method:'POST',body:{slug,sc,tot,level}}).catch(()=>{})}}
 return createElement(Ctx.Provider,{value:A},children)}
