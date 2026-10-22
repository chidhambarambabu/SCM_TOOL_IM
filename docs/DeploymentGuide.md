# System Deployment & Installation Guide
## AI-Based Food Waste Reduction and Donation Management System
**Configuration Item:** CI-12  
**Version:** 1.0  
**Baseline:** Release Baseline (v1.0.0)  
**Author:** Dravid Anand B (23MIS0036)  
**Owner:** DevOps & SCM Deployment Team  

---

### 1. System Requirements
- Node.js v18.0 or higher / Python 3.10 or higher
- Git 2.30+
- Modern Web Browser (Chrome, Edge, Firefox, Safari)

### 2. Local Installation
```bash
# Clone the verified repository
git clone https://github.com/chidhambarambabu/SCM_TOOL_IM.git
cd SCM_TOOL_IM

# Launch the Frontend Web Demo
python -m http.server 8080 --directory frontend
```
Access the application at `http://localhost:8080`.

### 3. GitHub Pages Deployment
The static frontend can be deployed directly to GitHub Pages:
1. Navigate to repository **Settings > Pages**.
2. Under **Build and deployment > Source**, select **Deploy from a branch**.
3. Choose branch `main` and folder `/frontend`.
4. Click **Save**. The live URL will be provisioned.
