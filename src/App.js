import "./App.css";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import PrivateRoute from "./PrivateRoute";
import Nav from './components/Nav'

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
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
