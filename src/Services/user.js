import axios from "axios";

const registerUser = async(data) => {
    const response = await axios.post(`/users/signup`, data);
    return response.data;
}

const loginUser = async(data) => {
    const response = await axios.post(`/users/signin`, data);
    return response.data;
}

const getUserFromToken = async(token) => {
    const response = await axios.get(`/users/${token}`, {
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json"
        }
    });
    return response.data;
}

export { registerUser, loginUser, getUserFromToken };