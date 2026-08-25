const mongoose = require('mongoose');
async function connectToDatabase() {
    try {
        if (!process.env.MONGO_URI) {
            console.log('No MONGO_URI provided in .env, skipping database connection.');
            return;
        }
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Successfully connected to MongoDB.');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw error; 
    }
}
module.exports = { connectToDatabase };
