import { useLocation, useNavigate } from "react-router-dom";

interface Tour {
  id: number;
  title: string;
  description: string;
  price: number;
  startDate: string;
  endDate: string;
  coverImageUrl: string;
  departurePoint: string;
  destinationCity: string;
  // ... other tour properties
}

interface Event {
  id: number;
  title: string;
  date: string;
  location: string;
  image: string;
  description?: string;
  // ... other event properties
}

interface Company {
  id: number;
  name: string;
  description: string;
  coverImage: string;
  location: string;
  rating: number;
  // ... other company properties
}

const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { results, searchTerm, searchType } = location.state || {};

  // Ensure it's an array with proper typing
  const safeResults = Array.isArray(results) ? results : [];

  const handleSeeDetails = (item: Tour | Event | Company) => {
    // Determine the item type and navigate accordingly
    if ('coverImageUrl' in item && 'departurePoint' in item) {
      // This is a Tour
      navigate("/travel-with-us", { state: { tour: item } });
    } else if ('date' in item && 'location' in item) {
      // This is an Event
      navigate(`/events/${item.id}`);
    } else if ('rating' in item && 'coverImage' in item) {
      // This is a Company
      navigate(`/companies/${item.id}`);
    }
  };

  const getCoverImage = (item: Tour | Event | Company) => {
    if ('coverImageUrl' in item) return (item as Tour).coverImageUrl;
    if ('coverImage' in item) return (item as Company).coverImage;
    if ('image' in item) return (item as Event).image;
    return 'https://via.placeholder.com/600x400?text=No+Cover+Image';
  };

  const renderCardFooter = (item: Tour | Event | Company) => {
    if ('coverImageUrl' in item && 'departurePoint' in item) {
      // Tour footer
      const tour = item as Tour;
      return (
        <>
          <div className="flex items-center text-sm text-gray-600">
            <span>{tour.departurePoint} → {tour.destinationCity}</span>
          </div>
          <div className="flex justify-between items-center mt-2">
            <span className="text-sm text-gray-500">
              {new Date(tour.startDate).toLocaleDateString()} - {new Date(tour.endDate).toLocaleDateString()}
            </span>
            <span className="font-bold text-blue-600">
              ${tour.price}
            </span>
          </div>
        </>
      );
    } else if ('date' in item && 'location' in item) {
      // Event footer
      const event = item as Event;
      return (
        <>
          <div className="text-sm text-gray-600">{event.location}</div>
          <div className="text-sm text-gray-500 mt-2">
            {new Date(event.date).toLocaleDateString()}
          </div>
        </>
      );
    } else if ('rating' in item && 'coverImage' in item) {
      // Company footer
      const company = item as Company;
      return (
        <>
          <div className="text-sm text-gray-600">{company.location}</div>
          <div className="flex items-center mt-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <svg
                key={i}
                className={`w-4 h-4 ${i < Math.floor(company.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            <span className="text-xs text-gray-500 ml-1">({company.rating})</span>
          </div>
        </>
      );
    }
    return null;
  };

  if (safeResults.length === 0) {
    return (
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">
          No results found for "{searchTerm}" in {searchType}
        </h2>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header with custom styling */}
      <div className="text-center mb-12">
        <h2 className="font-yesteryear text-5xl text-[#DF6951] mb-2">
          Results for "{searchTerm}" in {searchType}
        </h2>
        <div className="w-24 h-1 bg-[#DF6951] mx-auto"></div>
      </div>

      {/* Results grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {safeResults.map((item: Tour | Event | Company, index: number) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md overflow-hidden transition-all hover:shadow-xl"
          >
            {/* Cover Image */}
            <div className="h-48 overflow-hidden">
              <img
                src={getCoverImage(item)}
                alt={('title' in item) ? item.title : item.name}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Card Content */}
            <div className="p-5">
              <h3 className="text-xl font-semibold mb-3 text-gray-800">
                {('title' in item) ? item.title : item.name}
              </h3>
              <p className="text-gray-600 mb-4 line-clamp-2">
                {item.description || "No description available."}
              </p>

              {/* Type-specific details */}
              {renderCardFooter(item)}

              {/* See Details Button */}
              <button
                onClick={() => handleSeeDetails(item)}
                className="mt-6 w-full py-3 bg-[#DF6951] hover:bg-[#c9553d] text-white rounded-md transition-colors duration-300 font-medium"
              >
                See Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;