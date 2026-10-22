/**
 * Donation Management Controller
 * Configuration Item: CI-06
 * SCM Baseline: Development Baseline
 * Tracks donation creation, NGO claiming, and pickup scheduling.
 */

class DonationController {
    constructor() {
        this.donations = [
            {
                id: 1,
                donor: 'Hyatt Regency Kitchen',
                donorType: 'Hotel',
                item: '50 Packed Lunch Meals (Paneer Biryani & Curd Rice)',
                category: 'Cooked Meals',
                quantityKg: 30,
                servings: 50,
                prepTime: new Date().toLocaleTimeString(),
                expiryHours: 4,
                storageReq: 'Hot Insulated',
                address: 'Hyatt Regency, Anna Salai',
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
                prepTime: new Date().toLocaleTimeString(),
                expiryHours: 12,
                storageReq: 'Ambient Dry',
                address: 'Daily Bakes, Katpadi Road',
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
                prepTime: new Date().toLocaleTimeString(),
                expiryHours: 3.5,
                storageReq: 'Hot Insulated',
                address: 'VIT Campus, Mens Hostel Block 4',
                status: 'AVAILABLE',
                claimedBy: null,
                pickupId: null
            }
        ];
    }

    getAllDonations() {
        return this.donations;
    }

    createDonation(data) {
        if (!data.item || !data.quantityKg || data.quantityKg <= 0) {
            throw new Error("Invalid donation details: Food item and positive quantity required.");
        }
        const newDonation = {
            id: this.donations.length + 1,
            donor: data.donor || 'Anonymous Donor',
            donorType: data.donorType || 'Restaurant',
            item: data.item,
            category: data.category || 'Cooked Meals',
            quantityKg: parseFloat(data.quantityKg),
            servings: parseInt(data.servings) || Math.round(data.quantityKg * 2.5),
            prepTime: new Date().toLocaleTimeString(),
            expiryHours: parseFloat(data.expiryHours) || 4,
            storageReq: data.storageReq || 'Ambient Dry',
            address: data.address || 'Local City Center',
            status: 'AVAILABLE',
            claimedBy: null,
            pickupId: null
        };
        this.donations.unshift(newDonation);
        return newDonation;
    }

    claimDonation(donationId, ngoName) {
        const donation = this.donations.find(d => d.id === parseInt(donationId));
        if (!donation) {
            throw new Error("Donation not found.");
        }
        if (donation.status !== 'AVAILABLE') {
            throw new Error(`Cannot claim: Donation is already ${donation.status}.`);
        }
        donation.status = 'CLAIMED';
        donation.claimedBy = ngoName;
        donation.pickupId = 'PKP-' + Math.floor(1000 + Math.random() * 9000);
        return donation;
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = DonationController;
}
