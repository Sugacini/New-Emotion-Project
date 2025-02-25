import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import React from 'react'
import './components/style.css';
import Book from './components/Book.jsx';

import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <Book /> */}
    <App />
  </StrictMode>,
)
