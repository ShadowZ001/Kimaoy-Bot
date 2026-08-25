const mongoose = require('mongoose');
const settingsSchema = new mongoose.Schema({
    guildId: { type: String, required: true, unique: true },
    feedbackChannelId: { type: String, default: null }
});
module.exports = mongoose.model('Settings', settingsSchema);
