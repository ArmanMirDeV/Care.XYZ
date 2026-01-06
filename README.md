# Care.xyz - Baby Sitting & Elderly Care Service Platform

A comprehensive web application that provides reliable and trusted care services for children, elderly, and other family members. The platform allows users to easily find and hire caretakers for different purposes such as babysitting, elderly care, or special care at home.

## Features

- ✅ **Responsive Design**: Mobile, tablet, and desktop supported
- ✅ **User Authentication**: Email & Password, Google Social Login (placeholder)
- ✅ **Dynamic Booking**: Duration, Location (Division, District, City, Area), Address input
- ✅ **Total Cost Calculation**: Automatically calculates based on duration × service charge
- ✅ **Booking Status**: Pending / Confirmed / Completed / Cancelled
- ✅ **My Booking Page**: Users can track their bookings and status
- ✅ **Services Overview**: Baby Care, Elderly Service, Sick People Service
- ✅ **Service Detail Pages**: Individual page for each service with details and Book Service button
- ✅ **Email Invoices**: Automatic email invoice sent on booking
- ✅ **Metadata**: SEO-friendly metadata on all pages
- ✅ **404 Error Page**: Custom error page

## Tech Stack

- **Framework**: Next.js 16.1.1
- **React**: 19.2.3
- **Styling**: Tailwind CSS 4
- **Database**: MongoDB (official driver)
- **Authentication**: Custom session-based auth
- **Animations**: Framer Motion
- **Icons**: React Icons
- **Email**: Nodemailer
- **Notifications**: React Hot Toast

## Getting Started

### Prerequisites

- Node.js 18+ installed
- MongoDB database (local or Atlas)
- Email account for SMTP (Gmail recommended)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd care.xyz
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.local.example .env.local
```

Edit `.env.local` with your configuration:
```env
MONGODB_URI=mongodb://localhost:27017/carexyz
DB_NAME=carexyz
NODE_ENV=development
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
care.xyz/
├── src/
│   ├── app/              # Next.js app directory
│   │   ├── api/          # API routes
│   │   │   ├── auth/     # Authentication endpoints
│   │   │   └── bookings/ # Booking endpoints
│   │   ├── booking/      # Booking page
│   │   ├── login/        # Login page
│   │   ├── register/     # Registration page
│   │   ├── my-bookings/  # User bookings page
│   │   ├── service/      # Service detail pages
│   │   └── page.js       # Homepage
│   ├── components/       # Reusable components
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   └── PrivateRoute.jsx
│   └── lib/              # Utility functions
│       ├── mongodb.js    # MongoDB connection
│       ├── auth.js       # Authentication helpers
│       ├── email.js      # Email utilities
│       └── utils.js      # General utilities
├── public/               # Static assets
└── package.json
```

## Pages & Routes

1. **Homepage** (`/`) - Banner, About, Services overview, Testimonials
2. **Services** (`/services`) - All services listing
3. **Service Detail** (`/service/:service_id`) - Individual service details
4. **Booking** (`/booking/:service_id`) - Private route for booking
5. **Login** (`/login`) - User login
6. **Register** (`/register`) - User registration
7. **My Bookings** (`/my-bookings`) - Private route for user bookings
8. **404** - Custom error page

## API Routes

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/session` - Get current session
- `GET /api/auth/signout` - Sign out
- `GET /api/bookings` - Get user bookings
- `POST /api/bookings` - Create new booking
- `PATCH /api/bookings/[id]` - Update booking status
- `GET /api/stats` - Get platform statistics

## Services

1. **Baby Care** - 500 BDT/hour
2. **Elderly Care** - 600 BDT/hour
3. **Sick People Care** - 700 BDT/hour

## Booking Flow

1. User selects a service
2. User clicks "Book Service" (redirects to login if not authenticated)
3. User selects duration (hours/days)
4. User selects location (Division → District → City → Area → Address)
5. System calculates total cost
6. User confirms booking
7. Booking is saved with status "Pending"
8. Email invoice is sent to user

## Environment Variables

All sensitive configuration should be stored in `.env.local`:

- `MONGODB_URI` - MongoDB connection string
- `DB_NAME` - Database name (default: carexyz)
- `SMTP_HOST` - SMTP server host
- `SMTP_PORT` - SMTP server port
- `SMTP_USER` - SMTP username
- `SMTP_PASS` - SMTP password

## Development

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

## Future Enhancements

- [ ] Stripe payment integration
- [ ] Admin dashboard
- [ ] Payment history tracking
- [ ] Google OAuth implementation
- [ ] Real-time notifications
- [ ] Caregiver profiles and ratings

## License

This project is private and proprietary.
