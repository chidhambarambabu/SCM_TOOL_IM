# System Design Document (SDD)
## AI-Based Food Waste Reduction and Donation Management System
**Configuration Item:** CI-04  
**Version:** 1.0  
**Baseline:** Design Baseline (v0.1.0-alpha)  
**Author:** Dravid Anand B (23MIS0036)  
**Owner:** System Architecture & Design Team  
**Status:** Approved  

---

### 1. Architectural Overview
The system follows a modern 3-Tier Distributed Architecture designed for resilience, modularity, and SCM traceability:

```
[ Presentation Tier ]       --> HTML5, CSS3, Vanilla JavaScript, Responsive Dashboard
          │
          ▼  (RESTful JSON / WebSocket)
[ Application Service Tier ] --> Node.js / Express Controllers, Java Spring Boot RBAC Auth
          │
    ┌─────┴─────────────────────────┐
    ▼                               ▼
[ Database Tier ]          [ AI Prediction Engine ]
MySQL / Relational DB      Python Scikit-Learn (Random Forest)
Tables: users, donations,  Features: footfall, sales, weather
claims, pickups, audit     Output: forecasted surplus kg
```

### 2. Component Specifications
- **Donation Manager Component:** Exposes REST endpoints to create, list, filter, and claim surplus food donations.
- **AI Prediction Component:** Standalone analytical engine providing surplus estimations based on regression models.
- **Notification & Dispatch Component:** Event-driven module assigning volunteers to claims and notifying charities.
- **SCM Traceability Component:** Inspects runtime environment metadata, git commit SHA, active branch, and CI registers.

### 3. Database Schema Overview
- `users`: ID, name, email, role (DONOR, NGO, VOLUNTEER, ADMIN), address, verified_status.
- `donations`: ID, donor_id, food_item, category, quantity_kg, meals_est, prep_time, expiry_time, storage_req, status.
- `claims`: ID, donation_id, ngo_id, claim_time, status.
- `pickup_schedules`: ID, claim_id, volunteer_id, scheduled_time, vehicle_type, status.
- `ai_predictions`: ID, donor_id, prediction_date, footfall, historical_avg, predicted_surplus_kg, confidence.
- `scm_audit_log`: ID, ci_id, action, commit_sha, author, timestamp.
