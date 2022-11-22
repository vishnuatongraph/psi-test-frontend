import axios from "axios";

export default axios.create({
  baseURL:  "https://psi-test-backend.herokuapp.com",
  headers: {
    "Content-Type": "application/json"
  }
});