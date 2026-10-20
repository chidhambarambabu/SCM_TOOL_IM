# AI-Based Food Waste Reduction and Donation Management System
## Software Configuration Management (ISWE403L) — Tool Demonstration Project

**Institution:** Vellore Institute of Technology (VIT), Vellore  
**Course Code:** ISWE403L — Software Configuration Management  
**Student Name:** Dravid Anand B  
**Register Number:** 23MIS0036  
**Faculty In-Charge:** Senthil Kumar P  
**Slot:** E1 + TE1  
**SCM Tool Selected & Demonstrated:** Git & GitHub  
**Official GitHub Repository:** [https://github.com/chidhambarambabu/SCM_TOOL_IM.git](https://github.com/chidhambarambabu/SCM_TOOL_IM.git)

---

## 1. Project Overview
Food waste is a major global and environmental crisis. Commercial kitchens, restaurants, supermarkets, and university cafeterias discard tons of edible food daily due to inaccurate demand forecasting and lack of coordination with charitable organizations.

The **AI-Based Food Waste Reduction and Donation Management System** solves this by:
1. **Surplus Prediction:** Utilizing Machine Learning (Scikit-learn) to forecast edible food surplus 24-48 hours in advance based on footfall, inventory, and historical trends.
2. **Real-Time Donation Coordination:** Connecting commercial food donors directly with local NGOs and shelters in real-time.
3. **Automated Pickup Scheduling:** Streamlining volunteer dispatch, route coordination, and cold-chain/storage safety windows.
4. **SCM Traceability:** Managing all 13 Configuration Items (CIs), Change Requests (CRs), and Release Baselines strictly through Git and GitHub.

---

## 2. Repository Architecture & Configuration Items (CIs)
This repository is structured strictly according to the SCM plan established in **Review 1** and audited in **Review 2**:

```
FoodWasteManagementSystem/
├── docs/                             # SCM Documents & Formal Specifications
│   ├── SRS.md                        # CI-02: Software Requirements Specification (v1.0)
│   ├── SCM_Plan.md                   # CI-03: SCM Management Plan (v1.0)
│   ├── SystemDesignDocument.md       # CI-04: System Architecture & UML Models (v1.0)
│   ├── TestPlan.md                   # CI-09: Testing Strategy & Verification Plan (v1.0)
│   ├── UserManual.md                 # CI-11: End-User & Operational Manual (v1.0)
│   ├── DeploymentGuide.md            # CI-12: Cloud & Local Deployment Guide (v1.0)
│   └── ChangeRequests/               # Formal Change Requests (CR-001 to CR-004)
│       ├── CR-001_Surplus_Prediction.md
│       ├── CR-002_NGO_Notification.md
│       ├── CR-003_Pickup_Scheduling.md
│       └── CR-004_Database_Donation.md
├── frontend/                         # CI-06: Interactive Web Application UI
│   ├── index.html                    # Single-Page Application & SCM Dashboard
│   ├── styles.css                    # Modern CSS Design System
│   └── app.js                        # Dynamic Donation, AI & SCM Logic
├── backend/                          # CI-06: Application Controllers & Services
│   ├── donationController.js         # Express/Node Donation API Controller
│   ├── UserService.java              # Java Spring Boot Auth & RBAC Service
│   └── server.js                     # Backend API Server
├── database/                         # CI-05: Relational Database & Migrations
│   ├── food_waste_db.sql             # SQL Schema (Users, Donations, Pickups, Audit)
│   └── schema_migrations.sql         # CR-004 Schema Alteration Script
├── AI_Model/                         # CI-07: Machine Learning Prediction Engine
│   ├── predict_surplus.py            # Scikit-learn Random Forest Regressor
│   └── model_metadata.json           # Trained Model Weights & Hyperparameters
├── test/                             # CI-10: Automated Test Cases & API Suites
│   ├── test_donation.py              # Python Automated Functional Tests
│   ├── test_cases.md                 # Test Specifications & FCA Verification Log
│   └── postman_collection.json       # REST API Integration Suite
├── release/                          # CI-13: Software Release Baselines
│   ├── Release_v1.0.0.md             # Official Release Package Documentation
│   └── release_checklist.md          # FCA/PCA Audit Sign-off Checklist
├── .github/workflows/                # SCM Automation & Continuous Integration
│   └── scm_ci_pipeline.yml           # Automated CI/CD, Linting & SCM Audit Pipeline
└── README.md                         # Project Root & Demonstration Guide
```

---

## 3. SCM Activities Demonstrated Using Git & GitHub

| SCM Activity | Implementation on GitHub | Verified Output |
| :--- | :--- | :--- |
| **Configuration Identification** | 13 CIs versioned and organized across functional directories | All CIs cataloged in Status Register |
| **Version Control Strategy** | Atomic, traceable Git commits with standardized messages | Full commit history on `main` and `develop` |
| **Branching Strategy** | GitFlow with `main`, `develop`, `feature/*`, `bugfix/*`, `release/*`, `hotfix/*` | Clean branch hierarchy & PR workflows |
| **Change Control Process** | Change Requests CR-001 to CR-004 tracked via Issues, Branches & PRs | Complete impact analysis & CCB approvals |
| **Pull Requests & Code Review** | Peer-reviewed PRs with CI checks before merging into `develop` & `main` | PRs #1, #2, #3, #4 created & documented |
| **Baselines & Releases** | Git tags marking Requirements, Development, Testing, and Release baselines | Tags: `v0.1.0-alpha`, `v0.2.0-beta`, `v1.0.0` |
| **Configuration Status Accounting** | Real-time CSA Register mapping CI versions, owners, commit IDs | Interactive CSA panel in web application |
| **Configuration Audits (FCA/PCA)** | Automated & manual checklists verifying SRS compliance & artifact integrity | 100% FCA/PCA criteria verified |
| **CI/CD Automation** | GitHub Actions workflow executing unit tests and SCM compliance audits | Green build badges on commits & PRs |

---

## 4. Quick Start: Launching the Web Demonstration

### Running the Frontend
Simply open `frontend/index.html` in any modern web browser, or serve it with Python/Node:
```bash
# Using Python
python -m http.server 8080 --directory frontend

# Or using Node
npx serve frontend
```
Navigate to `http://localhost:8080` to experience:
1. **Surplus Food Donation Registration:** Register edible surplus with expiry and temperature controls.
2. **Live NGO Claiming Feed:** Real-time claiming of available donations by registered charities.
3. **AI Food Waste Predictor:** Interactive forecasting of excess food using machine learning.
4. **Pickup Tracking:** Visual dispatch timeline (Scheduled → Dispatched → Collected → Delivered).
5. **Interactive SCM Hub:** View live CI status, Change Requests, Git Branch tree, and FCA/PCA audit matrix!

### Running the AI Prediction Engine
```bash
cd AI_Model
python predict_surplus.py
```

### Running the Automated Test Suite
```bash
python -m unittest test/test_donation.py
```

---

## 5. Verification & Academic Credits
This repository serves as the official artifact and practical demonstration for the **Software Configuration Management (ISWE403L)** course under **Prof. Senthil Kumar P**, VIT University.
