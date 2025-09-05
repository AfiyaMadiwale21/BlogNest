import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
function Home() {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate("/Signup");
    }
    return (
        <div>
            <div className="mt-40 ml-12 flex flex-col gap-3 justify-between md:flex md:flex-row ">
                <h1 className="text-white  text-7xl md:text-8xl font-coiny font-light">BlogNest</h1>
                <p className="md:w-96  mr-3 md:leading-relaxed md:mr-20 text-gray-300 md:text-sm">Start writing your thoughts, read amazing blogs, and share your ideas with the world.
                    It's quick, simple, and made for everyone who loves to express themselves.
                    BlogNest is your personal space to express, explore, and connect through words.
                    Whether you're sharing ideas, experiences, or knowledge, blogging gives your voice
                    a platform to reach the world. Start your journey and let your thoughts flow freely.</p>
            </div>
            <div className="flex justify-end">
                <FontAwesomeIcon icon={faArrowRight} className="text-white text-sm mt-20 mr-1" />
                <button className="text-black mr-64 mt-16 bg-white text-lg py-1.5 px-2 duration-500 hover:scale-105" onClick={handleClick}>Get Started</button>
            </div>
        </div>
    );
}

export default Home;