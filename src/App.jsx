import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import TaskList from "./pages/TaskList";
import AddTask from "./pages/AddTask";
import UpdateTask from "./pages/UpdateTask";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";

const App = () => {
  const isAuthenticated = useSelector((state) => !!state.user.currentUser);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />

        <Route
          path="/"
          element={<ProtectedRoute Component={Dashboard} />}
        />
        <Route
          path="/tasklist"
          element={<ProtectedRoute Component={TaskList} />}
        />
        <Route
          path="/addtask"
          element={<ProtectedRoute Component={AddTask} />}
        />
        <Route
          path="/updatetask/:id"
          element={<ProtectedRoute Component={UpdateTask} />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
