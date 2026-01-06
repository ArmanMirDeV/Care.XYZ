import { NextResponse } from 'next/server';
import { getDatabase } from '@/lib/mongodb';
import bcrypt from 'bcryptjs';

export async function POST(request) {
  try {
    const body = await request.json();
    const { nid, name, email, contact, password } = body;

    // Validation
    if (!nid || !name || !email || !contact || !password) {
      return NextResponse.json(
        { message: 'All fields are required' },
        { status: 400 }
      );
    }

    // Password validation
    if (password.length < 6) {
      return NextResponse.json(
        { message: 'Password must be at least 6 characters', errors: { password: 'Password must be at least 6 characters' } },
        { status: 400 }
      );
    }
    if (!/[A-Z]/.test(password) || !/[a-z]/.test(password)) {
      return NextResponse.json(
        { message: 'Password must contain at least one uppercase and one lowercase letter', errors: { password: 'Password must contain at least one uppercase and one lowercase letter' } },
        { status: 400 }
      );
    }

    const db = await getDatabase();
    const usersCollection = db.collection('users');

    // Check if user already exists
    const existingUser = await usersCollection.findOne({ $or: [{ email }, { nid }] });
    if (existingUser) {
      return NextResponse.json(
        { message: 'User with this email or NID already exists' },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = {
      nid,
      name,
      email,
      contact,
      password: hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await usersCollection.insertOne(user);

    return NextResponse.json(
      { 
        message: 'Registration successful. Please login with your credentials.',
        user: { id: result.insertedId, email, name } 
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { message: 'Registration failed', error: error.message },
      { status: 500 }
    );
  }
}

