import i18n from './i18n.js'
export const R=n=>Math.floor(Math.random()*n),sh=a=>[...a].sort(()=>Math.random()-.5),one=a=>a[R(a.length)]
const VL={uz:'uz-UZ',ru:'ru-RU',en:'en-US'}
export const say=(x,l,cb)=>{try{if(!x)return;speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(x);u.lang=l||VL[i18n.language]||'uz-UZ';const v=speechSynthesis.getVoices().find(v=>v.lang.toLowerCase().startsWith(u.lang.slice(0,2).toLowerCase()));if(v)u.voice=v;if(cb)u.onend=cb;u.rate=.85;u.pitch=1.2;speechSynthesis.speak(u)}catch{}}
export const baseLevel=a=>a<=2?0:a<=4?1:a<=6?2:3
export const MAXL=6
export const CATS={letters:["🔤","Harflar"],math:["🔢","Matematika"],colors:["🎨","Ranglar"],animals:["🐻","Hayvonlar"],logic:["🧩","Mantiq"],emotions:["😊","Hissiyotlar"],audio:["🎵","Tinglash"]}
export const EMO=["🐶","🐱","🐭","🐰","🦊","🐻","🐼","🦁","🐯","🐸","🐵","🐔"]
export const nOpt=l=>Math.min(2+(l>>1),5)
export const mc=(q,show,ans,pool,l,s,lang)=>({q,show,say:s??q,lang,opts:sh([ans,...sh([...new Set(pool)].filter(x=>x!==ans)).slice(0,nOpt(l)-1)]).map(h=>({h,ok:h===ans}))})
export const qz=items=>{const f=l=>{const it=one(items.slice(0,Math.min(items.length,4+l*2)));return mc(it[0],it[1]||"",it[2],items.map(i=>i[2]),l,undefined,"uz-UZ")};f.items=items;return f}
export const AL=("A,🐊,Alligator|B,🐰,Bunny|C,🐥,Chicken|D,🐶,Dog|E,🐘,Elephant|F,🦊,Fox|G,🦒,Giraffe|H,🦔,Hedgehog|I,🐸,Frog|J,🐆,Jaguar|K,🐱,Kitten|L,🦁,Lion|M,🐭,Mouse|N,🐦,Nightingale|O,🦉,Owl|P,🐷,Pig|Q,🐤,Quail|R,🦌,Reindeer|S,🐑,Sheep|T,🐯,Tiger|U,☂️,Umbrella|V,🦅,Vulture|W,🐻,Wombat|X,🐿️,Xerus|Y,🐂,Yak|Z,🦓,Zebra").split("|").map(s=>s.split(","))
const LET=AL.map(a=>a[0])
export const W=[["🐶","DOG"],["🐷","PIG"],["🐱","CAT"],["☀️","SUN"],["🚌","BUS"],["🐄","COW"],["🦁","LION"],["🍎","APPLE"],["🐯","TIGER"],["🐸","FROG"],["🐘","ELEPHANT"]]
const ws=l=>W.slice(0,Math.min(W.length,3+l*2))
const ANI=[["🐄","Moo"],["🐶","Woof"],["🐱","Meow"],["🐑","Baa"],["🐷","Oink"],["🐸","Ribbit"],["🦁","Roar"],["🐔","Cluck"]]
const CN=[["Qizil","#e53935"],["Ko'k","#1e88e5"],["Sariq","#fdd835"],["Yashil","#43a047"],["To'q sariq","#fb8c00"],["Binafsha","#8e24aa"],["Pushti","#f48fb1"],["Qora","#212121"],["Jigarrang","#6d4c41"],["Oq","#eeeeee"]]
const G=[["🐶","🐱","🐭","🐹","🐰"],["🍎","🍌","🍇","🍓","🍊"],["🚗","🚌","🚲","🚂","✈️"],["🌳","🌷","🌻","🌵","🌹"]]
const SHP=[["Bu qanday shakl?","🔴","Doira"],["Bu qanday shakl?","🟦","Kvadrat"],["Bu qanday shakl?","🔺","Uchburchak"],["Bu qanday shakl?","⭐","Yulduz"],["Bu qanday shakl?","❤️","Yurak"],["Bu qanday shakl?","🔶","Romb"]]
export const num=(a,b)=>a+R(b-a+1)
export const GAMES=[
["alphabet-adventure","Alphabet Adventure","🔤","letters",l=>{const a=one(AL.slice(0,Math.min(26,4+l*5)));return mc("Qaysi harf? "+a[0],a[1],a[0],LET,l,a[0],"en-US")}],
["letter-puzzle","Letter Puzzle","🧩","letters",l=>{const w=one(ws(l));return mc("Harflardan qaysi so'z chiqadi?",w[0]+" "+sh(w[1].split("")).join(" "),w[1],ws(l).map(x=>x[1]),l,"")}],
["first-letter","First Letter","🅰️","letters",l=>{const a=one(AL.slice(0,Math.min(26,4+l*5)));return mc("Birinchi harf qaysi?",a[1]+" "+a[2],a[0],LET,l,a[2],"en-US")}],
["word-builder","Word Builder","🏗️","letters",l=>{const w=one(ws(l));return mc("Bu qaysi so'z?",w[0],w[1],ws(l).map(x=>x[1]),l,w[1].toLowerCase(),"en-US")}],
["listen-and-choose","Listen & Choose","👂","audio",l=>{const w=one(ws(l));return mc("Eshit va rasmni top",""+"🔊",w[0],ws(l).map(x=>x[0]),l,w[1].toLowerCase(),"en-US")}],
["missing-letter","Find the Missing Letter","❓","letters",l=>{const w=one(ws(l)),i=R(w[1].length);return mc("Yetishmayotgan harf?",w[0]+" "+w[1].split("").map((c,j)=>j===i?"_":c).join(" "),w[1][i],LET,l,w[1].toLowerCase(),"en-US")}],
["number-garden","Number Garden","🌷","math",l=>{const m=[5,10,20,50,100,100,100][l],n=num(1,m-1);return mc("Keyingi son qaysi?",""+n,""+(n+1),[n+2,n-1,n+3,n-2,n+5,n+10].filter(x=>x>0).map(String),l,""+n)}],
["count-the-animals","Count the Animals","🐻","math",l=>{const m=[3,5,8,10,12,15,20][l],n=num(1,m);return mc("Nechta hayvon?",one(EMO).repeat(n),""+n,[n+1,n-1,n+2,n-2,n+3].filter(x=>x>0).map(String),l,"")}],
["shape-match","Shape Match","🔺","math",qz(SHP)],
["colorful-math","Colorful Math","➕","math",l=>{const m=[3,5,10,15,20,30,50][l],sub=l>=2&&R(2);let a=num(1,m),b=num(1,m);if(sub&&b>a)[a,b]=[b,a];const r=sub?a-b:a+b;return mc(`${a} ${sub?"−":"+"} ${b} = ?`,"🍎".repeat(Math.min(a,8))+(sub?" ➖ ":" ➕ ")+"🍎".repeat(Math.min(b,8)),""+r,[r+1,r-1,r+2,r-2,r+3].filter(x=>x>=0).map(String),l,`${a} ${sub?"minus":"plus"} ${b}`,"en-US")}],
["big-or-small","Big or Small","🐘","math",l=>{const big=R(2),n=nOpt(l);const s=sh([...Array(n)].map((_,i)=>40+i*(110/n)));const t=big?Math.max(...s):Math.min(...s);return{q:big?"Qaysi biri KATTA?":"Qaysi biri KICHIK?",show:"",say:big?"big":"small",lang:"en-US",opts:s.map(z=>({h:"🐘",sz:z,ok:z===t}))}}],
["number-puzzle","Number Puzzle","🔢","math",l=>{const st=[1,1,2,2,5,5,10][l],a=st*num(1,5),i=1+R(2),q=[0,1,2,3].map(k=>a+k*st);const ans=q[i];return mc("Yetishmayotgan son?",q.map((x,k)=>k===i?"?":x).join(", "),""+ans,[ans+st,ans-st,ans+2*st,ans-2*st].filter(x=>x>0).map(String),l,"")}],
["color-master","Color Master","🎨","colors",l=>{const p=CN.slice(0,Math.min(10,4+l)),a=one(p);return mc(a[0]+" — qaysi?","🎨",a[1],p.map(x=>x[1]),l,a[0])}],
["memory-cards","Memory Cards","🃏","colors",null],
["animal-sounds","Animal Sounds","🐮","animals",l=>{const p=ANI.slice(0,Math.min(8,3+l)),a=one(p);return mc("Kim shunday ovoz chiqaradi?","🔊",a[0],p.map(x=>x[0]),l,a[1]+"! "+a[1],"en-US")}],
["animal-match","Animal Match","🏞️","animals",qz([["Bu hayvon qayerda yashaydi?","🐟","Suvda"],["Bu hayvon qayerda yashaydi?","🐻","O'rmonda"],["Bu hayvon qayerda yashaydi?","🐄","Fermada"],["Bu hayvon qayerda yashaydi?","🐪","Cho'lda"],["Bu hayvon qayerda yashaydi?","🐧","Muzliklarda"],["Bu hayvon qayerda yashaydi?","🐦","Osmonda"]])],
["farm-adventure","Farm Adventure","🚜","animals",qz([["Kim sut beradi?","","🐄"],["Kim tuxum beradi?","","🐔"],["Kim jun beradi?","","🐑"],["Qaysi biri ot?","","🐴"],["Kim hurillaydi?","","🐷"],["Qaysi biri o'rdak?","","🦆"]])],
["ocean-explorer","Ocean Explorer","🌊","animals",qz([["Sakkiz oyoqli kim?","","🐙"],["Eng katta dengiz hayvoni?","","🐳"],["Yon tomonga yuradi?","","🦀"],["Tishlari o'tkir baliq?","","🦈"],["Sekin yuradi, uyi bor?","","🐢"],["Kichik rangli baliq?","","🐠"]])],
["dinosaur-world","Dinosaur World","🦖","animals",qz([["T-Rex nima yeydi?","🦖","Go'sht"],["Brontosaurus nima yeydi?","🦕","O'simlik"],["Dinozavrlar bugun bormi?","🦴","Yo'q"],["Dinozavr tuxumdan chiqadimi?","🥚","Ha"],["Dinozavr izlari qayerdan topiladi?","🦴","Yer ostidan"]])],
["nature-explorer","Nature Explorer","🌦️","animals",qz([["Qor yog'adi. Qaysi fasl?","❄️","Qish"],["Gullar ochiladi. Qaysi fasl?","🌷","Bahor"],["Juda issiq. Qaysi fasl?","☀️","Yoz"],["Barglar to'kiladi. Qaysi fasl?","🍂","Kuz"],["Bu qanday ob-havo?","🌧️","Yomg'ir"],["Bu qanday ob-havo?","💨","Shamol"]])],
["shadow-match","Shadow Match","👤","logic",l=>({...mc("Bu kimning soyasi?",one(EMO),"",EMO,l,""),shadow:true})],
["pattern-master","Pattern Master","🔴","logic",l=>{const U=[["🔴","🔵"],["🔴","🔴","🔵"],["🟢","🟡","🔴"],["🔺","🟦","🟦","🔺"]],u=one(U.slice(0,1+(l>>1))),s=[...Array(u.length*2+(l>2?2:1))].map((_,i)=>u[i%u.length]);return mc("Keyingisi nima?",s.join(" ")+" ❓",u[s.length%u.length],["🔴","🔵","🟢","🟡","🔺","🟦"],l,"")}],
["odd-one-out","Odd One Out","🔎","logic",l=>{const g=one(G),o=one(G.filter(x=>x!==g)),odd=one(o);return{q:"Qaysi biri ortiqcha?",show:"",say:"Qaysi biri ortiqcha?",opts:sh([...sh(g).slice(0,Math.max(3,nOpt(l))-1),odd]).map(h=>({h,ok:h===odd}))}}],
["emotion-faces","Emotion Faces","😊","emotions",qz([["Bu qanday his?","😀","Xursand"],["Bu qanday his?","😢","Xafa"],["Bu qanday his?","😮","Hayron"],["Bu qanday his?","😠","Jahldor"],["Bu qanday his?","😴","Uyqusiragan"],["Bu qanday his?","😨","Qo'rqqan"],["Bu qanday his?","🥰","Mehribon"]])],
["good-habits","Good Habits","🪥","emotions",qz([["Ovqatdan oldin nima qilamiz?","🍽️","Qo'l yuvamiz"],["Uxlashdan oldin nima qilamiz?","🌙","Tish yuvamiz"],["Chiqindi qayerga tashlanadi?","🗑️","Qutiga"],["Katta kishini ko'rsak?","👋","Salom beramiz"],["O'yinchoqlar o'yindan keyin?","🧸","Joyiga qo'yamiz"]])],
["healthy-food","Healthy Food","🥦","emotions",l=>{const h=["🍎","🥕","🥦","🍌","🥛"],u=["🍭","🍟","🍩","🥤"],a=one(h);return{q:"Qaysi biri foydali?",show:"",say:"Qaysi biri foydali?",opts:sh([a,...sh(u).slice(0,nOpt(l)-1)]).map(x=>({h:x,ok:x===a}))}}],
["safe-or-unsafe","Safe or Unsafe?","🚦","emotions",qz([["Qizil chiroqda yo'l kesib o'tish","🚦","Xavfli ⚠️"],["Yo'lda qo'l ushlab yurish","👨‍👧","Xavfsiz ✅"],["Kattalarsiz suvga tushish","🌊","Xavfli ⚠️"],["Velosiped uchun shlem kiyish","🚲","Xavfsiz ✅"],["Notanish odam bilan ketish","🚷","Xavfli ⚠️"],["Rozetkaga tegish","🔌","Xavfli ⚠️"]])],
["daily-routine","Daily Routine","⏰","emotions",qz([["Ertalab uyg'onib, nima qilamiz?","🌅","Yuz yuvamiz"],["Tushda nima qilamiz?","🌞","Tushlik qilamiz"],["Kechqurun nima qilamiz?","🌆","Kechki ovqat"],["Tunda nima qilamiz?","🌙","Uxlaymiz"],["Maktabdan keyin?","🎒","Dars qilamiz"]])],
["kindness-quest","Kindness Quest","💛","emotions",qz([["Do'sting yiqildi. Nima qilasan?","🤕","Yordam beraman"],["Do'sting yig'layapti. Nima qilasan?","😢","Taskin beraman"],["Sendan o'yinchoq so'rashdi.","🧸","Bo'lishaman"],["Kimdir yordam berdi.","🎁","Rahmat aytaman"],["Xato qilib qo'yding.","🙈","Kechirim so'rayman"]])],
["listen-and-repeat","Listen and Repeat","🔁","audio",l=>{const p=[...LET.slice(0,Math.min(26,4+l*4)),..."123456789".split("")],a=one(p);return mc("Eshit va toping","🔊",a,p,l,a,"en-US")}],
["find-the-difference","Find the Difference","🔍","logic",l=>{const n=Math.min(6,3+(l>>1)),a=[...Array(n)].map(()=>one(EMO)),i=R(n),b=[...a];let d;do{d=one(EMO)}while(d===a[i]);b[i]=d;return{q:"Pastdagi qatorda qaysi rasm boshqacha?",show:a.join(" "),say:"",opts:b.map((h,k)=>({h,ok:k===i}))}}],
["complete-the-picture","Complete the Picture","🖼️","colors",qz([["Kimga nima kerak?","🐶 ➕ ❓","🦴"],["Kimga nima kerak?","🐱 ➕ ❓","🐟"],["Kimga nima kerak?","🐰 ➕ ❓","🥕"],["Kimga nima kerak?","🐒 ➕ ❓","🍌"],["Kimga nima kerak?","🐻 ➕ ❓","🍯"],["Kimga nima kerak?","🐝 ➕ ❓","🌸"]])],
["color-by-number","Color by Number","🖍️","colors",null],["magic-drawing","Magic Drawing","✨","colors",null],["shape-art","Shape Art","🔷","colors",null],
["puzzle-world","Puzzle World","🧩","logic",null],["maze-adventure","Maze Adventure","🌀","logic",null],
["audio-storybook","Audio Storybook","📖","audio",null],["sing-and-learn","Sing & Learn","🎤","audio",null],["bedtime-stories","Bedtime Stories","🌙","audio",null],
["star-collector","Star Collector","⭐","math",null],["daily-challenges","Daily Challenges","📅","logic",null],["achievement-garden","Achievement Garden","🌻","animals",null],["my-learning-journey","My Learning Journey","🗺️","logic",null],
["two-players","Two Players","👫","logic",null],
["writing-practice","Writing Practice","✍️","letters",null]
]
export const gameBySlug=s=>GAMES.find(g=>g[0]===s)
