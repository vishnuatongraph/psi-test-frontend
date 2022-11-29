import axios from "axios";
import {API_URL} from './constant.js'

const user = JSON.parse(localStorage.getItem('user'))

export default axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    "x-access-token": user ? user.api_token : ''
  }
});