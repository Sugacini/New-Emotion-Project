import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Features from './components/Features.jsx'
// import Header from './components/Header.jsx'
// import Journel from './components/Journel.jsx'
// import JournelHeader from './components/JournelHeader.jsx'
// import App from './App.jsx'
import LoginPage from './components/LoginPage.jsx'
// import SignUp from './components/SignUp.jsx'
// import Login from './components/Login.jsx'
// import PathRouter from './components/Router.jsx'
import Home from './components/Home.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {console.log('no error')}
    {/* <Login></Login> */}
    <LoginPage />
    {/* <Config /> */}
    {/* <PathRouter /> */}
    {/* <Features /> */}
    {/* <JournelHeader />
    <Journel /> */}
    {/* <Home /> */}
  </StrictMode>,
)
