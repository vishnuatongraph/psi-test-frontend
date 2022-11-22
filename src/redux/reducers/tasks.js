import {
  ADD_TASK,
  UPDATE_TASK,
  DELETE_TASK,
  GET_TASKS,
  SEARCH_TASKS,
} from "../actions/types";

const initialState = {
  tasks: [],
  searchedTask: []
};

function userReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case ADD_TASK:
      let oldTasks = [...state.tasks];
      oldTasks.push(payload);
      return {
        ...state,
        tasks: oldTasks,
      };

    case UPDATE_TASK:
      let newTasks = [...state.tasks];
      const i = newTasks.findIndex((x) => x.id === payload.id);
      if (i !== -1) {
        newTasks[i] = payload;
      }
      return {
        ...state,
        tasks: newTasks,
      };

    case SEARCH_TASKS:
      let allTasks=[]
      let searchTasks = []
      let tasks = [...state.tasks];
      let newT = tasks.filter((x) => {
        return x.name.match(payload)
      });
      console.log(newT, "newT")
      if (!payload || payload === '') {
        allTasks = tasks
        searchTasks = []
      }
      else if (!newT.length) {
        allTasks = tasks
        searchTasks = []
      } else if (Array.isArray(newT)) {
        searchTasks = newT
        allTasks = tasks
      }
      return {
        ...state,
        searchedTask: searchTasks,
        tasks: allTasks
      };

    case DELETE_TASK:
      let task = [...state.tasks];
      const index = task.findIndex((x) => x.id === payload);
      if (index !== -1) {
        task.splice(index, 1);
      }
      return {
        ...state,
        tasks: task,
      };

    case GET_TASKS:
      return {
        ...state,
        tasks: payload,
      };

    default:
      return state;
  }
}

export default userReducer;
