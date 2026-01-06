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



4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.


## Booking Flow

1. User selects a service
2. User clicks "Book Service" (redirects to login if not authenticated)
3. User selects duration (hours/days)
4. User selects location (Division → District → City → Area → Address)
5. System calculates total cost
6. User confirms booking
7. Booking is saved with status "Pending"
8. Email invoice is sent to user



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


## License

This project is private and proprietary.
