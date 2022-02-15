import React from "react";

export default function CardLoading() {
    return (
        <div className="grid grid-cols-3 gap-5 py-5 lg:gap-10 md:px-0 px-5 justify-items-center lg:grid-cols-5 card-list">
            <div className="w-full h-32 bg-gray-500 md:h-72 card animate-pulse rounded-xl"></div>
            <div className="w-full h-32 bg-gray-500 md:h-72 card animate-pulse rounded-xl"></div>
            <div className="w-full h-32 bg-gray-500 md:h-72 card animate-pulse rounded-xl"></div>
            <div className="w-full h-32 bg-gray-500 md:h-72 card animate-pulse rounded-xl"></div>
            <div className="w-full h-32 bg-gray-500 md:h-72 card animate-pulse rounded-xl"></div>
            <div className="w-full lg:hidden h-32 bg-gray-500 md:h-72 card animate-pulse rounded-xl"></div>
        </div>
    );
}
