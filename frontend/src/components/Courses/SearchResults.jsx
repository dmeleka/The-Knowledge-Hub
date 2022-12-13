import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { NavLink } from 'react-router-dom';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../Home/Navbar';

const SearchResults = () => {

    const [courses, setCourses] = useState([])

    const navigate = useNavigate()

    const { search } = useParams()

    useEffect(() => {
        Axios.get(`http://localhost:8000/search/${search}`)
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
                        <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
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

export default SearchResults
