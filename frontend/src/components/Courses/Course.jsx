import React, { useEffect, useState } from 'react'
import Axios from 'axios';
import { NavLink, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Home/Navbar';
import Rating from '@mui/material/Rating';
import Exam from './Exam';

const Course = () => {

    const { title } = useParams()
    const [course, setCourse] = useState([])


    const navigate = useNavigate()

    useEffect(() => {
        Axios.get(`http://localhost:8000/view/${title}`).then(res => {
            let tmp = Object.values(res.data['data']);
            let courseData = tmp[0];
            setCourse(courseData);
        })
    }, [navigate])

    const InstructorName = course.InstructorName
    const Price = course.Price
    const rating = course.Rating

    return (
        <div>
            <Navbar />
            <section id="course">
                <div className='top'>
                    <div className='content'>
                        <div>
                            <h1 className='title'>{title}</h1>
                            <div className='rating'>
                                <Rating name="half-rating-read" defaultValue={rating} precision={0.5} readOnly />
                                <p className='rating-text'>{rating}</p>
                            </div>
                            <br />
                            <NavLink className='inst' to='/instructor'>{InstructorName}</NavLink>
                        </div>
                        <NavLink className='enroll' to='/enroll'>Enroll for {Price}$ <br /> <h1 className='starts'> Start Now</h1></NavLink>
                    </div>
                </div>
                <iframe className="video" width="966" height="543" src="https://www.youtube.com/embed/fzxEECHnsvU" title="Material UI 5 (MUI) React Tutorial | MUI Responsive Real Project" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                <button onClick={postData}>Exam2</button>
            </section >
        </div >
    )
}

export default Course