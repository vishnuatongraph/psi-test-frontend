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
  updateTask,
} from "../redux/actions/tasks";
import { SEARCH_TASKS } from "../redux/actions/types";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { tasks, searchedTask } = useSelector((state) => state.tasks);
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [edit, setEdit] = useState(null);
  const [allTasks, setAllTasks] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    dispatch(getTasks(currentUser?.id))
      .then((res) => {})
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    setAllTasks(searchedTask.length > 0 ? searchedTask : tasks);
  }, [searchedTask, tasks]);

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
    dispatch({ type: SEARCH_TASKS, payload: text });
  };

  // Event to get selected rows(Optional)

  return (
    <div className="container">
      {tasks.length > 0 ? (
        <>
          <div className="row mx-auto">
            <div className="col-md-4">
              <Card className="mt-3 shadow">
                <Card.Body>
                  <Card.Title>Task Completed</Card.Title>
                  <Card.Title className="shadow_btn">
                    {tasks.filter((x) => x.completed == true).length}
                  </Card.Title>
                  <Card.Text>/{tasks.length}</Card.Text>
                </Card.Body>
              </Card>
            </div>
            <div className="col-md-4">
              <Card
                className="mt-3 shadow"
                style={{ height: 125, overflow: "scroll" }}
              >
                <Card.Body>
                  <Card.Title>Latest Created Tasks</Card.Title>
                  {tasks.map((task, i) => (
                    <Card.Text
                      key={i}
                      style={{
                        textDecorationLine: task.completed
                          ? "line-through"
                          : "",
                      }}
                    >
                      {task.name}
                    </Card.Text>
                  ))}
                </Card.Body>
              </Card>
            </div>
            <div className="col-md-4">
              <Card className="mt-3 shadow">
                <Card.Body>
                  <PieChart
                    style={{ height: 95 }}
                    data={[
                      {
                        title: "Completed",
                        value: tasks.filter((x) => x.completed == true).length,
                        color: "#5285ec",
                      },
                      {
                        title: "In-Complete",
                        value: tasks.filter((x) => x.completed == false).length,
                        color: "#e8ecec",
                      },
                    ]}
                  />
                </Card.Body>
              </Card>
            </div>
          </div>
          <div className="mt-5">
            <div className="col-md-12">
              <table className="table">
                <thead>
                  <th></th>
                  <th style={{ textAlign: "left" }}>
                    <span>Tasks</span>
                  </th>
                  <td>
                    <input
                      placeholder="search by task name"
                      className="form-control"
                      onChange={(e) => searchTask(e.target.value)}
                      //   style={{ width: "30%" }}
                    />
                  </td>
                  {/* <td> */}
                  <Button variant="primary" onClick={handleShow}>
                    New Task
                  </Button>
                  {/* </td> */}
                </thead>
                <tbody>
                  {allTasks?.map((task, i) => (
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
