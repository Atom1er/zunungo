import React, { useEffect, useState } from 'react';
import {
    createBrowserRouter,
    RouterProvider,
    Route,
    Navigate,
    Link
} from "react-router-dom";
import { signOut } from '../utils/api';


export default function Header({ user, setUser, lang, setLang }) {
    const [navigate, setnavigate] = useState(false);
    const [navigateTo, setnavigateTo] = useState("");


    const logout = () => {
        sessionStorage.removeItem('zAuthToken');
        sessionStorage.removeItem('zAuthUID');
        signOut();
        window.location.reload()
    }

    return (
        <div>
            {navigate && <Navigate to={navigateTo} />}
            {/* Sub Header */}
            <div className="sub-header">
                <div className="container">
                    <div className="row" style={{ margin: "auto" }}>
                        <div className="col-7">
                            <div className="left-content">
                                <ul>
                                    <li>
                                        <a style={{ display: 'flex', flexDirection: 'row', justifyContent: "center" }} href="tel:+13478843554">
                                            <i style={{ marginRight: '10px', marginTop: "4px" }} className="fa fa-phone"></i>
                                            <span className=" d-none d-md-block">+1 (347) 884 3554</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a style={{ display: 'flex', flexDirection: "row", justifyContent: "center" }}
                                            href="mailto:zunungogroup@gmail.com">
                                            <i style={{ marginRight: "10px", marginTop: "4px" }} className="fa fa-envelope"></i>
                                            <span className=" d-none d-md-block">zunungogroup@gmail.com</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-5">
                            <div className="right-icons">
                                <ul>
                                    <li><a href="https://www.facebook.com/Zunungo-Group-LLC-107606638741078"><i
                                        className="fa fa-facebook"></i></a></li>
                                    <li><a href="https://api.whatsapp.com/send?phone=13478843554"><i className="fa fa-whatsapp "></i></a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* <!-- ***** Header Area Start ***** --> */}
            <header className="header-area header-sticky">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <nav className="main-nav">
                                {/* <!-- ***** Logo Start ***** --> */}
                                <a href="index.html" className="logo">
                                    <img src="assets/images/zunugo.png" height="80px" alt="Zunugo logo" />
                                </a>
                                {/* <!-- ***** Logo End ***** --> */}
                                {/* <!-- ***** Menu Start ***** --> */}
                                <ul className="nav">
                                    <li className="scroll-to-section"><a href="/" className="active">Home</a></li>
                                    <li className="scroll-to-section"><Link to="/login">Connexion</Link></li>
                                    <li className="scroll-to-section"><Link to="/login">Souscrire Pour USA Visa</Link></li>
                                    {/* <!-- <li><a href="meetings.html">Meetings</a></li> --> */}
                                    <li className="scroll-to-section"><Link to="/#about">About Us</Link></li>
                                    {/* <!-- <li className="has-sub">
                                        <a href="javascript:void(0)">Pages</a>
                                        <ul className="sub-menu">
                                            <li><a href="meetings.html">Upcoming Meetings</a></li>
                                            <li><a href="meeting-details.html">Meeting Details</a></li>
                                        </ul>
                                    </li> --> */}
                                    {/* <!-- <li className="scroll-to-section"><a href="#courses">Courses</a></li> --> */}
                                    <li className="scroll-to-section"><Link to="/#contact">Contact Us</Link></li>
                                    {user && <li className="scroll-to-section"><Link to="#" onClick={logout}>Logout</Link></li>}
                                </ul>
                                <a className='menu-trigger'>
                                    <span>Menu</span>
                                </a>
                                {/* <!-- ***** Menu End ***** --> */}
                            </nav>
                        </div>
                    </div>
                </div>
            </header>
            {/* <!-- ***** Header Area End ***** --> */}
        </div>
    )
}
