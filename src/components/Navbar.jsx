import React from 'react'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'
const Navbar = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false)
    const handleLogout = async () => {
        await supabase.auth.signOut();
        navigate("/allblogs");
    };
    return (
        <div>
            <nav className='relative z-50 flex items-center justify-center'>
                <div className='flex items-center  text-md bg-white rounded-4xl luxurious font-normal h-10 px-5 w-[90%] md:w-150 border-fuchsia-200/90 border'>
                    <p className='font-semibold text-lg'>Blog<span className='text-pink-600'>Nest</span></p>
                    <div className='hidden  md:flex flex-1 items-center justify-center gap-8'>
                        <NavLink className='hover:underline' to="/allblogs">All Blogs</NavLink>
                        {!user && (<>
                            <NavLink className='hover:underline' to='/createblog'>Create Blog</NavLink>
                            <NavLink className='hover:underline' to="/login">Sign in</NavLink>
                            <NavLink className='bg-black text-white px-4 py-1 rounded-4xl' to="/signup">SignUp</NavLink>
                        </>)}
                        {user && (
                            <>
                                <NavLink className='hover:underline' to="/createblog">Create Blog</NavLink>
                                <NavLink className='hover:underline' to="/myblogs">My Blogs</NavLink>
                                <button className='bg-amber-300/30 text-black rounded-xl px-3 py-0.5 hover:scale-105 transition duration-300' onClick={handleLogout}>Logout</button>
                            </>
                        )}
                    </div>
                    <div className="relative ml-auto md:hidden">
                        <button
                            className="text-2xl"
                            onClick={() => setOpen(!open)}
                        >
                            ☰
                        </button>

                    </div>
                    {open && (
                        <div className="absolute right-0 top-12 bg-white w-30 border-2 border-black rounded-2xl shadow-lg py-4 mt-2 flex flex-col items-center gap-4 md:hidden">
                            <NavLink to="/allblogs">All Blogs</NavLink>

                            {!user && (
                                <>
                                    <NavLink to="/createblog">Create Blog</NavLink>
                                    <NavLink to="/login">Sign in</NavLink>
                                    <NavLink className="bg-black text-white px-4 py-1 rounded-4xl" to="/signup">
                                        SignUp
                                    </NavLink>
                                </>
                            )}

                            {user && (
                                <>
                                    <NavLink to="/createblog">Create Blog</NavLink>
                                    <NavLink to="/myblogs">My Blogs</NavLink>
                                    <button
                                        onClick={handleLogout}
                                        className="bg-amber-300/30 px-3 py-1 rounded-2xl"
                                    >
                                        Logout
                                    </button>
                                </>
                            )}
                        </div>
                    )}
                </div>
            </nav >
        </div >
    )
}

export default Navbar