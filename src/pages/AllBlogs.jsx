import React, { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import bg from '../assets/bg.jpg';
const AllBlogs = () => {
    const [fetchError, setfetchError] = useState(null);
    const [Blogs, setBlogs] = useState(null);
    useEffect(() => {
        const fetchblog = async () => {
            const { data, error } = await supabase.from('Blog').select()
            if (error) {
                setfetchError("could not fetch")
                setBlogs(null)
                console.log(error);
            }
            if (data) {
                setBlogs(data)
                setfetchError(null)
            }
        }
        fetchblog()
    }, []);
    return (
        <div className='min-h-screen bg-cover bg-no-repeat py-4 animate-fadeIn' style={{ backgroundImage: `url(${bg})` }} >
            <Navbar />
            {fetchError && <p>{fetchError}</p>}
            <div className='bg-white/75  mt-8 md:mt-10 mx-3 md:mx-5 rounded-2xl'>
                <div className="grid grid-cols-1 md:grid-cols-3  gap-5 p-4">
                    {Blogs && (Blogs.map(blog => (
                        <Link to={`/blogdetails/${blog.id}`} key={blog.id}>
                            <div className='bg-white text-black shadow-md hover:shadow-gray-700 transition duration-300  border border-gray-300 rounded-2xl overflow-hidden'>
                                <div className='relative h-50 w-full'>
                                    <img
                                        src={blog.image_url}
                                        alt={blog.title}
                                        className="h-full w-full object-cover"
                                    />
                                    <div className="absolute bottom-0 left-0 w-full bg-white/60 backdrop-blur-md px-4 py-1 text-xs">
                                        <p className='font-normal luxurious'>{blog.author}</p>
                                        <p className="text-gray-600">Published recently</p>
                                    </div>
                                </div>
                                <div className='p-3'>
                                    <h3 className='mb-1 font-semibold luxurious'>{blog.title}</h3>
                                    <h4 className='font-serif text-xs text-gray-800 mb-2'>{blog.description.slice(0, 100)}...</h4>
                                    <span className="text-xs hover:underline text-purple-900">
                                        Read post ❯❯❯❯
                                    </span>
                                </div>
                            </div>
                        </Link>
                    )))}
                </div>
            </div>
        </div>
    )
}

export default AllBlogs