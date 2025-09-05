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
  const [menuOpen, setMenuOpen] = useState(false);

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
        <div className="flex justify-between items-center md:justify-center font-cardo font-extralight">

          <div className=" flex justify-between items-center text-xl font-medium md:hidden size-24"><img src="https://i.pinimg.com/originals/af/09/41/af0941ba06185e9846af909ba9350baf.png" />

            <div className="md:hidden">
              <button onClick={() => setMenuOpen(!menuOpen)} className="text-3xl">
                ☰
              </button>
            </div>
          </div>

          <ul
            className={`${menuOpen ? 'block' : 'hidden'
              } py-2 flex flex-col gap-2 mr-5 md:flex md:flex-row md:gap-8 md:justify-center md:items-center md:p-4 font-cardo font-extralight text-lg`}
          >
            <li>
              <Link to="/" className="hover:text-2xl duration-300">
                Home
              </Link>
            </li>
            <li>
              <Link to="/postblog" className="hover:text-xl duration-300">
                PostBlog
              </Link>
            </li>
            <li>
              <Link to="/allblogs" className="hover:text-xl duration-300">
                AllBlogs
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-xl duration-300">
                About
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-xl duration-300">
                Contact
              </Link>
            </li>

            {!isLoggedIn && (
              <li>
                <Link
                  to="/signup"
                  className="px-5 py-1.5 text-white bg-blue-500 hover:bg-blue-600 duration-200 rounded-md"
                >
                  Signup
                </Link>
              </li>
            )}

            {isLoggedIn && (
              <li>
                <button
                  onClick={handleLogout}
                  className="px-5 py-1.5 text-white bg-red-500 hover:bg-red-600 duration-200 rounded-md"
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
