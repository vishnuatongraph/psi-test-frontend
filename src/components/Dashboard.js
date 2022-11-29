import React, { useEffect, useState, useCallback } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import {
  createTask,
  deleteTask,
  getTasks,
  searchTasks,
  updateTask,
} from "../redux/actions/tasks";
import ThreeCards from "./ThreeCards";
import TaskModal from "./TaskModal";
import { Col, Container, Row } from "react-bootstrap";
import TaskTable from "./TaskTable";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {CREATED, UPDATED,TASK_VALIDATION, DELETED} from '../constant'


const Dashboard = () => {
  const dispatch = useDispatch();
  const { tasks } = useSelector((state) => state.tasks);
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [edit, setEdit] = useState(null);
  const [searchedTask, setSearchedTask] = useState([]);
  const [query, setQuery] = useState("");
  const [loader, setLoader] = useState(false)
  const [checkLoader, setcheckLoader] = useState(false)


  const handleClose = () => {
    setName("");
    setShow(false);
  };
  
  const handleShow = () => setShow(true);

  useEffect(() => {
    dispatch(getTasks(currentUser?.id, currentUser?.api_token))
      .then((res) => {})
      .catch((err) => {
        toast.error(err.response.data.errors[0].message);
      });
  }, []);

  const submit = () => {
    if (name === "") {
      return toast.warn(TASK_VALIDATION);
    }
    setLoader(true)
    dispatch(createTask({ name, user_id: currentUser.id }))
      .then((res) => {
        toast.success(CREATED);
        handleClose();
        setLoader(false)
      })
      .catch((err) => {
        setLoader(false)
        toast.error(err.response.data.errors[0].message);
      });
  };

  const update = () => {
    if (name === "") {
      return toast.warn(TASK_VALIDATION);
    }
    setLoader(true)
    dispatch(updateTask({ name }, edit))
      .then((res) => {
        toast.success(UPDATED);
        if(query !== '') {
          let newTasks = [...searchedTask];
          const i = newTasks.findIndex((x) => x.id === edit);
          if (i !== -1) {
            newTasks[i] = res;
            setSearchedTask(newTasks)
          }
        }
        setLoader(false)
        setEdit(null);
        handleClose();
      })
      .catch((err) => {
        setLoader(false)
        toast.error(err.response.data.errors[0].message);
      });
  };

  const deleteT = (id) => {
    dispatch(deleteTask(id))
      .then((res) => {
        toast.success(DELETED);
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
        toast.error(err.response.data.errors[0].message);
      });
  };

  // Update List Item's state and Master Checkbox State
  const onItemCheck = (e, id) => {
    setcheckLoader(true)
    dispatch(updateTask({ completed: e.target.checked }, id))
      .then((res) => {
        toast.success(UPDATED);
        if(query !== '') {
          let newTasks = [...searchedTask];
          const i = newTasks.findIndex((x) => x.id === id);
          if (i !== -1) {
            newTasks[i] = res;
            setSearchedTask(newTasks)
          }
        }
        setcheckLoader(false)
      })
      .catch((err) => {
        setcheckLoader(false)
        toast.error(err.response.data.errors[0].message);
      });
  };

  const searchTask = useCallback((text) => {
    setQuery(text);
    dispatch(searchTasks(currentUser.id, text))
      .then((res) => {
        setSearchedTask(res);
      })
      .catch((err) => {
        toast.error(err.response.data.errors[0].message);
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
                loader={checkLoader}
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
        loader={loader}
      />
      <ToastContainer theme="colored" position="bottom-right" />

    </Container>
  );
};

export default Dashboard;
