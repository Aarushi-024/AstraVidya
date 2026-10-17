package com.astravidya.astravidya.entity;
import jakarta.persistence.*;
import java.time.LocalDateTime;

    @Entity
    @Table(
            name = "schools",
            uniqueConstraints = {
                    @UniqueConstraint(
                            name = "uk_schools_school_code",
                            columnNames = "school_code"
                    )
            }
    )
    public class School {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;

        @Column(nullable = false, length = 150)
        private String schoolName;

        @Column(name = "school_code", nullable = false, length = 30)
        private String schoolCode;

        @Column(nullable = false, length = 100)
        private String adminName;

        @Column(nullable = false, length = 150)
        private String adminEmail;

        @Column(nullable = false, length = 20)
        private String phoneNumber;

        @Column(nullable = false)
        private boolean active = true;

        @Column(name = "created_at", nullable = false, updatable = false)
        private LocalDateTime createdAt;

        public School() {
        }

        @PrePersist
        protected void onCreate() {
            createdAt = LocalDateTime.now();
        }

        public Long getId() {
            return id;
        }

        public String getSchoolName() {
            return schoolName;
        }

        public void setSchoolName(String schoolName) {
            this.schoolName = schoolName;
        }

        public String getSchoolCode() {
            return schoolCode;
        }

        public void setSchoolCode(String schoolCode) {
            this.schoolCode = schoolCode;
        }

        public String getAdminName() {
            return adminName;
        }

        public void setAdminName(String adminName) {
            this.adminName = adminName;
        }

        public String getAdminEmail() {
            return adminEmail;
        }

        public void setAdminEmail(String adminEmail) {
            this.adminEmail = adminEmail;
        }

        public String getPhoneNumber() {
            return phoneNumber;
        }

        public void setPhoneNumber(String phoneNumber) {
            this.phoneNumber = phoneNumber;
        }

        public boolean isActive() {
            return active;
        }

        public void setActive(boolean active) {
            this.active = active;
        }

        public LocalDateTime getCreatedAt() {
            return createdAt;
        }

    }
