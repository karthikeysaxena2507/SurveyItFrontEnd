/* eslint-disable eqeqeq */
import React, { useEffect, useState } from "react";
import Loader from "../Components/Loader";
import Footer from "../Components/Footer";
 
const userService = require("../Services/user");
const services = require("../Services/survey");
 
const Create = () => {
 
   const [username, setUsername] = useState("");
   const [loading, setLoading] = useState(true);
   const [message, setMessage] = useState("");
   const [content, setContent] = useState("");
   const [options, setOptions] = useState([]);
   const [optionContent, setOptionContent] = useState("");
 
   useEffect(() => {
       const check = async() => {
           try {
               const user = await userService.getUserFromToken(localStorage.getItem("token"));
               setUsername(user);
           }
           catch(err) {
               window.location = "/";
               console.log(err);
           }
           finally {
               setLoading(false);
           }
       }  
       check();
   },[]);

   const addSurvey = async() => {
       try {
           if(content && options.length >= 1 && username) {
                setMessage("Posting Survey, Please wait...");
                const data = {author: username, content, options};
                services.addSurvey(data, localStorage.getItem("token"));
                setMessage("Survey Added Successfully");
           }
           else {
               setMessage("Invalid Entries, Atleast option must be present and question can't be empty");
           }
       }
       catch(err) {
           console.log(err);
       }
   }
 
   const printOptions = (props) => {

        const deleteOption = () => {
            const idx = options.findIndex((option) => (option.content === props.content));
            let temp = [...options];
            temp.splice(idx, 1);
            setOptions(temp); 
            setMessage("");
        }

        return (
            <div className = "block" key = {props.content} style = {{padding: "5px 10px"}}>
               {props.content}
            <span className = "remove" onClick = {() => deleteOption()}> remove </span>
            </div>
        )
   }

   const addOption = () => {
        const idx = options.findIndex((option) => (option.content === optionContent));
        if(idx === (-1) && optionContent) {
            let temp = [...options];
            temp.push({content: optionContent});
            setOptions(temp);
            setMessage("");
        }
        else {
            setMessage("Invalid Option: Option Already Exists, or Option is Empty");
        }
        setOptionContent("");
   }
 
   const logout = () => {
       localStorage.clear();
       window.location = "/";
   }
 
   return (loading) ? <Loader /> :
   <div className = "container upper-margin text-center">
        <div className = "mt-3">
            <h1> Create Your Survey here! </h1>
        </div>
        <div className = "mt-3">
            <button className="btn btn-dark expand mt-2 mr-4" onClick={() => window.location = "/Home"}> Home </button>
            <button className="btn btn-dark expand mt-2" onClick={() => logout()}> Logout </button>
        </div>
        <div className = "mt-3">
            <input 
                type="text" 
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Question of the Survey" 
                autoComplete="off" 
                style={{width: "85%"}}
                className="mt-3 pt-2 pb-2 pr-2 pl-2"
                required 
            />
        </div>
        <div className = "mt-3">
            <h3> Options of Survey </h3>
        </div>
        <div className = "mt-3">
            {options.map(printOptions)}
        </div>
        <div className = "mt-3">
            <input 
                type="text" 
                value={optionContent}
                onChange={(e) => setOptionContent(e.target.value)}
                placeholder="Option for the survey" 
                autoComplete="off" 
                style={{width: "75%"}}
                className="mt-3 pt-2 pb-2 pr-2 pl-2"
                required 
            />
        </div>
        <div className = "mt-3">
            <button className="btn btn-dark expand mt-2" onClick={() => addOption()}> Add </button>
        </div>
        <div className = "mt-3">
            {message}
        </div>
        <div className = "mt-3">
            <button className="btn btn-dark expand mt-2" onClick={() => addSurvey()}> Post Survey </button>
        </div>
       <Footer />
   </div>
}
 
export default Create;