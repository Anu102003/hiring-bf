import React, { useState } from 'react'
import "../../assets/auth/auth.css"
import { Link } from 'react-router-dom';

export const Signup = () => {
    const [signupFormValues, setSignupFormValues] = useState( { name: "", email: "", password: "", confirmpassword: "" });
    const [signupFormEmailErrors, setSignupFormEmailErrors] = useState("");
    const [signupFormPasswordErrors, setSignupFormPasswordErrors] = useState("");
    const [signupFormNameErrors, setSignupFormNameErrors] = useState("");
    const [signupFormConfirmPasswordErrors, setSignupConfirmFormPasswordErrors] = useState("");
    const [signupSubmitName, setSignupSubmitName] = useState(false);
    const [signupSubmitEmail, setSignupSubmitEmail] = useState(false);
    const [signupSubmitPassword, setSignupSubmitPassword] = useState(false);
    const [signupSubmitConfirmPassword, setSignupSubmitConfirmPassword] = useState(false);

    const handleSignUpChange = (e) => {
        const { name, value } = e.target;
        setSignupFormValues({ ...signupFormValues, [name]: value });
    };
    const handleSignUpSubmit = (e) => {
        e.preventDefault();
        
        if ((/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(signupFormValues.email)) && signupFormValues.email !== "") {
            setSignupFormEmailErrors("")
            setSignupSubmitEmail(true)
        } else {
            setSignupFormEmailErrors("Enter valid email")
            setSignupSubmitEmail(false)
        }
        if ((/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/.test(signupFormValues.password)) && signupFormValues.password !== "") {
            setSignupFormPasswordErrors("")
            setSignupSubmitPassword(true)
        } else {
            setSignupFormPasswordErrors("Enter valid password (8 to 15 characters which contain one lowercase letter, one uppercase letter, one numeric digit, and one special character)")
            setSignupSubmitPassword(false)
        }
        if (signupFormValues.password === signupFormValues.confirmpassword && signupFormValues.confirmpassword!=="") {
            setSignupConfirmFormPasswordErrors("")
            setSignupSubmitConfirmPassword(true)
        } else {
            setSignupConfirmFormPasswordErrors("Password does not match")
            setSignupSubmitConfirmPassword(false)
        }
        if ( signupFormValues.name.length===0) {
            setSignupFormNameErrors("Enter valid name")
            setSignupSubmitName(false)
            console.log(" o name")
            
        } else {
            setSignupSubmitName(true)
            setSignupFormNameErrors("")
        }
        console.log(signupSubmitConfirmPassword)
        if (signupSubmitName && signupSubmitEmail && signupSubmitPassword && signupSubmitConfirmPassword) {
            console.log(signupFormValues);
        }
    }

    return (
        <div className="auth">

            <div className="auth-form">
                <form>
                    <h1>Sign Up</h1>
                    <label>Name</label>

                    <input type="text"
                        className="Name"
                        autoCapitalize='off'
                        autoComplete='off'
                        name="name"
                        onChange={(e) => { handleSignUpChange(e) }}
                        required
                    />
                    {signupFormNameErrors && <div className="error">{signupFormNameErrors}</div>}

                    <label>Email</label>
                    <input type="text"
                        className="email"
                        autoCapitalize='off'
                        autoComplete='off'
                        name="email"
                        onChange={(e) => { handleSignUpChange(e) }}
                        required
                    />
                    {signupFormEmailErrors && <div className="error">{signupFormEmailErrors}</div>}

                    <label>Password</label>
                    <input type="password"
                        className="Password"
                        autoCapitalize='off'
                        autoComplete='off'
                        name="password"
                        onChange={(e) => { handleSignUpChange(e) }}
                        required
                    />
                    {signupFormPasswordErrors && <div className="error">{signupFormPasswordErrors}</div>}

                    <label>Confirm Password</label>
                    <input type="password"
                        className="cpassword"
                        autoCapitalize='off'
                        autoComplete='off'
                        name="confirmpassword"
                        onChange={(e) => { handleSignUpChange(e) }}
                        required
                    />
                    {signupFormConfirmPasswordErrors && <div className="error">{signupFormConfirmPasswordErrors}</div>}

                    <div className="authbutton-align">
                        <Link to="/signin"><button className="authbutton" onClick={(e) => handleSignUpSubmit(e)}>Sign up</button></Link>
                    </div>
                    <h3>Already a user ? <Link to="/signin">Sign in</Link></h3>
                </form>
            </div>

        </div>
    );
}

