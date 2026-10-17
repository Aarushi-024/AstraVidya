package com.astravidya.astravidya.dto;

public class CreateUserRequest {

    private String name;
    private String username;
    private String initialPassword;
    private String role;
    private String className;
    private String learnIn;

    public CreateUserRequest() {
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getInitialPassword() {
        return initialPassword;
    }

    public void setInitialPassword(String initialPassword) {
        this.initialPassword = initialPassword;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getClassName() {
        return className;
    }

    public void setClassName(String className) {
        this.className = className;
    }

    public String getLearnIn() {
        return learnIn;
    }

    public void setLearnIn(String learnIn) {
        this.learnIn = learnIn;
    }
}