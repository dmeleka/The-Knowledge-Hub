import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Home/Navbar';

const Courses = () => {

    const [courses, setCourses] = useState([])
    const [loginStatus, setLoginStatus] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        Axios.get('http://localhost:8000/courses/allCourses')
            .then(res => {
                let tmp = Object.values(res.data['data']);
                let coursesData = tmp[0];
                setCourses(coursesData)
            }).catch(err => console.log(err))
    }, [navigate])

    const arr = courses.map((c) => {
        let f = false
        if (c.Price == 0) {
            f = true
        }
        let url = "/course/" + c.Title
        return (
            <div class="card">
                {f &&
                    <h1 className='free'>Free</h1>
                }
                <NavLink className="cardlink" to={url}>
                    <img className="card-img-top" src="/course Photos/python.png" alt="Card image cap" />
                    <div className="card-body">
                        <h5 className='card-text'>{c.Title}</h5>
                        <p className="card-text">{c.ShortSummary}</p>
                    </div>
                </NavLink>
                <div class="card-footer">
                    <small className="text-muted">{c.InstructorName} <br /><img src="star.png" alt="star" /> {c.Rating} </small>
                </div>
            </div>

        )
    })

    return (
        <div>
            <Navbar />
            <section id="courses">
                <div className='courses-container'>
                    <div className='filters'>

                    </div>
                    <div class="card-deck">
                        {arr}
                    </div>
                </div>

            </section>
        </div>
    )
}

export default Courses