const mongoose = require('mongoose');
const Admin = require('../models/admin'); // Update path as needed

const MONGODB_URI = 'mongodb://localhost:27017/leave-system';

async function createAdmin() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to MongoDB');

        const existingAdmin = await Admin.findOne({ email: 'admin@example.com' });

        if (existingAdmin) {
            console.log('Admin already exists');
            return;
        }

        const newAdmin = new Admin({
            email: 'admin@example.com',
            password: 'SuperAdmin@123' // Must pass isStrongPassword
        });

        await newAdmin.save();
        console.log('Admin created successfully:', newAdmin);
    } catch (err) {
        console.error('Error creating Admin:', err.message);
    } finally {
        mongoose.disconnect();
    }
}

createAdmin();