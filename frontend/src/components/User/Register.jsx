import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Axios from 'axios';
import Navbar from '../Home/Navbar';
import { useState } from 'react';


const Register = () => {

    const navigate = useNavigate()
    const [FirstName, setfName] = useState('')
    const [LastName, setlName] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [Gender, setGender] = useState('')
    const [acceptTC, setAcceptTC] = useState(false)

    Axios.get(`http://localhost:8000/trainee/isLoggedIn`, {
        headers: { "x-access-token": localStorage.getItem("token") }
    }).then(res => {
        if (res.data.loggedIn) {
            navigate(`/${res.data.username}`)
        }
    })

    const Register = (e) => {
        e.preventDefault();
        if (acceptTC) {
            Axios.post('http://localhost:8000/trainee/Register', {
                FirstName,
                LastName,
                username,
                email,
                password,
                Gender

            }).then(res => {
                if (res.data) {
                    navigate('/login')
                }
                else {
                    alert(res.data.alert)
                }
                // else {
                //     console.log(res.data);
                //     localStorage.setItem("token", res.data.token)
                //     if (res.data.type === "T") {
                //         navigate(`/${username}`)
                //     }
                //     else if (res.data.type === "I") {
                //         navigate('/instructorHome')
                //     }
                //     else if (res.data.type === "A") {
                //         navigate('/adminHome')
                //     }
                // }
            })
        }
        else {
            alert("You Must Agree to the Terms & Conditions")
        }
    }

    const isChecked = () => {
        setAcceptTC(!acceptTC)
    };

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
                            <div id="flname">
                                <div class="mb-3">
                                    <label for="name" class="form-label">First Name</label>
                                    <input type="text" onChange={(e) => setfName(e.target.value)} class="form-control" id="fname" />
                                </div>
                                <div class="lname">
                                    <label for="name" class="form-label">Last Name</label>
                                    <input type="text" onChange={(e) => setlName(e.target.value)} class="form-control" />
                                </div>
                            </div>
                            <div class="mb-3">
                                <label for="username" class="form-label"> Username</label>
                                <input type="text" onChange={(e) => setUsername(e.target.value)} class="form-control" id="username" />
                            </div>
                            <div class="mb-3">
                                <label for="exampleInputEmail1" class="form-label">Email address</label>
                                <input type="email" onChange={(e) => setEmail(e.target.value)} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                            </div>
                            <div class="mb-3">
                                <label for="exampleInputPassword1" class="form-label">Password</label>
                                <input type="password" onChange={(e) => setPassword(e.target.value)} class="form-control" id="exampleInputPassword1" />
                                <div id="formhelp" class="form-text">We'll never share your data with anyone.</div>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Gender</label>
                                <p><input type="radio" onChange={(e) => setGender("Male")} name="gender" /> Male     <input type="radio" onChange={(e) => setGender("Female")} name="gender" />Female</p>
                            </div>
                            <div class="mb-3 form-check">
                                <input type="checkbox" onChange={isChecked} class="form-check-input" id="check" />
                                <label class="form-check-label" for="exampleCheck1">Accept <NavLink to="/T&C">Terms & Conditions</NavLink></label>
                            </div>

                            <button type="submit" class="btn btn-primary w-100" onClick={Register}>Resigter</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;
