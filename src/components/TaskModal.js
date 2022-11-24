import React, {useState} from "react";
import { Button, Modal, Spinner } from "react-bootstrap";

const TaskModal = ({show, handleClose, edit, name, setName, update, submit, loader}) => {

    return (
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{edit ? "Update" : "+ New"} Task</Modal.Title>
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
          <Button variant="primary" onClick={!edit ? submit : update} disabled={loader}>
            {loader ? <Spinner animation="border" role="status" />
          :   edit ? "Update Task" : "New Task"
          }
          </Button>
        </Modal.Footer>
      </Modal>
    )
}

export default TaskModal