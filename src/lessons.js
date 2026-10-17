import i18n from './i18n.js'
import {tx} from './dict.js'
import {mc,one,num,AL,W,EMO} from './games.js'
const T=(k,l)=>i18n.t(k,{lng:l}),ix=l=>({uz:0,ru:1,en:2}[l]??2),L=s=>s.split("|").map(x=>x.split(",")),sz=(n,lv,b,s)=>Math.min(n,b+lv*s)
const AU=L("A,🎄,Archa|B,🐟,Baliq|D,🌳,Daraxt|E,🐐,Echki|F,🐘,Fil|G,🌷,Gul|H,🐹,Hamster|I,🐍,Ilon|J,🦒,Jirafa|K,📖,Kitob|L,🍋,Limon|M,🐱,Mushuk|N,🍞,Non|O,🍎,Olma|P,🍅,Pomidor|Q,🐑,Qo'y|R,🖼️,Rasm|S,🦁,Sher|T,🐔,Tovuq|U,🍇,Uzum|V,🚲,Velosiped|X,🐓,Xo'roz|Y,⭐,Yulduz|Z,🦓,Zebra|Sh,🎈,Shar|Ch,🍵,Choy")
const AR=L("А,🍉,Арбуз|Б,🦋,Бабочка|В,🐺,Волк|Г,🍄,Гриб|Д,🏠,Дом|Е,🎄,Ель|Ё,🦔,Ёж|Ж,🦒,Жираф|З,🐰,Заяц|И,🦃,Индюк|К,🐱,Кот|Л,🦁,Лев|М,🐭,Мышь|Н,🦏,Носорог|О,🦌,Олень|П,🦜,Попугай|Р,🐟,Рыба|С,🐘,Слон|Т,🐯,Тигр|У,🦆,Утка|Ф,🚩,Флаг|Х,🐹,Хомяк|Ц,🌷,Цветок|Ч,🫖,Чайник|Ш,🎈,Шар|Щ,🐶,Щенок|Э,🚜,Экскаватор|Ю,🪀,Юла|Я,🍎,Яблоко")
export const ALPH={uz:AU,ru:AR,en:AL}
const SH=L("🔴,Doira,Круг,Circle|🟦,Kvadrat,Квадрат,Square|🔺,Uchburchak,Треугольник,Triangle|⭐,Yulduz,Звезда,Star|❤️,Yurak,Сердце,Heart|🔶,Romb,Ромб,Diamond")
export const CO=L("#e53935,Qizil,Красный,Red|#1e88e5,Ko'k,Синий,Blue|#fdd835,Sariq,Жёлтый,Yellow|#43a047,Yashil,Зелёный,Green|#fb8c00,To'q sariq,Оранжевый,Orange|#8e24aa,Binafsha,Фиолетовый,Purple|#f48fb1,Pushti,Розовый,Pink|#212121,Qora,Чёрный,Black|#6d4c41,Jigarrang,Коричневый,Brown|#eeeeee,Oq,Белый,White")
const EM=L("😀,Xursand,Радостный,Happy|😢,Xafa,Грустный,Sad|😮,Hayron,Удивлённый,Surprised|😠,Jahldor,Сердитый,Angry|😴,Uyqusiragan,Сонный,Sleepy|😨,Qo'rqqan,Испуганный,Scared|🥰,Mehribon,Любящий,Loving")
const AN=[["🐄",["Sigir","Корова","Cow"],["Mu","Му","Moo"]],["🐶",["It","Собака","Dog"],["Vov","Гав","Woof"]],["🐱",["Mushuk","Кошка","Cat"],["Miyov","Мяу","Meow"]],["🐑",["Qo'y","Овца","Sheep"],["Me","Бе","Baa"]],["🐷",["Cho'chqa","Свинья","Pig"],["Xryu","Хрю","Oink"]],["🐸",["Qurbaqa","Лягушка","Frog"],["Qurq","Ква","Ribbit"]],["🦁",["Sher","Лев","Lion"],["Gurr","Рр","Roar"]],["🐔",["Tovuq","Курица","Hen"],["Qaq","Ко-ко","Cluck"]]]
const letters=(l,lv)=>{const A=ALPH[l]||AL;return A.slice(0,sz(A.length,lv,4,5))}
const lcards=(lv,l)=>letters(l,lv).slice(0,8).map(a=>({big:a[0],sub:a[1]+" "+a[2],say:a[0]+". "+a[2]}))
const named=(A,t,n0,n1,hex)=>({gen:(lv,l)=>{const p=A.slice(0,sz(A.length,lv,n0,n1)),a=one(p),i=ix(l)+1;return mc(T(t,l),a[0],a[i],p.map(x=>x[i]),lv,a[i])},learn:(lv,l)=>A.slice(0,sz(A.length,lv,n0,n1)).map(a=>({big:a[0],sub:a[ix(l)+1],say:a[ix(l)+1]}))})
export const LES={
"alphabet-adventure":{gen:(lv,l)=>{const p=letters(l,lv),a=one(p);return mc(T("q.letter",l)+" "+a[0],a[1],a[0],p.map(x=>x[0]),lv,a[0])},learn:lcards},
"first-letter":{gen:(lv,l)=>{const p=letters(l,lv),a=one(p);return mc(T("q.first",l),a[1]+" "+a[2],a[0],p.map(x=>x[0]),lv,a[2])},learn:lcards},
"number-garden":{gen:(lv)=>{const m=[5,10,20,50,100,100,100][lv],n=num(1,m-1);return mc(T("q.next",i18n.language),""+n,""+(n+1),[n+2,n-1,n+3,n-2,n+5,n+10].filter(x=>x>0).map(String),lv,""+n)},learn:lv=>{const m=[5,10,20,50,100,100,100][lv];return[...Array(Math.min(m,8))].map((_,i)=>({big:""+(i+1),sub:"⭐".repeat(i+1),say:""+(i+1)}))}},
"count-the-animals":{gen:(lv,l)=>{const m=[3,5,8,10,12,15,20][lv],n=num(1,m);return mc(T("q.count",l),one(EMO).repeat(n),""+n,[n+1,n-1,n+2,n-2,n+3].filter(x=>x>0).map(String),lv,""+n)},learn:lv=>{const e=one(EMO);return[...Array(Math.min([3,5,8,10,12,15,20][lv],6))].map((_,i)=>({big:e.repeat(i+1),sub:""+(i+1),say:""+(i+1)}))}},
"shape-match":named(SH,"q.shape",3,1),
"emotion-faces":named(EM,"q.emotion",3,1),
"color-master":{gen:(lv,l)=>{const p=CO.slice(0,sz(10,lv,4,1)),a=one(p),n=a[ix(l)+1];return mc(n+": "+T("q.color",l),"🎨",a[0],p.map(x=>x[0]),lv,n)},learn:(lv,l)=>CO.slice(0,sz(10,lv,4,1)).map(a=>({color:a[0],sub:a[ix(l)+1],say:a[ix(l)+1]}))},
"animal-sounds":{gen:(lv,l)=>{const p=AN.slice(0,sz(8,lv,3,1)),a=one(p);return mc(T("q.sound",l),"🔊",a[0],p.map(x=>x[0]),lv,a[2][ix(l)])},learn:(lv,l)=>AN.slice(0,sz(8,lv,3,1)).map(a=>({big:a[0],sub:a[1][ix(l)]+": "+a[2][ix(l)],say:a[1][ix(l)]+". "+a[2][ix(l)]}))}}
export const learnFor=(g,lv,lang)=>{const f=g[4];if(f.items)return f.items.slice(0,Math.min(f.items.length,4+lv*2)).slice(0,8).map(it=>{const a=tx(it[0],lang),b=tx(it[2],lang);return{big:it[1]||it[2],sub:it[1]?a+" — "+b:a,say:it[1]?a+". "+b:a}})
 if(["letter-puzzle","word-builder","listen-and-choose","missing-letter"].includes(g[0]))return W.slice(0,Math.min(W.length,3+lv*2)).slice(0,8).map(w=>({big:w[0],sub:w[1],say:w[1].toLowerCase(),lang:"en-US"}))
 return[{big:"👆",sub:T("tap",lang),say:T("tap",lang)}]}
