/**
 * Mock Services for AIRPAX Rider App Simulation
 */

export const mockAuthService = {
  sendOTP: async (phoneNumber: string) => {
    console.log(`[MockAuth] Sending OTP to ${phoneNumber}`);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true, message: 'OTP sent successfully' });
      }, 1000);
    });
  },

  verifyOTP: async (phoneNumber: string, otp: string) => {
    console.log(`[MockAuth] Verifying OTP ${otp} for ${phoneNumber}`);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (otp === '1234') {
          resolve({
            success: true,
            user: {
              id: 'user_123',
              phoneNumber,
              name: 'John Doe',
              email: 'john.doe@example.com',
            },
            token: 'mock_jwt_token_safe_for_frontend',
          });
        } else {
          reject(new Error('Invalid OTP. Please try again with 1234.'));
        }
      }, 1000);
    });
  },
};

export const mockBookingService = {
  getFareEstimate: async (_pickup: string, _drop: string) => {
    return {
      distance: 8.2,
      duration: 18,
      categories: [
        { id: '1', name: 'Mini', baseFare: 50, ratePerKm: 12, total: 180 },
        { id: '2', name: 'Sedan', baseFare: 70, ratePerKm: 15, total: 220 },
        { id: '3', name: 'SUV', baseFare: 100, ratePerKm: 20, total: 280 },
        { id: '4', name: 'Premium', baseFare: 150, ratePerKm: 30, total: 450 },
      ],
    };
  },
};
