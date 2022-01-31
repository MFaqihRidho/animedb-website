import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
    function theme() {
        if (localStorage.theme === "light") {
            document.documentElement.classList.add("dark");
            localStorage.theme = "dark";
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.theme = "light";
        }
    }
    return (
        <nav className="transition-colors bg-light_primary dark:bg-dark_primary">
            <div>
                <h1 className="text-white">Anime Finder</h1>
            </div>
            <div>
                <Link className="text-white" to="/">
                    Home
                </Link>
                <Link className="text-white" to="about">
                    Anime
                </Link>
                <Link className="text-white" to="about">
                    Manga
                </Link>
            </div>
            <div>
                <button
                    title="Toggle Theme"
                    onClick={theme}
                    class="
        w-12 
        h-6 
        rounded-full 
        bg-light_primary 
        border-darl_primary
            dark:bg-dark_primary
            dark:border-light_primary
            border-2
        relative 
        transition-colors 
        duration-500 
        ease-in
        focus:outline-none 
        focus:ring-2 
        focus:ring-blue-700 
        dark:focus:ring-blue-600 
      "
                >
                    <div
                        id="toggle"
                        class="
            rounded-full 
            w-4 
            h-4 
            bg-dark_primary 
            dark:bg-light_primary 
            relative 
            ml-1 
            dark:ml-6 
            pointer-events-none 
            transition-all 
            duration-300 
            ease-out
        "
                    ></div>
                </button>
            </div>
        </nav>
    );
}
