import React, { useState } from 'react';
import Axios from 'axios';
import { NavLink, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Home/Navbar';

const ResetPassword = () => {

    const [password, setPassword] = useState('')
    const [status, setStatus] = useState(false)

    const { id } = useParams()
    const { token } = useParams()

    const navigate = useNavigate()

    const resetPassword = (e) => {
        e.preventDefault();
        Axios.put(`http://localhost:8000/resetPassword/${id}/${token}`, {
            password

        }).then(res => {
            if (res.data.success) {
                alert("password changed")
                navigate('/login')
            }
        })
    }

    Axios.get(`http://localhost:8000/resetPassword/${id}/${token}`).then(res => {
        if (!res.data.auth) {
            navigate('/')
        }
        else {
            console.log(res.data.auth)
            setStatus(true)
        }
    })

    return (
        <div>
            <Navbar />
            {status &&
                <>
                    <div className="container shadow my-5">
                        <div className="row justify-content-end">
                            <div className="col-md-5 d-flex flex-column align-items-center text-white justify-content-center form order-2">
                                <h1 className="display-4 fw-bolder">Hello, Friend</h1>
                                <p className="lead text-center">Enter Your Details To Register</p>
                                <h5 className="mb-4">OR</h5>
                                <NavLink to="/login" className="btn btn-outline-light rounded-pill pb-2 w-50">Login</NavLink>
                            </div>
                            <div className="col-md-6 p-5">
                                <h1 className="display-6" fw-bolder mb-5>Reset Password</h1>
                                <form>
                                    <div class="mb-3">
                                        <label for="password" class="form-label">New Password</label>
                                        <input class="form-control" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                    </div>
                                    <button onClick={resetPassword} class="btn btn-primary w-100">Change Password</button >
                                </form>
                            </div>
                        </div>
                    </div>
                </>
            }
        </div >
    );
}

export default ResetPassword;
