import React from 'react'
import { supabase } from '../lib/supabase'
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';
import img2 from '../assets/img2.jpg';
import Navbar from '../components/Navbar';
const Login = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    useEffect(() => {
        if (user) navigate("/allblogs");
    }, [user, navigate]);
    const handleLogin = async (e) => {
        e.preventDefault();
        setMessage("");
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        });
        if (error) {
            setMessage(error.message)
            setEmail("");
            setPassword("");
            return;
        }
        else {
            toast("Login successful!✅")
        }
        navigate('/allblogs');
    }
    return (
        <div className='min-h-screen bg-blue-100/90 py-4 animate-fadeIn'>
            <Navbar />
            <div className='flex items-center justify-center py-8 md:py-10'>
                <div className='w-190 bg-white rounded-2xl shadow-xl p-4'>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-5'>
                        <div className='rounded-2xl overflow-hidden mt-10 h-90'><img className="w-full object-cover scale-110" src={img2} /></div>
                        <div className='flex flex-col items-center justify-center'>
                            <form onSubmit={handleLogin} className='bg-gray-200/25 flex flex-col justify-center rounded-2xl w-75 h-85 gap-2 p-4 md:p-5'>
                                <h2 className='text-2xl font-semibold font-serif mb-2'>Login</h2>
                                {message && <p className='text-red-500 text-xs mb-1'>{message}</p>}
                                <label className='font-semibold  text-xs'>Your e-mail</label>
                                <input className=" border border-gray-300 rounded-lg px-3 py-1 text-sm mb-2" placeholder="Email" value={email}
                                    onChange={e => setEmail(e.target.value)} />
                                <label className='font-semibold text-xs'>Your password</label>
                                <input className="border border-gray-300 rounded-lg px-3 py-1 text-sm mb-3" type="password" placeholder="Password" value={password}
                                    onChange={e => setPassword(e.target.value)} />
                                <button type="submit" className="bg-black text-white rounded-full py-1.5 text-sm hover:scale-105 transition duration-300">Login</button>
                                <span className='text-xs mt-1'>Dont have an account? <Link className='font-semibold underline text-purple-900' to="/signup">SignUp</Link></span>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </div >
    )
}

export default Login