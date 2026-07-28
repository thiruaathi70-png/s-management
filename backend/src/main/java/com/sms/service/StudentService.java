package com.sms.service;

import com.sms.dto.StudentDTO;

import java.util.List;
import java.util.Map;

/**
 * Service interface defining the business operations for Student management.
 *
 * This interface acts as a contract between the Controller layer
 * and the Service implementation. It promotes:
 *   - Loose coupling  (Controller doesn't know about implementation details)
 *   - Testability     (easy to mock in unit tests)
 *   - Clean code      (single responsibility principle)
 */
public interface StudentService {

    /**
     * Retrieve all students from the database.
     * @return list of all StudentDTOs
     */
    List<StudentDTO> getAllStudents();

    /**
     * Find a single student by their ID.
     * @param id - student ID
     * @return StudentDTO if found
     * @throws com.sms.exception.ResourceNotFoundException if not found
     */
    StudentDTO getStudentById(Long id);

    /**
     * Create a new student record.
     * @param studentDTO - student data from request body
     * @return created StudentDTO with generated ID
     */
    StudentDTO createStudent(StudentDTO studentDTO);

    /**
     * Update an existing student's information.
     * @param id         - ID of student to update
     * @param studentDTO - new student data
     * @return updated StudentDTO
     * @throws com.sms.exception.ResourceNotFoundException if not found
     */
    StudentDTO updateStudent(Long id, StudentDTO studentDTO);

    /**
     * Delete a student by ID.
     * @param id - ID of student to delete
     * @throws com.sms.exception.ResourceNotFoundException if not found
     */
    void deleteStudent(Long id);

    /**
     * Search students by keyword across multiple fields.
     * @param keyword - search term
     * @return list of matching StudentDTOs
     */
    List<StudentDTO> searchStudents(String keyword);

    /**
     * Get dashboard statistics (total count, department breakdown, etc.)
     * @return Map of statistic key → value
     */
    Map<String, Object> getDashboardStats();
}
