const mongoose = require('mongoose');
const ticketSchema = new mongoose.Schema({
    orderId: { type: String, required: true, unique: true },
    channelId: { type: String, required: true },
    guildId: { type: String },
    clientId: { type: String, required: true },
    sellerId: { type: String },
    productName: { type: String, required: true },
    quantity: { type: String },
    payment: { type: String },
    amount: { type: String, default: 'Not set' },
    status: { type: String, default: 'Open' },
    createdAt: { type: Date, default: Date.now },
    completedAt: { type: Date }
});
module.exports = mongoose.model('Ticket', ticketSchema);
