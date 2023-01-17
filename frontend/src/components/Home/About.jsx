import React from 'react'


const About = () => {
    return (
        <div>
            <section id="about">
                <div className="container my-5 py-5">
                    <div className="row">
                        <div className="col-md-6">
                            <img src="/assets/about1.jpg" alt="About" className="w-75" />
                        </div>
                        <div className="col-md-6">
                            <h3 className="fs-5 mb-0">About Us</h3>
                            <h1 className="display-6 mb-2">Who <b>We</b> Are</h1>
                            <hr className="w-50" />
                            <p className="lead mb-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta, aut, corrupti reiciendis pariatur unde illum beatae repellat recusandae facilis numquam possimus? Obcaecati ipsum quas tenetur sit recusandae velit labore error nobis voluptatibus incidunt tempore omnis, impedit eaque, laborum sunt modi voluptas expedita quos, dicta vel? Aut hic beatae cupiditate atque!</p>
                            <button className="btn btn-primary  px-4 py-2">Contact Us</button>
                            {/* <button className="btn btn-outline-primary px-4 py-2 ms-2">Get Started</button> */}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default About;