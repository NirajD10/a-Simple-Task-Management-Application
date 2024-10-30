import React, { useContext } from "react";
import "./TaskItem.css";
import { TaskContext } from "../context/TaskContext";

function TaskItem({ task }) {
  const tasksCtx = useContext(TaskContext);

  return (
    <li className="item">
      <div className="item_title_action">
        <input
          type="checkbox"
          className="item_checkbox"
          onChange={(e) => tasksCtx.toggleTask(task.id)}
          checked={task.isCompleted}
        />
        <p
          style={{
            textDecoration: task.isCompleted ? "line-through" : "none",
            color: task.isCompleted ? "#9e78cf" : "#ffff",
          }}
        >
          {task.task_name}
        </p>
      </div>
      <div className="item_action">
        <button
          className="item_delete_btn"
          onClick={() => tasksCtx.deleteTask(task.id)}
        >
          <svg
            width={24}
            height={24}
            fill="none"
            stroke="#9e78cf"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M3 6h18" />
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
          </svg>
        </button>
      </div>
    </li>
  );
}

export default TaskItem;
