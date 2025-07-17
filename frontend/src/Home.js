import React from "react";

function Home() {
    return (
        <div>
            <p className="text-center text-lg text-gray-700 mt-6 mx-20">
                Welcome to <span className="font-semibold text-pink-400">BlogNest</span>!
                Start writing your thoughts, read amazing blogs, and share your ideas with the world.
                It's quick, simple, and made for everyone who loves to express themselves.
                Let your voice be heard.
            </p>

            <div className="flex justify-center items-center mt-10">
                <img src="/bloghero.avif" alt="img" className="border-2 border-black w-170 h-110" />
            </div>
        </div>
    );
}

export default Home;