import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import Home from './components/Home';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="App">
          <nav className="bg-white shadow-md p-4 flex justify-between items-center">
            <Link to="/" className="text-2xl font-bold text-blue-600">WayStay</Link>
            <div className="space-x-4">
              <Link to="/login" className="text-gray-700 hover:text-blue-500 transition-colors">Login</Link>
              <Link to="/register" className="text-gray-700 hover:text-blue-500 transition-colors">Register</Link>
              <Link to="/profile" className="text-gray-700 hover:text-blue-500 transition-colors">Profile</Link>
            </div>
          </nav>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;