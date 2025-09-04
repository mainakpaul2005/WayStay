import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  const imageUrl = "https://images.pexels.com/photos/1769632/pexels-photo-1769632.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";

  return (
    <div className="relative min-h-screen bg-gray-100 flex items-center justify-center">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${imageUrl})`, filter: 'brightness(50%)' }}
      ></div>
      <div className="relative z-10 text-center text-white p-8">
        <h1 className="text-5xl font-bold mb-4">WayStay: Redefining the Travel Experience</h1>
        <p className="text-xl max-w-2xl mx-auto mb-8">
          From the sun-kissed beaches of Goa to the vibrant streets of Tokyo,
          WayStay curates unique travel experiences that redefine what it means
          to explore the world.
        </p>
        <div className="flex justify-center space-x-4">
          <Link to="/login" className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors">
            Login
          </Link>
          <Link to="/register" className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition-colors">
            Register
          </Link>
          <Link to="/profile" className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition-colors">
            My Profile
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;