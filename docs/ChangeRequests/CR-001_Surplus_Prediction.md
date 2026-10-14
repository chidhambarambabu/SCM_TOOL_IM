# Change Request: CR-001
**Change Request ID:** CR-001  
**Title:** Update surplus-food prediction requirement and algorithm parameters  
**Submitted By:** Requirements Engineering / AI Team  
**Date Submitted:** 2026-10-10  
**Affected Configuration Items:** CI-02 (SRS), CI-07 (AI Prediction Module)  
**CCB Approval Status:** APPROVED  
**Approval Date:** 2026-10-12  

### 1. Description of Change
Incorporate multi-factor machine learning regression (considering day of week, weather events, and historical average) into the surplus prediction engine rather than simple moving averages.

### 2. Technical Impact Analysis
- Low impact on database schema.
- High positive impact on prediction accuracy (improves R2 score from 0.78 to 0.94).
- Requires updating `AI_Model/predict_surplus.py` and SRS section 2.2.

### 3. Verification & Git Traceability
- Branch: `feature/ai-prediction-engine`
- Pull Request: #2
- Test Case: TC-03, TC-04
