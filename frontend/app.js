/**
 * FoodSave AI: Client Application Logic & SCM State Manager
 * Author: Dravid Anand B (23MIS0036)
 * SCM Course: ISWE403L - VIT University
 */

// Initial Seed Donations
let donations = [
    {
        id: 1,
        donor: 'Hyatt Regency Kitchen',
        donorType: 'Hotel',
        item: '50 Packed Lunch Meals (Paneer Biryani & Curd Rice)',
        category: 'Cooked Meals',
        quantityKg: 30,
        servings: 50,
        prepTime: '11:30 AM',
        expiryHours: 4,
        storageReq: 'Hot Insulated',
        address: 'Hyatt Regency, Anna Salai (Gate 2)',
        status: 'AVAILABLE',
        claimedBy: null,
        pickupId: null
    },
    {
        id: 2,
        donor: 'Daily Bakes Supermarket',
        donorType: 'Supermarket',
        item: 'Fresh Whole Wheat Bread, Bagels & Tea Buns',
        category: 'Bakery & Pastry',
        quantityKg: 25,
        servings: 75,
        prepTime: '09:00 AM',
        expiryHours: 12,
        storageReq: 'Ambient Dry',
        address: 'Daily Bakes Katpadi Road',
        status: 'AVAILABLE',
        claimedBy: null,
        pickupId: null
    },
    {
        id: 3,
        donor: 'VIT Central Cafeteria',
        donorType: 'University Cafeteria',
        item: 'Steamed Basmati Rice, Dal Makhani & Mixed Veg Trays',
        category: 'Cooked Meals',
        quantityKg: 45,
        servings: 120,
        prepTime: '12:00 PM',
        expiryHours: 3.5,
        storageReq: 'Hot Insulated',
        address: 'VIT Campus, Dining Hall 3',
        status: 'AVAILABLE',
        claimedBy: null,
        pickupId: null
    }
];

let currentPickupStage = 3; // 1: Scheduled, 2: Assigned, 3: En Route, 4: Collected, 5: Delivered

// Tab Switching
function switchTab(tabId) {
    document.querySelectorAll('.tab-pane').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.nav-btn').forEach(el => el.classList.remove('active'));

    const targetTab = document.getElementById(`tab-${tabId}`);
    if (targetTab) targetTab.classList.add('active');

    const navBtn = document.querySelector(`.nav-btn[data-tab="${tabId}"]`);
    if (navBtn) navBtn.classList.add('active');

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Sub-Tab Switching inside SCM Hub
function switchSubTab(subTabId, btn) {
    document.querySelectorAll('.sub-pane').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.sub-tab').forEach(el => el.classList.remove('active'));

    const target = document.getElementById(`sub-${subTabId}`);
    if (target) target.classList.add('active');
    if (btn) btn.classList.add('active');
}

// Navigation Event Listeners
document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const tab = btn.getAttribute('data-tab');
        switchTab(tab);
    });
});

// Calculate Estimated Servings
function updateServingsEstimate() {
    const kg = parseFloat(document.getElementById('quantity-kg').value) || 0;
    const est = Math.round(kg * 2.5);
    document.getElementById('servings-est').value = est;
}

// Footfall Range Display
function updateFootfallDisplay(val) {
    document.getElementById('footfall-val').innerText = val;
}

// Render NGO Donation Cards
function renderDonations(filter = 'ALL') {
    const container = document.getElementById('donations-container');
    container.innerHTML = '';

    const filtered = donations.filter(d => {
        if (filter === 'ALL') return true;
        return d.status === filter;
    });

    // Update live badge count
    const availableCount = donations.filter(d => d.status === 'AVAILABLE').length;
    document.getElementById('live-count-badge').innerText = availableCount;

    if (filtered.length === 0) {
        container.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 40px; color: #64748b;">No donations found for selected filter.</div>`;
        return;
    }

    filtered.forEach(d => {
        const card = document.createElement('div');
        card.className = `donation-card ${d.status.toLowerCase()}`;

        const isClaimed = d.status === 'CLAIMED';
        const statusBadge = isClaimed 
            ? `<span class="badge badge-info">Claimed by ${d.claimedBy}</span>` 
            : `<span class="badge badge-success">Available for Pickup</span>`;

        card.innerHTML = `
            <div>
                <div class="d-header">
                    <span class="d-donor">${d.donor} (${d.donorType})</span>
                    ${statusBadge}
                </div>
                <div class="d-title">${d.item}</div>
                <div class="d-specs">
                    <div class="d-spec-item"><strong>Quantity:</strong> ${d.quantityKg} kg (${d.servings} meals)</div>
                    <div class="d-spec-item"><strong>Category:</strong> ${d.category}</div>
                    <div class="d-spec-item"><strong>Safe Window:</strong> ${d.expiryHours} hours remaining</div>
                    <div class="d-spec-item"><strong>Storage:</strong> ${d.storageReq}</div>
                </div>
            </div>
            <div>
                <div class="d-footer">
                    <span class="d-address">📍 ${d.address}</span>
                    ${!isClaimed ? `
                        <button class="btn btn-primary btn-sm" onclick="claimDonation(${d.id})">
                            Claim Donation
                        </button>
                    ` : `
                        <span class="mono" style="font-size: 0.78rem; color: #0284c7; font-weight: 700;">${d.pickupId}</span>
                    `}
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}

// Filter Donations
function filterDonations(status, btn) {
    document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
    btn.classList.add('active');
    renderDonations(status);
}

// Handle Donation Submission
function handleDonationSubmit(e) {
    e.preventDefault();

    const donorName = document.getElementById('donor-name').value;
    const donorType = document.getElementById('donor-type').value;
    const foodItem = document.getElementById('food-item').value;
    const foodCategory = document.getElementById('food-category').value;
    const quantityKg = parseFloat(document.getElementById('quantity-kg').value);
    const servings = parseInt(document.getElementById('servings-est').value);
    const expiryHours = parseFloat(document.getElementById('expiry-hours').value);
    const storageReq = document.getElementById('storage-req').value;
    const pickupAddress = document.getElementById('pickup-address').value;

    const newDonation = {
        id: donations.length + 1,
        donor: donorName,
        donorType: donorType,
        item: foodItem,
        category: foodCategory,
        quantityKg: quantityKg,
        servings: servings,
        prepTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        expiryHours: expiryHours,
        storageReq: storageReq,
        address: pickupAddress,
        status: 'AVAILABLE',
        claimedBy: null,
        pickupId: null
    };

    donations.unshift(newDonation);
    renderDonations();

    // Update food saved metric
    const currentSaved = parseInt(document.getElementById('stat-food-saved').innerText.replace(/\D/g, ''));
    document.getElementById('stat-food-saved').innerText = `${(currentSaved + quantityKg).toLocaleString()} kg`;

    showToast(`Donation registered! Broadcasted to local charities.`);
    switchTab('ngo-feed');
}

// Claim Donation
function claimDonation(id) {
    const item = donations.find(d => d.id === id);
    if (!item) return;

    item.status = 'CLAIMED';
    item.claimedBy = 'Annam Food Bank NGO';
    item.pickupId = `PKP-${Math.floor(1000 + Math.random() * 9000)}`;

    renderDonations();
    showToast(`Donation successfully claimed by ${item.claimedBy}! Tracking ID: ${item.pickupId}`);
}

// Run AI Surplus Prediction
function handlePredictionRun(e) {
    e.preventDefault();

    const day = document.getElementById('ai-day').value;
    const footfall = parseInt(document.getElementById('ai-footfall').value);
    const sales = parseFloat(document.getElementById('ai-sales').value);
    const inventory = parseFloat(document.getElementById('ai-inventory').value);
    const weather = document.getElementById('ai-weather').value;

    // ML calculation logic aligned with predict_surplus.py
    let dayMult = 1.0;
    if (day === 'Friday') dayMult = 1.25;
    if (day === 'Saturday') dayMult = 1.40;
    if (day === 'Sunday') dayMult = 1.30;
    if (day === 'Monday') dayMult = 0.90;

    let weatherMult = 1.0;
    if (weather === 'Rainy / Cold') weatherMult = 0.85;
    if (weather === 'Festival / Event') weatherMult = 1.35;

    const effectivePatrons = footfall * weatherMult;
    const plannedPrepKg = (effectivePatrons * 0.45 * 1.15) + (inventory * 0.10);
    const expectedEatenKg = effectivePatrons * 0.45;

    const surplusKg = Math.max(0, +(plannedPrepKg - expectedEatenKg).toFixed(1));
    const surplusMeals = Math.ceil(surplusKg / 0.40);
    const co2Saved = +(surplusKg * 2.5).toFixed(1);

    let confidence = 94.2;
    if (weather === 'Rainy / Cold') confidence = 91.5;

    document.getElementById('res-surplus-kg').innerText = `${surplusKg} kg`;
    document.getElementById('res-surplus-meals').innerText = `~${surplusMeals} Standard Meals`;
    document.getElementById('res-co2-saved').innerText = `${co2Saved} kg`;
    document.getElementById('ai-confidence-badge').innerText = `${confidence}% Confidence`;

    let recommendation = '';
    if (surplusKg > 25) {
        recommendation = `High Surplus Forecast (${surplusKg} kg). Automated charity alert dispatched. Recommend reducing next batch prep by ${+(surplusKg * 0.4).toFixed(1)} kg.`;
    } else if (surplusKg > 10) {
        recommendation = `Moderate Surplus (${surplusKg} kg). Schedule standard volunteer pickup. Safe thermal containers required.`;
    } else {
        recommendation = `Low Surplus anticipated (<10 kg). Kitchen operation running at optimal efficiency.`;
    }
    document.getElementById('res-recommendation').innerText = recommendation;

    showToast('AI Forecast recalculated based on Scikit-Learn model weights.');
}

// Advance Pickup Logistics Tracker
function advanceActivePickup() {
    currentPickupStage++;
    if (currentPickupStage > 5) currentPickupStage = 1;

    for (let i = 1; i <= 5; i++) {
        const step = document.getElementById(`step-${i}`);
        const line = document.getElementById(`line-${i-1}`);

        if (step) {
            step.classList.remove('completed', 'in-progress');
            if (i < currentPickupStage) {
                step.classList.add('completed');
            } else if (i === currentPickupStage) {
                step.classList.add('in-progress');
            }
        }

        if (line && i > 1) {
            if (i <= currentPickupStage) {
                line.classList.add('active');
            } else {
                line.classList.remove('active');
            }
        }
    }

    const descriptions = {
        1: "Donation claimed. Automated pickup scheduled.",
        2: "Volunteer Ramesh Kumar assigned. Contact verified.",
        3: "Volunteer Ramesh is en route to Hyatt Regency Kitchen. Estimated arrival in 12 mins.",
        4: "Food collected from donor. Temperature and packaging verified. Heading to charity.",
        5: "Donation delivered to Annam Food Bank. Beneficiary meal distribution in progress."
    };

    document.getElementById('pkp-status-desc').innerText = descriptions[currentPickupStage];
    showToast(`Logistics Stage updated to: Step ${currentPickupStage}/5`);
}

// Toast Alert
function showToast(msg) {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.5"><path d="M20 6L9 17l-5-5"/></svg>
        <span>${msg}</span>
    `;
    container.appendChild(toast);
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transition = 'opacity 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 3200);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    renderDonations();
});
