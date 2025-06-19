import { useEffect, useState } from 'react';
import axios from 'axios';

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

function ApiCalling(): Restaurant[] {
  const [allRestaurantArr, setAllRestaurantArr] = useState<Restaurant[]>([]);

  useEffect(() => {
    async function calling() {
      try {
        const API = "/api/dapi/restaurants/list/v5?lat=21.99740&lng=79.00110&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING";
        const resp = await axios.get(API);
        const restaurants = resp.data?.data?.cards?.[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants || [];
        setAllRestaurantArr(restaurants);
      } catch (error) {
        console.error('Error fetching restaurants:', error);
        // Fallback mock data for development
        setAllRestaurantArr([
          {
            info: {
              id: '1',
              name: 'Pizza Palace',
              avgRating: 4.5,
              sla: { deliveryTime: 30 },
              cuisines: ['Italian', 'Pizza'],
              cloudinaryImageId: 'sample-pizza',
              costForTwo: '₹300 for two'
            }
          },
          {
            info: {
              id: '2',
              name: 'Burger Junction',
              avgRating: 4.2,
              sla: { deliveryTime: 25 },
              cuisines: ['American', 'Burgers'],
              cloudinaryImageId: 'sample-burger',
              costForTwo: '₹250 for two'
            }
          }
        ]);
      }
    }
    calling();
  }, []);

  return allRestaurantArr;
}

export default ApiCalling;