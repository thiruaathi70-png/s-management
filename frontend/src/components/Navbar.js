import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { MdArrowBack, MdNotifications, MdSearch } from 'react-icons/md';
import './Navbar.css';

/**
 * Navbar component — Top horizontal navigation bar.
 *
 * Dynamically shows:
 *   - Current page title based on the active route
 *   - Back button on sub-pages (detail, add, edit)
 *   - Notification icon and user avatar
 */
function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  // Map routes to page titles
  const getPageTitle = (pathname) => {
    if (pathname === '/dashboard') return 'Dashboard';
    if (pathname === '/students') return 'All Students';
    if (pathname === '/students/add') return 'Add New Student';
    if (pathname.startsWith('/students/edit')) return 'Edit Student';
    if (pathname.match(/^\/students\/\d+$/)) return 'Student Details';
    return 'Student Management System';
  };

  // Show back button only on sub-pages
  const showBackButton = location.pathname !== '/dashboard' &&
    location.pathname !== '/students';

  return (
    <header className="navbar">
      {/* ===== Left: Page Title ===== */}
      <div className="navbar-left">
        {showBackButton && (
          <button
            className="navbar-back-btn"
            onClick={() => navigate(-1)}
            title="Go back"
          >
            <MdArrowBack size={20} />
          </button>
        )}
        <h1 className="navbar-title">{getPageTitle(location.pathname)}</h1>
      </div>

      {/* ===== Right: Actions ===== */}
      <div className="navbar-right">
        {/* Notification Bell */}
        <button className="navbar-icon-btn" title="Notifications">
          <MdNotifications size={22} />
          <span className="navbar-badge">3</span>
        </button>

        {/* User Avatar */}
        <div className="navbar-avatar" title="Admin User">
          <span>A</span>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
