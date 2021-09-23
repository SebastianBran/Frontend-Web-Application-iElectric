import axios from "axios";

export default axios.create({
    baseUrl: "http://localhost:3000/api/v1",
    headers: { "content-type": "application/json" }
});