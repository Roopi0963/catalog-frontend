import axios from "axios";

const aiApi = axios.create({
  baseURL: "http://localhost:5000/api", // Your Flask AI Service URL
});

export default aiApi;
