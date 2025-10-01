// src/App.jsx
import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";

import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import Dashboard from "./pages/Dashboard";
import Accounts from "./pages/Accounts";
import Loans from "./pages/Loans";
import Reports from "./pages/Reports";
import Login from "./pages/Login";
import Members from "./pages/Members";
import AddMember from './pages/AddMember.jsx'
import Transaction from "./pages/Transaction";
import ApprovalWorkflow from "./pages/ApprovalLoan";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [credentials, setCredentials] = useState(null);
  useEffect(() => {
    const stored = localStorage.getItem("members");
    if (!stored || stored === "[]") {
      fetch("/public/Member.json") 
        .then((res) => res.json())
        .then((data) => {
          localStorage.setItem("members", JSON.stringify(data));
          console.log("Members loaded into localStorage:", data);
        })
        .catch((err) => console.error("Error loading Member.json:", err));
    }
  }, []);
  const handleLogin = (creds) => {
    setCredentials(creds);
    setIsLoggedIn(true);
  };

  return (
    <>
      <CssBaseline />
      <Routes>
        {/* Login Page */}
        <Route path="/login" element={<Login onLogin={handleLogin} />} />

        {/* Protected Routes */}
        <Route
          path="/*"
          element={
            isLoggedIn ? (
              <Box sx={{ display: "flex", minHeight: "100vh" }}>
                <Sidebar />
                <Box component="main" sx={{ flexGrow: 1 }}>
                  <Topbar onLogout={() => setIsLoggedIn(false)} />
                  <Box sx={{ p: 3 }}>
                    <Routes>
                      <Route path="/" element={<Dashboard />} />
                      <Route path="/accounts" element={<Accounts />} />
                      <Route path="/loans" element={<Loans />} />
                      <Route path="/reports" element={<Reports />} />
                      <Route path="/members" element={<Members />} />
                      <Route path="/addmember" element={<AddMember />} />
                      <Route path="/transaction" element={<Transaction />} />
                      <Route path="/approvalloan" element={<ApprovalWorkflow />}></Route>
                      <Route path="*" element={<Navigate to="/" />} />
                    </Routes>
                  </Box>
                </Box>
              </Box>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </>
  );
}
