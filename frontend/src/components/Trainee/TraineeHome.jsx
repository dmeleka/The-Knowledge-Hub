import React from "react";
import { useParams } from "react-router-dom";
import TraineeNavbar from "./TraineeNavBar";
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';

const TraineeHome = () => {

    const navigate = useNavigate()

    const { username } = useParams()
    const wallet = 0;

    const nav = () => {
        navigate(`/${username}/myCourses`)
    }

    Axios.get(`http://localhost:8000/trainee/isLoggedIn`, {
        headers: { "x-access-token": localStorage.getItem("token") }
    }).then(res => {
        if (!res.data.loggedIn) {
            navigate(`/login`)
        }
    })

    Axios.get(`http://localhost:8000/trainee/getWallet`,
    ).then(res => {
        wallet = res.data.Wallet;
    })

    return (
        <>
            <div className="traineeHome">
                <div className="traineeMenu">
                    <div className="user">
                        <img src="placeholder.png" alt="user" className="userPlaceholder" />
                        <h1 className="username">{username}</h1>
                    </div>
                    <ul className="traineeMenuList">
                        <li className="traineeMenuItem">
                            <button className="traineeMenuBtn">Main</button>
                        </li>
                        <li className="traineeMenuItem">
                            <button className="traineeMenuBtn" onClick={nav}>My Courses</button>
                        </li>
                        <li className="traineeMenuItem">
                            <button className="traineeMenuBtn">Settings</button>
                        </li>
                        <li className="traineeMenuItem">
                            <p className="traineeMenuBtn">Wallet {wallet}$</p>
                        </li>
                    </ul>
                </div>
                <div>
                    <TraineeNavbar />
                </div>
            </div>
        </>
    )
}

export default TraineeHome