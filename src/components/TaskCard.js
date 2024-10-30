import React, { useContext, useState } from "react";
import "./TaskCard.css";
import { toast } from "react-toastify";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import TaskItem from "./TaskItem";
import { TaskContext } from "../context/TaskContext";

const optionsLists = [
  { value: "All", label: "All", id: "#1" },
  { value: "Active", label: "Active", id: "#2" },
  { value: "Completed", label: "Completed", id: "#3" },
];

function TaskCard() {
  const [inputTask, setInputTask] = useState("");
  const tasksCtx = useContext(TaskContext);

  const handleTask = (e) => {
    e.preventDefault();
    if (inputTask.trim() === "") {
      toast.error("Please enter a task");
      return;
    }
    tasksCtx.addTask(inputTask);
    setInputTask("");
    toast.success("Task added successfully");
  };

  return (
    <div className="main_app">
      <div className="main_top_section">
        <input
          type="text"
          placeholder="Enter Task"
          className="input_field"
          value={inputTask}
          onChange={(e) => setInputTask(e.target.value)}
        />
        <div className="sm_btn" onClick={handleTask}>
          <svg
            width={32}
            height={32}
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12 5v14" />
            <path d="M5 12h14" />
          </svg>
        </div>
      </div>

      <div className="main_middle_section">
        <p>Tasks to do - {tasksCtx.tasks.length}</p>
        <select
          className="select_field"
          onChange={(e) => tasksCtx.setFilter(e.target.value)}
          value={tasksCtx.filter}
        >
          {optionsLists.map((option) => (
            <option key={option.id} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

        <TransitionGroup component="ul" className="task-list main_lists_item">
          {/* <ul className="main_lists_item"> */}
          {
            // eslint-disable-next-line
            tasksCtx.tasks.length === 0 ? (
              <div className="no_task">
                <p className="none_message">No Task Available</p>
              </div>
            ) : (
              tasksCtx.tasks.map((task) => {
                return (
                  <CSSTransition key={task.id} timeout={300} classNames="task">
                    <TaskItem key={task.id} task={task} />
                  </CSSTransition>
                );
              })
            )
          }
          {/* </ul> */}
        </TransitionGroup>
    </div>
  );
}

export default TaskCard;
