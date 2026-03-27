import { io, Socket } from 'socket.io-client';

const SOCKET_URL = 'http://airpaxbe.spaplc.com'; // Point to Gateway on port 80

let socket: Socket | null = null;

export const initiateSocketConnection = () => {
	socket = io(SOCKET_URL, {
		transports: ['websocket'],
	});
	console.log('Connecting socket...');
};

export const disconnectSocket = () => {
	console.log('Disconnecting socket...');
	if (socket) socket.disconnect();
};

export const joinBookingRoom = (bookingId: string) => {
	if (socket) {
		socket.emit('join-booking', bookingId);
	}
};

export const subscribeToLocationUpdates = (cb: (data: any) => void) => {
	if (!socket) return;
	socket.on('location-broadcast', (data) => {
		cb(data);
	});
};

export const getSocket = () => socket;
