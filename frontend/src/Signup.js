import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Signup({ setIsLoggedIn }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSignup = () => {
        axios.post("http://localhost:5000/api/auth/signup", {
            username,
            password
        }).then(() => {
            alert("Signup successful!");
            setIsLoggedIn(true);
            navigate("/login");
        }).catch(err => alert(err.response.data.error));
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-96">
                <h2 className="text-2xl font-bold mb-6 text-center">Signup</h2>
                <input
                    className="w-full mb-4 px-4 py-2 border border-gray-300 rounded"
                    placeholder="Username"
                    onChange={e => setUsername(e.target.value)}
                />
                <input
                    className="w-full mb-4 px-4 py-2 border border-gray-300 rounded"
                    placeholder="Password"
                    type="password"
                    onChange={e => setPassword(e.target.value)}
                />
                <button
                    className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                    onClick={handleSignup}
                >
                    Sign Up
                </button>
                <p className="text-xs">Already have an account? <Link className="text-purple-900 font-bold underline" to="/Login">Login</Link></p>
            </div>
        </div>
    );
}

export default Signup;
