import axios from "axios";

export default axios.create({
  baseURL: "https://ecallibrator-server.onrender.com/api",
  headers: {
    "Content-type": "application/json"
  }
});
