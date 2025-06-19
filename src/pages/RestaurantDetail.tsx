import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Star, Clock, MapPin, ArrowLeft, Plus } from 'lucide-react';
import { addItem } from '../store/cartSlice';

interface MenuItem {
  card: {
    info: {
      id: string;
      name: string;
      price: number;
      imageId?: string;
      category?: string;
      description?: string;
    };
  };
}

const RestaurantDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const [restaurant, setRestaurant] = useState<any>(null);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock restaurant data for demonstration
    setRestaurant({
      info: {
        id: id,
        name: 'Pizza Palace',
        avgRating: 4.5,
        sla: { deliveryTime: 30 },
        cuisines: ['Italian', 'Pizza', 'Pasta'],
        cloudinaryImageId: 'sample-restaurant',
        costForTwo: '₹300 for two',
        areaName: 'Connaught Place',
        feeDetails: {
          restaurantId: id,
          fees: [{ name: 'BASE_DISTANCE', fee: 4000 }]
        }
      }
    });

    // Mock menu items
    setMenuItems([
      {
        card: {
          info: {
            id: '1',
            name: 'Margherita Pizza',
            price: 29900,
            imageId: 'sample-pizza',
            category: 'Pizza',
            description: 'Classic pizza with fresh tomatoes, mozzarella, and basil'
          }
        }
      },
      {
        card: {
          info: {
            id: '2',
            name: 'Pepperoni Pizza',
            price: 34900,
            imageId: 'sample-pepperoni',
            category: 'Pizza',
            description: 'Delicious pizza topped with pepperoni and cheese'
          }
        }
      },
      {
        card: {
          info: {
            id: '3',
            name: 'Pasta Carbonara',
            price: 24900,
            category: 'Pasta',
            description: 'Creamy pasta with bacon, eggs, and parmesan cheese'
          }
        }
      }
    ]);

    setLoading(false);
  }, [id]);

  const handleAddToCart = (item: MenuItem['card']) => {
    dispatch(addItem(item));
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="animate-pulse">
          <div className="h-64 bg-gray-200 rounded-2xl mb-8"></div>
          <div className="h-8 bg-gray-200 rounded w-1/2 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/3 mb-8"></div>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded-xl"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!restaurant) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h2 className="text-2xl font-bold text-gray-900">Restaurant not found</h2>
        <Link to="/" className="text-primary-600 hover:text-primary-700 mt-4 inline-block">
          Go back to restaurants
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Button */}
      <Link
        to="/"
        className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Back to restaurants</span>
      </Link>

      {/* Restaurant Header */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
        <div className="h-64 bg-gradient-to-r from-primary-500 to-primary-600 relative">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="absolute bottom-6 left-6 text-white">
            <h1 className="text-4xl font-bold mb-2">{restaurant.info.name}</h1>
            <p className="text-lg opacity-90">{restaurant.info.cuisines.join(', ')}</p>
          </div>
        </div>
        
        <div className="p-6">
          <div className="flex flex-wrap items-center gap-6 text-sm">
            <div className="flex items-center space-x-2">
              <Star className="w-5 h-5 text-yellow-500 fill-current" />
              <span className="font-semibold">{restaurant.info.avgRating}</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-gray-500" />
              <span>{restaurant.info.sla.deliveryTime} mins</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <MapPin className="w-5 h-5 text-gray-500" />
              <span>{restaurant.info.areaName}</span>
            </div>
            
            <div className="font-semibold text-primary-600">
              {restaurant.info.costForTwo}
            </div>
          </div>
        </div>
      </div>

      {/* Menu */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Menu</h2>
        
        <div className="space-y-4">
          {menuItems.map((item) => (
            <div
              key={item.card.info.id}
              className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:shadow-md transition-shadow"
            >
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  {item.card.info.name}
                </h3>
                {item.card.info.description && (
                  <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                    {item.card.info.description}
                  </p>
                )}
                <p className="text-lg font-bold text-primary-600">
                  ₹{(item.card.info.price / 100).toFixed(2)}
                </p>
              </div>
              
              {item.card.info.imageId && (
                <img
                  src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/${item.card.info.imageId}`}
                  alt={item.card.info.name}
                  className="w-24 h-24 rounded-xl object-cover ml-4"
                />
              )}
              
              <button
                onClick={() => handleAddToCart(item.card)}
                className="ml-4 bg-primary-500 hover:bg-primary-600 text-white p-3 rounded-xl transition-colors"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetail;