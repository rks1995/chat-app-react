import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles/index.css'
import App from './components/App'
import { Toaster } from 'react-hot-toast'
import { ContactsProvider } from './providers/Provider'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <Toaster />
    <ContactsProvider>
      <App />
    </ContactsProvider>
  </React.StrictMode>
)
