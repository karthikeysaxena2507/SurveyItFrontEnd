/* eslint-disable eqeqeq */
import React, { useEffect, useState } from "react";
import Loader from "../Components/Loader";
import Footer from "../Components/Footer";
 
const userService = require("../Services/user");
const services = require("../Services/survey");
 
const Home = () => {
 
   const [username, setUsername] = useState("");
   const [loading, setLoading] = useState(true);
   const [message, setMessage] = useState("");
   const [surveys, setSurveys] = useState([]);
   const [numberOfVotes, setNumberOfVotes] = useState([]);
 
   useEffect(() => {
       const check = async() => {
           try {
               const user = await userService.getUserFromToken(localStorage.getItem("token"));
               setUsername(user);
               const response = await services.getAllSurveys(localStorage.getItem("token"));
               const votes = [];
               for(let survey of response) {
                   const temp = [...survey.options];
                   temp.sort((a, b) => {
                       if(parseInt(a.id) > parseInt(b.id)) return 1;
                       else return -1;
                   });
                   let cnt = 0;
                   for(let item of temp) {
                       cnt += item.voters.length;
                   }
                   votes.push({id: survey.id, count: cnt});
                   survey.options = temp;
               }
               setNumberOfVotes(votes);
               setSurveys(response);
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
 
   const printSurveys = (props) => {
 
       const addVote = async(optionId) => {
           try {
               setMessage("Adding Your Vote, Please wait ...");
               const data = { name: username, optionId, surveyId: props.id };
               const result = await services.addVote(data, localStorage.getItem("token"));
               const votes = [];
               for(let survey of result) {
                   const temp = [...survey.options];
                   temp.sort((a, b) => {
                       if(parseInt(a.id) > parseInt(b.id)) return 1;
                       else return -1;
                   });
                   let cnt = 0;
                   for(let item of temp) {
                       cnt += item.voters.length;
                   }
                   votes.push({id: survey.id, count: cnt});
                   survey.options = temp;
               }
               setSurveys(result);
               setNumberOfVotes(votes);
               setMessage("Vote Added Successfully");
           }
           catch(err) {
               console.log(err);
           }
       }
 
       const deleteSurvey = async() => {
           try {
               const data = { username: props.author, surveyId: props.id };
               services.deleteSurvey(data, localStorage.getItem("token"));
               window.location = "/home";
           }
           catch(err) {
               console.log(err);
           }
       }
 
       const getWidthPercentage = (count) => {
           let idx = numberOfVotes.findIndex((item) => parseInt(item.id) === parseInt(props.id));
           if(count === 0) return 0;
        //    let width = window.innerWidth - 452;
           return (2*1082 * count)/ numberOfVotes[idx].count;
       }
 
       const printOptions = (props) => {
 
           return (
               <div
                   className="block expand"
                   key = {props.content}
                   onClick={() => addVote(props.id)}
               >
               <div className = "option" style = {{width: getWidthPercentage(props.voters.length)}}> {props.content} ({props.voters.length}) </div>
               </div>
           )
       }
 
       return (<div className = "survey mt-5" key = {props.id}>
           <div> <h4 style={{color: "white"}}> {props.content} </h4> </div>
           <div> {props.options.map(printOptions)}</div>
           <div style = {(username != props.author) ? {display: "none"} : null} >
               <button
                   className="btn btn-dark expand mt-2" 
                   onClick={() => deleteSurvey()}>
                   Delete
               </button>
           </div>
       </div>);
   }
 
   const logout = () => {
       localStorage.clear();
       window.location = "/";
   }
 
   return (loading) ? <Loader /> :
   <div className = "container upper-margin text-center">
       <div className = "mt-3">
           <h1> Surveys </h1>
       </div>
       <div>
       <button className="btn btn-dark expand mt-2 mr-4" onClick={() => window.location = "/create"}> Create </button>
       <button className="btn btn-dark expand mt-2" onClick={() => logout()}> Logout </button>
       </div>
       <div className = "mt-3">
           {message}
       </div>
       <div className = "mt-3 mb-5">
           {surveys.map(printSurveys)}
       </div>
       <Footer />
   </div>
}
 
export default Home;