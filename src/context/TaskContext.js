import { createContext, useEffect, useReducer, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export const TaskContext = createContext({
  tasks: [],
  addTask: () => {},
  deleteTask: () => {},
  toggleTask: () => {},
  filter: "All",
  setFilter: () => {},
});

const taskReducer = (state, action) => {
  switch (action.type) {
    case "set_tasks":
      return action.payload;

    case "add_task":
      return [
        ...state,
        { id: uuidv4(), task_name: action.payload, isCompleted: false },
      ];

    case "delete_task":
      return state.filter((task) => task.id !== action.payload);

    case "complete_task":
      return state.map((task) =>
        task.id === action.payload
          ? { ...task, isCompleted: !task.isCompleted }
          : task
      );

    default:
      return state;
  }
};

function TaskContextProvider({ children }) {
  const [tasks, dispatch] = useReducer(taskReducer, [], () => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [filter, setFilter] = useState("All");


  useEffect(() => {
    console.log("task initial");
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (taskName) => {
    dispatch({ type: "add_task", payload: taskName });
  };

  const deleteTask = (taskId) => {
    dispatch({ type: "delete_task", payload: taskId });
  };

  const toggleTask = (taskId) => {
    dispatch({ type: "complete_task", payload: taskId });
  };

  const filteredTasksLists = tasks.filter((task) => {
    if (filter === "All") return true;
    if (filter === "Active") return !task.isCompleted;
    if (filter === "Completed") return task.isCompleted;
  });

  return (
    <TaskContext.Provider
      value={{
        tasks: filteredTasksLists,
        addTask,
        deleteTask,
        toggleTask,
        filter,
        setFilter,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export default TaskContextProvider;
