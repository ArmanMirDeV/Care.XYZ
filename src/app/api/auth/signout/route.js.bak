// This route is now handled by NextAuth
// Redirect to NextAuth signout
import { NextResponse } from 'next/server';

export async function GET(request) {
  const url = new URL(request.url);
  const baseUrl = url.origin;
  return NextResponse.redirect(new URL('/api/auth/signout', baseUrl));
}
