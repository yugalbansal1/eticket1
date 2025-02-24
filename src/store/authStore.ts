import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Ticket {
  id: string;
  eventId: string;
  type: string;
  quantity: number;
  totalPrice: number;
  purchaseDate: string;
  event: {
    title: string;
    date: string;
    time: string;
    venue: string;
    image: string;
  };
}

interface User {
  id: string;
  address?: string;
  email?: string;
  name: string;
  role: 'user' | 'admin' | 'organizer';
  tickets: Ticket[];
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (userData: User) => void;
  logout: () => void;
  addTicket: (ticket: Ticket) => void;
}

// Mock passwords - in a real app, these would be properly hashed and stored securely
const ADMIN_PASSWORD = 'admin123';
const ORGANIZER_PASSWORD = 'organizer123';

export const validateAdminPassword = (password: string) => password === ADMIN_PASSWORD;
export const validateOrganizerPassword = (password: string) => password === ORGANIZER_PASSWORD;

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: (userData) => set({ user: userData, isAuthenticated: true }),
      logout: () => set({ user: null, isAuthenticated: false }),
      addTicket: (ticket) =>
        set((state) => ({
          user: state.user
            ? {
                ...state.user,
                tickets: [...(state.user.tickets || []), ticket],
              }
            : null,
        })),
    }),
    {
      name: 'auth-storage',
    }
  )
);