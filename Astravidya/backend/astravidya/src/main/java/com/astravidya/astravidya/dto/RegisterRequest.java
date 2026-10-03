package com.astravidya.astravidya.dto;

public class RegisterRequest {
    private String name;
    private String username;
    private String password;
    private String className;
//    private String role;
    private String learnIn;

    public String getName(){
        return name;
    }
    public void setName(String name){
        this.name=name;
    }
    public String getUsername(){
        return username;
    }

    public void setUsername(String username){
        this.username=username;
    }
    public String getPassword(){
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getClassName() {
        return className;
    }



    public void setClassName(String className) {
        this.className = className;
    }
   /* public String getRole(){
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }*/
    public String getLearnIn(){
        return learnIn;
    }

    public void setLearnIn(String learnIn) {
        this.learnIn = learnIn;
    }
}
