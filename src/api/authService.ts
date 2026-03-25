import { apiClient } from './apiClient';

export const authService = {
  sendOTP: (phone: string) =>
    apiClient.post('/auth/send-otp', { phone, role: 'user' }),

  verifyOTP: (phone: string, otp: string) =>
    apiClient.post<{ token: string; user: any }>('/auth/verify-otp', {
      phone,
      otp,
    }),
};
