import React from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchTasks } from "../redux/slices/taskSlice";
import TaskForm from "../components/TaskForm";

const UpdateTask = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const handleUpdateTask = (taskData) => {
    const formattedTaskData = {
      ...taskData,
      startTime: new Date(taskData.startTime).toISOString().slice(0, 16),
      endTime: new Date(taskData.endTime).toISOString().slice(0, 16),
    };
    return fetch(`/api/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(formattedTaskData),
    }).then((response) => {
      if (response.ok) {
        dispatch(fetchTasks());
        alert("Task updated successfully!");
      } else {
        return response.json().then((err) => alert(err.message));
      }
    });
  };

  return <TaskForm taskId={id} onSubmit={handleUpdateTask} />;
};

export default UpdateTask;
