import React, { useState } from 'react';
import { Search as SearchIcon, X } from 'lucide-react';

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

interface SearchProps {
  restArr: Restaurant[];
  setAllRestArray: (restaurants: Restaurant[]) => void;
}

const Search: React.FC<SearchProps> = ({ restArr, setAllRestArray }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    
    if (value.trim() === '') {
      setAllRestArray(restArr);
      return;
    }

    const filteredRestaurants = restArr.filter((restaurant) =>
      restaurant.info.name.toLowerCase().includes(value.toLowerCase()) ||
      restaurant.info.cuisines.some(cuisine => 
        cuisine.toLowerCase().includes(value.toLowerCase())
      )
    );
    
    setAllRestArray(filteredRestaurants);
  };

  const clearSearch = () => {
    setSearchTerm('');
    setAllRestArray(restArr);
  };

  return (
    <div className="relative max-w-md">
      <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="Search restaurants or cuisines..."
        className="w-full pl-12 pr-12 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-primary-100 focus:border-primary-500 transition-all"
      />
      {searchTerm && (
        <button
          onClick={clearSearch}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};

export default Search;