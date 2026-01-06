# Care.xyz Setup Guide

## Quick Start

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Set Up Environment Variables**
   - Copy `.env.local.example` to `.env.local`
   - Fill in your MongoDB URI and email credentials

3. **Start MongoDB**
   - Make sure MongoDB is running locally, or use MongoDB Atlas

4. **Run Development Server**
   ```bash
   npm run dev
   ```

## Environment Variables Required

Create a `.env.local` file in the root directory:

```env
# MongoDB
MONGODB_URI=mongodb://localhost:27017/carexyz
DB_NAME=carexyz

# Email (for sending invoices)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# Optional
NODE_ENV=development
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

## MongoDB Setup

### Local MongoDB
1. Install MongoDB locally
2. Start MongoDB service
3. Use connection string: `mongodb://localhost:27017/carexyz`

### MongoDB Atlas
1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a cluster
3. Get connection string
4. Use format: `mongodb+srv://username:password@cluster.mongodb.net/carexyz`

## Email Setup (Gmail)

1. Enable 2-Factor Authentication on your Gmail account
2. Generate an App Password:
   - Go to Google Account Settings
   - Security → 2-Step Verification → App passwords
   - Generate password for "Mail"
3. Use the generated password in `SMTP_PASS`

## Testing the Application

1. **Register a User**
   - Go to `/register`
   - Fill in all fields (NID, Name, Email, Contact, Password)
   - Password must be 6+ chars with 1 uppercase and 1 lowercase

2. **Login**
   - Go to `/login`
   - Use registered credentials

3. **Book a Service**
   - Browse services on homepage
   - Click "Learn More" on any service
   - Click "Book Service Now"
   - Complete booking form (Duration → Location → Confirm)
   - Check email for invoice

4. **View Bookings**
   - Go to `/my-bookings`
   - See all your bookings with status

## Database Collections

The application automatically creates these collections:
- `users` - User accounts
- `bookings` - Service bookings

## Troubleshooting

### MongoDB Connection Error
- Check if MongoDB is running
- Verify connection string in `.env.local`
- Check network/firewall settings

### Email Not Sending
- Verify SMTP credentials
- Check if App Password is correct (Gmail)
- Check spam folder
- Verify SMTP settings match your email provider

### Authentication Issues
- Clear browser cookies
- Check if session cookie is being set
- Verify database connection

## Production Deployment

1. Set `NODE_ENV=production` in environment variables
2. Use secure MongoDB connection (Atlas recommended)
3. Use production SMTP service
4. Set secure cookie flags
5. Build the application: `npm run build`
6. Start production server: `npm start`

## Features Implemented

✅ User Registration & Login
✅ Service Browsing
✅ Dynamic Booking System
✅ Cost Calculation
✅ Email Invoices
✅ Booking Management
✅ Responsive Design
✅ Private Routes
✅ Error Handling
✅ 404 Page

## Next Steps (Optional)

- [ ] Implement Google OAuth
- [ ] Add Stripe Payment Integration
- [ ] Create Admin Dashboard
- [ ] Add Payment History
- [ ] Implement Real-time Notifications
- [ ] Add Caregiver Profiles

