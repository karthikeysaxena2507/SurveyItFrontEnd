import axios from "axios";

const getAllSurveys = async(token) => {
    const response = await axios.get("/surveys/all", {
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json"
        }
    }); 
    return response.data;
} 

const addVote = async(data, token) => {
    const response = await axios.post("/surveys/vote", data, {
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json"
        }
    });
    return response.data;
}

const addSurvey = async(data, token) => {
    const response = await axios.post("/surveys/add", data, {
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json"
        }
    });
    return response.data;
}

const deleteSurvey = async(data, token) => {
    const response = await axios.post("/surveys/delete", data, {
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json"
        }
    });
    return response.data;
}

export {
    deleteSurvey,
    addSurvey,
    addVote,
    getAllSurveys
}