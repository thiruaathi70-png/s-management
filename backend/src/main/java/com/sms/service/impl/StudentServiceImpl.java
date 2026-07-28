package com.sms.service.impl;

import com.sms.dto.StudentDTO;
import com.sms.entity.Student;
import com.sms.exception.ResourceNotFoundException;
import com.sms.repository.StudentRepository;
import com.sms.service.StudentService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * Implementation of StudentService — contains the actual business logic.
 *
 * @Service marks this as a Spring service component
 * @Transactional ensures database operations are wrapped in transactions
 * @RequiredArgsConstructor (Lombok) generates constructor-based dependency injection
 * @Slf4j (Lombok) provides a Logger instance named 'log'
 */
@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class StudentServiceImpl implements StudentService {

    // ==================== Dependency Injection ====================

    // Spring automatically injects the StudentRepository implementation
    private final StudentRepository studentRepository;

    // ==================== GET ALL ====================

    @Override
    @Transactional(readOnly = true)
    public List<StudentDTO> getAllStudents() {
        log.debug("Fetching all students from database");

        List<Student> students = studentRepository.findAll();
        log.info("Found {} students", students.size());

        // Convert each Student entity to StudentDTO
        return students.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    // ==================== GET BY ID ====================

    @Override
    @Transactional(readOnly = true)
    public StudentDTO getStudentById(Long id) {
        log.debug("Fetching student with id: {}", id);

        // findById returns Optional — use orElseThrow to handle missing record
        Student student = studentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Student", "id", id));

        log.info("Found student: {}", student.getFullName());
        return convertToDTO(student);
    }

    // ==================== CREATE ====================

    @Override
    public StudentDTO createStudent(StudentDTO studentDTO) {
        log.debug("Creating new student with email: {}", studentDTO.getEmail());

        // Business rule: no duplicate email addresses
        if (studentRepository.existsByEmail(studentDTO.getEmail())) {
            throw new IllegalArgumentException(
                    "A student with email '" + studentDTO.getEmail() + "' already exists.");
        }

        // Convert DTO to Entity and save to database
        Student student = convertToEntity(studentDTO);
        Student savedStudent = studentRepository.save(student);

        log.info("Created student with id: {}", savedStudent.getId());
        return convertToDTO(savedStudent);
    }

    // ==================== UPDATE ====================

    @Override
    public StudentDTO updateStudent(Long id, StudentDTO studentDTO) {
        log.debug("Updating student with id: {}", id);

        // Check if student exists
        Student existingStudent = studentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Student", "id", id));

        // Business rule: email must be unique (but allow keeping own email)
        if (studentRepository.existsByEmailAndIdNot(studentDTO.getEmail(), id)) {
            throw new IllegalArgumentException(
                    "Email '" + studentDTO.getEmail() + "' is already used by another student.");
        }

        // Update all fields
        existingStudent.setFullName(studentDTO.getFullName());
        existingStudent.setEmail(studentDTO.getEmail());
        existingStudent.setPhoneNumber(studentDTO.getPhoneNumber());
        existingStudent.setDepartment(studentDTO.getDepartment());
        existingStudent.setCourse(studentDTO.getCourse());
        existingStudent.setDateOfBirth(studentDTO.getDateOfBirth());

        // Save returns the updated entity
        Student updatedStudent = studentRepository.save(existingStudent);

        log.info("Updated student with id: {}", updatedStudent.getId());
        return convertToDTO(updatedStudent);
    }

    // ==================== DELETE ====================

    @Override
    public void deleteStudent(Long id) {
        log.debug("Deleting student with id: {}", id);

        // Verify student exists before deleting
        Student student = studentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Student", "id", id));

        studentRepository.delete(student);
        log.info("Deleted student with id: {}", id);
    }

    // ==================== SEARCH ====================

    @Override
    @Transactional(readOnly = true)
    public List<StudentDTO> searchStudents(String keyword) {
        log.debug("Searching students with keyword: {}", keyword);

        List<Student> students = studentRepository.searchStudents(keyword);
        log.info("Found {} students matching keyword: {}", students.size(), keyword);

        return students.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    // ==================== DASHBOARD STATS ====================

    @Override
    @Transactional(readOnly = true)
    public Map<String, Object> getDashboardStats() {
        log.debug("Generating dashboard statistics");

        Map<String, Object> stats = new HashMap<>();

        // Total student count
        long totalStudents = studentRepository.count();
        stats.put("totalStudents", totalStudents);

        // Department-wise breakdown
        List<Object[]> departmentCounts = studentRepository.countStudentsByDepartment();
        Map<String, Long> byDepartment = new HashMap<>();
        for (Object[] row : departmentCounts) {
            byDepartment.put((String) row[0], (Long) row[1]);
        }
        stats.put("studentsByDepartment", byDepartment);
        stats.put("totalDepartments", byDepartment.size());

        log.info("Dashboard stats generated: {} total students, {} departments",
                totalStudents, byDepartment.size());
        return stats;
    }

    // ==================== Helper Methods ====================

    /**
     * Converts a Student entity to StudentDTO (for API response).
     */
    private StudentDTO convertToDTO(Student student) {
        return StudentDTO.builder()
                .id(student.getId())
                .fullName(student.getFullName())
                .email(student.getEmail())
                .phoneNumber(student.getPhoneNumber())
                .department(student.getDepartment())
                .course(student.getCourse())
                .dateOfBirth(student.getDateOfBirth())
                .createdAt(student.getCreatedAt())
                .updatedAt(student.getUpdatedAt())
                .build();
    }

    /**
     * Converts a StudentDTO to Student entity (for database save).
     * Note: ID, createdAt, updatedAt are not set here — JPA handles them.
     */
    private Student convertToEntity(StudentDTO dto) {
        return Student.builder()
                .fullName(dto.getFullName())
                .email(dto.getEmail())
                .phoneNumber(dto.getPhoneNumber())
                .department(dto.getDepartment())
                .course(dto.getCourse())
                .dateOfBirth(dto.getDateOfBirth())
                .build();
    }
}
