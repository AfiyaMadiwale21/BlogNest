import React, { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { useNavigate, useParams } from 'react-router-dom'
const UpdateBlog = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [author, setAuthor] = useState('');
    useEffect(() => {
        const fetchMyBlogs = async () => {
            const { data, error } = await supabase
                .from("Blog")
                .select()
                .eq("id", id)
                .single();
            if (error) {
                console.log(error);
            }
            if (data) {
                console.log(data);
                setTitle(data.title)
                setDescription(data.description)
                setAuthor(data.author)
            }
        }
        fetchMyBlogs();
    }, [id]);

    const handleUpdate = async () => {
        const { error } = await supabase
            .from("Blog")
            .update({ title, description, author })
            .eq("id", id);
        if (!error) {
            navigate("/myblogs")
        }
    }
    return (
        <div className="min-h-screen flex items-center justify-center bg-blue-100/80 px-4 animate-fadeIn">
            <div className="w-full border border-gray-400 max-w-md bg-white rounded-2xl shadow-xl mt-8 md:mt-10 p-5">
                <h2 className="text-2xl luxurious font-semibold text-center mb-4">
                    Update Blog
                </h2>
                <div className="flex flex-col gap-4">
                    <div>
                        <label htmlFor="title" className="block text-sm font-semibold mb-1">
                            Title
                        </label>
                        <input
                            id="title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter blog title"
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black/80"
                        />
                    </div>
                    <div>
                        <label htmlFor="description" className="block text-sm font-semibold mb-1">
                            Description
                        </label>
                        <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Enter blog description"
                            rows={4}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black/80 resize-none"
                        />
                    </div>

                    <div>
                        <label htmlFor="author" className="block text-sm font-semibold mb-1">
                            Author
                        </label>
                        <input id="author" type="text" value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="Author name"
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black/80"
                        />
                    </div>

                    <button
                        onClick={handleUpdate}
                        className="mt-2 luxurious bg-black text-white rounded-full py-2 text-sm font-semibold hover:scale-105 transition duration-300"
                    >
                        Update Blog
                    </button>

                </div>
            </div>
        </div>
    )

}

export default UpdateBlog