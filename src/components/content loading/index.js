import React from "react";

export default function ContentLoading() {
    return (
        <div class="flex items-center justify-center w-full h-full">
            <div class="flex justify-center items-center space-x-1 text-sm mr-10">
                <svg
                    fill="none"
                    class="w-16 h-16 animate-spin"
                    viewBox="0 0 32 32"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        clip-rule="evenodd"
                        d="M15.165 8.53a.5.5 0 01-.404.58A7 7 0 1023 16a.5.5 0 011 0 8 8 0 11-9.416-7.874.5.5 0 01.58.404z"
                        fill="currentColor"
                        fill-rule="evenodd"
                    />
                </svg>

                <p className="text-4xl font-bold">Loading ...</p>
            </div>
        </div>
    );
}
