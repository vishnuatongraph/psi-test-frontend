import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useDispatch } from "react-redux";
import { createUser } from "../redux/actions/users";
import {useNavigate} from 'react-router-dom'

const Login = () => {
  const dispatch = useDispatch();
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [id, setId] = useState()

  useEffect(() => {
    if (currentUser) {
      navigate('/dashboard')
    }
  }, []);

  const submit = () => {
    if (id === '' || !id || name === "") {
      return alert("Fields are required");
    }
    dispatch(createUser({name,id}))
      .then((user) => {
        if(user.id) {
            navigate('/dashboard')
        }
      })
      .catch((err) => {
        console.log(err);
        alert(err.response.data.errors[0].message)
      });
  };

  return (
    <Card style={{ width: "20rem" }} className="mt-5 mx-auto">
      <Card.Body>
        <input
          placeholder="id"
          className="form-control"
          type={"number"}
          name="id"
          value={id}
          onChange={(e)=>setId(e.target.value)}
        />
        <input
          placeholder="name"
          className="form-control mt-2"
          value={name}
          name="name"
          onChange={(e)=>setName(e.target.value)}
        />
        <Button variant="primary" className="mt-2" onClick={submit}>
          Login
        </Button>
      </Card.Body>
    </Card>
  );
};

export default Login;
