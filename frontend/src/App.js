import React, { useEffect, useState } from "react";
import { Routes, Route, Link, Navigate, useNavigate } from "react-router-dom";
import Home from "./Home";
import Signup from "./Signup";
import About from "./About";
import Contact from "./Contact";
import Login from "./Login";
import BlogDashboard from "./BlogDashboard";
import Footer from "./Footer";

function App() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check token on app load
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <div>
      <nav className="bg-blue-100 dark:bg-gray-900 w-full h-[65px] flex items-center justify-center px-15">
        <div className="flex items-center">
          <ul className="flex gap-12 items-center">
            <li><Link to="/" className="hover:underline font-bold text-lg">Home</Link></li>
            <li><Link to="/about" className="hover:underline font-bold text-lg">About</Link></li>
            <li><Link to="/contact" className="hover:underline font-bold text-lg">Contact</Link></li>
            <li><Link to="/blogdashboard" className="hover:underline font-bold text-lg">BlogDashboard</Link></li>

            {!isLoggedIn && (
              <>
                <li><Link to="/signup" className="px-6 py-1.5 bg-black text-white hover:border-4 border-double rounded-md">Signup</Link></li>
              </>
            )}

            {isLoggedIn && (
              <li>
                <button
                  onClick={handleLogout}
                  className="px-6 py-1.5 bg-black text-white hover:border-4 border-double rounded-md"
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/signup" element={<Signup setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />

        <Route
          path="/blogdashboard"
          element={
            isLoggedIn ? <BlogDashboard /> : <Navigate to="/login" />
          }
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
