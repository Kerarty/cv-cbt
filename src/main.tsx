import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// ParaType: шрифтовое семейство русских служебных документов. Собраны локально, без CDN.
import '@fontsource/pt-sans-narrow/400.css'
import '@fontsource/pt-sans-narrow/700.css'
import '@fontsource/pt-sans/400.css'
import '@fontsource/pt-sans/700.css'
import '@fontsource/pt-mono/400.css'

import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
