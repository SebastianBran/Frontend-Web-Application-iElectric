import axios from "axios";

export default axios.create({
    baseURL: 'https://ielectric-api.azurewebsites.net/api/v1/',
    headers: { 'content-type': 'application/json' }
});