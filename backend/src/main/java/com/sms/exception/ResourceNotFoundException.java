package com.sms.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * Custom exception thrown when a requested resource (e.g., Student) is not found.
 *
 * @ResponseStatus(HttpStatus.NOT_FOUND) ensures that when this exception is thrown,
 * Spring automatically returns HTTP 404 Not Found status.
 *
 * Usage:
 *   throw new ResourceNotFoundException("Student", "id", 1L);
 *   → Message: "Student not found with id : '1'"
 */
@ResponseStatus(value = HttpStatus.NOT_FOUND)
public class ResourceNotFoundException extends RuntimeException {

    private static final long serialVersionUID = 1L;

    private final String resourceName; // e.g., "Student"
    private final String fieldName;    // e.g., "id"
    private final Object fieldValue;   // e.g., 42

    /**
     * Constructor to create a meaningful error message.
     *
     * @param resourceName - type of resource (e.g., "Student")
     * @param fieldName    - field used to look up (e.g., "id")
     * @param fieldValue   - value that was searched (e.g., 42)
     */
    public ResourceNotFoundException(String resourceName, String fieldName, Object fieldValue) {
        super(String.format("%s not found with %s : '%s'", resourceName, fieldName, fieldValue));
        this.resourceName = resourceName;
        this.fieldName = fieldName;
        this.fieldValue = fieldValue;
    }

    public String getResourceName() { return resourceName; }
    public String getFieldName()    { return fieldName; }
    public Object getFieldValue()   { return fieldValue; }
}
