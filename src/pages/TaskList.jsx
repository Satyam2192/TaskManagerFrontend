import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks, deleteTask } from "../redux/slices/taskSlice";
import { useNavigate } from "react-router-dom";

const TaskList = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks?.items || []); // Safeguard with default empty array
  const taskStatus = useSelector((state) => state.tasks?.status || "idle");
  const error = useSelector((state) => state.tasks?.error || null);
  const [priorityFilter, setPriorityFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [sortOption, setSortOption] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (taskStatus === "idle") {
      dispatch(fetchTasks());
    }
  }, [dispatch, taskStatus]);

  const handleDelete = (taskId) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      dispatch(deleteTask(taskId)).then(() => {
        dispatch(fetchTasks()); 
      });
    }
  };

  const filteredTasks = tasks
    .filter(
      (task) =>
        (priorityFilter ? task.priority === Number(priorityFilter) : true) &&
        (statusFilter ? task.status === statusFilter : true)
    )
    .sort((a, b) => {
      if (sortOption === "startTime") {
        return new Date(a.startTime) - new Date(b.startTime);
      } else if (sortOption === "endTime") {
        return new Date(a.endTime) - new Date(b.endTime);
      }
      return 0;
    });

  return (
    <div className="p-4">
      <h1 className="text-lg font-bold mb-4">Task List</h1>

      {error && <p className="text-red-500 mb-4">Error: {error}. Please check the console for details.</p>}

      <div className="flex justify-between mb-4">
        <div>
          <select
            className="border p-2 mr-2"
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
          >
            <option value="">All Priorities</option>
            <option value="1">1 - Low</option>
            <option value="2">2 - Medium</option>
            <option value="3">3 - High</option>
          </select>

          <select
            className="border p-2 mr-2"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="finished">Finished</option>
          </select>

          <select
            className="border p-2"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="">Sort By</option>
            <option value="startTime">Start Time</option>
            <option value="endTime">End Time</option>
          </select>
        </div>

        <button
          className="bg-blue-500 text-white py-2 px-4 rounded-lg"
          onClick={() => navigate("/addtask")}
        >
          Add Task
        </button>
      </div>

      {filteredTasks.length === 0 ? (
        <p>No tasks available.</p>
      ) : (
        <table className="min-w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2">Title</th>
              <th className="border border-gray-300 px-4 py-2">Priority</th>
              <th className="border border-gray-300 px-4 py-2">Status</th>
              <th className="border border-gray-300 px-4 py-2">Start Time</th>
              <th className="border border-gray-300 px-4 py-2">End Time</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTasks.map((task) => (
              <tr key={task._id} className="bg-white border-b hover:bg-gray-100">
                <td className="border border-gray-300 px-4 py-2">{task.title}</td>
                <td className="border border-gray-300 px-4 py-2">{task.priority}</td>
                <td className="border border-gray-300 px-4 py-2">{task.status}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {new Date(task.startTime).toLocaleString()}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {task.status === "finished"
                    ? new Date(task.endTime).toLocaleString()
                    : "Estimated"}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    className="text-blue-500 mr-4"
                    onClick={() => navigate(`/updatetask/${task._id}`)}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-500"
                    onClick={() => handleDelete(task._id)} // Use `_id` here
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TaskList;
