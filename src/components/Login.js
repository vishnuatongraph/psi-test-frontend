import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useDispatch } from "react-redux";
import { createUser } from "../redux/actions/users";
import {useNavigate} from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Spinner from 'react-bootstrap/Spinner';
import {LOGIN, VALIDATION} from '../constant'



const Login = () => {
  const dispatch = useDispatch();
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const [username, setUsername] = useState()
  const [password, setPassword] = useState('');
  const [loader, setLoader] = useState(false)

  useEffect(() => {
    if (currentUser) {
      navigate('/dashboard')
    }
  }, []);

  const submit = () => {
    if (username === '' || !username || password === "") {
      return toast.error(VALIDATION);
    }
    setLoader(true)
    dispatch(createUser({username, password}))
      .then((user) => {
        setLoader(false)    
        if(user?.id) {
          toast.success(LOGIN)
          setTimeout(()=>{
            navigate('/dashboard')
          },1000)
        }
      })
      .catch((err) => {
        setLoader(false)    
        toast.error(err.response.data.errors[0].message)
      });
  };

  return (
    <Card style={{ width: "20rem" }} className="mt-5 mx-auto">
      <Card.Body>
        <input
          placeholder="username"
          className="form-control"
          name="username"
          value={username}
          onChange={(e)=>setUsername(e.target.value)}
        />
        <input
          placeholder="password"
          className="form-control mt-2"
          value={password}
          name="password"
          onChange={(e)=>setPassword(e.target.value)}
        />
        <Button variant="primary" className="mt-2" onClick={submit} disabled={loader}>
         {!loader ? 'Login'
         : <Spinner animation="border" role="status" />}
        </Button>
      </Card.Body>
      <ToastContainer theme="colored" position="bottom-right" />
    </Card>
  );
};

export default Login;
