import React from 'react';
import { NavLink } from 'react-router-dom';
import Navbar from '../Home/Navbar';


const Register = () => {
    return (
        <div>
            <Navbar />
            <div className="container shadow my-5">
                <div className="row justify-content-end">
                    <div className="col-md-5 d-flex flex-column align-items-center text-white justify-content-center form order-2">
                        <h1 className="display-4 fw-bolder">Hello, Friend</h1>
                        <p className="lead text-center">Enter Your Details To Register</p>
                        <h5 className="mb-4">OR</h5>
                        <NavLink to="/login" className="btn btn-outline-light rounded-pill pb-2 w-50">Login</NavLink>
                    </div>
                    <div className="col-md-6 p-5">
                        <h1 className="display-6" fw-bolder mb-5>Register</h1>
                        <form>
                            <div class="mb-3">
                                <label for="name" class="form-label">First Name</label>
                                <input type="text" class="form-control" id="fname" />
                            </div>
                            <div class="mb-3">
                                <label for="name" class="form-label">Last Name</label>
                                <input type="text" class="form-control" id="lname" />
                            </div>
                            <div class="mb-3">
                                <label for="username" class="form-label"> Username</label>
                                <input type="text" class="form-control" id="username" />
                            </div>
                            <div class="mb-3">
                                <label for="exampleInputEmail1" class="form-label">Email address</label>
                                <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                            </div>
                            <div class="mb-3">
                                <label for="exampleInputPassword1" class="form-label">Password</label>
                                <input type="password" class="form-control" id="exampleInputPassword1" />
                                <div id="formhelp" class="form-text">We'll never share your data with anyone.</div>
                            </div>
                            <div class="mb-3 form-check">
                                <input type="checkbox" class="form-check-input" id="exampleCheck1" />
                                <label class="form-check-label" for="exampleCheck1">Accept <NavLink to="/T&C">Terms & Conditions</NavLink></label>
                            </div>

                            <button type="submit" class="btn btn-primary w-100">Resigter</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;
