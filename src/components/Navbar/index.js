import React, { useEffect, useState, useRef } from "react";
import MobileNav from "../mobilenav";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

export default function Navbar() {
    const menuRef = useRef(null);
    const [showDropDown, setShowDropDown] = useState(false);
    const [listening, setListening] = useState(false);

    const dispatch = useDispatch();

    const toggleDropDown = () => {
        setShowDropDown(!showDropDown);
    };

    const theme = () => {
        if (localStorage.dark === "false") {
            document.documentElement.classList.add("dark");
            localStorage.setItem("dark", true);
            dispatch({ type: "DARK_MODE" });
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("dark", false);
            dispatch({ type: "LIGHT_MODE" });
        }
    };

    useEffect(() => {
        if (localStorage.dark === "true") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, []);

    useEffect(() => {
        if (listening) return;
        if (!menuRef.current) return;
        setListening(true);
        [`click`, `touchstart`].forEach((type) => {
            document.addEventListener(`click`, (evt) => {
                const cur = menuRef.current;
                const node = evt.target;
                if (cur.contains(node)) return;
                setShowDropDown(false);
            });
        });
    }, [listening]);

    return (
        <nav className="h-16 py-3 transition-all duration-300 bg-light_primary dark:bg-dark_primary">
            <div
                ref={menuRef}
                className="container flex justify-between mx-auto text-gray-700 dark:text-gray-200 px-3"
            >
                <div className="hidden md:block">
                    <h1 className="text-2xl font-bold ">Anime Finder</h1>
                </div>
                <div
                    onClick={toggleDropDown}
                    className="sm:hidden cursor-pointer"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-9 w-9"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 6h16M4 12h8m-8 6h16"
                        />
                    </svg>
                </div>
                <div className="gap-5 mt-1 hidden sm:flex">
                    <Link className="text-xl font-medium " to="/">
                        Home
                    </Link>
                    <Link className="text-xl font-medium " to="anime">
                        Anime
                    </Link>
                    <Link className="text-xl font-medium " to="manga">
                        Manga
                    </Link>
                </div>
                <div class="flex items-center h-9 w-1/2 md:w-1/4 bg-white dark:bg-gray-500 rounded-lg transition-all duration-300">
                    <div class="w-full">
                        <input
                            type="search"
                            class="w-full px-4 py-1 dark:text-gray-200 text-gray-800 dark:bg-gray-500 rounded-full focus:outline-none transition-colors duration-300"
                            placeholder="search anime"
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
            <div
                className={`w-full h-screen top-0 ${
                    showDropDown ? "inline-block" : "hidden"
                } fixed bg-black opacity-50 z-40`}
            ></div>
            <MobileNav onClick={toggleDropDown} show={showDropDown}></MobileNav>
        </nav>
    );
}
