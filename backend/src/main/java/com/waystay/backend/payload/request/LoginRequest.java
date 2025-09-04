package com.waystay.backend.payload.request;

import jakarta.validation.constraints.*;

public class LoginRequest {
    @NotBlank @Email
    private String email;

    @NotBlank
    private String password;

    // getters and setters
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
}
