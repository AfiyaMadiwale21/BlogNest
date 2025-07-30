import React, { useEffect, useState } from "react";
import { Routes, Route, Link, Navigate, useNavigate } from "react-router-dom";
import Home from "./Home";
import Signup from "./Signup";
import About from "./About";
import Contact from "./Contact";
import Login from "./Login";
import PostBlog from "./PostBlog";
import AllBlogs from "./AllBlogs";
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
    <div className="bg-black text-white">
      <nav>
        <div>
          <ul className="py-2 md:flex gap-8 md:justify-center md:items-center md:p-4 font-cardo font-extralight text-lg">
            <li><Link to="/" className="hover:text-xl duration-300">Home</Link></li>
            <li><Link to="/postblog" className="hover:text-xl duration-300">PostBlog</Link></li>
            <li><Link to="/allblogs" className="hover:text-xl duration-300">AllBlogs</Link></li>
            <li><Link to="/about" className="hover:text-xl duration-300">About</Link></li>
            <li><Link to="/contact" className="hover:text-xl duration-300">Contact</Link></li>


            {!isLoggedIn && (
              <>
                <li><Link to="/signup" className="px-5 py-1.5 text-white duration-200 hover:border-2 rounded-md">Signup</Link></li>
              </>
            )}

            {isLoggedIn && (
              <li>
                <button
                  onClick={handleLogout}
                  className="px-5 py-1.5 text-white  duration-200 hover:border-2 rounded-md">
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
          path="/postblog"
          element={
            isLoggedIn ? <PostBlog /> : <Navigate to="/Signup" />
          }
        />
        <Route path="/allblogs" element={<AllBlogs />
        } />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
