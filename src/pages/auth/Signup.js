import React from 'react'
import "../../assets/auth/auth.css"
export const Signup = () => {
    return(
        <div className="auth">
        
        <div className="auth-form">
        <form>
        <h1>Sign Up</h1>
        <label>Name</label>
        
        <input type="text"
        className="Name"
        required
        /> 
        <label>Email</label>
        <input type="text"
        className="email"
        required
        />
        <label>Password</label>
        <input type="password"
        className="Password"
        required
        />
        <label>Confirm Password</label>
        <input type="password"
        className="cpassword"
        required
        />
        <button className="authbutton">Sign in</button>
        <h3>Already a user ? <a href="https://www.youtube.com/results?search_query=circular+percentage+cahr+in+react+js">Sign in</a></h3>
        </form>
        </div> 
       
        </div>
        );
       }
       
    