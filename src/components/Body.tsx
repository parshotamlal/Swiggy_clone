import React, { useEffect, useState } from 'react';
import RestaurantCard from './RestaurantCard';
import ApiCalling from './ApiCalling';
import Search from './Search';
import { Filter, Star, Clock } from 'lucide-react';

interface Restaurant {
  info: {
    id: string;
    name: string;
    avgRating: number;
    sla: {
      deliveryTime: number;
    };
    cuisines: string[];
    cloudinaryImageId: string;
    costForTwo: string;
  };
}

const Body: React.FC = () => {
  const restArr = ApiCalling();
  const [allRestArray, setAllRestArray] = useState<Restaurant[]>(restArr);
  const [isClicked, setIsClicked] = useState(false);
  const [isClicked2, setIsClicked2] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (restArr && restArr.length) {
      setAllRestArray(restArr);
      setLoading(false);
    }
  }, [restArr]);

  function filterTopRestaurant(restArr: Restaurant[]) {
    const ratingFilteredArray = restArr.filter((restaurant) => restaurant.info.avgRating >= 4.5);
    setAllRestArray(ratingFilteredArray);
    setIsClicked(true);
    setIsClicked2(false);
  }

  function resetFilter() {
    setAllRestArray(restArr);
    setIsClicked2(true);
    setIsClicked(false);
  }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-8"></div>
          <div className="flex space-x-4 mb-8">
            <div className="h-10 bg-gray-200 rounded w-32"></div>
            <div className="h-10 bg-gray-200 rounded w-32"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-gray-200 rounded-2xl h-80"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Restaurants with online food delivery in Delhi
        </h2>
        <p className="text-gray-600">Discover amazing restaurants near you</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4 mb-8">
        <div className="flex items-center space-x-2 text-gray-700">
          <Filter className="w-5 h-5" />
          <span className="font-medium">Filters:</span>
        </div>
        
        <button
          onClick={() => filterTopRestaurant(restArr)}
          className={`flex items-center space-x-2 px-4 py-2 rounded-full border-2 transition-all duration-200 ${
            isClicked
              ? 'bg-primary-500 border-primary-500 text-white shadow-lg'
              : 'border-gray-300 text-gray-700 hover:border-primary-300 hover:bg-primary-50'
          }`}
        >
          <Star className="w-4 h-4" />
          <span>Ratings 4.5+</span>
        </button>

        <button
          onClick={() => resetFilter()}
          className={`flex items-center space-x-2 px-4 py-2 rounded-full border-2 transition-all duration-200 ${
            isClicked2
              ? 'bg-secondary-500 border-secondary-500 text-white shadow-lg'
              : 'border-gray-300 text-gray-700 hover:border-secondary-300 hover:bg-secondary-50'
          }`}
        >
          <span>All Restaurants</span>
        </button>

        <button className="flex items-center space-x-2 px-4 py-2 rounded-full border-2 border-gray-300 text-gray-700 hover:border-primary-300 hover:bg-primary-50 transition-all duration-200">
          <Clock className="w-4 h-4" />
          <span>Fast Delivery</span>
        </button>
      </div>

      {/* Search */}
      <div className="mb-8">
        <Search restArr={restArr} setAllRestArray={setAllRestArray} />
      </div>

      {/* Restaurant Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <RestaurantCard restArr={allRestArray} />
      </div>

      {allRestArray.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">🍽️</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No restaurants found</h3>
          <p className="text-gray-600">Try adjusting your filters or search terms</p>
        </div>
      )}
    </section>
  );
};

export default Body;