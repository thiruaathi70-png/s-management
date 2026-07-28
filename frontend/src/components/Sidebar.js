import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  MdDashboard,
  MdPeople,
  MdPersonAdd,
  MdSchool
} from 'react-icons/md';
import './Sidebar.css';

/**
 * Sidebar component — Left navigation panel.
 *
 * Uses React Router's NavLink for automatic "active" class
 * when the current route matches the link's path.
 */
function Sidebar() {

  // Navigation menu items definition
  const navItems = [
    {
      path: '/dashboard',
      icon: <MdDashboard size={20} />,
      label: 'Dashboard',
    },
    {
      path: '/students',
      icon: <MdPeople size={20} />,
      label: 'All Students',
    },
    {
      path: '/students/add',
      icon: <MdPersonAdd size={20} />,
      label: 'Add Student',
    },
  ];

  return (
    <aside className="sidebar">
      {/* ===== Logo / Brand ===== */}
      <div className="sidebar-brand">
        <div className="sidebar-brand-icon">
          <MdSchool size={28} />
        </div>
        <div className="sidebar-brand-text">
          <span className="sidebar-brand-name">SMS</span>
          <span className="sidebar-brand-sub">Management System</span>
        </div>
      </div>

      {/* ===== Divider ===== */}
      <div className="sidebar-divider" />

      {/* ===== Navigation Menu ===== */}
      <nav className="sidebar-nav">
        <p className="sidebar-nav-label">MAIN MENU</p>
        <ul className="sidebar-nav-list">
          {navItems.map((item) => (
            <li key={item.path} className="sidebar-nav-item">
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  isActive ? 'sidebar-nav-link active' : 'sidebar-nav-link'
                }
              >
                <span className="sidebar-nav-icon">{item.icon}</span>
                <span className="sidebar-nav-text">{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* ===== Footer Info ===== */}
      <div className="sidebar-footer">
        <div className="sidebar-footer-card">
          <p className="sidebar-footer-title">Student Management</p>
          <p className="sidebar-footer-sub">Spring Boot + React</p>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
