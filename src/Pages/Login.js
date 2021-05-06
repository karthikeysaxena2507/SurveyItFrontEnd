/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect, useState } from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import Loader from "../Components/Loader";
import main from "../images/main.jpg";
const userService = require("../Services/user");

const Login = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const check = async() => {
            try {
                await userService.getUserFromToken(localStorage.getItem("token"));
                window.location = "/home";
            }
            catch(err) {
                console.log(err);
            }
            finally {
                setLoading(false);
            }
        }   
        check(); 
    },[]);

    const add = async() => {
        try {
            if(username && password) {
                setMessage("Signing In The User ...");
                const response = await userService.loginUser({username, password});
                localStorage.setItem("token", response.token);
                setMessage("User Validated");
                window.location = "/home";
            }
            else {
                setMessage("Fields cannot be empty");
            }
        }
        catch(err) {
            setMessage("Invalid Credentials");
            console.log(err);
        }
    }

    return (loading) ? <Loader /> :
    <div className="container">
        <div className="row">
            <div className="text-center col-md-6">
                <Header/>
                <h2 className="mt-5"> Login to Your Account </h2>
                <div>
                    <input 
                        type="text" 
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Username" 
                        autoComplete="off" 
                        style={{width: "300px"}}
                        className="mt-3 pt-2 pb-2 pr-2 pl-2"
                        required 
                    />
                </div>
                <div>
                    <input 
                        type="password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password" 
                        style={{width: "300px"}}
                        className="mt-3 pt-2 pb-2 pr-2 pl-2"
                        required 
                    />
                </div>
                <div>
                    <button onClick={() => add()} className="btn btn-dark mt-3 mb-3"> Login </button>
                </div>
                <h4> OR </h4>
                <div>
                    <button onClick={() => window.location="/register"} className="btn btn-dark mt-3"> Register </button>
                </div>
                <div className="mt-3">
                    <p> {message} </p>
                </div>
            </div>
            <div className="text-center col-md-6 upper-margin">
                <div className="text mb-3">Create your own survey and vote on others!</div>
                <img src = {main} alt = "image not found" className = "img"/>
            </div>
        </div>
        <Footer />
    </div>
}

export default Login;