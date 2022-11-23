import React, { useEffect, useState, useCallback } from "react";
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
import TaskModal from "./TaskModal";
import { Col, Container, Row, Table } from "react-bootstrap";
import TaskTable from "./TaskTable";

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
    setName("");
    setShow(false);
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
        if(query !== '') {
          let newTasks = [...searchedTask];
          const i = newTasks.findIndex((x) => x.id === edit);
          if (i !== -1) {
            newTasks[i] = res;
            setSearchedTask(newTasks)
          }
        }
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
        if(query !== '') {
          let newTasks = [...searchedTask];
          const i = newTasks.findIndex((x) => x.id === id);
          if (i !== -1) {
            newTasks.splice(i, 1);
            setSearchedTask(newTasks)
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Update List Item's state and Master Checkbox State
  const onItemCheck = (e, id) => {
    dispatch(updateTask({ completed: e.target.checked }, id))
      .then((res) => {
        if(query !== '') {
          let newTasks = [...searchedTask];
          const i = newTasks.findIndex((x) => x.id === id);
          if (i !== -1) {
            newTasks[i] = res;
            setSearchedTask(newTasks)
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const searchTask = useCallback((text) => {
    setQuery(text);
    dispatch(searchTasks(currentUser.id, text))
      .then((res) => {
        setSearchedTask(res);
      })
      .catch((err) => {
        console.log(err);
      });
  },[]);

  const onEdit = (task) => {
    setEdit(task.id);
    setName(task.name);
    handleShow();
  };

  // Event to get selected rows(Optional)

  return (
    <Container>
      {tasks.length > 0 ? (
        <>
          <ThreeCards tasks={tasks} />
          <Row className="mt-5">
            <Col md={8} sm={8} className='text-left'>
              <h4>Tasks</h4>
            </Col>
            <Col md={2} sm={2}>
              <input
                placeholder="search by task name"
                className="form-control"
                onChange={(e) => searchTask(e.target.value)}
              />
            </Col>
            <Col md={2} sm={2}>
              <Button variant="primary" onClick={handleShow}>
                New Task
              </Button>
            </Col>
          </Row>
          <div className="mt-2">
            <div className="col-md-12">
              <TaskTable
                tasks={query !== "" ? searchedTask : tasks}
                onEdit={onEdit}
                deleteT={deleteT}
                onItemCheck={onItemCheck}
              />
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

      <TaskModal
        show={show}
        edit={edit}
        submit={submit}
        update={update}
        setName={setName}
        name={name}
        handleClose={handleClose}
      />
    </Container>
  );
};

export default Dashboard;
