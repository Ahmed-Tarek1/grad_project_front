import React from 'react';
import { Star, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

// Define an interface for the tour object
interface Tour {
  id: number;
  title: string;
  location: string;
  image: string;
  rating: number;
  price: number;
}

const tours: Tour[] = [
  {
    id: 1,
    title: 'Mountain Hiking Tour',
    location: 'Switzerland',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    rating: 4.8,
    price: 199
  },
  {
    id: 2,
    title: 'Beach Paradise',
    location: 'Maldives',
    image: 'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    rating: 4.9,
    price: 299
  },
  {
    id: 3,
    title: 'Cultural Heritage',
    location: 'Japan',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    rating: 4.7,
    price: 249
  }
];

const TrendingTours = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleBookNow = (tour: Tour) => {
    // Redirect to PaymentPage with tour details
    navigate('/payment', {
      state: {
        title: tour.title,
        price: tour.price,
        location: tour.location,
      },
    });
  };

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Most Popular Tours</h2>
          <p className="text-lg text-gray-600">Discover your next adventure</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tours.map((tour) => (
            <div key={tour.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="relative">
                <img
                  src={tour.image}
                  alt={tour.title}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-semibold text-orange-500">
                  ${tour.price}
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-semibold text-gray-900">{tour.title}</h3>
                  <div className="flex items-center">
                    <Star size={16} className="text-yellow-400 fill-current" />
                    <span className="ml-1 text-sm text-gray-600">{tour.rating}</span>
                  </div>
                </div>
                <div className="flex items-center text-gray-600 mb-4">
                  <MapPin size={16} className="mr-1" />
                  <span className="text-sm">{tour.location}</span>
                </div>
                <button
                  className="w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 transition-colors"
                  onClick={() => handleBookNow(tour)} // Pass tour data to handleBookNow
                >
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrendingTours;