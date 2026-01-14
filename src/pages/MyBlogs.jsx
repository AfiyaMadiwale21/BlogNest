import React, { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { NavLink, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar';
import bg2 from '../assets/bg2.jpg';
const MyBlogs = () => {
    const navigate = useNavigate();
    const [blogs, setBlogs] = useState(null)
    const [fetchError, setFetchError] = useState(null)
    useEffect(() => {
        const fetchMyBlogs = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            const { data, error } = await supabase
                .from("Blog")
                .select()
                .eq("user_id", user.id);

            if (error) {
                setFetchError("Could not fetch Blogs")
                setBlogs(null);
                console.log(error);
            } else {
                setBlogs(data);
                setFetchError(null);
            }
        }
        fetchMyBlogs();
    }, []);
    const handleDelete = async (id) => {
        const { error } = await supabase
            .from("Blog")
            .delete()
            .eq("id", id);
        if (error) {
            console.log(error);
            return;
        }
        setBlogs(prev => prev.filter(blog => blog.id !== id));
    }
    const handleUpdate = (id) => {
        navigate(`/updateblog/${id}`);
    }
    return (
        <div className='min-h-screen bg-cover bg-center bg-no-repeat py-4 animate-fadeIn' style={{ backgroundImage: `url(${bg2})` }}>
            <Navbar />
            {fetchError && <p>{fetchError}</p>}
            {blogs && blogs.length === 0 && (
                <div className="min-h-[60vh] mt-6 md:mt-10 flex items-center justify-center px-4">
                    <div className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-gray-200 p-8 text-center">
                        <div className="text-5xl mb-4">🪹</div>
                        <h3 className="text-xl luxurious font-semibold mb-2">
                            No Blogs Yet
                        </h3>
                        <p className="text-gray-800 text-sm mb-6">
                            You haven’t created any blogs yet. Start sharing your thoughts.
                        </p>
                        <NavLink
                            to="/createblog"
                            className="inline-block bg-black text-white px-6 py-2 rounded-full text-sm font-semibold hover:scale-105 transition duration-300"
                        >Create Your First Blog
                        </NavLink>
                    </div>
                </div>
            )}
            <div className="mt-6 md:mt-10 grid grid-cols-1 md:grid-cols-3  gap-5 p-4">
                {blogs && blogs.length > 0 && blogs.map(blog => (
                    <div key={blog.id}>
                        <div className='bg-white text-black shadow-md hover:shadow-2xl transition duration-300  border border-gray-300 rounded-2xl overflow-hidden'>
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
                                <h3 className='mb-2 font-semibold luxurious'>{blog.title}</h3>
                                <h4 className='font-serif text-sm text-gray-800 mb-2'>{blog.description}</h4>
                                <button className="bg-blue-200/50 border border-gray-600 px-2 py-0.5 text-xs mr-2 rounded-xl" onClick={() => handleDelete(blog.id)}>Delete</button>
                                <button className="bg-blue-200/50 px-2 border border-gray-600 py-0.5 text-xs rounded-xl" onClick={() => handleUpdate(blog.id)}>Edit</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default MyBlogs