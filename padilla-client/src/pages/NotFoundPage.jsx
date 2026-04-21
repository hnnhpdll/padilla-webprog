import React from 'react';
import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
      
      {/* Big 404 */}
      <h1 className="text-7xl font-bold text-zinc-900">Page Not Found</h1>

    

      {/* Description */}
      <p className="text-zinc-500 mt-2 max-w-md">
        The page you are looking for might have been removed, 
        had its name changed, or is temporarily unavailable.
      </p>

      {/* Button */}
      <Link to="/">
        <button className="mt-6 px-6 py-3 bg-zinc-900 text-white rounded-xl hover:bg-zinc-700 transition">
          Go Back Home
        </button>
      </Link>

    </div>
  );
}

export default NotFoundPage;