import User from '../models/userModel.js'
import bcrypt from 'bcryptjs';

const seedAdmin = async () => {
  try {
    const adminEmail = process.env.ADMIN_EMAIL;
    const existingAdmin = await User.findOne({ email: adminEmail });

    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);

      await User.create({
        name: 'Everlane Admin',
        email: adminEmail,
        password: hashedPassword,
        role: 'admin'
      });

      console.log('Default Admin account created successfully!');
    } else {
      console.log('Admin account already exists.');
    }
  } catch (error) {
    console.error('Error seeding admin:', error);
  }
};

export default seedAdmin;