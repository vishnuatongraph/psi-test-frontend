import React from "react";
import { Table } from "react-bootstrap";

const TaskTable = ({ tasks, onItemCheck, onEdit, deleteT }) => {
  return (
    <>
    <Table>
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
            <td className='column-width'>{task.name}</td>
            <td>
              <button
                type="button"
                className="btn btn-success"
                onClick={() => onEdit(task)}
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
    </Table>
    {!tasks.length && <h4>No data found</h4>}
    </>
  );
};

export default TaskTable;
