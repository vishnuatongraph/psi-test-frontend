import {
    CREATE_USER,
    LOGOUT,
  } from "./types";
  
  import UserService from '../services/user.service';
  
  export const createUser = (data) => async (dispatch) => {
    try {
      const res = await UserService.create(data);
      dispatch({
        type: CREATE_USER,
        payload: res.data,
      });
      localStorage.setItem('user', JSON.stringify(res.data))
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };

  export const logoutUser = () => async (dispatch) => {
    try {    
      dispatch({
        type: LOGOUT,
        payload: {},
      });
    } catch (err) {
      return Promise.reject(err);
    }
  };
