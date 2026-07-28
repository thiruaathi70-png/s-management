import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MdPersonAdd, MdSearch, MdEdit, MdDelete,
  MdVisibility, MdRefresh, MdPeople
} from 'react-icons/md';
import studentApi from '../api/studentApi';
import './StudentList.css';

/**
 * StudentList Page — Displays all students in a searchable table.
 *
 * Features:
 *   - Fetch all students from backend
 *   - Live client-side search/filter
 *   - View, Edit, Delete actions per row
 *   - Confirm before delete
 *   - Empty state if no students
 */
function StudentList() {
  const navigate = useNavigate();

  // ==================== State ====================
  const [students, setStudents] = useState([]);       // All students from API
  const [filtered, setFiltered] = useState([]);       // Filtered list for display
  const [searchQuery, setSearchQuery] = useState(''); // Search input value
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [deletingId, setDeletingId] = useState(null); // ID being deleted

  // ==================== Fetch Students ====================
  useEffect(() => {
    fetchStudents();
  }, []);

  // Filter students whenever search query or student list changes
  useEffect(() => {
    const query = searchQuery.toLowerCase();
    if (!query) {
      setFiltered(students);
    } else {
      setFiltered(
        students.filter(
          (s) =>
            s.fullName.toLowerCase().includes(query) ||
            s.email.toLowerCase().includes(query) ||
            s.department.toLowerCase().includes(query) ||
            s.course.toLowerCase().includes(query) ||
            String(s.id).includes(query)
        )
      );
    }
  }, [searchQuery, students]);

  const fetchStudents = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await studentApi.getAllStudents();
      setStudents(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ==================== Delete Handler ====================
  const handleDelete = async (id, name) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${name}"?\n\nThis action cannot be undone.`
    );
    if (!confirmed) return;

    setDeletingId(id);
    try {
      await studentApi.deleteStudent(id);
      // Remove from local state without re-fetching
      setStudents((prev) => prev.filter((s) => s.id !== id));
      setSuccessMsg(`Student "${name}" deleted successfully.`);
      setTimeout(() => setSuccessMsg(''), 4000);
    } catch (err) {
      setError(err.message);
    } finally {
      setDeletingId(null);
    }
  };

  // ==================== Render ====================
  return (
    <div className="student-list-page fade-in">

      {/* ===== Page Header ===== */}
      <div className="student-list-header">
        <div>
          <p className="student-list-count">
            {filtered.length} student{filtered.length !== 1 ? 's' : ''} found
          </p>
        </div>
        <div className="student-list-actions">
          <button className="btn btn-secondary" onClick={fetchStudents}>
            <MdRefresh size={18} /> Refresh
          </button>
          <button className="btn btn-primary" onClick={() => navigate('/students/add')}>
            <MdPersonAdd size={18} /> Add Student
          </button>
        </div>
      </div>

      {/* ===== Alerts ===== */}
      {error && <div className="alert alert-danger">{error}</div>}
      {successMsg && <div className="alert alert-success">{successMsg}</div>}

      {/* ===== Search Bar ===== */}
      <div className="student-list-search">
        <MdSearch size={20} className="search-icon" />
        <input
          type="text"
          className="search-input"
          placeholder="Search by name, email, department, or course..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {searchQuery && (
          <button
            className="search-clear"
            onClick={() => setSearchQuery('')}
            title="Clear search"
          >
            ✕
          </button>
        )}
      </div>

      {/* ===== Loading State ===== */}
      {loading ? (
        <div className="student-list-loading">
          <div className="spinner" />
          <p>Loading students...</p>
        </div>
      ) : filtered.length === 0 ? (
        /* ===== Empty State ===== */
        <div className="student-list-empty">
          <MdPeople size={64} />
          <h3>{searchQuery ? 'No results found' : 'No students yet'}</h3>
          <p>
            {searchQuery
              ? `No students match "${searchQuery}". Try a different keyword.`
              : 'Get started by adding your first student.'}
          </p>
          {!searchQuery && (
            <button className="btn btn-primary" onClick={() => navigate('/students/add')}>
              <MdPersonAdd size={18} /> Add First Student
            </button>
          )}
        </div>
      ) : (
        /* ===== Students Table ===== */
        <div className="student-table-wrap">
          <table className="student-table">
            <thead>
              <tr>
                <th>#ID</th>
                <th>Student</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Department</th>
                <th>Course</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((student) => (
                <tr key={student.id} className="student-table-row">
                  {/* ID */}
                  <td>
                    <span className="student-id-badge">#{student.id}</span>
                  </td>

                  {/* Name + Avatar */}
                  <td>
                    <div className="student-name-cell">
                      <div className="student-avatar">
                        {student.fullName.charAt(0).toUpperCase()}
                      </div>
                      <span className="student-name">{student.fullName}</span>
                    </div>
                  </td>

                  {/* Email */}
                  <td>
                    <span className="student-email">{student.email}</span>
                  </td>

                  {/* Phone */}
                  <td>
                    <span className="student-phone">{student.phoneNumber}</span>
                  </td>

                  {/* Department */}
                  <td>
                    <span className="badge badge-info">{student.department}</span>
                  </td>

                  {/* Course */}
                  <td>
                    <span className="student-course">{student.course}</span>
                  </td>

                  {/* Action Buttons */}
                  <td>
                    <div className="student-actions">
                      {/* View Details */}
                      <button
                        className="action-btn action-btn--view"
                        onClick={() => navigate(`/students/${student.id}`)}
                        title="View Details"
                      >
                        <MdVisibility size={17} />
                      </button>

                      {/* Edit */}
                      <button
                        className="action-btn action-btn--edit"
                        onClick={() => navigate(`/students/edit/${student.id}`)}
                        title="Edit Student"
                      >
                        <MdEdit size={17} />
                      </button>

                      {/* Delete */}
                      <button
                        className="action-btn action-btn--delete"
                        onClick={() => handleDelete(student.id, student.fullName)}
                        title="Delete Student"
                        disabled={deletingId === student.id}
                      >
                        {deletingId === student.id ? (
                          <div className="mini-spinner" />
                        ) : (
                          <MdDelete size={17} />
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default StudentList;
