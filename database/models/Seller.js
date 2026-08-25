const mongoose = require('mongoose');
const sellerSchema = new mongoose.Schema({
    userId: { type: String, required: true, unique: true },
    completedDeals: { type: Number, default: 0 },
    totalVolume: { type: Number, default: 0.0 }, 
    averageCompletionTimeStr: { type: String, default: '10m 0s' },
    availableLimit: { type: Number, default: 500.0 },
    vouches: { type: Number, default: 0 },
    rating: { type: Number, default: 0.0 },
    totalReviews: { type: Number, default: 0 },
    categories: { type: [String], default: [] }, 
    recentVouches: { type: [String], default: [] } 
});
module.exports = mongoose.model('Seller', sellerSchema);
