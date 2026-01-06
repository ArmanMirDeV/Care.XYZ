import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendInvoiceEmail(userEmail, bookingData) {
  const { serviceName, duration, durationType, totalCost, address, division, district, bookingId } = bookingData;

  const mailOptions = {
    from: process.env.SMTP_USER,
    to: userEmail,
    subject: `Booking Invoice - Care.xyz (${bookingId})`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(to right, #9333ea, #db2777); color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
            .invoice-details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
            .detail-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #e5e7eb; }
            .total { font-size: 20px; font-weight: bold; color: #9333ea; margin-top: 20px; }
            .footer { text-align: center; margin-top: 30px; color: #6b7280; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Care.xyz</h1>
              <p>Booking Invoice</p>
            </div>
            <div class="content">
              <p>Dear Customer,</p>
              <p>Thank you for booking with Care.xyz! Your booking has been confirmed.</p>
              
              <div class="invoice-details">
                <h2>Booking Details</h2>
                <div class="detail-row">
                  <span><strong>Booking ID:</strong></span>
                  <span>${bookingId}</span>
                </div>
                <div class="detail-row">
                  <span><strong>Service:</strong></span>
                  <span>${serviceName}</span>
                </div>
                <div class="detail-row">
                  <span><strong>Duration:</strong></span>
                  <span>${duration} ${durationType}</span>
                </div>
                <div class="detail-row">
                  <span><strong>Location:</strong></span>
                  <span>${division}, ${district}</span>
                </div>
                <div class="detail-row">
                  <span><strong>Address:</strong></span>
                  <span>${address}</span>
                </div>
                <div class="total">
                  <span>Total Cost: ${totalCost} BDT</span>
                </div>
              </div>
              
              <p>We will contact you shortly to confirm the details and schedule.</p>
              <p>Thank you for choosing Care.xyz!</p>
              
              <div class="footer">
                <p>Care.xyz - Trusted Care Services</p>
                <p>For support, contact us at info@care.xyz</p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error('Email sending error:', error);
    return { success: false, error: error.message };
  }
}

