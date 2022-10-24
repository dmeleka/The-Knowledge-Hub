import React from 'react'
import About from './About'
import Contact from './Contact'
import Services from './Services'

const Home = () => {
    return (
        <div>
            <section id="home">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-8 mt-5">
                            <h1 className="display-4 fw-bolder mb-4 text-center text-white">Testin if this actually works</h1>
                            <p className="lead text-center fs-4 mb-5 text-white">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Excepturi quam illum omnis recusandae perferendis odio laudantium ea dicta ullam cumque.</p>
                            <div className="buttons d-flex justify-content-center">
                                <button className="btn btn-light me-4 rounded-pill px-4 py-2">Get Quote</button>
                                <button className="btn btn-outline-light rounded-pill px-4 py-2">Our services</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <About />
            <Services />
            <Contact />
        </div>
    )
}

export default Home