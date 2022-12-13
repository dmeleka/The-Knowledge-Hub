import React from 'react'
import About from './About'
import Contact from './Contact'
import Services from './Services'
import { NavLink } from 'react-router-dom';
import Navbar from './Navbar';

const Home = () => {
    return (
        <div>
            <Navbar />
            <section id="home">
                <div className="container">
                    <div className="row justify-content-left">
                        <div className="col-md-8 mt-5">
                            {/* <h1 className="display-4 fw-bolder mb-4 text-left text-black">Learn Without Limits</h1> */}
                            <h1 className="home-head">Learn <b>Without</b> <br /> Limits</h1>
                            <p className="lead text-left fs-6 mb-5 text-black">Start, switch, or advance your career with more than 5,400 courses,<br /> Professional Certificates, and degrees from world-class universities <br /> and companies.</p>
                            <div className="buttons d-flex justify-content-left">
                                <NavLink to="/register" className="register-btn-big ">Join for Free</NavLink>
                                <NavLink to="/courses" className="courses-btn-big ">Courses</NavLink>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <About />
            {/* <Services /> */}
            <Contact />
        </div>
    )
}

export default Home