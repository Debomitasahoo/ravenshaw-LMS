const mongoose = require('mongoose');
const midAdmin = require('../models/midadmin'); // Adjust the path if needed

const MONGODB_URI = 'mongodb://localhost:27017/leave-system';

async function createMidAdmin() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to MongoDB');

        const existingMidAdmin = await midAdmin.findOne({ email: 'midadmin@example.com' });

        if (existingMidAdmin) {
            console.log('MidAdmin already exists');
            return;
        }

        const newMidAdmin = new midAdmin({
            email: 'midadmin@example.com',
            password: 'StrongMid@123', // Will be hashed due to pre-save hook
            position: 'HR Manager',
            department: 'Human Resources'
        });

        await newMidAdmin.save();
        console.log('MidAdmin created successfully:', newMidAdmin);
    } catch (err) {
        console.error('Error creating midAdmin:', err);
    } finally {
        mongoose.disconnect();
    }
}

createMidAdmin();