import React, { useEffect, useState } from "react";

const Dashboard = () => {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch("api/tasks/statistics", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setSummary(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError("Failed to load data. Please try again later.");
        setLoading(false);
      });
  }, []);

  // Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full border-purple-600 border-t-transparent"></div>
        <p className="ml-4 text-gray-600">Loading...</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-red-500 text-center">
          <p>{error}</p>
          <button
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={() => window.location.reload()}
          >
            Reload
          </button>
        </div>
      </div>
    );
  }

  // No data available state
  if (!summary) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-600">No data available.</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Dashboard Title */}
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>

        {/* Summary Section */}
        <div>
          <h2 className="text-lg font-medium text-gray-800">Summary</h2>
          <div className="grid grid-cols-4 gap-6 mt-4">
            <DashboardCard title="Total tasks" value={summary.totalTasks} />
            <DashboardCard
              title="Tasks completed"
              value={`${summary.completedPercentage.toFixed(0)}%`}
            />
            <DashboardCard
              title="Tasks pending"
              value={`${summary.pendingPercentage.toFixed(0)}%`}
            />
            <DashboardCard
              title="Average time per completed task"
              value={`${summary.averageCompletionTime.toFixed(1)} hrs`}
            />
          </div>
        </div>

        {/* Pending Task Summary Section */}
        <div className="mt-10">
          <h2 className="text-lg font-medium text-gray-800">
            Pending task summary
          </h2>
          <div className="grid grid-cols-3 gap-6 mt-4">
            <DashboardCard
              title="Pending tasks"
              value={summary.pendingTasks || 0}
            />
            <DashboardCard
              title="Total time lapsed"
              value={`${summary.timeElapsed || 0} hrs`}
            />
            <DashboardCard
              title="Total time to finish"
              value={`${summary.balanceEstimate || 0} hrs`}
              subtitle="Estimated based on end time"
            />
          </div>
        </div>

        {/* Task Priority Table */}
        <div className="mt-10">
          <h2 className="text-lg font-medium text-gray-800">
            Task Priority Breakdown
          </h2>
          <table className="w-full border-collapse border border-gray-300 mt-4">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-800">
                  Task Priority
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-800">
                  Pending Tasks
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-800">
                  Time Lapsed (hrs)
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-800">
                  Time to Finish (hrs)
                </th>
              </tr>
            </thead>
            <tbody>
              {summary.priorityBreakdown?.length > 0 ? (
                summary.priorityBreakdown.map((item, index) => (
                  <tr key={index} className="bg-white hover:bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2">
                      {item.priority}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {item.pendingTasks}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {item.timeLapsed}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {item.timeToFinish}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="border border-gray-300 px-4 py-2 text-center text-gray-500"
                  >
                    No priority breakdown available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// DashboardCard Component
const DashboardCard = ({ title, value, subtitle }) => (
  <div className="bg-white shadow-md rounded-lg p-6">
    <p className="text-purple-600 text-3xl font-bold">
      {value !== undefined ? value : "N/A"}
    </p>
    <p className="text-gray-600 text-sm">{title}</p>
    {subtitle && <p className="text-gray-400 text-xs italic mt-1">{subtitle}</p>}
  </div>
);

export default Dashboard;
