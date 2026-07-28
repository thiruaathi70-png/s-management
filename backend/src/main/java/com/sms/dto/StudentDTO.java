package com.sms.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

/**
 * Data Transfer Object (DTO) for Student.
 *
 * Why use DTO?
 *  - Decouples the API layer from the database entity
 *  - Allows selective exposure of fields to the client
 *  - Prevents over-posting attacks (mass assignment vulnerabilities)
 *
 * Used in:
 *  - Request body  : POST /api/students  (add student)
 *  - Request body  : PUT  /api/students/{id}  (update student)
 *  - Response body : All API responses return StudentDTO, not Student entity
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StudentDTO {

    // ID is null on create, populated on response
    private Long id;

    @NotBlank(message = "Full name is required")
    @Size(min = 2, max = 100, message = "Name must be between 2 and 100 characters")
    private String fullName;

    @NotBlank(message = "Email is required")
    @Email(message = "Please provide a valid email address")
    private String email;

    @NotBlank(message = "Phone number is required")
    @Pattern(regexp = "^[0-9]{10}$", message = "Phone number must be exactly 10 digits")
    private String phoneNumber;

    @NotBlank(message = "Department is required")
    private String department;

    @NotBlank(message = "Course is required")
    private String course;

    @NotNull(message = "Date of birth is required")
    @JsonFormat(pattern = "yyyy-MM-dd") // Ensure consistent date format in JSON
    private LocalDate dateOfBirth;

    // Audit timestamps (read-only, set by server)
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime createdAt;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime updatedAt;
}
