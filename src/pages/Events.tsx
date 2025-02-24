import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import EventCard from '../components/EventCard';
import { useEventStore } from '../store/eventStore';

const CATEGORIES = ['All', 'Concerts', 'Comedy', 'Sports', 'Theater', 'Festivals'];

const Events = () => {
  const [selectedCategory, setSelectedCategory] = React.useState('All');
  const { events } = useEventStore();

  const filteredEvents = selectedCategory === 'All'
    ? events
    : events.filter(event => 
        event.category === selectedCategory.toLowerCase().slice(0, -1)
      );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Search Section */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center bg-gray-50 rounded-lg p-2">
              <Search className="w-5 h-5 text-gray-400 ml-2" />
              <input
                type="text"
                placeholder="Search events, venues, or artists..."
                className="w-full px-4 py-2 bg-transparent text-gray-900 focus:outline-none"
              />
              <button className="flex items-center space-x-1 bg-white text-gray-700 px-4 py-2 rounded-md hover:bg-gray-100">
                <Filter className="w-4 h-4" />
                <span>Filters</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Categories and Events */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-center space-x-4 mb-12 overflow-x-auto">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full whitespace-nowrap ${
                selectedCategory === category
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Events;