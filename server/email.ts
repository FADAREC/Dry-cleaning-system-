import { Booking } from "@shared/schema";

export interface EmailService {
    sendBookingConfirmation(booking: Booking): Promise<boolean>;
}

export class ConsoleEmailService implements EmailService {
    async sendBookingConfirmation(booking: Booking): Promise<boolean> {
        console.log(`
      [EMAIL SENT]
      To: ${booking.customerEmail}
      Subject: Booking Confirmation - Order #${booking.orderNumber}
      
      Dear ${booking.customerName},
      
      Thank you for booking with us!
      
      Order Details:
      Order Number: ${booking.orderNumber}
      Service: ${booking.serviceType}
      Items: ${booking.totalItems || 'N/A'}
      
      Pickup: ${booking.preferredPickupDate} at ${booking.preferredPickupTime}
      Address: ${booking.pickupAddress}
      
      We will contact you shortly to confirm pickup.
      
      Regards,
      The Team
    `);
        return true;
    }
}

export const emailService = new ConsoleEmailService();
