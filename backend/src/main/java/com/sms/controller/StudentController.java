package com.sms.controller;

import com.sms.dto.StudentDTO;
import com.sms.service.StudentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

/**
 * REST Controller — handles all HTTP requests for Student operations.
 *
 * @RestController = @Controller + @ResponseBody (auto JSON serialization)
 * @RequestMapping defines the base URL for all endpoints in this class
 * @CrossOrigin allows the React frontend (port 3000) to call this backend (port 8080)
 * @RequiredArgsConstructor (Lombok) injects StudentService via constructor
 * @Slf4j (Lombok) provides logging
 */
@RestController
@RequestMapping("/api/students")
@CrossOrigin(origins = "http://localhost:3000") // Allow React frontend
@RequiredArgsConstructor
@Slf4j
public class StudentController {

    // StudentService is injected by Spring (via constructor injection)
    private final StudentService studentService;

    // ==================== GET ALL STUDENTS ====================

    /**
     * GET /api/students
     * Returns a list of all students.
     * HTTP 200 OK on success.
     */
    @GetMapping
    public ResponseEntity<List<StudentDTO>> getAllStudents() {
        log.info("GET /api/students - Fetching all students");
        List<StudentDTO> students = studentService.getAllStudents();
        return ResponseEntity.ok(students); // 200 OK
    }

    // ==================== GET STUDENT BY ID ====================

    /**
     * GET /api/students/{id}
     * Returns a single student by ID.
     * HTTP 200 OK on success, 404 Not Found if not exists.
     */
    @GetMapping("/{id}")
    public ResponseEntity<StudentDTO> getStudentById(@PathVariable Long id) {
        log.info("GET /api/students/{} - Fetching student", id);
        StudentDTO student = studentService.getStudentById(id);
        return ResponseEntity.ok(student); // 200 OK
    }

    // ==================== CREATE STUDENT ====================

    /**
     * POST /api/students
     * Creates a new student from the request body.
     * @Valid triggers bean validation (checks @NotBlank, @Email, etc.)
     * HTTP 201 Created on success, 400 Bad Request on validation failure.
     */
    @PostMapping
    public ResponseEntity<StudentDTO> createStudent(@Valid @RequestBody StudentDTO studentDTO) {
        log.info("POST /api/students - Creating new student: {}", studentDTO.getEmail());
        StudentDTO createdStudent = studentService.createStudent(studentDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdStudent); // 201 Created
    }

    // ==================== UPDATE STUDENT ====================

    /**
     * PUT /api/students/{id}
     * Updates an existing student's information.
     * HTTP 200 OK on success, 404 Not Found if not exists.
     */
    @PutMapping("/{id}")
    public ResponseEntity<StudentDTO> updateStudent(
            @PathVariable Long id,
            @Valid @RequestBody StudentDTO studentDTO) {

        log.info("PUT /api/students/{} - Updating student", id);
        StudentDTO updatedStudent = studentService.updateStudent(id, studentDTO);
        return ResponseEntity.ok(updatedStudent); // 200 OK
    }

    // ==================== DELETE STUDENT ====================

    /**
     * DELETE /api/students/{id}
     * Deletes a student by ID.
     * HTTP 200 OK with confirmation message, 404 Not Found if not exists.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> deleteStudent(@PathVariable Long id) {
        log.info("DELETE /api/students/{} - Deleting student", id);
        studentService.deleteStudent(id);

        // Return a success message in JSON format
        return ResponseEntity.ok(Map.of(
                "message", "Student with id " + id + " deleted successfully."
        ));
    }

    // ==================== SEARCH STUDENTS ====================

    /**
     * GET /api/students/search?q=keyword
     * Searches students by name, email, department, or course.
     * HTTP 200 OK with matching results.
     */
    @GetMapping("/search")
    public ResponseEntity<List<StudentDTO>> searchStudents(
            @RequestParam(name = "q", defaultValue = "") String keyword) {

        log.info("GET /api/students/search?q={} - Searching students", keyword);
        List<StudentDTO> results = studentService.searchStudents(keyword);
        return ResponseEntity.ok(results);
    }

    // ==================== DASHBOARD STATISTICS ====================

    /**
     * GET /api/students/stats
     * Returns dashboard statistics: total count, departments, etc.
     * HTTP 200 OK with stats map.
     */
    @GetMapping("/stats")
    public ResponseEntity<Map<String, Object>> getDashboardStats() {
        log.info("GET /api/students/stats - Fetching dashboard stats");
        Map<String, Object> stats = studentService.getDashboardStats();
        return ResponseEntity.ok(stats);
    }
}
