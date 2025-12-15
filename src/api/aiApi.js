import axios from "axios";

const aiApi = axios.create({
  // baseURL: "http://localhost:5000/api",
  baseURL: "http://localhost:7860/api", // Your Flask AI Service URL
});

export default aiApi;
