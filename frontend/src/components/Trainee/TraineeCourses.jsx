import TraineeNavbar from "./TraineeNavBar";
import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { NavLink, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import '../../App.css';

const TraineeCourses = () => {

    const [courses, setCourses] = useState([])
    const [loginStatus, setLoginStatus] = useState(false)
    const { username } = useParams()

    const navigate = useNavigate()

    const nav = () => {
        navigate(`/${username}`)
    }

    Axios.get(`http://localhost:8000/trainee/isLoggedIn`, {
        headers: { "x-access-token": localStorage.getItem("token") }
    }).then(res => {
        if (!res.data.loggedIn) {
            navigate(`/login`)
        }
    })

    useEffect(() => {
        Axios.get(`http://localhost:8000/trainee/enrolledCourses/${username}`)
            .then(res => {
                let tmp = Object.values(res.data['data']);
                setCourses(tmp)
            }).catch(err => console.log(err))
    }, [navigate])

    const arr = courses.map((c) => {
        let url = "/course/" + c.title
        return (
            <div class="cardEnrolled">
                <NavLink className="cardlink" to={url}>
                    {/* <img className="card-img-top" src="/course Photos/python.png" alt="Card image cap" /> */}
                    <div className="card-bodyProgress">
                        <h5 className='card-text'>{c.title}</h5>
                        <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                    </div>
                </NavLink>
                <NavLink className="instructorBtn">{c.instructorName}</NavLink>
                <div className="progressBar">
                    <div className="percentage" style={{ width: `${c.progress}%` }}></div>
                    <h1 className="percentageText">{c.progress}% Complete</h1>
                </div>
            </div >

        )
    })

    return (
        <>
            <div className="traineeHome">
                <div className="traineeMenu">
                    <div className="user">
                        <img src="placeholder.png" className="userPlaceholder" />
                        <h1 className="username">{username}</h1>
                    </div>
                    <ul className="traineeMenuList">
                        <li className="traineeMenuItem">
                            <button className="traineeMenuBtn" onClick={nav}>Main</button>
                        </li>
                        <li className="traineeMenuItem">
                            <button className="traineeMenuBtn">My Courses</button>
                        </li>
                        <li className="traineeMenuItem">
                            <button className="traineeMenuBtn">Settings</button>
                        </li>
                    </ul>
                </div>
                <div className="traineeRight">
                    <TraineeNavbar />
                    <div class="card-deck">
                        {arr}
                    </div>
                </div>
            </div>
        </>
    )
}

export default TraineeCourses