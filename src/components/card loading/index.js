import React from "react";

export default function CardLoading() {
    return (
        <div className="grid grid-cols-3 gap-5 py-5 lg:gap-10 px-7 justify-items-center lg:grid-cols-5 card-list">
            <div className="w-full h-32 bg-gray-500 md:h-72 card animate-pulse rounded-xl"></div>
            <div className="w-full h-32 bg-gray-500 md:h-72 card animate-pulse rounded-xl"></div>
            <div className="w-full h-32 bg-gray-500 md:h-72 card animate-pulse rounded-xl"></div>
            <div className="w-full h-32 bg-gray-500 md:h-72 card animate-pulse rounded-xl"></div>
            <div className="w-full h-32 bg-gray-500 md:h-72 card animate-pulse rounded-xl"></div>
        </div>
    );
}
