import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";

function PostBlog() {
    const [blogs, setBlogs] = useState([]);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const navigate = useNavigate();

    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    useEffect(() => {
        if (!token) return navigate("/Signup");
        axios.get("http://localhost:5000/api/blog").then(res => setBlogs(res.data));
    }, [navigate, token]);
    const handleAdd = () => {
        if (!token || !userId) return;
        axios.post("http://localhost:5000/api/blog", { title, content, userId }, {
            headers: { Authorization: `Bearer ${token}` }
        }).then(res => {
            setBlogs([...blogs, res.data])
            setTitle("");
            setContent("");
        });
    };
    const handleDelete = id => {
        axios.delete(`http://localhost:5000/api/blog/${id}`)
            .then(() => setBlogs(blogs.filter(b => b._id !== id)));
    };
    return (
        <div>
            <div className="bg-white text-black max-w-md mx-auto mt-10 p-4 space-y-4 rounded-lg">
                <h2 className="text-2xl font-bold text-center font-cardo">Create a blog post</h2>
                <input
                    className="w-full p-2 border border-gray-300 focus:border-1"
                    value={title}
                    placeholder="Title"
                    onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                    className="w-full p-2 border border-gray-300 focus:border-1"
                    value={content}
                    placeholder="Content"
                    onChange={(e) => setContent(e.target.value)}
                    rows={5}
                />
                <button
                    className="px-3 py-1.5 bg-pink-300 text-gray-900 hover:border-4 border-double duration-300"
                    onClick={handleAdd}
                >
                    Add Blog
                </button>
            </div>
            <div className="mt-10">

                <ul className="space-y-6 mx-6 max-w-4xl">
                    {blogs.map(({ _id, title, content, userId: bloguserId }) => (
                        bloguserId === userId && (
                            //only show blogs created by the logged in user
                            <li key={_id} className="p-5 ml-8 border border-gray-200 rounded-md  bg-white text-black hover:scale-105 duration-500 ease-in-out">
                                <h3 className=" underline text-lg capitalize font-semibold text-black">{title}</h3>
                                <p className=" capitalize text-gray-800 whitespace-pre-line leading-tight py-2 text-sm">{content}</p>
                                <button
                                    className="px-3 py-1.2 bg-purple-300 text-gray-800 hover:border-4 border-double duration-300"
                                    onClick={() => handleDelete(_id)}
                                >
                                    Delete
                                </button>
                            </li>
                        )
                    ))}
                </ul>
            </div>
        </div>
    );

}
export default PostBlog;