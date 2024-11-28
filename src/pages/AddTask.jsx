import React from "react";
import { useDispatch } from "react-redux";
import { fetchTasks } from "../redux/slices/taskSlice";
import TaskForm from "../components/TaskForm";

const AddTask = () => {
  const dispatch = useDispatch();

  const handleAddTask = (taskData) => {
    const formattedTaskData = {
      ...taskData,
      startTime: new Date(taskData.startTime).toISOString().slice(0, 16),
      endTime: new Date(taskData.endTime).toISOString().slice(0, 16),
    };
  
    return fetch("/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(formattedTaskData),
    }).then((response) => {
      if (response.ok) {
        dispatch(fetchTasks());
        alert("Task created successfully!");
      } else {
        return response.json().then((err) => alert(err.message));
      }
    });
  };
  
  

  return <TaskForm onSubmit={handleAddTask} />;
};

export default AddTask;
