# Kichkintoy (React + Vite + Express + MongoDB)

## Lokal ishga tushirish
1. MongoDB ishga tushiring (lokal yoki Atlas).
2. Server: `cd server && cp .env.example .env`, qiymatlarni to'ldiring (`JWT_SECRET` 32+ belgi; admin: `.env.example` da login `admin@gmail.com`, parol `admin1234` qo'yilgan. Faqat lokal sinov uchun, internetga chiqarishdan oldin almashtiring!), so'ng `npm install && npm run dev` (port 5000).
3. Frontend (loyiha ildizida): `npm install && npm run dev` (http://localhost:5173, `/api` serverga proksi qilinadi).

## Xavfsizlik
- Parollar bcrypt (12 raund); JWT httpOnly cookie, 7 kun; rol har so'rovda bazadan o'qiladi.
- Ro'yxatdan o'tganda rol doim `parent`; rolni o'zgartiradigan API yo'q. Admin faqat `.env` orqali yaratiladi.
- `/api/admin/*` faqat serverda tekshiriladi; muhim amallar (admin kirishi, foydalanuvchini o'chirish) audit logga yoziladi.
- helmet, CORS (faqat `CLIENT_URL`), Origin tekshiruvi (CSRF), rate limit, kirish qiymatlarini tekshirish. Admin parollarni va ortiqcha shaxsiy ma'lumotlarni ko'ra olmaydi.
- Mehmon natijalari saqlanmaydi (sahifa yangilansa o'chadi).

## Deploy
- Server (Render): root `server`, build `npm install`, start `npm start`. Env: `MONGODB_URI`, `JWT_SECRET`, `CLIENT_URL` (Vercel manzili), `NODE_ENV=production`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`.
- Frontend (Vercel): env `VITE_API_URL` = Render manzili. `vercel.json` tayyor.

## Hali yo'q
Socket.IO, Cloudinary, haqiqiy musiqa fayllari, parolni tiklash (email), bola ma'lumotlarini eksport/o'chirish so'rovi, ota-ona sozlamalari (ekran vaqti) serverda, `/privacy` va `/terms` sahifalari, Sing & Learn hozircha musiqasiz (harf/son/rang ovozli sanaladi).
Tarjima: barcha 30 o'yin uz/ru/en; About, Contact, Ota-ona, Admin, Login sahifalari matni hozircha o'zbekcha (`src/dict.js`, `src/i18n.js`).
Video: `src/videos.js` ga YouTube ID yozing.

Barcha 44 o'yin mavjud (`src/games.js` va `src/App.jsx` oxiridagi maxsus o'yinlar).
