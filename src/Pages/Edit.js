import React, { useEffect, useState } from "react";

const userService = require("../Services/user");

const Edit = (props) => {

    const [username, setUsername] = useState("");
    const [loading, setLoading] = useState(true);

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

    return (
    <div>
        This is the Edit page
    </div>
    )
}

export default Edit;
