import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-bootstrap/Modal";
import { PieChart } from "react-minimal-pie-chart";
import {
  createTask,
  deleteTask,
  getTasks,
  searchTasks,
  updateTask,
} from "../redux/actions/tasks";
import ThreeCards from "./ThreeCards";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { tasks } = useSelector((state) => state.tasks);
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [edit, setEdit] = useState(null);
  const [searchedTask, setSearchedTask] = useState([]);
  const [query, setQuery] = useState("");

  const handleClose = () => {
    setName('');
    setShow(false)
  };
  const handleShow = () => setShow(true);

  useEffect(() => {
    dispatch(getTasks(currentUser?.id))
      .then((res) => {})
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const submit = () => {
    if (name === "") {
      return alert("Enter a task");
    }
    dispatch(createTask({ name, user_id: currentUser.id }))
      .then((res) => {
        console.log(res);
        handleClose();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const update = () => {
    if (name === "") {
      return alert("Enter a task");
    }
    dispatch(updateTask({ name }, edit))
      .then((res) => {
        console.log(res);
        setEdit(null);
        handleClose();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteT = (id) => {
    dispatch(deleteTask(id))
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Update List Item's state and Master Checkbox State
  const onItemCheck = (e, id) => {
    dispatch(updateTask({ completed: e.target.checked }, id))
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const searchTask = (text) => {
    setQuery(text);
    dispatch(searchTasks(currentUser.id, text))
      .then((res) => {
        console.log(res);
        setSearchedTask(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Event to get selected rows(Optional)

  return (
    <div className="container">
      {tasks.length > 0 ? (
        <>
          <ThreeCards tasks={tasks} />
          <div className="row mt-5">
            <div className="col-md-8" style={{textAlign:'left'}}>
              <h4>Tasks</h4>
            </div>
            <div className="col-md-2">
              <input
                placeholder="search by task name"
                className="form-control"
                onChange={(e) => searchTask(e.target.value)}
                //   style={{ width: "30%" }}
              />
            </div>
            <div className="col-md-2">
              <Button variant="primary" onClick={handleShow}>
                New Task
              </Button>
            </div>
          </div>
          <div className="mt-5">
            <div className="col-md-12">
              <table className="table">
                <tbody>
                  {tasks?.map((task, i) => (
                    <tr key={i} className={task.completed ? "selected" : ""}>
                      <th scope="row">
                        <input
                          type="checkbox"
                          checked={task.completed}
                          className="form-check-input"
                          id="rowcheck{task.id}"
                          onChange={(e) => onItemCheck(e, task.id)}
                        />
                      </th>
                      <td style={{ width: "70%", textAlign: "left" }}>
                        {task.name}
                      </td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-success"
                          onClick={() => {
                            setEdit(task.id);
                            setName(task.name);
                            handleShow();
                          }}
                        >
                          Edit
                        </button>
                      </td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-danger"
                          onClick={() => deleteT(task.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : (
        <Card style={{ width: "20rem" }} className="mt-5 mx-auto">
          <Card.Body>
            <Card.Title>You have no task.</Card.Title>
            <Button variant="primary" className="mt-2" onClick={handleShow}>
              New Task
            </Button>
          </Card.Body>
        </Card>
      )}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>+ New Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            placeholder="name"
            className="form-control mt-2"
            value={name}
            name="name"
            onChange={(e) => setName(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={!edit ? submit : update}>
            {edit ? "Update" : "New"} Task
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Dashboard;
