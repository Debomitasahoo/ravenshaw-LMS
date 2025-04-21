require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// 👇 Adjust the path based on your project
const User = require('./src/models/user');

// 🔌 Connect to MongoDB
mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('✅ Connected to MongoDB');
  resetPassword();
}).catch((error) => {
  console.error('❌ MongoDB connection failed:', error);
});

async function resetPassword() {
  try {
    const email = 'abrahul882@gmail.com'; // 👉 Change this to the actual email used in your DB
    const newPassword = 'rahul#107'; // 👉 Set a new password

    const user = await User.findOne({ email });

    if (!user) {
      console.log('❌ User not found');
      return;
    }

    const hashed = await bcrypt.hash(newPassword, 10);
    user.password = hashed;

    await user.save();
    console.log('✅ Password reset successfully');
  } catch (error) {
    console.error('❌ Error resetting password:', error);
  } finally {
    mongoose.disconnect();
  }
}