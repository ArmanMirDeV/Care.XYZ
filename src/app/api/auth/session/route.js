import { getServerSession } from 'next-auth';
import { authOptions } from '../[...nextauth]/route';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    return NextResponse.json({ user: session?.user || null }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ user: null }, { status: 200 });
  }
}
