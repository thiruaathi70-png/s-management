import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import {
  MdEdit, MdDelete, MdEmail, MdPhone,
  MdSchool, MdCake, MdBusiness, MdArrowBack,
  MdPerson
} from 'react-icons/md';
import studentApi from '../api/studentApi';
import './StudentDetails.css';

/**
 * StudentDetails Page — Shows a complete profile card for one student.
 *
 * Fetches:
 *   GET /api/students/{id}
 *
 * Actions available:
 *   - Edit student (navigate to edit form)
 *   - Delete student (with confirm dialog)
 */
function StudentDetails() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  // ==================== State ====================
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleting, setDeleting] = useState(false);

  // Notification message passed from edit page via router state
  const successMessage = location.state?.message;

  // ==================== Fetch Student ====================
  useEffect(() => {
    const fetchStudent = async () => {
      setLoading(true);
      try {
        const response = await studentApi.getStudentById(id);
        setStudent(response.data);
      } catch (err) {
        setError(err.message || 'Student not found.');
      } finally {
        setLoading(false);
      }
    };

    fetchStudent();
  }, [id]);

  // ==================== Delete Handler ====================
  const handleDelete = async () => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${student.fullName}"?\n\nThis action cannot be undone.`
    );
    if (!confirmed) return;

    setDeleting(true);
    try {
      await studentApi.deleteStudent(id);
      navigate('/students', { state: { message: `"${student.fullName}" deleted successfully.` } });
    } catch (err) {
      setError(err.message);
      setDeleting(false);
    }
  };

  // ==================== Helper: Format Date ====================
  const formatDate = (dateValue) => {
    if (!dateValue) return 'N/A';
    // Handle array format [year, month, day] from some Java LocalDate serializations
    if (Array.isArray(dateValue)) {
      const [y, m, d] = dateValue;
      return new Date(y, m - 1, d).toLocaleDateString('en-IN', {
        year: 'numeric', month: 'long', day: 'numeric',
      });
    }
    return new Date(dateValue).toLocaleDateString('en-IN', {
      year: 'numeric', month: 'long', day: 'numeric',
    });
  };

  const formatDateTime = (dt) => {
    if (!dt) return 'N/A';
    if (Array.isArray(dt)) {
      const [y, mo, d, h, mi] = dt;
      return new Date(y, mo - 1, d, h, mi).toLocaleString('en-IN');
    }
    return new Date(dt).toLocaleString('en-IN');
  };

  // ==================== Loading State ====================
  if (loading) {
    return (
      <div className="student-details-page">
        <div className="details-loading">
          <div className="spinner" />
          <p>Loading student details...</p>
        </div>
      </div>
    );
  }

  // ==================== Error State ====================
  if (error) {
    return (
      <div className="student-details-page">
        <div className="alert alert-danger">{error}</div>
        <button className="btn btn-secondary" onClick={() => navigate('/students')}>
          <MdArrowBack size={18} /> Back to Students
        </button>
      </div>
    );
  }

  // ==================== Render ====================
  return (
    <div className="student-details-page fade-in">

      {/* ===== Success Message ===== */}
      {successMessage && (
        <div className="alert alert-success">{successMessage}</div>
      )}

      {/* ===== Profile Hero Card ===== */}
      <div className="details-hero-card">
        {/* Avatar */}
        <div className="details-avatar">
          {student.fullName.charAt(0).toUpperCase()}
        </div>

        {/* Name + Badges */}
        <div className="details-hero-info">
          <h2 className="details-name">{student.fullName}</h2>
          <div className="details-badges">
            <span className="badge badge-info">{student.department}</span>
            <span className="badge badge-success">{student.course}</span>
            <span className="badge badge-warning">ID #{student.id}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="details-hero-actions">
          <button
            className="btn btn-secondary"
            onClick={() => navigate(`/students/edit/${student.id}`)}
          >
            <MdEdit size={18} /> Edit
          </button>
          <button
            className="btn btn-danger"
            onClick={handleDelete}
            disabled={deleting}
          >
            {deleting ? (
              <><div className="mini-spinner" /> Deleting...</>
            ) : (
              <><MdDelete size={18} /> Delete</>
            )}
          </button>
        </div>
      </div>

      {/* ===== Details Grid ===== */}
      <div className="details-grid">

        {/* Personal Information */}
        <div className="details-section-card">
          <div className="details-section-header">
            <MdPerson size={20} />
            <h3>Personal Information</h3>
          </div>
          <div className="details-fields">
            <div className="details-field">
              <div className="details-field-icon"><MdEmail size={18} /></div>
              <div>
                <p className="details-field-label">Email Address</p>
                <p className="details-field-value">{student.email}</p>
              </div>
            </div>

            <div className="details-field">
              <div className="details-field-icon"><MdPhone size={18} /></div>
              <div>
                <p className="details-field-label">Phone Number</p>
                <p className="details-field-value">{student.phoneNumber}</p>
              </div>
            </div>

            <div className="details-field">
              <div className="details-field-icon"><MdCake size={18} /></div>
              <div>
                <p className="details-field-label">Date of Birth</p>
                <p className="details-field-value">{formatDate(student.dateOfBirth)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Academic Information */}
        <div className="details-section-card">
          <div className="details-section-header">
            <MdSchool size={20} />
            <h3>Academic Information</h3>
          </div>
          <div className="details-fields">
            <div className="details-field">
              <div className="details-field-icon"><MdBusiness size={18} /></div>
              <div>
                <p className="details-field-label">Department</p>
                <p className="details-field-value">{student.department}</p>
              </div>
            </div>

            <div className="details-field">
              <div className="details-field-icon"><MdSchool size={18} /></div>
              <div>
                <p className="details-field-label">Course</p>
                <p className="details-field-value">{student.course}</p>
              </div>
            </div>

            <div className="details-field">
              <div className="details-field-icon"><MdPerson size={18} /></div>
              <div>
                <p className="details-field-label">Student ID</p>
                <p className="details-field-value">STU-{String(student.id).padStart(4, '0')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===== Record Timestamps ===== */}
      <div className="details-timestamps">
        <div className="timestamp-item">
          <p className="timestamp-label">Record Created</p>
          <p className="timestamp-value">{formatDateTime(student.createdAt)}</p>
        </div>
        <div className="timestamp-item">
          <p className="timestamp-label">Last Updated</p>
          <p className="timestamp-value">{formatDateTime(student.updatedAt)}</p>
        </div>
      </div>
    </div>
  );
}

export default StudentDetails;
