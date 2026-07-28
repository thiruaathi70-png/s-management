package com.sms;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Main entry point for the Student Management System application.
 *
 * @SpringBootApplication enables:
 *   - @Configuration  : marks this class as a source of bean definitions
 *   - @EnableAutoConfiguration : auto-configures Spring beans based on classpath
 *   - @ComponentScan  : scans all sub-packages for components
 */
@SpringBootApplication
public class StudentManagementApplication {

    public static void main(String[] args) {
        SpringApplication.run(StudentManagementApplication.class, args);
        System.out.println("=====================================================");
        System.out.println("  Student Management System is running!");
        System.out.println("  Backend URL : http://localhost:8080");
        System.out.println("  API Base    : http://localhost:8080/api/students");
        System.out.println("=====================================================");
    }
}
