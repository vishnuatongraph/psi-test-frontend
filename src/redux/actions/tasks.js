import { ADD_TASK, UPDATE_TASK, DELETE_TASK, GET_TASKS, SEARCH_TASKS } from "./types";

import TaskService from "../services/task.service";

export const createTask = (data) => async (dispatch) => {
  try {
    const res = await TaskService.create(data);
    dispatch({
      type: ADD_TASK,
      payload: res.data,
    });
    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const deleteTask = (id) => async (dispatch) => {
  try {
    const res = await TaskService.delete(id);
    dispatch({
      type: DELETE_TASK,
      payload: id,
    });
    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const updateTask = (data, id) => async (dispatch) => {
  try {
    const res = await TaskService.update(data, id);
    dispatch({
      type: UPDATE_TASK,
      payload: res.data,
    });
    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const getTasks = (id) => async (dispatch) => {
  try {
    const res = await TaskService.getAll(id);
    dispatch({
      type: GET_TASKS,
      payload: res.data,
    });
    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const searchTasks = (id, query) => async (dispatch) => {
  try {
    const res = await TaskService.search(id, query);
    dispatch({
      type: SEARCH_TASKS,
      payload: res.data,
    });
    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};
