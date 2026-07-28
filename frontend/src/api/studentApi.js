/**
 * studentApi.js — Centralized API service using Axios
 *
 * All communication with the Spring Boot backend goes through this file.
 * This keeps API calls consistent and easy to maintain.
 *
 * Base URL: http://localhost:8080/api/students
 */

import axios from 'axios';

// ==================== Axios Instance Configuration ====================

const API_BASE_URL = 'http://localhost:8080/api/students';

// Create an axios instance with default configuration
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json', // Always send JSON
  },
  timeout: 10000, // 10 second timeout
});

// ==================== Request Interceptor ====================
// Runs before every request — useful for adding auth tokens, logging, etc.
apiClient.interceptors.request.use(
  (config) => {
    // console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => Promise.reject(error)
);

// ==================== Response Interceptor ====================
// Runs after every response — handles global error formatting
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Extract a user-friendly error message
    const message =
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.message ||
      'An unexpected error occurred. Please try again.';

    // Re-throw with a cleaner message
    return Promise.reject(new Error(message));
  }
);

// ==================== API Methods ====================

const studentApi = {

  /**
   * GET /api/students
   * Fetch all students
   */
  getAllStudents: () => apiClient.get('/'),

  /**
   * GET /api/students/{id}
   * Fetch a single student by ID
   */
  getStudentById: (id) => apiClient.get(`/${id}`),

  /**
   * POST /api/students
   * Create a new student
   * @param {Object} studentData - student form data
   */
  createStudent: (studentData) => apiClient.post('/', studentData),

  /**
   * PUT /api/students/{id}
   * Update an existing student
   * @param {number} id - student ID
   * @param {Object} studentData - updated form data
   */
  updateStudent: (id, studentData) => apiClient.put(`/${id}`, studentData),

  /**
   * DELETE /api/students/{id}
   * Delete a student by ID
   */
  deleteStudent: (id) => apiClient.delete(`/${id}`),

  /**
   * GET /api/students/search?q=keyword
   * Search students by keyword
   */
  searchStudents: (keyword) => apiClient.get(`/search?q=${encodeURIComponent(keyword)}`),

  /**
   * GET /api/students/stats
   * Get dashboard statistics
   */
  getDashboardStats: () => apiClient.get('/stats'),
};

export default studentApi;
