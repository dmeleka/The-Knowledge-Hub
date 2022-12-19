import React, { useEffect, useState } from 'react'
import Axios from 'axios';
import { NavLink, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Home/Navbar';
import Rating from '@mui/material/Rating';

const Course = () => {

    const { title } = useParams()
    const [course, setCourse] = useState([])
    const [video, setVideo] = useState("")
    const [subtitles, setSubtitles] = useState([])
    const [subtitleVideos, setSubtitleVideos] = useState([])
    const [subtitleHours, setSubtitleHours] = useState([])
    const [exams, setExams] = useState([])
    let examTitle = ""



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


    const URL = `/exam/${title}/`

    useEffect(() => {
        Axios.get(`http://localhost:8000/courses/getVideo/${title}`).then(res => {
            setVideo(res.data.link)
        })

        Axios.get(`http://localhost:8000/courses/getSubtitles/${title}`).then(res => {
            setSubtitles(res.data.Subtitles)
            setSubtitleHours(res.data.SubtitleHours)
            setSubtitleVideos(res.data.SubtitleVideos)
            console.log(subtitleVideos);
        })

        Axios.get(`http://localhost:8000/courses/getExams/${title}`).then(res => {
            setExams(res.data.data)
        })
    }, [navigate])

    const arr = subtitles.map((s) => {
        let hasExam = false;
        let i = 0
        let subtitleVideo = subtitleVideos[i]

        if (exams.length != 0) {
            exams.map((e) => {
                if (s === e[1]) {
                    examTitle = e[1]
                    hasExam = true
                }
            })
        }
        i++

        return (
            <div class="subtitle">
                <div className='subtitle-right'>
                    <h2>{s}</h2>
                    {hasExam &&
                        <NavLink className="examBtn" to={URL + examTitle}>Exercise</NavLink>
                    }
                </div>
                <div className='subtitle-left'>
                    <iframe className="subtitleVideo" width="500" height="350" src={subtitleVideo} title="video" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

                </div>
            </div>



        )
    })

    return (
        <div>
            <Navbar />
            <section id="course">
                <div className='course-top'>
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
                    <iframe className="video" width="500" height="350" src={video} title="video" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>
                <div className='course-bottom'>
                    {arr}
                </div>

            </section >
        </div >
    )
}

export default Course