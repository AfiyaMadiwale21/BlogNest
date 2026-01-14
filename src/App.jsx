import React from 'react'
import { Routes, Route, Link, Navigate } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, Bounce } from "react-toastify";
import Signup from './pages/Signup'
import Login from './pages/Login'
import AllBlogs from './pages/AllBlogs'
import CreateBlog from './pages/CreateBlog'
import MyBlogs from './pages/MyBlogs'
import BlogDetails from './pages/BlogDetails'
import ProtectedRoute from './components/ProtectedRoute';
import UpdateBlog from './pages/UpdateBlog';
const App = () => {
  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
        transition={Bounce}
      />
      <Routes>
        <Route path="/" element={<Navigate to="/allblogs" replace />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/allblogs" element={<AllBlogs />} />
        <Route path="/createblog" element={<ProtectedRoute><CreateBlog /></ProtectedRoute>} />
        <Route path="/myblogs" element={<ProtectedRoute><MyBlogs /></ProtectedRoute>} />
        <Route path="/blogdetails/:id" element={<BlogDetails />} />
        <Route path="/updateblog/:id" element={<UpdateBlog />} />
      </Routes>
    </div>
  )
}

export default App