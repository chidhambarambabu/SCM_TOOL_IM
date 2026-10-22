package com.vit.scm.foodwaste.service;

import java.util.*;

/**
 * User Authentication & Role Management Service
 * Configuration Item: CI-06
 * SCM Course: ISWE403L
 * Student: Dravid Anand B (23MIS0036)
 */
public class UserService {

    public enum Role {
        DONOR_RESTAURANT,
        DONOR_HOTEL,
        DONOR_SUPERMARKET,
        DONOR_CAFETERIA,
        NGO_CHARITY,
        VOLUNTEER,
        ADMIN
    }

    public static class User {
        private final Long id;
        private final String name;
        private final String email;
        private final Role role;
        private final boolean isVerified;

        public User(Long id, String name, String email, Role role, boolean isVerified) {
            this.id = id;
            this.name = name;
            this.email = email;
            this.role = role;
            this.isVerified = isVerified;
        }

        public Long getId() { return id; }
        public String getName() { return name; }
        public String getEmail() { return email; }
        public Role getRole() { return role; }
        public boolean isVerified() { return isVerified; }
    }

    private final Map<String, User> userDatabase = new HashMap<>();

    public UserService() {
        // Initialize verified system users
        userDatabase.put("kitchen@hyatt.com", new User(1L, "Hyatt Regency", "kitchen@hyatt.com", Role.DONOR_HOTEL, true));
        userDatabase.put("contact@annambank.org", new User(2L, "Annam Food Bank", "contact@annambank.org", Role.NGO_CHARITY, true));
        userDatabase.put("ramesh.v@gmail.com", new User(3L, "Ramesh Volunteer", "ramesh.v@gmail.com", Role.VOLUNTEER, true));
        userDatabase.put("admin@vit.ac.in", new User(4L, "System Admin", "admin@vit.ac.in", Role.ADMIN, true));
    }

    public Optional<User> authenticate(String email, String password) {
        if (email != null && userDatabase.containsKey(email.toLowerCase())) {
            return Optional.of(userDatabase.get(email.toLowerCase()));
        }
        return Optional.empty();
    }

    public boolean canDonateFood(Role role) {
        return role == Role.DONOR_RESTAURANT || role == Role.DONOR_HOTEL ||
               role == Role.DONOR_SUPERMARKET || role == Role.DONOR_CAFETERIA;
    }

    public boolean canClaimFood(Role role) {
        return role == Role.NGO_CHARITY;
    }
}
