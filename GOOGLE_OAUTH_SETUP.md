# Google OAuth Setup Guide

## Prerequisites

1. Google Cloud Console account
2. NextAuth.js installed (already done)

## Step 1: Create Google OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API:
   - Navigate to "APIs & Services" > "Library"
   - Search for "Google+ API" or "Google Identity"
   - Click "Enable"

4. Create OAuth 2.0 Credentials:
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "OAuth client ID"
   - If prompted, configure the OAuth consent screen first:
     - User Type: External (for testing) or Internal (for organization)
     - Fill in app name, user support email, developer contact
     - Add scopes: `email`, `profile`
     - Add test users if needed
   - Application type: "Web application"
   - Name: "Care.xyz Web Client"
   - Authorized JavaScript origins:
     - `http://localhost:3000` (for development)
     - `https://yourdomain.com` (for production)
   - Authorized redirect URIs:
     - `http://localhost:3000/api/auth/callback/google` (for development)
     - `https://yourdomain.com/api/auth/callback/google` (for production)
   - Click "Create"
   - Copy the **Client ID** and **Client Secret**

## Step 2: Add Environment Variables

Add these to your `.env.local` file:

```env
# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-google-client-secret

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-random-secret-key-here
```

### Generate NEXTAUTH_SECRET

You can generate a random secret using:

```bash
openssl rand -base64 32
```

Or use an online generator: https://generate-secret.vercel.app/32

## Step 3: Update Environment Variables for Production

For production, update:

```env
NEXTAUTH_URL=https://yourdomain.com
GOOGLE_CLIENT_ID=your-production-client-id
GOOGLE_CLIENT_SECRET=your-production-client-secret
```

Make sure to add your production domain to:
- Authorized JavaScript origins
- Authorized redirect URIs

## Step 4: Test the Implementation

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Go to `/login` or `/register`
3. Click "Sign in with Google" or "Sign up with Google"
4. You should be redirected to Google's consent screen
5. After authorization, you'll be redirected back to your app

## Troubleshooting

### Error: "redirect_uri_mismatch"
- Make sure the redirect URI in Google Console exactly matches: `http://localhost:3000/api/auth/callback/google`
- Check for trailing slashes or protocol mismatches

### Error: "invalid_client"
- Verify `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` are correct
- Make sure there are no extra spaces in `.env.local`

### Error: "NEXTAUTH_SECRET is missing"
- Add `NEXTAUTH_SECRET` to your `.env.local` file
- Restart your development server after adding it

### Users not being created in database
- Check MongoDB connection
- Verify the `signIn` callback in `[...nextauth]/route.js` is working
- Check server logs for errors

## Security Notes

1. **Never commit** `.env.local` to version control
2. Use different OAuth credentials for development and production
3. Keep your `NEXTAUTH_SECRET` secure and random
4. Regularly rotate your OAuth credentials

## How It Works

1. User clicks "Sign in with Google"
2. They're redirected to Google's OAuth consent screen
3. After authorization, Google redirects to `/api/auth/callback/google`
4. NextAuth handles the callback and creates/updates the user in MongoDB
5. A session is created and the user is logged in
6. User is redirected to the specified callback URL (default: `/my-bookings`)


