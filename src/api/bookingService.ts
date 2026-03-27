import { apiClient } from './apiClient';

export interface LocationData {
  latitude: number;
  longitude: number;
  address: string;
}

export const bookingService = {
  estimateFare: async (pickup: LocationData, destination: LocationData) => {
    return apiClient.post('/booking/estimate', { pickup, destination });
  },

  createBooking: async (
    pickupLocation: LocationData,
    dropLocation: LocationData,
    distance: number,
    vehicleType: string
  ) => {
    return apiClient.post('/booking/create', {
      pickupLocation,
      dropLocation,
      distance,
      waitingTime: 0,
      vehicleType
    });
  },
  
  getBookingDetails: async (bookingId: string) => {
    return apiClient.get(`/booking/${bookingId}`);
  },

  getHistory: async () => {
    return apiClient.get('/booking/history');
  }
};
