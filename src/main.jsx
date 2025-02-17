import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import React from 'react'
import { BrowserRouter } from 'react-router-dom';
import Features from './components/Features.jsx'
import App from './App.jsx'
import VideoComponent from './components/VideoComponent.jsx'
// import Header from './components/Header.jsx'
import Journel from './components/Journel.jsx'
import JournelHeader from './components/JournelHeader.jsx'
// import App from './App.jsx'
import LoginPage from './components/LoginPage.jsx'
// import SignUp from './components/SignUp.jsx'
// import Login from './components/Login.jsx'
// import PathRouter from './components/Router.jsx'
import Home from './components/Home.jsx'
import Quotes from './components/Quotes.jsx'
import Config from './components/Config.jsx'
import Story from './components/Story.jsx'
import Journel1 from './components/Journel1.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {console.log('no error')}
    {/* <Login></Login> */}
    {/* <LoginPage /> */}
    {/* <Config /> */}
    {/* <PathRouter /> */}
    <App />
    {/* <JournelHeader />
    <Journel /> */}
    {/* <Journel1 /> */}
    {/* <Home /> */}
    {/* <VideoComponent /> */}
    {/* <Quotes /> */}
    {/* <Story />b */}
  </StrictMode>,
)
