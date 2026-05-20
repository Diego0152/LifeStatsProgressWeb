import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { AuthProvider } from './data/AuthContext.jsx';
import { ProfileProvider } from './data/ProfileContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <ProfileProvider>
        <BrowserRouter>
          <App/>
        </BrowserRouter>
      </ProfileProvider>
    </AuthProvider>
  </StrictMode>
)
