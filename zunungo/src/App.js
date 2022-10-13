import React, { useEffect, useState } from 'react'
import logo from './logo.svg';
import './App.css';
import Header from './components/header';
import Footer from './components/footer';
import Home from './pages/Home';
import Visa from './pages/Visa';
import Admin from './pages/Admin';
import Login from './pages/Login';
import Profile from './pages/Profile';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
  useLocation
} from "react-router-dom";


function App() {

  const [user, setUser] = useState(null);
  const [lang, setLang] = useState('en');

  return (
    <Router>
      <div className="App">
        <ToastContainer
          position="bottom-center"
          autoClose={7000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <Header user={user} setUser={(u) => setUser(u)} lang={lang} setLang={(l) => setLang(l)}/>
        <Routes>
          <Route exact path="/" element={<Home user={user} setUser={(u) => setUser(u)} lang={lang} setLang={(l) => setLang(l)} />} />

          <Route path="/visa" element={<Visa user={user} setUser={(u) => setUser(u)} lang={lang} setLang={(l) => setLang(l)} />} />

          <Route path="/admin" element={<Admin user={user} setUser={(u) => setUser(u)} lang={lang} setLang={(l) => setLang(l)} />} />

          <Route path="/login" element={<Login user={user} setUser={(u) => setUser(u)} lang={lang} setLang={(l) => setLang(l)} />} />

          <Route path="/profile" element={<Profile user={user} setUser={(u) => setUser(u)} lang={lang} setLang={(l) => setLang(l)} />} />

          <Route path="*" element={<Navigate to='/' />} />
        </Routes>
        <Footer user={user} setUser={(u) => setUser(u)} lang={lang} setLang={(l) => setLang(l)}/>
      </div>
    </Router>
  );
}

export default App;
