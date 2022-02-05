import React from "react";

export default function CardLoading() {
    return (
        <div className="grid grid-cols-1 gap-10 py-5 justify-items-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 card-list">
            <div className="w-1/2 bg-gray-500 sm:w-2/3 md:w-full card h-80 sm:h-72 animate-pulse rounded-xl"></div>
            <div className="w-1/2 bg-gray-500 sm:w-2/3 md:w-full card h-80 sm:h-72 animate-pulse rounded-xl"></div>
            <div className="w-1/2 bg-gray-500 sm:w-2/3 md:w-full card h-80 sm:h-72 animate-pulse rounded-xl"></div>
            <div className="w-1/2 bg-gray-500 sm:w-2/3 md:w-full card h-80 sm:h-72 animate-pulse rounded-xl"></div>
            <div className="w-1/2 bg-gray-500 sm:w-2/3 md:w-full card h-80 sm:h-72 animate-pulse rounded-xl"></div>
        </div>
    );
}
