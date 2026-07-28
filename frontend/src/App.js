import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

// Layout Components
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';

// Page Components
import Dashboard from './pages/Dashboard';
import StudentList from './pages/StudentList';
import AddStudent from './pages/AddStudent';
import EditStudent from './pages/EditStudent';
import StudentDetails from './pages/StudentDetails';

/**
 * App.js — Root component that sets up:
 *   - React Router for client-side navigation
 *   - Overall page layout (Sidebar + Main Content)
 *   - Route definitions for each page
 */
function App() {
  return (
    <Router>
      {/* Main Layout Container */}
      <div className="app-layout">

        {/* Left Sidebar — always visible */}
        <Sidebar />

        {/* Right Content Area */}
        <div className="app-content">
          {/* Top Navbar */}
          <Navbar />

          {/* Page Content — rendered based on current route */}
          <main className="app-main">
            <Routes>
              {/* Default route → redirect to dashboard */}
              <Route path="/" element={<Navigate to="/dashboard" replace />} />

              {/* Dashboard */}
              <Route path="/dashboard" element={<Dashboard />} />

              {/* Student List */}
              <Route path="/students" element={<StudentList />} />

              {/* Add New Student */}
              <Route path="/students/add" element={<AddStudent />} />

              {/* Edit Existing Student */}
              <Route path="/students/edit/:id" element={<EditStudent />} />

              {/* Student Details */}
              <Route path="/students/:id" element={<StudentDetails />} />

              {/* 404 Fallback */}
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
