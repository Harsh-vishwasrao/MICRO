import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { GoogleOAuthProvider } from '@react-oauth/google'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId="676027378363-eueetbe6307rob5m1ahf22s28ddhmpbd.apps.googleusercontent.com">
      <App />
    </GoogleOAuthProvider>
  </StrictMode>
)