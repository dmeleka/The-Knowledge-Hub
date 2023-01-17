import React, { useState } from 'react'
import Axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';
import Navbar from '../Home/Navbar';

const Login = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [LoginStatus, setLoginStatus] = useState(false)

    const navigate = useNavigate()

    Axios.get(`http://localhost:8000/trainee/isLoggedIn`, {
        headers: { "x-access-token": localStorage.getItem("token") }
    }).then(res => {
        if (res.data.loggedIn) {
            navigate(`/${res.data.username}`)
        }
    })

    const postData = (e) => {
        e.preventDefault();
        Axios.post('http://localhost:8000/login', {
            username,
            password

        }).then(res => {
            if (!res.data.auth) {
                alert("Wrong username or password")
                setLoginStatus(false);
            }
            else {
                console.log(res.data);
                localStorage.setItem("token", res.data.token)
                setLoginStatus(true);
                if (res.data.type === "T") {
                    navigate(`/${username}`)
                }
                else if (res.data.type === "I") {
                    navigate('/instructorHome')
                }
                else if (res.data.type === "A") {
                    navigate('/adminHome')
                }
            }
        })
    }



    // Axios.get('http://localhost:8000/login').then(res => {
    //     if (res.data.auth) {
    //         // navigate('/home')
    //         console.log("logged in")

    //     }
    // })

    return (
        <div>
            <Navbar />
            <div className="container shadow my-5">
                <div className="row">
                    <div className="col-md-5 d-flex flex-column align-items-center text-white justify-content-center form">
                        <h1 className="display-4 fw-bolder">Welcome Back</h1>
                        <p className="lead text-center">Enter Your Credentials To Login</p>
                        <h5 className="mb-4">OR</h5>
                        <NavLink to="/register" className="btn btn-outline-light rounded-pill pb-2 w-50">Register</NavLink>
                    </div>
                    <div className="col-md-6 p-5">
                        <h1 className="display-6" fw-bolder mb-5>LOGIN</h1>
                        <form>
                            <div class="mb-3">
                                <label>Username</label>
                                <input type="text" onChange={(e) => setUsername(e.target.value)} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                            </div>
                            <div class="mb-3">
                                <label for="exampleInputPassword1" class="form-label">Password</label>
                                <input type="password" onChange={(e) => setPassword(e.target.value)} class="form-control" id="exampleInputPassword1" />
                                <label><NavLink to="/forgotPassword">Forgot Password</NavLink></label>
                            </div>
                            <button type="submit" class="btn btn-primary" onClick={postData}>Login</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;




// , {
//     headers: { "x-access-token": localStorage.getItem("token") }
// }