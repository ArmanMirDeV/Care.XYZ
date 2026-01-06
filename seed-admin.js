const { MongoClient } = require('mongodb');
const bcrypt = require('bcryptjs');
require('dotenv').config({ path: '.env.local' });

async function seedAdmin() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error('MONGODB_URI not found in .env.local');
    return;
  }

  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db(process.env.DB_NAME || 'carexyz');
    const usersCollection = db.collection('users');

    const adminEmail = 'admin@care.xyz';
    const existingAdmin = await usersCollection.findOne({ email: adminEmail });

    if (existingAdmin) {
      console.log('Admin user already exists');
      // Update role just in case
      await usersCollection.updateOne({ email: adminEmail }, { $set: { role: 'admin' } });
      console.log('Role updated to admin');
    } else {
      const hashedPassword = await bcrypt.hash('Admin@123', 10);
      const adminUser = {
        name: 'Admin User',
        email: adminEmail,
        password: hashedPassword,
        role: 'admin',
        nid: '0000000000',
        contact: '01700000000',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      await usersCollection.insertOne(adminUser);
      console.log('Admin user created successfully');
      console.log('Email: admin@care.xyz');
      console.log('Password: Admin@123');
    }

  } catch (error) {
    console.error('Error seeding admin:', error);
  } finally {
    await client.close();
  }
}

seedAdmin();
