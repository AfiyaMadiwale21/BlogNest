import React, { useState } from 'react'
import { supabase } from '../lib/supabase'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import bg2 from '../assets/bg2.jpg';
import Navbar from '../components/Navbar';
const CreateBlog = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [author, setAuthor] = useState('');
    const [formError, setformError] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    const handelSubmit = async (e) => {
        e.preventDefault();
        if (!title || !description || !author || !imageUrl) {
            setformError("Please fill in all the fields")
            return;
        }
        const { data: { user } } = await supabase.auth.getUser();
        const { data, error } = await supabase
            .from('Blog')
            .insert([{ title, description, author, image_url: imageUrl, user_id: user.id }])
            .select();
        if (error) {
            setformError("error has occured")
        }
        if (data) {
            console.log(data)
            setformError(null)
            toast("Your Blog is added ✔️")
            navigate('/allblogs')
        }
    }
    return (
        <div className="min-h-screen bg-cover bg-center bg-no-repeat py-4 animate-fadeIn"
            style={{ backgroundImage: `url(${bg2})` }}>
            <Navbar />
            <div className='flex items-center justify-center mt-8 md:mt-20'>
                <div className='w-full flex flex-col items-center justify-center max-w-2xl bg-white/95 shadow-2xl rounded-3xl p-3 md:p-5'>
                    <h2 className='mt-2 mb-3 text-xl font-semibold luxurious'> Create Blog</h2>
                    <form onSubmit={handelSubmit} className='w-full flex flex-col bg-white  shadow-2xl gap-2 rounded-3xl p-4 md:p-6'>
                        <label className='font-semibold  text-sm' htmlFor='title'>Title:</label>
                        <input className=" border border-gray-300 rounded-sm px-3 py-1 text-sm" type='text' id='title' placeholder='title' value={title} onChange={(e) => setTitle(e.target.value)} />
                        <label className='font-semibold  text-sm' htmlFor='description'>Description:</label>
                        <textarea className=" border border-gray-300 rounded-sm px-3 py-1 text-sm" placeholder='description' id='description' value={description} onChange={(e) => setDescription(e.target.value)} />
                        <label className='font-semibold  text-sm' htmlFor='author'>Author:</label>
                        <input className=" border border-gray-300 rounded-sm px-3 py-1 text-sm" type='text' placeholder='author' id='author' value={author} onChange={(e) => setAuthor(e.target.value)} />
                        <label className='font-semibold text-sm' htmlFor='image'>
                            Image URL:
                        </label>
                        <input
                            className="border border-gray-300 rounded-sm px-3 py-1 text-sm"
                            type="text"
                            id="image"
                            placeholder="Paste image URL (Unsplash / Pexels)"
                            value={imageUrl}
                            onChange={(e) => setImageUrl(e.target.value)}
                        />
                        <button className='bg-black text-sm text-white hover:scale-105 transition duration-300 rounded-sm px-5 py-1 mx-auto mt-2 luxurious' type='submit'>Post the blog</button>
                        {formError && <p className='text-red-500 text-xs mt-2'>{formError}</p>}
                    </form>

                </div>
            </div>
        </div>
    )
}

export default CreateBlog