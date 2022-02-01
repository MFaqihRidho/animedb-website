import React from "react";
import { Link } from "react-router-dom";

export default function MobileNav(props) {
    return (
        <div
            className={`bg-light_primary text-gray-700  dark:text-gray-200 dark:bg-dark_primary flex flex-col gap-3 items-center justify-center ${
                props.show ? "bottom-0" : "-bottom-40"
            } transition-all duration-300 sm:-bottom-40 fixed w-full h-40`}
        >
            <Link
                onClick={props.onClick}
                className="text-3xl font-semibold "
                to="/"
            >
                Home
            </Link>
            <Link
                onClick={props.onClick}
                className="text-3xl font-semibold "
                to="about"
            >
                Anime
            </Link>
            <Link
                onClick={props.onClick}
                className="text-3xl font-semibold "
                to="manga"
            >
                Manga
            </Link>
        </div>
    );
}
