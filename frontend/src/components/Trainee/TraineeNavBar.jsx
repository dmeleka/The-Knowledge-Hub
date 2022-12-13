import React from 'react';
import { NavLink } from 'react-router-dom';

const TraineeNavbar = () => {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light" id="navbar-main">
                <div className="container" id='main-container'>
                    <img className='logo' src="logos.png" alt="logo" />
                    <div className='search-div' >
                        <input type="text" class="search" id="search" placeholder="What do you want to learn?" />
                        <button type="submit" className="search-btn"> <i className="fa fa-search"></i></button>
                    </div>
                    <div className="main-drop-down-body">
                        <NavLink className="navbar-brand" to="/">The Knowledge Hub</NavLink>
                        {/* <ul className="main-menu">
                            <li className="menu-item"><NavLink className="menu-link" to="/login">LOGIN</NavLink></li>
                            <li className="menu-item"><NavLink className="menu-link" to="/register">REGISTER</NavLink></li>
                            <li className="menu-item"><NavLink className="menu-link" to="">COURSES</NavLink></li>
                        </ul> */}
                    </div>
                    <div className='user-div'>
                        <NavLink to="/" className="login-btn ">Log Out</NavLink>
                    </div>
                    <div className="drop-down-body">
                        <button className="drop-down-btn">
                            <img src="/assets/de.svg" alt="de" id="btn-img" className="language-img" />
                        </button>
                        <ul className="language-menu">
                            <li className="language-item" data-lang="de">
                                <img src="/assets/de.svg" alt="DE" className="language-img" />
                            </li>
                            <li className="language-item" data-lang="eg">
                                <img src="/assets/eg.svg" alt="EG" className="language-img" />
                            </li>
                            <li className="language-item" data-lang="us">
                                <img src="/assets/us.svg" alt="US" className="language-img" />
                            </li>
                        </ul>
                    </div>
                </div>
            </nav >
        </div >
    );
}

export default TraineeNavbar;