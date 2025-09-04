package com.waystay.backend.payload.response;

public class JwtResponse {
    private String token;
    private String type = "Bearer";
    private Long id;
    private String email;
    private String name;

    public JwtResponse(String accessToken, Long id, String email, String name) {
        this.token = accessToken;
        this.id = id;
        this.email = email;
        this.name = name;
    }

    // getters
    public String getToken() { return token; }
    public String getType() { return type; }
    public Long getId() { return id; }
    public String getEmail() { return email; }
    public String getName() { return name; }
}
