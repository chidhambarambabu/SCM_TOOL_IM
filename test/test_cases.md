# Functional & Integration Test Case Execution Matrix
## AI-Based Food Waste Reduction and Donation Management System
**Configuration Item:** CI-10  
**Version:** 1.0  
**Audit Type:** Functional Configuration Audit (FCA)  
**Executed By:** Quality Assurance Team  
**Date:** 2026-10-19  

| Test ID | Module | Pre-conditions | Test Steps | Expected Output | Actual Output | Status |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **TC-01** | Donor Portal | Valid donor logged in | Fill item name, 25kg cooked rice, submit | Donation card displayed in Live Feed with status AVAILABLE | Card rendered; state synchronized | **PASS** |
| **TC-02** | Donor Portal | Donor on form | Enter negative quantity (-5 kg) | Validation error: 'Quantity must be positive' | Validation message triggered | **PASS** |
| **TC-03** | AI Predictor | Active kitchen parameters | Select 'Friday', 450 guests, run forecast | Return predicted surplus kg, meals, and >85% confidence | Returned 38.5 kg, 97 meals, 94.2% conf | **PASS** |
| **TC-04** | AI Predictor | Rainy weather selected | Select 'Rainy/Cold' condition | Adjust guest turnout and recommend prep reduction | Recommendation adjusted accurately | **PASS** |
| **TC-05** | NGO Coordination | Available donation listed | Click 'Claim Donation' button | Status updates to CLAIMED, creates Pickup ID | Status changed to CLAIMED; PKP-7492 assigned | **PASS** |
| **TC-06** | NGO Coordination | Item already claimed | Second NGO attempts to claim item | Concurrency error: item already reserved | Claim button disabled; error prevented | **PASS** |
| **TC-07** | Logistics Tracker | Claimed donation | Click 'Advance Stage' | Stage moves Scheduled -> Volunteer Assigned -> En Route -> Delivered | Stage progression reflected smoothly | **PASS** |
| **TC-08** | SCM Hub | SCM Dashboard open | Check CI table, Git tags, and branch names | Display all 13 CIs with correct versions and commit IDs | Verified 13 CIs, v1.0.0 release tag | **PASS** |
