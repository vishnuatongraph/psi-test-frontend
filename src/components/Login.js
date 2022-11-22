import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useDispatch } from "react-redux";
import { createUser } from "../redux/actions/users";
import {useNavigate} from 'react-router-dom'

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState('');


  const submit = () => {
    if (name === "") {
      return alert("Fields are required");
    }
    dispatch(createUser({name}))
      .then((user) => {
        console.log(user, "user12");
        if(user.id) {
            navigate('/dashboard')
        }
      })
      .catch((err) => {
        console.log(err);
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
        />
        <input
          placeholder="name"
          className="form-control mt-2"
          value={name}
          name="name"
          onChange={(e)=>setName(e.target.value.trim())}
        />
        <Button variant="primary" className="mt-2" onClick={submit}>
          Login
        </Button>
      </Card.Body>
    </Card>
  );
};

export default Login;
