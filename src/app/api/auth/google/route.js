import { signIn } from 'next-auth/react';
import { NextResponse } from 'next/server';

// Redirect to NextAuth Google sign-in
export async function GET(request) {
  const url = new URL(request.url);
  const baseUrl = url.origin;
  return NextResponse.redirect(new URL('/api/auth/signin/google', baseUrl));
}
