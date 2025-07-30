import React, { useEffect, useState } from "react";
import axios from "axios";

function AllBlogs() {
    // Create state to store blog data
    const [blogs, setBlogs] = useState([]);

    // Fetch blogs only once when the page loads
    useEffect(() => {
        axios.get("http://localhost:5000/api/blog")
            .then(res => setBlogs(res.data)) // Store blogs in state
            .catch(err => console.error("Failed to fetch blogs:", err));
    }, []);

    return (
        <div className="mt-10">
            <ul className="space-y-8 max-w-4xl mx-auto">
                {blogs.map(blog => (
                    <li
                        key={blog._id}
                        className="p-5 ml-8 border border-gray-200 rounded-md bg-white text-black hover:scale-105 duration-500 ease-in-out"
                    >
                        <h3 className="underline text-lg capitalize font-semibold text-black">{blog.title}</h3>
                        <p className="capitalize text-gray-800 whitespace-pre-line leading-tight py-2 text-sm">{blog.content}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default AllBlogs;
