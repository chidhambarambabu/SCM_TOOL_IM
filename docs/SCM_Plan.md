# Software Configuration Management Plan (SCMP)
## AI-Based Food Waste Reduction and Donation Management System
**Configuration Item:** CI-03  
**Version:** 1.0  
**Baseline:** Management Baseline (v0.1.0-alpha)  
**Author:** Dravid Anand B (23MIS0036)  
**Owner:** Software Configuration Management Team  
**Standards:** IEEE 828-2012 / CMMI Level 2-3 / ITIL v4 / SWEBOK v3  

---

### 1. Introduction & SCM Objectives
The objective of this SCM Plan is to establish and maintain the integrity of software products and artifacts throughout the Agile Scrum software lifecycle. SCM ensures that all project components—code, documentation, machine learning models, database scripts, and test suites—are systematically identified, controlled, versioned, tracked, and audited.

### 2. SCM Organization & Responsibilities
- **SCM Manager (Dravid Anand B):** Oversees baseline creation, repository branching policies, release packaging, and audit execution.
- **Change Control Board (CCB):** Evaluates, approves, or rejects Change Requests (CRs) based on technical impact and schedule feasibility.
- **Development Team:** Implements changes in designated feature/bugfix branches, writes atomic commit messages, and initiates Pull Requests.
- **Quality Assurance / Testing Team:** Executes unit, integration, and regression tests for every proposed change.

### 3. Configuration Identification
13 Configuration Items (CIs) are uniquely identified and cataloged:
1. `CI-01`: Project Proposal (`v1.0`)
2. `CI-02`: Software Requirements Specification (SRS) (`v1.0`)
3. `CI-03`: Software Configuration Management Plan (`v1.0`)
4. `CI-04`: System Design Document (`v1.0`)
5. `CI-05`: Database Design & SQL Scripts (`food_waste_db.sql`)
6. `CI-06`: Application Source Code (`frontend/`, `backend/`)
7. `CI-07`: AI Prediction Module (`predict_surplus.py`, `model_metadata.json`)
8. `CI-08`: User Interface Designs & Prototypes (`v1.0`)
9. `CI-09`: Test Plan (`v1.0`)
10. `CI-10`: Test Cases & Automated Test Scripts (`test_donation.py`)
11. `CI-11`: User Manual (`v1.0`)
12. `CI-12`: Deployment Guide (`v1.0`)
13. `CI-13`: Release Package (`Release_v1.0.0.md`)

### 4. Version Control & GitFlow Branching Strategy
- `main`: Production-ready code, strictly protected. Only merges from `release/*` and `hotfix/*` allowed.
- `develop`: Primary integration branch where sprint features are assembled and tested.
- `feature/*`: Dedicated branches for individual user stories/features (e.g., `feature/food-donation-module`, `feature/ai-prediction-engine`).
- `bugfix/*`: Non-critical defect fixes and Change Request implementations (e.g., `bugfix/fix-pickup-scheduling`).
- `release/*`: Release candidate stabilization branch (e.g., `release/v1.0.0`).
- `hotfix/*`: Emergency patches directly applied to production (e.g., `hotfix/security-patch-auth`).

### 5. Configuration Control (Change Management) Process
1. **Submission:** Stakeholder submits formal Change Request (CR) documented in `docs/ChangeRequests/`.
2. **Impact Analysis:** SCM Manager and Lead Developer assess architectural impact, test scope, and risk.
3. **CCB Review:** Change Control Board votes to Approve, Reject, or Defer the CR.
4. **Branch Creation:** Developer branches from `develop` using standard naming (`feature/<name>` or `bugfix/<name>`).
5. **Implementation & Test:** Source code and documentation updated; local tests executed.
6. **Pull Request & Code Review:** PR opened against `develop`; peer review performed; CI checks validated.
7. **Merge & Baseline Update:** PR merged via non-fast-forward merge commit; Status Register updated.

### 6. Configuration Status Accounting (CSA)
CSA tracks the current status and historical progression of all CIs. Status records include: CI Identifier, Title, Current Version, Owning Team, Approval Status, Associated CR, Git Commit Hash, and Baseline Assignment.

### 7. Configuration Audits
- **Functional Configuration Audit (FCA):** Validates that all functional requirements specified in the SRS are fully satisfied by test evidence.
- **Physical Configuration Audit (PCA):** Validates that the physical release package contains all approved artifacts, documents, scripts, and models without extraneous or unverified code.
