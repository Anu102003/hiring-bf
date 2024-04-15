import { useState } from "react";
import "../../assets/auth/auth.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";



const Signin = () => {

    const nav = useNavigate();

    const [login, setLogin] = useState({
        email: "",
        password: ""
    })
    
    const onUpdate = (data) => {
        setLogin({...login,[data.target.name]:data.target.value})
    }

    const submit = (data) => {
        data.preventDefault()
        axios.post("http://localhost:8080/guest/login", login)
        .then((res) => {
            if(res.status == 200) {
                if(res.data.data.role === "ADMIN") {
                    nav("/AdminContestMenu")
                }
                if(res.data.data.role === "EMPLOYEE") {
                    nav("/candidatedetails")
                }
            }
        })
    }

    return (
        <div className="auth">
            <div className="auth-form">
                <form>
                    <h1>Sign In</h1>
                    <label>Email</label>
                        <input type="text" className="email" name="email" required onChange={(data) => onUpdate(data)} value={login.email} />
                    <label>Password</label>
                        <input type="password" className="Password" name="password" value={login.password} onChange={(data) => onUpdate(data)} />
                    <button className="authbutton" onClick={(data) => submit(data)}>Sign up</button>
                    <h3>Don't have an account ?{" "}
                        <a href="https://www.youtube.com/results?search_query=circular+percentage+cahr+in+react+js">Sign up</a>
                    </h3>
                </form>
            </div>
        </div>
    );
};

export default Signin;


// import axios from 'axios';
// import React, { Component } from 'react';

// class Signin extends Component = () => {
//     constructor(props) {
//         super(props);
//         this.state = {
//             username: '',
//             password: ''
//         };
//     }

//     handleInputChange = (event) => {
//         const { name, value } = event.target;
//         this.setState({ [name]: value });
//     }

//     handleSubmit = (event) => {
//         event.preventDefault();
//     }


//     render() {
//         return (
//             <div>
//                 <h2>Login</h2>
//                 <form onSubmit={this.handleSubmit}>
//                     <div>
//                         <label>Username</label>
//                         <input type="text" name="username" value={this.state.username} onChange={this.handleInputChange} />
//                     </div>
//                     <div>
//                         <label>Password</label>
//                         <input type="password" name="password" value={this.state.password} onChange={this.handleInputChange} />
//                     </div>
//                     <button type="submit" onClick={(e) => submit(e)}>Login</button>
//                 </form>
//             </div>
//         );
//     }
// }

// export default Signin;
