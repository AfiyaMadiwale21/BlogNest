import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login({ setIsLoggedIn }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = () => {
        axios.post("http://localhost:5000/api/auth/login", {
            username,
            password
        }).then(res => {
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("userId", res.data.userId);
            setIsLoggedIn(true);
            navigate("/PostBlog");
        }).catch(err => alert(err.response.data.error));
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-black">
            <div className="bg-white p-8 rounded shadow-md w-72 md:w-96">
                <h2 className="text-2xl font-bold text-black font-merienda mb-6 text-center">Login</h2>
                <input
                    className="w-full mb-4 px-4 py-2 border border-gray-300  text-black rounded"
                    placeholder="Username"
                    onChange={e => setUsername(e.target.value)}
                />
                <input
                    className="w-full mb-4 px-4 py-2 border border-gray-300 text-black rounded"
                    placeholder="Password"
                    type="password"
                    onChange={e => setPassword(e.target.value)}
                />
                <button
                    className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
                    onClick={handleLogin}
                >
                    Login
                </button>
            </div>
        </div>
    );
}

export default Login;
