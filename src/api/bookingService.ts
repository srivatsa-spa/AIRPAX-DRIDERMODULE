import { apiClient } from './apiClient';

export interface LocationData {
  latitude: number;
  longitude: number;
  address: string;
}

export const bookingService = {
  estimateFare: async (distance: number) => {
    return apiClient.post('/booking/estimate', { distance });
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
  }
};
