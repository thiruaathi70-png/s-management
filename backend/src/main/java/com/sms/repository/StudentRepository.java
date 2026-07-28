package com.sms.repository;

import com.sms.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Repository interface for Student entity.
 *
 * Spring Data JPA automatically provides implementations for:
 *   - findAll()       : get all students
 *   - findById(id)    : get student by ID
 *   - save(student)   : create or update student
 *   - deleteById(id)  : delete student by ID
 *   - existsById(id)  : check if student exists
 *
 * We only need to define custom query methods below.
 */
@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {

    /**
     * Check if a student with the given email already exists.
     * Used to prevent duplicate emails during registration.
     *
     * @param email - student email to check
     * @return true if email exists, false otherwise
     */
    boolean existsByEmail(String email);

    /**
     * Check if email exists, but exclude the student with given ID.
     * Used during update to allow keeping the same email.
     *
     * @param email - email to check
     * @param id    - student ID to exclude from the check
     * @return true if another student has this email
     */
    boolean existsByEmailAndIdNot(String email, Long id);

    /**
     * Find a student by their email address.
     *
     * @param email - email to search
     * @return Optional containing student if found
     */
    Optional<Student> findByEmail(String email);

    /**
     * Search students by name, email, department, or course.
     * Case-insensitive search using LIKE operator.
     *
     * @param keyword - search keyword
     * @return list of matching students
     */
    @Query("SELECT s FROM Student s WHERE " +
           "LOWER(s.fullName) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(s.email) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(s.department) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(s.course) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<Student> searchStudents(@Param("keyword") String keyword);

    /**
     * Find all students belonging to a specific department.
     *
     * @param department - department name
     * @return list of students in that department
     */
    List<Student> findByDepartmentIgnoreCase(String department);

    /**
     * Count total students per department.
     * Returns a list of Object[] where [0] = department, [1] = count.
     *
     * @return department-wise student count
     */
    @Query("SELECT s.department, COUNT(s) FROM Student s GROUP BY s.department")
    List<Object[]> countStudentsByDepartment();
}
