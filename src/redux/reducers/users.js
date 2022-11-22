import {
    CREATE_USER,
    GET_USER,
    LOGOUT,
  } from "../actions/types";
  
  const initialState = {
    user: {}
  };
  
  function userReducer(state = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
      case CREATE_USER:
        return {
          ...state,
          user: payload
        };
  
      case LOGOUT:
        return {
          ...state, 
          user: {}
        };

        case GET_USER:
        return {
          ...state, 
          user: payload
        };
  
      default:
        return state;
    }
  };
  
  export default userReducer;