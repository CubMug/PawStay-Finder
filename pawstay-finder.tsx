import React, { useState } from 'react';
import { Search, MapPin, Calendar, DollarSign, Users, Star, Crown, Heart, Car, Wifi, Coffee, Utensils } from 'lucide-react';

const PawStayFinder = () => {
  const [searchData, setSearchData] = useState({
    country: '',
    city: '',
    checkIn: '',
    checkOut: ''
  });
  
  const [showResults, setShowResults] = useState(false);
  const [favorites, setFavorites] = useState(new Set());

  // Mock data for accommodations
  const accommodations = [
    {
      id: 1,
      name: "The Barking Hotel",
      type: "Hotel",
      location: "London, UK",
      price: 120,
      rating: 4.8,
      reviews: 342,
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop",
      isPremium: true,
      petFee: 15,
      sizeLimit: "All pets welcome",
      petLimit: "Up to 2 pets",
      petTypes: ["Dogs", "Cats"],
      surroundings: "Hyde Park 0.3km, Pet grooming 0.1km, Cat café 0.2km",
      amenities: ["Free WiFi", "Pet beds", "Pet walking service", "Restaurant"],
      platform: "Booking.com"
    },
    {
      id: 2,
      name: "Paws & Relax B&B",
      type: "B&B",
      location: "Edinburgh, UK",
      price: 85,
      rating: 4.6,
      reviews: 128,
      image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&h=300&fit=crop",
      isPremium: false,
      petFee: 10,
      sizeLimit: "Medium pets max (25kg dogs, indoor cats)",
      petLimit: "1 pet only",
      petTypes: ["Dogs", "Cats"],
      surroundings: "Arthur's Seat 0.5km, Pet store 0.2km, Vet clinic 0.3km",
      amenities: ["Free WiFi", "Breakfast", "Pet treats", "Parking"],
      platform: "Airbnb"
    },
    {
      id: 3,
      name: "Woof Manor Resort",
      type: "Resort",
      location: "Paris, France",
      price: 180,
      rating: 4.9,
      reviews: 521,
      image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400&h=300&fit=crop",
      isPremium: true,
      petFee: 25,
      sizeLimit: "All pets welcome",
      petLimit: "Up to 3 pets",
      petTypes: ["Dogs", "Cats"],
      surroundings: "Trocadéro Gardens 0.4km, Vet clinic 0.3km, Pet spa 0.1km",
      amenities: ["Pet spa", "Pet park", "Room service", "Concierge"],
      platform: "Hotels.com"
    },
    {
      id: 4,
      name: "Cozy Canine Cottage",
      type: "Cottage",
      location: "Amsterdam, Netherlands",
      price: 95,
      rating: 4.5,
      reviews: 89,
      image: "https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=400&h=300&fit=crop",
      isPremium: false,
      petFee: 0,
      sizeLimit: "Small to medium pets (dogs up to 20kg, cats welcome)",
      petLimit: "Up to 2 pets",
      petTypes: ["Dogs", "Cats"],
      surroundings: "Vondelpark 0.6km, Pet daycare 0.4km, Cat café 0.3km",
      amenities: ["Free WiFi", "Kitchen", "Pet toys", "Fenced yard"],
      platform: "Airbnb"
    },
    {
      id: 5,
      name: "Tail Wag Inn",
      type: "Hotel",
      location: "Berlin, Germany",
      price: 110,
      rating: 4.7,
      reviews: 256,
      image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=300&fit=crop",
      isPremium: true,
      petFee: 20,
      sizeLimit: "All pets welcome",
      petLimit: "Up to 2 pets",
      petTypes: ["Dogs", "Cats"],
      surroundings: "Tiergarten 0.2km, Pet grooming 0.1km, Emergency vet 0.4km",
      amenities: ["Pet menu", "Pet walking", "Free WiFi", "Breakfast"],
      platform: "Booking.com"
    }
  ];

  const handleSearch = () => {
    if (searchData.country && searchData.city && searchData.checkIn && searchData.checkOut) {
      setShowResults(true);
    }
  };

  const toggleFavorite = (id) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(id)) {
      newFavorites.delete(id);
    } else {
      newFavorites.add(id);
    }
    setFavorites(newFavorites);
  };

  const getAmenityIcon = (amenity) => {
    if (amenity.includes('WiFi')) return <Wifi className="w-4 h-4" />;
    if (amenity.includes('Restaurant') || amenity.includes('Breakfast')) return <Utensils className="w-4 h-4" />;
    if (amenity.includes('Parking')) return <Car className="w-4 h-4" />;
    return <Coffee className="w-4 h-4" />;
  };

  // Sort accommodations to show premium first
  const sortedAccommodations = [...accommodations].sort((a, b) => {
    if (a.isPremium && !b.isPremium) return -1;
    if (!a.isPremium && b.isPremium) return 1;
    return b.rating - a.rating;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">🐾</span>
              </div>
              <h1 className="text-2xl font-bold text-gray-900">PawStay Finder</h1>
            </div>
            <p className="text-sm text-gray-600 hidden sm:block">Find perfect pet-friendly accommodations</p>
          </div>
        </div>
      </header>

      {/* Hero Section with Search */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold mb-4">Travel with Your Best Friend</h2>
            <p className="text-xl text-blue-100">Discover pet-friendly accommodations worldwide</p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                <select
                  value={searchData.country}
                  onChange={(e) => setSearchData({...searchData, country: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                >
                  <option value="">Select Country</option>
                  <option value="UK">United Kingdom</option>
                  <option value="France">France</option>
                  <option value="Germany">Germany</option>
                  <option value="Netherlands">Netherlands</option>
                  <option value="Spain">Spain</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                <input
                  type="text"
                  value={searchData.city}
                  onChange={(e) => setSearchData({...searchData, city: e.target.value})}
                  placeholder="Enter city"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Check-in</label>
                <input
                  type="date"
                  value={searchData.checkIn}
                  onChange={(e) => setSearchData({...searchData, checkIn: e.target.value})}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Check-out</label>
                <input
                  type="date"
                  value={searchData.checkOut}
                  onChange={(e) => setSearchData({...searchData, checkOut: e.target.value})}
                  min={searchData.checkIn ? new Date(new Date(searchData.checkIn).getTime() + 24 * 60 * 60 * 1000).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                />
              </div>
            </div>

            <button
              onClick={handleSearch}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-md transition duration-200 flex items-center justify-center space-x-2"
            >
              <Search className="w-5 h-5" />
              <span>Search Pet-Friendly Stays</span>
            </button>
          </div>
        </div>
      </div>

      {/* Results Section */}
      {showResults && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Pet-Friendly Accommodations in {searchData.city}, {searchData.country}
            </h3>
            <p className="text-gray-600">
              {searchData.checkIn} - {searchData.checkOut} • {accommodations.length} properties found
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {sortedAccommodations.map((accommodation) => (
              <div key={accommodation.id} className={`bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200 ${accommodation.isPremium ? 'ring-2 ring-yellow-400' : ''}`}>
                {accommodation.isPremium && (
                  <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 flex items-center space-x-2">
                    <Crown className="w-4 h-4" />
                    <span className="text-sm font-semibold">Premium Partner</span>
                  </div>
                )}
                
                <div className="relative">
                  <img 
                    src={accommodation.image} 
                    alt={accommodation.name}
                    className="w-full h-48 object-cover"
                  />
                  <button
                    onClick={() => toggleFavorite(accommodation.id)}
                    className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow"
                  >
                    <Heart className={`w-5 h-5 ${favorites.has(accommodation.id) ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
                  </button>
                </div>

                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900">{accommodation.name}</h4>
                      <p className="text-sm text-gray-600">{accommodation.type}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-gray-900">€{accommodation.price}</p>
                      <p className="text-sm text-gray-600">per night</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 mb-3">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{accommodation.location}</span>
                  </div>

                  <div className="flex items-center space-x-2 mb-3">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium">{accommodation.rating}</span>
                    <span className="text-sm text-gray-600">({accommodation.reviews} reviews)</span>
                  </div>

                  {/* Pet Information */}
                  <div className="bg-blue-50 rounded-lg p-3 mb-3">
                    <h5 className="font-medium text-gray-900 mb-2">🐾 Pet Policy</h5>
                    <div className="space-y-1 text-sm">
                      <div className="flex items-center space-x-2">
                        <DollarSign className="w-4 h-4 text-gray-400" />
                        <span>Pet fee: {accommodation.petFee === 0 ? 'Free' : `€${accommodation.petFee}/night`}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Users className="w-4 h-4 text-gray-400" />
                        <span>{accommodation.petLimit}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                          {accommodation.petTypes.join(' • ')}
                        </span>
                      </div>
                      <p className="text-gray-600">{accommodation.sizeLimit}</p>
                    </div>
                  </div>

                  {/* Surroundings */}
                  <div className="mb-3">
                    <h5 className="font-medium text-gray-900 mb-1">🌳 Surroundings</h5>
                    <p className="text-sm text-gray-600">{accommodation.surroundings}</p>
                  </div>

                  {/* Amenities */}
                  <div className="mb-4">
                    <h5 className="font-medium text-gray-900 mb-2">Amenities</h5>
                    <div className="flex flex-wrap gap-2">
                      {accommodation.amenities.slice(0, 3).map((amenity, index) => (
                        <div key={index} className="flex items-center space-x-1 bg-gray-100 px-2 py-1 rounded text-xs">
                          {getAmenityIcon(amenity)}
                          <span>{amenity}</span>
                        </div>
                      ))}
                      {accommodation.amenities.length > 3 && (
                        <span className="text-xs text-gray-500">+{accommodation.amenities.length - 3} more</span>
                      )}
                    </div>
                  </div>

                  {/* Book Now Button */}
                  <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-2 px-4 rounded-md transition duration-200">
                    Book on {accommodation.platform}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-2">PawStay Finder</h3>
            <p className="text-gray-400">Making travel with your furry friends easier, one stay at a time.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PawStayFinder;