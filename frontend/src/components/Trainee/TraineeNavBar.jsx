import React, { useState } from 'react';
import Axios from 'axios';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const TraineeNavbar = () => {

    const [search, setSearch] = useState('')

    const navigate = useNavigate()

    const Search = (e) => {
        e.preventDefault();
        Axios.post('http://localhost:8000/search', {
            search

        }).then(res => {
            console.log(search)
            navigate(`/searchResults/${search}`)
        })
    }

    const logOut = () => {
        navigate('/')
        localStorage.removeItem("token")
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light" id="navbar-main">
                <div className="container" id='main-container'>
                    <img className='logo' src="logo.png" />
                    <div className='search-div' >
                        <input type="text" class="search" id="search" placeholder="What do you want to learn?" onChange={(e) => setSearch(e.target.value)} />
                        <button type="submit" className="search-btn" onClick={Search}> <i className="fa fa-search"></i></button>
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
                        <button className="login-btn" onClick={logOut}>Log Out</button>
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