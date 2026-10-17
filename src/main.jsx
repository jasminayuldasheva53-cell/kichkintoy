import React from 'react'
import {createRoot} from 'react-dom/client'
import './i18n.js'
import App from './App.jsx'
import './index.css'
try{document.documentElement.dataset.theme=localStorage.getItem('kk-theme')||(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light')}catch{}
createRoot(document.getElementById('root')).render(<App/>)
