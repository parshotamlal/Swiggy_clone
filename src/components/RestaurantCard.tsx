import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Clock, MapPin } from 'lucide-react';

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
    areaName?: string;
  };
}

interface RestaurantCardProps {
  restArr: Restaurant[];
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({ restArr }) => {
  if (!restArr || restArr.length === 0) {
    return null;
  }

  return (
    <>
      {restArr.map((restaurant) => (
        <Link
          key={restaurant.info.id}
          to={`/restaurant/${restaurant.info.id}`}
          className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden animate-slide-up"
        >
          <div className="relative overflow-hidden">
            <img
              src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${restaurant.info.cloudinaryImageId}`}
              alt={restaurant.info.name}
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            {/* Rating Badge */}
            <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm rounded-lg px-2 py-1 flex items-center space-x-1">
              <Star className="w-4 h-4 text-yellow-500 fill-current" />
              <span className="text-sm font-semibold text-gray-900">
                {restaurant.info.avgRating}
              </span>
            </div>

            {/* Delivery Time Badge */}
            <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-lg px-2 py-1 flex items-center space-x-1">
              <Clock className="w-4 h-4 text-primary-600" />
              <span className="text-sm font-semibold text-gray-900">
                {restaurant.info.sla.deliveryTime} mins
              </span>
            </div>
          </div>

          <div className="p-4">
            <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors line-clamp-1">
              {restaurant.info.name}
            </h3>
            
            <p className="text-gray-600 text-sm mb-3 line-clamp-2">
              {restaurant.info.cuisines.join(', ')}
            </p>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-1 text-gray-500">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">{restaurant.info.areaName || 'Delhi'}</span>
              </div>
              
              <div className="text-sm font-semibold text-gray-900">
                {restaurant.info.costForTwo}
              </div>
            </div>
          </div>
        </Link>
      ))}
    </>
  );
};

export default RestaurantCard;