-- ============================================================
-- AI-Based Food Waste Reduction and Donation Management System
-- Database Schema: MySQL 8.0 / PostgreSQL Compatible
-- Configuration Item: CI-05
-- Baseline: Development Baseline (v0.2.0-beta)
-- Author: Dravid Anand B (23MIS0036)
-- ============================================================

CREATE DATABASE IF NOT EXISTS food_waste_db;
USE food_waste_db;

-- 1. Users & Organizations Table
CREATE TABLE IF NOT EXISTS users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('DONOR_RESTAURANT', 'DONOR_HOTEL', 'DONOR_SUPERMARKET', 'DONOR_CAFETERIA', 'NGO_CHARITY', 'VOLUNTEER', 'ADMIN') NOT NULL,
    phone VARCHAR(20),
    address TEXT NOT NULL,
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    is_verified BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Surplus Food Donations Table (Updated via CR-004)
CREATE TABLE IF NOT EXISTS donations (
    donation_id INT AUTO_INCREMENT PRIMARY KEY,
    donor_id INT NOT NULL,
    food_item VARCHAR(200) NOT NULL,
    category ENUM('COOKED_MEALS', 'BAKERY_PASTRY', 'FRESH_PRODUCE', 'PACKAGED_GOODS', 'DAIRY') NOT NULL,
    quantity_kg DECIMAL(8, 2) NOT NULL,
    estimated_servings INT NOT NULL,
    preparation_time DATETIME NOT NULL,
    expiry_time DATETIME NOT NULL,
    storage_req ENUM('REFRIGERATED', 'HOT_INSULATED', 'AMBIENT') DEFAULT 'AMBIENT',
    allergen_info VARCHAR(255) DEFAULT 'None',
    packaging_type VARCHAR(100) DEFAULT 'Eco-Friendly Containers',
    pickup_address TEXT NOT NULL,
    status ENUM('AVAILABLE', 'CLAIMED', 'SCHEDULED', 'IN_TRANSIT', 'COMPLETED', 'EXPIRED') DEFAULT 'AVAILABLE',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (donor_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- 3. Donation Claims Table
CREATE TABLE IF NOT EXISTS claims (
    claim_id INT AUTO_INCREMENT PRIMARY KEY,
    donation_id INT NOT NULL,
    ngo_id INT NOT NULL,
    claim_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    beneficiary_count INT DEFAULT 50,
    status ENUM('PENDING_PICKUP', 'ASSIGNED', 'PICKED_UP', 'DELIVERED', 'CANCELLED') DEFAULT 'PENDING_PICKUP',
    FOREIGN KEY (donation_id) REFERENCES donations(donation_id) ON DELETE CASCADE,
    FOREIGN KEY (ngo_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- 4. Pickup Logistics & Volunteer Scheduling (Updated via CR-003)
CREATE TABLE IF NOT EXISTS pickup_schedules (
    pickup_id INT AUTO_INCREMENT PRIMARY KEY,
    claim_id INT NOT NULL,
    volunteer_id INT,
    scheduled_window_start DATETIME NOT NULL,
    scheduled_window_end DATETIME NOT NULL,
    vehicle_type ENUM('TWO_WHEELER', 'CAR', 'VAN', 'REFRIGERATED_VAN') DEFAULT 'CAR',
    current_stage ENUM('SCHEDULED', 'VOLUNTEER_ASSIGNED', 'EN_ROUTE', 'COLLECTED', 'DELIVERED') DEFAULT 'SCHEDULED',
    tracking_notes TEXT,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (claim_id) REFERENCES claims(claim_id) ON DELETE CASCADE,
    FOREIGN KEY (volunteer_id) REFERENCES users(user_id) ON DELETE SET NULL
);

-- 5. AI Waste Predictions Table (Updated via CR-001)
CREATE TABLE IF NOT EXISTS ai_predictions (
    prediction_id INT AUTO_INCREMENT PRIMARY KEY,
    donor_id INT NOT NULL,
    prediction_date DATE NOT NULL,
    day_of_week VARCHAR(20) NOT NULL,
    expected_footfall INT NOT NULL,
    historical_sales_avg DECIMAL(10, 2) NOT NULL,
    inventory_surplus_factor DECIMAL(5, 2) NOT NULL,
    weather_condition VARCHAR(50),
    predicted_surplus_kg DECIMAL(8, 2) NOT NULL,
    predicted_surplus_meals INT NOT NULL,
    confidence_score DECIMAL(5, 2) NOT NULL,
    recommended_action TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (donor_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- 6. SCM Configuration Status Accounting & Audit Log Table
CREATE TABLE IF NOT EXISTS scm_audit_log (
    audit_id INT AUTO_INCREMENT PRIMARY KEY,
    configuration_item_id VARCHAR(50) NOT NULL,
    action_type ENUM('CREATION', 'MODIFICATION', 'BASELINE_APPROVED', 'AUDIT_VERIFIED') NOT NULL,
    version VARCHAR(20) NOT NULL,
    commit_sha VARCHAR(64) NOT NULL,
    author VARCHAR(100) NOT NULL,
    change_request_id VARCHAR(20),
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Initial Seed Data
INSERT INTO users (user_id, name, email, password_hash, role, phone, address) VALUES
(1, 'Hyatt Regency Kitchen', 'kitchen@hyatt.com', '$2a$12$e8Y5...hash', 'DONOR_HOTEL', '+91 9876543210', 'Anna Salai, Chennai'),
(2, 'Daily Bakes Supermarket', 'manager@dailybakes.com', '$2a$12$e8Y5...hash', 'DONOR_SUPERMARKET', '+91 9876543211', 'Katpadi, Vellore'),
(3, 'VIT Central Cafeteria', 'cafeteria@vit.ac.in', '$2a$12$e8Y5...hash', 'DONOR_CAFETERIA', '+91 9876543212', 'VIT Campus, Vellore'),
(4, 'Annam Food Bank NGO', 'contact@annambank.org', '$2a$12$e8Y5...hash', 'NGO_CHARITY', '+91 9876543213', 'Gandhi Road, Vellore'),
(5, 'Karuna Children Home', 'support@karunahome.org', '$2a$12$e8Y5...hash', 'NGO_CHARITY', '+91 9876543214', 'Sathuvachari, Vellore'),
(6, 'Ramesh Kumar (Volunteer)', 'ramesh.v@gmail.com', '$2a$12$e8Y5...hash', 'VOLUNTEER', '+91 9876543215', 'Katpadi, Vellore');

INSERT INTO donations (donation_id, donor_id, food_item, category, quantity_kg, estimated_servings, preparation_time, expiry_time, storage_req, pickup_address, status) VALUES
(1, 1, '50 Packed Lunch Meals (Biryani & Salads)', 'COOKED_MEALS', 30.00, 50, NOW(), DATE_ADD(NOW(), INTERVAL 4 HOUR), 'HOT_INSULATED', 'Hyatt Kitchen Gate 2', 'AVAILABLE'),
(2, 2, 'Assorted Loaves, Buns & Croissants', 'BAKERY_PASTRY', 25.00, 70, NOW(), DATE_ADD(NOW(), INTERVAL 12 HOUR), 'AMBIENT', 'Daily Bakes Katpadi', 'AVAILABLE'),
(3, 3, 'Steamed Rice, Dal Tadka & Mix Veg Curry', 'COOKED_MEALS', 45.00, 110, NOW(), DATE_ADD(NOW(), INTERVAL 3 HOUR), 'HOT_INSULATED', 'VIT Dining Hall 3', 'AVAILABLE');
