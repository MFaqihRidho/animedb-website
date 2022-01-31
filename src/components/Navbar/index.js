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
        <nav className="h-16 py-3 transition-all duration-300 bg-light_primary dark:bg-dark_primary">
            <div className="container flex justify-between mx-auto text-gray-700 dark:text-gray-200">
                <div>
                    <h1 className="text-2xl font-bold ">Anime Finder</h1>
                </div>
                <div className="flex gap-5 mt-1">
                    <Link className="text-xl font-medium " to="/">
                        Home
                    </Link>
                    <Link className="text-xl font-medium " to="about">
                        Anime
                    </Link>
                    <Link className="text-xl font-medium " to="manga">
                        Manga
                    </Link>
                </div>
                <div class="flex items-center h-9 bg-white dark:bg-gray-700 rounded-lg transition-all duration-300">
                    <div class="w-full">
                        <input
                            type="search"
                            class="w-full px-4 text-gray-800 dark:bg-gray-700 rounded-full focus:outline-none transition-all duration-300"
                            placeholder="search"
                        ></input>
                    </div>
                    <div>
                        <button
                            type="submit"
                            class="flex items-center bg-light_secondary h-9 dark:bg-dark_secondary justify-center w-12 transition-all duration-300 text-white rounded-r-lg"
                        >
                            <svg
                                class="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                ></path>
                            </svg>
                        </button>
                    </div>
                </div>
                <div className="mt-2">
                    <button
                        title="Toggle Theme"
                        onClick={theme}
                        class="
        w-12 
        h-6 
        rounded-full 
        bg-light_primary 
        border-dark_primary
            dark:bg-dark_primary
            dark:border-light_primary
            border-2
        relative 
        transition-colors 
        duration-500 
        ease-in
        focus:outline-none 
        focus:ring-1 
        focus:ring-dark_primary
        dark:focus:ring-light_primary 
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
            </div>
        </nav>
    );
}
