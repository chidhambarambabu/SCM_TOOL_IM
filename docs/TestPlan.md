# Software Test Plan & Verification Specification
## AI-Based Food Waste Reduction and Donation Management System
**Configuration Item:** CI-09  
**Version:** 1.0  
**Baseline:** Testing Baseline (v0.2.0-beta)  
**Author:** Dravid Anand B (23MIS0036)  
**Owner:** Quality Assurance & Testing Team  
**Status:** Approved  

---

### 1. Test Strategy
Testing ensures software quality and compliance with the SRS (CI-02) and SCM Plan (CI-03).
Testing is executed at four levels:
1. **Unit Testing:** Individual functional validation of donation calculation and AI prediction algorithms.
2. **Integration Testing:** Verification of interaction between frontend UI, backend API controllers, and database models.
3. **Automated CI Testing:** Continuous testing triggered on GitHub via GitHub Actions workflows.
4. **Configuration Auditing (FCA/PCA):** Verification of requirements traceability and release artifact integrity.

### 2. Test Cases Matrix (CI-10)

| Test ID | Module | Description | Expected Result | Status |
| :--- | :--- | :--- | :--- | :--- |
| **TC-01** | Donor Portal | Register valid cooked food donation | Donation created with status 'AVAILABLE' | PASS |
| **TC-02** | Donor Portal | Register donation with past expiry time | Validation error; submission blocked | PASS |
| **TC-03** | AI Engine | Predict surplus with standard inputs | Returns positive surplus kg and >85% confidence | PASS |
| **TC-04** | AI Engine | Predict surplus with zero footfall | Returns 0 kg surplus; recommends minimal prep | PASS |
| **TC-05** | NGO Portal | Claim an available donation | Status updates to 'CLAIMED'; Pickup ID created | PASS |
| **TC-06** | NGO Portal | Attempt to claim an already claimed item | Prevented with concurrency conflict message | PASS |
| **TC-07** | Logistics | Advance pickup status from Scheduled to Delivered | Timeline reflects stage changes accurately | PASS |
| **TC-08** | SCM Hub | Inspect live CIs and commit hash | Displays active release v1.0.0 and commit ID | PASS |
