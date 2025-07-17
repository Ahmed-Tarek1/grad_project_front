import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Tour } from '../types';
import { API_BASE_URL } from '../services/apiConfig';
import { Heart } from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext';
import { authService } from '../services/authService';
import { saveInteraction } from '../services/localStorageService';
import { calculateTotal } from '../services/calculationService';
import { UserInteraction } from '../interfaces/userInteraction';

interface TabInformationProps {
  tour: Tour;
}

const TabInformation: React.FC<TabInformationProps> = ({ tour }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toggleFavorite, isFavorite } = useFavorites();
  const userId = authService.getCurrentUser()?.id || 'anonymous';

  const calculateDuration = (startDate?: string, endDate?: string): string => {
    if (!startDate || !endDate) return '';
    try {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const diffTime = Math.abs(end.getTime() - start.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return `${diffDays} days`;
    } catch {
      return '';
    }
  };

  const handleCompanyClick = () => {
    if (tour.companyId) {
      navigate(`/companies/${tour.companyId}`);
    }
  };

  const handleFavoriteClick = () => {
    const action = () => {
      const isCurrentlyFavorite = isFavorite(tour.id);
      toggleFavorite(tour);
      
      const interaction: UserInteraction = {
        userId,
        id: tour.id.toString(),
        type: 'travel',
        checkout: 0,
        favourite: !isCurrentlyFavorite,
        booked: false,
        total: 0
      };
      
      interaction.total = calculateTotal(interaction);
      saveInteraction(interaction);
    };

    if (!authService.isAuthenticated()) {
      if (window.confirm('You need to login first. Do you want to login now?')) {
        navigate('/login', { state: { from: location.pathname } });
      }
      return;
    }
    action();
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      
      {/* Title and Price */}
      <div className="flex items-center mb-2">
        <h2 className="text-2xl font-bold text-gray-900 mr-10">{tour.title}</h2>
        <div className="flex items-center space-x-4">
          <button 
            onClick={handleFavoriteClick}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            aria-label={isFavorite(tour.id) ? 'Remove from favorites' : 'Add to favorites'}
          >
            <Heart
              size={28}
              className={ 
                isFavorite(tour.id)
                  ? 'text-red-500 fill-current'
                  : 'text-gray-400 hover:text-red-500'
              }
            />
          </button>
          <p className="text-orange-600 text-xl font-semibold mr-8">£{tour.price} </p>
          <div
            className={`px-3 py-1 rounded-full text-sm font-semibold ${
              tour.availableSeats > 0
                ? 'bg-green-100 text-green-600'
                : 'bg-red-100 text-red-600'
            }`}
          >
            {tour.availableSeats > 0 ? 'Available' : 'Sold Out'}
          </div>
        </div>
      </div>

      {tour.companyName && (
        <div className="flex items-center mb-4">
          <div 
            className="cursor-pointer" 
            onClick={handleCompanyClick}
            title={`View ${tour.companyName} profile`}
          >
            <img
              src={tour.companyProfileImageUrl || '/images/default-company.png'}
              alt={tour.companyName}
              className="w-14 h-14 rounded-full mr-4 hover:opacity-80 transition-opacity mt-4 mb-2"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/images/default-company.png';
              }}
            />
          </div>
          <span
            className="text-gray-700 text-lg font-semibold cursor-pointer hover:underline"
            onClick={handleCompanyClick}
          >
            {tour.companyName}
          </span>
        </div>
      )}

      {/* Description */}
      {tour.description && (
        <p className="text-gray-700 mb-12 whitespace-pre-line">
          {tour.description}
        </p>
      )}

      {/* Tour Information */}
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-2">Tour Details</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-4">
            <div className="flex">
              <span className="text-[#DF6951] font-semibold w-40">Destination:</span>
              <span className="text-gray-700">{tour.destinationCity}</span>
            </div>
            
            <div className="flex">
              <span className="text-[#DF6951] font-semibold w-40">Departure Location:</span>
              <span className="text-gray-700">{tour.departurePoint}</span>
            </div>
            
            <div className="flex">
              <span className="text-[#DF6951] font-semibold w-40">Departure Date:</span>
              <span className="text-gray-700">{new Date(tour.startDate).toLocaleDateString()}</span>
            </div>
            
            <div className="flex">
              <span className="text-[#DF6951] font-semibold w-40">Return Date:</span>
              <span className="text-gray-700">{new Date(tour.endDate).toLocaleDateString()}</span>
            </div>
          </div>
          
          {/* Right Column */}
          <div className="space-y-4">
            <div className="flex">
              <span className="text-[#DF6951] font-semibold w-40">Duration:</span>
              <span className="text-gray-700">{calculateDuration(tour.startDate, tour.endDate)}</span>
            </div>
            
            <div className="flex">
              <span className="text-[#DF6951] font-semibold w-40">Transport:</span>
              <span className="text-gray-700">{tour.transportationType}</span>
            </div>
            
            <div className="flex">
              <span className="text-[#DF6951] font-semibold w-40">Special Offer:</span>
              <span className="text-gray-700">Kids under 6 travel at half price!</span>
            </div>
          </div>
        </div>
      </div>

      {/* Amenities */}
      {tour.amenities && tour.amenities.length > 0 && (
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4 border-b pb-2">Amenities</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {tour.amenities.map((amenity, index) => (
              <div key={index} className="flex items-center">
                <span className="w-2 h-2 bg-[#DF6951] rounded-full mr-2"></span>
                <span className="text-gray-700">{amenity}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Included & Not Included - النسخة المعدلة */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
  {/* Included Section */}
  <div className="bg-green-50 p-4 rounded-lg">
    <h3 className="text-xl font-semibold text-green-800 mb-3"> Price Includ</h3>
    <ul className="space-y-2">
      {tour.included?.length > 0 ? (
        tour.included.map((item, index) => (
          <li key={index} className="flex items-center">
            <span className="text-green-500 mr-2">✓</span>
            <span className="text-gray-700">{item}</span>
          </li>
        ))
      ) : (
        <li className="text-gray-500">No items are Included</li>
      )}
    </ul>
  </div>
  
  {/* Not Included Section */}
  <div className="bg-red-50 p-4 rounded-lg">
    <h3 className="text-xl font-semibold text-red-800 mb-3"> Price Not Includ</h3>
    <ul className="space-y-2">
      {tour.notIncluded?.length > 0 ? (
        tour.notIncluded.map((item, index) => (
          <li key={index} className="flex items-center">
            <span className="text-red-500 mr-2">✗</span>
            <span className="text-gray-700">{item}</span>
          </li>
        ))
      ) : (
        <li className="text-gray-500">No items are excluded</li>
      )}
    </ul>
  </div>
</div>

      {/* Itinerary
      {tour.itineraries && tour.itineraries.length > 0 && (
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-4 border-b pb-2">Itinerary</h3>
          <div className="space-y-4">
            {tour.itineraries.map((day, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <div className="bg-[#DF6951] text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">
                    {day.dayNumber}
                  </div>
                  <h4 className="text-lg font-semibold text-[#DF6951]">{day.title}</h4>
                </div>
                
                {day.description && (
                  <p className="text-gray-600 mb-3">{day.description}</p>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-medium text-gray-700 mb-1">Location:</h5>
                    <p className="text-gray-600">{day.location}</p>
                  </div>
                  
                  <div>
                    <h5 className="font-medium text-gray-700 mb-1">Time:</h5>
                    <p className="text-gray-600">
                      {day.startTime} - {day.endTime}
                    </p>
                  </div>
                </div>
                
                {day.activities && day.activities.length > 0 && (
                  <div className="mt-3">
                    <h5 className="font-medium text-gray-700 mb-1">Activities:</h5>
                    <ul className="list-disc pl-5 space-y-1">
                      {day.activities.map((activity, i) => (
                        <li key={i} className="text-gray-600">{activity}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )} */}
    </div>
  );
};

export default TabInformation;