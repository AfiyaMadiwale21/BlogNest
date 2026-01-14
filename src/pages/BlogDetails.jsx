import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { supabase } from '../lib/supabase';
import bg3 from '../assets/bg3.jpg';
import Navbar from '../components/Navbar';

const BlogDetails = () => {
    const { id } = useParams();
    const [blog, setblog] = useState();
    useEffect(() => {
        const fetchblog = async () => {
            const { data, error } = await supabase
                .from("Blog")
                .select()
                .eq("id", id)
                .single();

            if (data) {
                setblog(data);
            }
        };
        fetchblog();
    }, [id]);
    if (!blog) return <p>Loading blog...</p>;
    return (
        <div className='min-h-screen bg-cover bg-center bg-no-repeat py-4 animate-fadeIn' style={{ backgroundImage: `url(${bg3})` }}>
            <Navbar />
            <div className='flex items-center justify-center mt-8 md:mt-10'>
                <div className='flex flex-col items-center justify-center gap-3 p-4 border border-gray-300 w-full max-w-3xl bg-white/95 rounded-2xl shadow-lg'>
                    <h2 className='text-3xl px-4 font-semibold luxurious mb-4'>{blog.title}</h2>
                    <div className='relative w-[80%]'>
                        <img
                            src={blog.image_url}
                            alt={blog.title}
                            className="h-80 w-full object-cover rounded-2xl"
                        />
                        <div className="absolute bottom-0 left-0 w-full bg-white/60 backdrop-blur-md px-4 py-1 text-xs">
                            <p className='font-normal luxurious'>{blog.author}</p>
                            <p className="text-gray-600">Published recently</p>
                        </div>
                    </div>

                    <h4 className='font-serif text-sm text-gray-800 mt-2 mb-2 px-4'>{blog.description}</h4>
                </div>
            </div>
        </div>
    )
}

export default BlogDetails