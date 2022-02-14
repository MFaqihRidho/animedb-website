import React, { useEffect, useState, useRef } from "react";

export default function MobileContentNav(props) {
    const menuRef = useRef(null);
    const [listening, setListening] = useState(false);
    const [showDropDown, setShowDropDown] = useState(false);

    const toggleDropDown = () => {
        setShowDropDown(!showDropDown);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            if (showDropDown) {
                toggleDropDown();
            } else {
                return;
            }
        }, 4000);
        return () => clearInterval(interval);
    }, [showDropDown]);

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
        <div ref={menuRef} className={`order-last md:hidden`}>
            <button
                onClick={toggleDropDown}
                className="block pb-2 border-b-4 md:hidden border-b-transparent hover:border-b-light_secondary hover:dark:border-b-dark_secondary"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-7 w-7"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 12h16m-7 6h7"
                    />
                </svg>
            </button>
            {showDropDown ? (
                <div className="absolute z-10 flex flex-col items-center px-3 py-4 mt-5 transition-all duration-300 rounded opacity-100 gap-7 right-14 left-14 bg-light_primary dark:bg-dark_primary">
                    <p
                        className="px-2 py-1 text-2xl font-normal rounded bg-light_secondary dark:bg-dark_secondary"
                        onClick={() => {
                            props.content1();
                            toggleDropDown();
                        }}
                    >
                        Videos
                    </p>
                    <p
                        className="px-2 py-1 text-2xl font-normal rounded bg-light_secondary dark:bg-dark_secondary"
                        onClick={() => {
                            props.content2();
                            toggleDropDown();
                        }}
                    >
                        Episodes
                    </p>
                    <p
                        className="px-2 py-1 text-2xl font-normal rounded bg-light_secondary dark:bg-dark_secondary"
                        onClick={() => {
                            props.content3();
                            toggleDropDown();
                        }}
                    >
                        Reviews
                    </p>
                    <p
                        className="px-2 py-1 text-2xl font-normal rounded bg-light_secondary dark:bg-dark_secondary"
                        onClick={() => {
                            props.content4();
                            toggleDropDown();
                        }}
                    >
                        Recommendation
                    </p>
                    <p
                        className="px-2 py-1 text-2xl font-normal rounded bg-light_secondary dark:bg-dark_secondary"
                        onClick={() => {
                            props.content5();
                            toggleDropDown();
                        }}
                    >
                        Stats
                    </p>
                    <p
                        className="px-2 py-1 text-2xl font-normal text-center rounded bg-light_secondary dark:bg-dark_secondary"
                        onClick={() => {
                            props.content6();
                            toggleDropDown();
                        }}
                    >
                        Character & staff
                    </p>
                    <p
                        className="px-2 py-1 text-2xl font-normal rounded bg-light_secondary dark:bg-dark_secondary"
                        onClick={() => {
                            props.content7();
                            toggleDropDown();
                        }}
                    >
                        More Info
                    </p>
                </div>
            ) : (
                <div className="absolute z-10 flex flex-col items-center invisible px-3 py-4 mt-3 transition-all duration-300 rounded opacity-0 gap-7 right-44 left-44 bg-light_primary dark:bg-dark_primary">
                    <p className="px-2 py-1 text-2xl font-normal rounded bg-light_secondary dark:bg-dark_secondary">
                        Videos
                    </p>
                    <p className="px-2 py-1 text-2xl font-normal rounded bg-light_secondary dark:bg-dark_secondary">
                        Episodes
                    </p>
                    <p className="px-2 py-1 text-2xl font-normal rounded bg-light_secondary dark:bg-dark_secondary">
                        Reviews
                    </p>
                    <p className="px-2 py-1 text-2xl font-normal rounded bg-light_secondary dark:bg-dark_secondary">
                        Recommendation
                    </p>
                    <p className="px-2 py-1 text-2xl font-normal rounded bg-light_secondary dark:bg-dark_secondary">
                        Stats
                    </p>
                    <p className="px-2 py-1 text-2xl font-normal text-center rounded bg-light_secondary dark:bg-dark_secondary">
                        Character & staff
                    </p>
                    <p className="px-2 py-1 text-2xl font-normal rounded bg-light_secondary dark:bg-dark_secondary">
                        More Info
                    </p>
                </div>
            )}
        </div>
    );
}
