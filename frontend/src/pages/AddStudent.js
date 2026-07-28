import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdPersonAdd, MdSave, MdClose } from 'react-icons/md';
import studentApi from '../api/studentApi';
import './FormStyles.css';

// ==================== Constants ====================

/** Available departments for the dropdown */
const DEPARTMENTS = [
  'Computer Science',
  'Information Technology',
  'Electronics & Communication',
  'Mechanical Engineering',
  'Civil Engineering',
  'Electrical Engineering',
  'Business Administration',
  'Mathematics',
  'Physics',
  'Chemistry',
];

/** Courses for the dropdown */
const COURSES = [
  'B.E.',
  'B.Tech',
  'M.E.',
  'M.Tech',
  'B.Sc',
  'M.Sc',
  'BBA',
  'MBA',
  'B.Com',
  'M.Com',
  'B.A.',
  'M.A.',
];

// ==================== Initial Form State ====================
const initialForm = {
  fullName: '',
  email: '',
  phoneNumber: '',
  department: '',
  course: '',
  dateOfBirth: '',
};

/**
 * AddStudent Page — Form to add a new student.
 *
 * Features:
 *   - Controlled form inputs with React state
 *   - Client-side validation (before API call)
 *   - Submits to POST /api/students
 *   - Shows success and error feedback
 */
function AddStudent() {
  const navigate = useNavigate();

  // ==================== State ====================
  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState({});     // Validation error messages
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');

  // ==================== Input Change Handler ====================
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear field error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  // ==================== Validation ====================
  const validate = () => {
    const newErrors = {};

    if (!formData.fullName.trim())
      newErrors.fullName = 'Full name is required.';
    else if (formData.fullName.trim().length < 2)
      newErrors.fullName = 'Name must be at least 2 characters.';

    if (!formData.email.trim())
      newErrors.email = 'Email is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = 'Please enter a valid email address.';

    if (!formData.phoneNumber.trim())
      newErrors.phoneNumber = 'Phone number is required.';
    else if (!/^[0-9]{10}$/.test(formData.phoneNumber))
      newErrors.phoneNumber = 'Phone must be exactly 10 digits.';

    if (!formData.department)
      newErrors.department = 'Please select a department.';

    if (!formData.course)
      newErrors.course = 'Please select a course.';

    if (!formData.dateOfBirth)
      newErrors.dateOfBirth = 'Date of birth is required.';
    else {
      const dob = new Date(formData.dateOfBirth);
      const today = new Date();
      if (dob >= today) newErrors.dateOfBirth = 'Date of birth must be in the past.';
    }

    return newErrors;
  };

  // ==================== Submit Handler ====================
  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError('');

    // Run client-side validation first
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    try {
      await studentApi.createStudent(formData);
      // Success — navigate back to student list
      navigate('/students', { state: { message: 'Student added successfully!' } });
    } catch (err) {
      setApiError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ==================== Render ====================
  return (
    <div className="form-page fade-in">
      <div className="form-card">

        {/* ===== Card Header ===== */}
        <div className="form-card-header">
          <div className="form-card-header-icon">
            <MdPersonAdd size={24} />
          </div>
          <div>
            <h2>Add New Student</h2>
            <p>Fill in the details below to enroll a new student.</p>
          </div>
        </div>

        {/* ===== Card Body ===== */}
        <div className="form-card-body">

          {/* API Error */}
          {apiError && <div className="alert alert-danger">{apiError}</div>}

          {/* Form */}
          <form className="student-form" onSubmit={handleSubmit} noValidate>

            {/* Row 1: Full Name + Email */}
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label" htmlFor="fullName">
                  Full Name <span className="form-label-required">*</span>
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  className={`form-input ${errors.fullName ? 'input-error' : ''}`}
                  placeholder="e.g. Arjun Kumar"
                  value={formData.fullName}
                  onChange={handleChange}
                />
                {errors.fullName && <span className="form-error">{errors.fullName}</span>}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="email">
                  Email Address <span className="form-label-required">*</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className={`form-input ${errors.email ? 'input-error' : ''}`}
                  placeholder="e.g. arjun@example.com"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && <span className="form-error">{errors.email}</span>}
              </div>
            </div>

            {/* Row 2: Phone + Date of Birth */}
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label" htmlFor="phoneNumber">
                  Phone Number <span className="form-label-required">*</span>
                </label>
                <input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="tel"
                  className={`form-input ${errors.phoneNumber ? 'input-error' : ''}`}
                  placeholder="10-digit number"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  maxLength={10}
                />
                {errors.phoneNumber && <span className="form-error">{errors.phoneNumber}</span>}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="dateOfBirth">
                  Date of Birth <span className="form-label-required">*</span>
                </label>
                <input
                  id="dateOfBirth"
                  name="dateOfBirth"
                  type="date"
                  className={`form-input ${errors.dateOfBirth ? 'input-error' : ''}`}
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  max={new Date().toISOString().split('T')[0]}
                />
                {errors.dateOfBirth && <span className="form-error">{errors.dateOfBirth}</span>}
              </div>
            </div>

            {/* Row 3: Department + Course */}
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label" htmlFor="department">
                  Department <span className="form-label-required">*</span>
                </label>
                <select
                  id="department"
                  name="department"
                  className={`form-select ${errors.department ? 'input-error' : ''}`}
                  value={formData.department}
                  onChange={handleChange}
                >
                  <option value="">-- Select Department --</option>
                  {DEPARTMENTS.map((dept) => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
                {errors.department && <span className="form-error">{errors.department}</span>}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="course">
                  Course <span className="form-label-required">*</span>
                </label>
                <select
                  id="course"
                  name="course"
                  className={`form-select ${errors.course ? 'input-error' : ''}`}
                  value={formData.course}
                  onChange={handleChange}
                >
                  <option value="">-- Select Course --</option>
                  {COURSES.map((course) => (
                    <option key={course} value={course}>{course}</option>
                  ))}
                </select>
                {errors.course && <span className="form-error">{errors.course}</span>}
              </div>
            </div>

            {/* Form Actions */}
            <div className="form-actions">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => navigate('/students')}
                disabled={loading}
              >
                <MdClose size={18} /> Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <div className="mini-spinner" />
                    Saving...
                  </>
                ) : (
                  <>
                    <MdSave size={18} /> Save Student
                  </>
                )}
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}

export default AddStudent;
