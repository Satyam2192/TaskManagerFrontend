import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const TaskForm = ({ taskId, initialTaskData = {}, onSubmit }) => {
  const [task, setTask] = useState({
    title: "",
    priority: "",
    status: "pending",
    startTime: "",
    endTime: "",
    ...initialTaskData, // If editing, fill in initial task data
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (taskId) {
      // Fetch the existing task if updating
      fetch(`https://task-management-a4os.onrender.com/api/tasks/${taskId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
        .then((res) => res.json())
        .then((data) => setTask(data))
        .catch((error) => console.error("Error fetching task:", error));
    }
  }, [taskId]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate fields
    if (!task.title || !task.priority || !task.startTime || !task.endTime) {
      alert("All fields are required!");
      return;
    }

    onSubmit(task)
      .then(() => navigate("/tasklist"))
      .catch((error) => console.error("Error submitting task:", error));
  };

  return (
    <div className="bg-white max-w-md mx-auto p-4 shadow-lg rounded-lg">
      <h1 className="text-lg font-bold mb-4">{taskId ? "Update Task" : "Add Task"}</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Title</label>
          <input
            type="text"
            className="border p-2 w-full"
            value={task.title}
            onChange={(e) => setTask({ ...task, title: e.target.value })}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Priority</label>
          <select
            className="border p-2 w-full"
            value={task.priority}
            onChange={(e) => setTask({ ...task, priority: e.target.value })}
          >
            <option value="1">1 - Low</option>
            <option value="2">2 - Medium</option>
            <option value="3">3 - High</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Status</label>
          <select
            className="border p-2 w-full"
            value={task.status}
            onChange={(e) => setTask({ ...task, status: e.target.value })}
          >
            <option value="pending">Pending</option>
            <option value="finished">Finished</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Start Time</label>
          <input
            type="datetime-local"
            className="border p-2 w-full"
            value={task.startTime}
            onChange={(e) => setTask({ ...task, startTime: e.target.value })}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">End Time</label>
          <input
            type="datetime-local"
            className="border p-2 w-full"
            value={task.endTime}
            onChange={(e) => setTask({ ...task, endTime: e.target.value })}
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-lg">
          {taskId ? "Update Task" : "Add Task"}
        </button>
      </form>
    </div>
  );
};

export default TaskForm;
