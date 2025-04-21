const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/user');


const MONGODB_URI = 'mongodb://localhost:27017/leave-system';

async function createUser() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to MongoDB');

        const existingUser = await User.findOne({ email: 'nency@gmail.com' });

        if (existingUser) {
            console.log('User already exists');
            return;
        }

        // const hashedPassword = await bcrypt.hash('Admin@123', 8);

        const user = new User({
            name: 'Nency Priya Bagraila',
            email: 'nency@gmail.com',
            mobile: '1234567890',
            department: 'MCA',
            designation: 'Student',
            isOnLeave: false,
            password: 'dNs@ru13181318',
            gender: 'female',
            leavesLeft: {
                cl: 8,
                el: 10,
                rh: 2,
                hpl: 10
            },
            parents: []
        });


        await user.save();
        console.log('User created successfully:', user);
    } catch (err) {
        console.error('Error creating user:', err);
    } finally {
        mongoose.disconnect();
    }
}

createUser();