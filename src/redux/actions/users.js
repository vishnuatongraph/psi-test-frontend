import UserService from '../services/user.service';
  
  export const createUser = (data) => async (dispatch) => {
    try {
      const res = await UserService.create(data);
      localStorage.setItem('user', JSON.stringify(res.data))
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
