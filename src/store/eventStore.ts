import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface EventPrice {
  general: number;
  vip: number;
  earlyBird?: number;
  group?: number;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  venue: string;
  category: 'concert' | 'comedy' | 'sports' | 'theater' | 'festival';
  price: EventPrice;
  image: string;
  capacity: number;
  soldTickets: number;
  status: 'upcoming' | 'ongoing' | 'completed';
  organizerId: string;
}

interface EventState {
  events: Event[];
  addEvent: (event: Omit<Event, 'id' | 'soldTickets'>) => void;
  updateEvent: (id: string, event: Partial<Event>) => void;
  deleteEvent: (id: string) => void;
  getEventsByOrganizer: (organizerId: string) => Event[];
}

export const useEventStore = create<EventState>()(
  persist(
    (set, get) => ({
      events: [],
      addEvent: (eventData) => set((state) => ({
        events: [...state.events, {
          ...eventData,
          id: `event_${Date.now()}`,
          soldTickets: 0
        }]
      })),
      updateEvent: (id, updatedEvent) => set((state) => ({
        events: state.events.map((event) =>
          event.id === id ? { ...event, ...updatedEvent } : event
        )
      })),
      deleteEvent: (id) => set((state) => ({
        events: state.events.filter((event) => event.id !== id)
      })),
      getEventsByOrganizer: (organizerId) => 
        get().events.filter((event) => event.organizerId === organizerId)
    }),
    {
      name: 'event-storage'
    }
  )
);