package com.sms.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDate;
import java.time.LocalDateTime;

/**
 * Entity class representing a Student record in the database.
 * Mapped to the 'students' table using JPA/Hibernate.
 *
 * Lombok annotations used:
 *   @Data        - generates getters, setters, toString, equals, hashCode
 *   @NoArgsConstructor - generates no-argument constructor
 *   @AllArgsConstructor - generates constructor with all fields
 *   @Builder     - enables builder pattern for object creation
 */
@Entity
@Table(name = "students")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Student {

    // ==================== Primary Key ====================

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Auto-increment ID
    private Long id;

    // ==================== Student Fields ====================

    @NotBlank(message = "Full name is required")
    @Size(min = 2, max = 100, message = "Name must be between 2 and 100 characters")
    @Column(name = "full_name", nullable = false, length = 100)
    private String fullName;

    @NotBlank(message = "Email is required")
    @Email(message = "Please provide a valid email address")
    @Column(name = "email", nullable = false, unique = true, length = 150)
    private String email;

    @NotBlank(message = "Phone number is required")
    @Pattern(regexp = "^[0-9]{10}$", message = "Phone number must be exactly 10 digits")
    @Column(name = "phone_number", nullable = false, length = 15)
    private String phoneNumber;

    @NotBlank(message = "Department is required")
    @Column(name = "department", nullable = false, length = 100)
    private String department;

    @NotBlank(message = "Course is required")
    @Column(name = "course", nullable = false, length = 100)
    private String course;

    @NotNull(message = "Date of birth is required")
    @Column(name = "date_of_birth", nullable = false)
    private LocalDate dateOfBirth;

    // ==================== Audit Fields ====================

    @CreationTimestamp // Automatically set when record is created
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp // Automatically updated when record is modified
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
}
