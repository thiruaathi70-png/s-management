import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MdPeople, MdPersonAdd, MdSchool, MdTrendingUp,
  MdArrowForward, MdRefresh
} from 'react-icons/md';
import studentApi from '../api/studentApi';
import './Dashboard.css';

/**
 * Dashboard Page — Shows overview statistics and recent activity.
 *
 * Fetches:
 *   1. Dashboard stats  → GET /api/students/stats
 *   2. All students     → GET /api/students (for recent records)
 */
function Dashboard() {
  const navigate = useNavigate();

  // ==================== State ====================
  const [stats, setStats] = useState(null);
  const [recentStudents, setRecentStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // ==================== Fetch Data on Mount ====================
  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    setError('');
    try {
      // Fetch stats and all students concurrently
      const [statsRes, studentsRes] = await Promise.all([
        studentApi.getDashboardStats(),
        studentApi.getAllStudents(),
      ]);
      setStats(statsRes.data);
      // Show only the 5 most recently added students
      setRecentStudents(studentsRes.data.slice(-5).reverse());
    } catch (err) {
      setError('Could not connect to the backend. Please ensure the Spring Boot server is running.');
    } finally {
      setLoading(false);
    }
  };

  // ==================== Loading State ====================
  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="spinner" />
        <p>Loading dashboard...</p>
      </div>
    );
  }

  // ==================== Stats Cards Data ====================
  const statCards = [
    {
      title: 'Total Students',
      value: stats?.totalStudents ?? 0,
      icon: <MdPeople size={28} />,
      color: 'indigo',
      description: 'Enrolled students',
    },
    {
      title: 'Departments',
      value: stats?.totalDepartments ?? 0,
      icon: <MdSchool size={28} />,
      color: 'emerald',
      description: 'Active departments',
    },
    {
      title: 'Recent Additions',
      value: recentStudents.length,
      icon: <MdPersonAdd size={28} />,
      color: 'amber',
      description: 'Last 5 entries',
    },
    {
      title: 'Engagement',
      value: '100%',
      icon: <MdTrendingUp size={28} />,
      color: 'rose',
      description: 'System uptime',
    },
  ];

  // ==================== Render ====================
  return (
    <div className="dashboard fade-in">

      {/* ===== Page Header ===== */}
      <div className="dashboard-header">
        <div>
          <h2 className="dashboard-greeting">Welcome back, Admin! 👋</h2>
          <p className="dashboard-subtitle">
            Here's an overview of the Student Management System.
          </p>
        </div>
        <button className="btn btn-secondary" onClick={fetchDashboardData}>
          <MdRefresh size={18} />
          Refresh
        </button>
      </div>

      {/* ===== Error Alert ===== */}
      {error && (
        <div className="alert alert-danger">{error}</div>
      )}

      {/* ===== Stats Cards ===== */}
      <div className="dashboard-stats-grid">
        {statCards.map((card) => (
          <div key={card.title} className={`stat-card stat-card--${card.color}`}>
            <div className="stat-card-icon">{card.icon}</div>
            <div className="stat-card-body">
              <p className="stat-card-label">{card.title}</p>
              <p className="stat-card-value">{card.value}</p>
              <p className="stat-card-desc">{card.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ===== Bottom Grid: Department Breakdown + Recent Students ===== */}
      <div className="dashboard-bottom-grid">

        {/* Department Breakdown */}
        <div className="dashboard-card">
          <div className="dashboard-card-header">
            <h3>Students by Department</h3>
          </div>
          <div className="dashboard-card-body">
            {stats?.studentsByDepartment &&
            Object.keys(stats.studentsByDepartment).length > 0 ? (
              Object.entries(stats.studentsByDepartment).map(([dept, count]) => (
                <div key={dept} className="dept-row">
                  <span className="dept-name">{dept}</span>
                  <div className="dept-bar-wrap">
                    <div
                      className="dept-bar"
                      style={{
                        width: `${(count / (stats.totalStudents || 1)) * 100}%`,
                      }}
                    />
                  </div>
                  <span className="dept-count">{count}</span>
                </div>
              ))
            ) : (
              <p className="dashboard-empty">No department data yet.</p>
            )}
          </div>
        </div>

        {/* Recent Students */}
        <div className="dashboard-card">
          <div className="dashboard-card-header">
            <h3>Recently Added</h3>
            <button
              className="btn btn-primary btn-sm"
              onClick={() => navigate('/students')}
            >
              View All <MdArrowForward size={16} />
            </button>
          </div>
          <div className="dashboard-card-body">
            {recentStudents.length > 0 ? (
              <div className="recent-list">
                {recentStudents.map((student) => (
                  <div
                    key={student.id}
                    className="recent-item"
                    onClick={() => navigate(`/students/${student.id}`)}
                  >
                    <div className="recent-avatar">
                      {student.fullName.charAt(0).toUpperCase()}
                    </div>
                    <div className="recent-info">
                      <p className="recent-name">{student.fullName}</p>
                      <p className="recent-dept">{student.department} • {student.course}</p>
                    </div>
                    <MdArrowForward size={16} className="recent-arrow" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="dashboard-empty-state">
                <MdPeople size={48} />
                <p>No students added yet.</p>
                <button className="btn btn-primary" onClick={() => navigate('/students/add')}>
                  <MdPersonAdd size={18} /> Add First Student
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
