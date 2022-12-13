import React, { useState } from 'react';
import Axios from 'axios';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Home/Navbar';

const ForgotPassword = () => {

    const [email, setEmail] = useState('')
    const navigate = useNavigate()

    const forgotPassword = (e) => {
        e.preventDefault();
        Axios.post('http://localhost:8000/forgotPassword', {
            email
        }).then(res => {
            if (res.data.auth) {
                localStorage.setItem("token", res.data.token)
                alert("Check Your Email")
                navigate('/')
            }
            else if (res.data.status === "User doesnt exist") {
                alert("Enter a vaild Email address")
            }
        })
    }

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
                        <h1 className="display-6" fw-bolder mb-5>Forgot Password</h1>
                        <form>
                            <div class="mb-3">
                                <label for="email" class="form-label">Email</label>
                                <input class="form-control" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <button onClick={forgotPassword} class="btn btn-primary w-100">Send Email</button >
                        </form>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default ForgotPassword;
