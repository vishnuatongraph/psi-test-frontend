import "./App.css";
import Dummy from "./assets/dummy.jpeg";
import { Routes, Route, BrowserRouter, Navigate, useNavigate } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "./redux/actions/users";
import { useEffect } from "react";
import { GET_USER } from "./redux/actions/types";
import PrivateRoute from "./PrivateRoute";

function App() {
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const dispatch = useDispatch();
  const {user} = useSelector((state)=>state.users)
  console.log(user, "user123")

  useEffect(() => {
    if (currentUser) {
      dispatch({ type: GET_USER, payload: currentUser });
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("user");
    dispatch(logoutUser());
  };

  return (
    <div className="App">
      <div className="App-header">
        {user?.id && (
          <>
            {" "}
            <div className="user" style={{ marginLeft: "50px" }}>
              <img src={Dummy} alt="user" className="image" />
              <p style={{ marginLeft: "10px", paddingTop:15 }}>{user.name}</p>
            </div>
            <span style={{ marginRight: "50px", cursor:'pointer' }} onClick={logout}>
              Logout
            </span>
          </>
        )}
      </div>
      <BrowserRouter>
        <Routes>
              <Route path="dashboard" element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute> } />

              <Route path="login/*" element={<Login />} />
              <Route path='/' element={<Navigate to="/login" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
