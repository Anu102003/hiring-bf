import "../../assets/auth/auth.css"
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from 'react'
import axios from "axios";
import { getAuthToken, setAuthHeader } from "../admin/helper/axios_helper"
import img from '../../logo.png'
const Signin = () => {
    const navigate=useNavigate();
    const [signinFormValues, setSigninFormValues] = useState({
        email: "",
        password: ""
    });
    const [signinFormEmailErrors, setSigninFormEmailErrors] = useState("");
    const [signinFormPasswordErrors, setSigninFormPasswordErrors] = useState("");
    const [signinSubmit, setSigninSubmit] = useState(true);

    const handleSignInChange = (e) => {
        const { name, value } = e.target;
        setSigninFormValues({ ...signinFormValues, [name]: value });
    };

    const handleSignInSubmit = (e) => {
        e.preventDefault();
        // if ((/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(signinFormValues.email)) && signinFormValues.email !== "") {
        //     setSigninFormEmailErrors("")
        //     setSigninSubmit(true)
        // } else {
        //     setSigninFormEmailErrors("Enter valid email")
        //     setSigninSubmit(false)
        // }
        // if (( /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/.test(signinFormValues.password)) && signinFormValues.password !== "") {
        //     setSigninFormPasswordErrors("")
        //     setSigninSubmit(true)
        // } else {
        //     setSigninFormPasswordErrors("Enter valid password (8 to 15 characters which contain one lowercase letter, one uppercase letter, one numeric digit, and one special character)")
        //     setSigninSubmit(false)
        // }
        if(signinSubmit){
            login()
        }
    }

    const [error, setError] = useState();

    const login = () => {
        axios.post("http://localhost:8080/guest/login" , signinFormValues)
        .then((res) => {
            console.log(res.data.data.role)
            if(res.status === 200) {
                setAuthHeader(res.data.data.token)
                if(res.data.data.role === "[ROLE_ADMIN]")
                    navigate("/admincontestmenu")
                if(res.data.data.role === "[ROLE_EMPLOYEE]")
                    navigate(`/candidatedetails/${res.data.data.id}`)
                if(res.data.data.role === "[ROLE_GUEST]")
                    navigate(`/contestdetails/${res.data.data.id}`)
            if(res.status === 403) {
                setError("Enter valid credentials")
            }
            if(res.status === 404) {
                setAuthHeader(null)
                setError("You are not authorized to use the website")
            }
            }
        }).catch((err) => {
            console.log(err)
        })
    }
    return (

        <div className="auth">

            <div className="auth-form">
                <form >
                    <div className="logo"><img src={img} height="130px" width="150px"></img></div>
                    <h1 >Sign In</h1>
                    <label>Email</label>
                    <input type="text"
                        name="email"
                        className="email"
                        autoCapitalize='off'
                        autoComplete='off'
                        onChange={(e) => { handleSignInChange(e) }}
                        required
                    />
                    {signinFormEmailErrors && <div className="error">{signinFormEmailErrors}</div>}
                    <label>Password</label>
                    <input type="password"
                        name="password"
                        className="Password"
                        autoCapitalize='off'
                        autoComplete='off'
                        required
                        onChange={(e) => { handleSignInChange(e) }}
                    />
                    {signinFormPasswordErrors && <div className="error">{signinFormPasswordErrors}</div>}
                    {error && <div>{error}</div>}
                    <div className="authbutton-align">
                        <Link to="/contestdetails"><button className="authbutton" onClick={(e) => handleSignInSubmit(e)}  >Sign in</button></Link>
                        {/* <Link to="/admincontestmenu"><button className="authbutton" >Sign in</button></Link> */}
                    </div>
                    <h3>Don't have an account <Link to="/signup">Sign up</Link></h3>
                </form>
            </div>

        </div>

    );
}

export default Signin;