import React from 'react';
import { useRouteError, Link } from 'react-router-dom';
import { Home, RefreshCw } from 'lucide-react';

interface RouteError {
  data?: string;
  status?: number;
  statusText?: string;
  message?: string;
}

const Error: React.FC = () => {
  const error = useRouteError() as RouteError;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <div className="text-8xl mb-4">🍽️</div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Oops!</h1>
          <h2 className="text-xl text-gray-600 mb-4">Something went wrong</h2>
          
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <p className="text-red-800 font-medium">
                {error.status && `${error.status} - `}
                {error.statusText || error.message || 'An unexpected error occurred'}
              </p>
              {error.data && (
                <p className="text-red-600 text-sm mt-2">{error.data}</p>
              )}
            </div>
          )}
          
          <p className="text-gray-600 mb-8">
            Don't worry, our chefs are working on fixing this issue. 
            In the meantime, you can try refreshing the page or go back to the homepage.
          </p>
        </div>

        <div className="space-y-4">
          <button
            onClick={() => window.location.reload()}
            className="w-full flex items-center justify-center space-x-2 bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
          >
            <RefreshCw className="w-5 h-5" />
            <span>Try Again</span>
          </button>
          
          <Link
            to="/"
            className="w-full flex items-center justify-center space-x-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-xl font-semibold transition-colors"
          >
            <Home className="w-5 h-5" />
            <span>Go Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Error;