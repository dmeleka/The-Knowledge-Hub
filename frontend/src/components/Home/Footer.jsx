import React from 'react'
import { NavLink } from 'react-router-dom';

const Footer = () => {
    return (
        <div>
            <footer className="footer text-black">
                <div className="container">
                    <footer className="py-5">
                        <div className="row">
                            <div className="col-3">
                                <h4>The Knowledge hub</h4>
                            </div>
                            <div className="col-2">
                                <h5>Section</h5>
                                <ul className="nav flex-column">
                                    <li className="nav-item" mb-2><NavLink to="/" className="nav-link p-0 text-black">Home</NavLink></li>
                                    <li className="nav-item" mb-2><NavLink to="#" className="nav-link p-0 text-black">Features</NavLink></li>
                                    <li className="nav-item" mb-2><NavLink to="#" className="nav-link p-0 text-black">Pricing</NavLink></li>
                                    <li className="nav-item" mb-2><NavLink to="#" className="nav-link p-0 text-black">FAQs</NavLink></li>
                                    <li className="nav-item" mb-2><NavLink to="/about" className="nav-link p-0 text-black">About</NavLink></li>
                                </ul>
                            </div>
                            <div className="col-4 offset-1">
                                <form>
                                    <h5>Subscribe to our newsletter</h5>
                                    <p>Monthly digest of whats new and exciting from us.</p>
                                    <div className="d-flex w-100 gap-2">
                                        <input id="newsletter1 " type="text" className="form-control" placeholder="Email address" />
                                        <button className="sub-btn" type="button">Subscribe</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="d-flex justify-content-between pt-4  mt-4 border-top">
                            <p>© 2022 Company, Inc. All rights reserved.</p>
                            <ul className="list-unstyled d-flex">
                                <li className="ms-3"><NavLink className="link-light" to="#"><i className="fa fa-facebook fa-2x"></i></NavLink></li>
                                <li className="ms-3"><NavLink className="link-light" to="#"><i className="fa fa-instagram fa-2x"></i></NavLink></li>
                                <li className="ms-3"><NavLink className="link-light" to="#"><i className="fa fa-twitter fa-2x"></i></NavLink></li>
                            </ul>
                        </div>
                    </footer>
                </div>
            </footer>
        </div>
    )
}

export default Footer;