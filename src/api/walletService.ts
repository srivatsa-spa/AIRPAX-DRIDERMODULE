import { apiClient } from './apiClient';

export interface Transaction {
  _id: string;
  amount: number;
  type: 'RIDE' | 'TOPUP' | 'REFUND';
  status: 'PENDING' | 'COMPLETED' | 'FAILED' | 'REFUNDED';
  transactionDate: string;
  razorpayOrderId: string;
}

export const walletService = {
  getWalletData: async () => {
    const response = await apiClient.get('/payment/wallet');
    return response.data;
  },
  
  createTopupOrder: async (amount: number) => {
    return apiClient.post('/payment/create-order', { 
      amount, 
      type: 'TOPUP' 
    });
  }
};
