import React from 'react'
import {useNavigate} from 'react-router-dom'


const Nav = () => {

    const user = JSON.parse(localStorage.getItem("user"));
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("user");
        navigate('/login')
      };

    return (
        <div className="App-header">
        {user?.id && (
          <>
            {" "}
            <div className="user">
              <img src={'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50'} alt="user" className="image" />
              <p className="username">{user.name}</p>
            </div>
            <span className="logout" onClick={logout}>
              Logout
            </span>
          </>
        )}
      </div>
    )
}

export default Nav;