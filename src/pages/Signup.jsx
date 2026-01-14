import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { supabase } from '../lib/supabase';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';
import img3 from '../assets/img3.jpg'
import Navbar from '../components/Navbar';
const Signup = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    useEffect(() => {
        if (user) navigate("/allblogs");
    }, [user, navigate]);
    const handleSignup = async (e) => {
        e.preventDefault();
        setMessage("");
        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
        });
        if (error) {
            setMessage(error.message);
            setEmail("");
            setPassword("");
            return;
        }
        else {
            toast("SignUp successful!✅")
        }
        navigate("/allblogs");
    }
    return (
        <div className='min-h-screen bg-yellow-50 py-4 animate-fadeIn'>
            <Navbar />
            <div className='flex items-center justify-center py-8 md:py-10'>
                <div className='w-180 bg-white rounded-2xl shadow-xl p-4'>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6'>
                        <div className='rounded-2xl overflow-hidden w-80 h-95'><img className="w-full object-cover" src={img3} /></div>
                        <div className='flex flex-col items-center justify-center'>
                            <form onSubmit={handleSignup} className='bg-gray-200/25 flex flex-col justify-center rounded-2xl w-70 h-85 gap-2 p-4 md:p-5'>
                                <h2 className='text-xl md:text-2xl font-semibold font-serif'>Signup</h2>
                                <p className="text-gray-700 text-sm mb-2">Create your Account</p>
                                {message && <p className='text-red-500 text-xs mb-1'>{message}</p>}
                                <label className='font-semibold  text-xs'>Your e-mail</label>
                                <input className=" border border-gray-300 rounded-lg px-3 py-1 text-sm mb-2" placeholder='email' value={email} onChange={e => setEmail(e.target.value)} />
                                <label className='font-medium text-xs'>Your password</label>
                                <input className="border border-gray-300 rounded-lg px-3  py-1 text-sm mb-3" placeholder='password' value={password} onChange={e => setPassword(e.target.value)} />
                                <button type='submit' className="bg-black text-white rounded-full py-1.5 text-sm hover:scale-105 transition duration-300">Create Account</button>
                                <span className='text-xs mt-1'>Already have an acount? <Link className='font-semibold underline text-purple-900' to="/login">Login</Link></span>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup