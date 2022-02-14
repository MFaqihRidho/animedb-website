import React, { useEffect, useState, useRef } from "react";

export default function MobileContentNav(props) {
    const menuRef = useRef(null);
    const [listening, setListening] = useState(false);
    const [showDropDown, setShowDropDown] = useState(false);

    const toggleDropDown = () => {
        setShowDropDown(!showDropDown);
    };

    const listenToScroll = () => {
        let heightToHideFrom = 30;
        const winScroll =
            document.body.scrollTop || document.documentElement.scrollTop;
        if (winScroll > heightToHideFrom) {
            setShowDropDown(false);
        } else {
            setShowDropDown(false);
        }
    };

    useEffect(() => {}, [showDropDown]);

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

    useEffect(() => {
        window.addEventListener("scroll", listenToScroll);
    }, []);

    return (
        <div ref={menuRef} className={`order-last md:hidden`}>
            <button
                onClick={toggleDropDown}
                className="pb-2 block md:hidden border-b-4 border-b-transparent hover:border-b-light_secondary hover:dark:border-b-dark_secondary"
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
                <div className="absolute right-20 left-20 mt-5 flex flex-col opacity-100 transition-all duration-300 items-center bg-light_primary dark:bg-dark_primary rounded px-3 py-4 gap-2 z-10">
                    <p
                        className="px-2 text-2xl font-normal"
                        onClick={() => {
                            props.content1();
                            toggleDropDown();
                        }}
                    >
                        Videos
                    </p>
                    <p
                        className="px-2 text-2xl font-normal"
                        onClick={() => {
                            props.content2();
                            toggleDropDown();
                        }}
                    >
                        Episodes
                    </p>
                    <p
                        className="px-2 text-2xl font-normal"
                        onClick={() => {
                            props.content3();
                            toggleDropDown();
                        }}
                    >
                        Reviews
                    </p>
                    <p
                        className="px-2 text-2xl font-normal"
                        onClick={() => {
                            props.content4();
                            toggleDropDown();
                        }}
                    >
                        Recommendation
                    </p>
                    <p
                        className="px-2 text-2xl font-normal"
                        onClick={() => {
                            props.content5();
                            toggleDropDown();
                        }}
                    >
                        Stats
                    </p>
                    <p
                        className="px-2 text-2xl font-normal"
                        onClick={() => {
                            props.content6();
                            toggleDropDown();
                        }}
                    >
                        Character & staff
                    </p>
                    <p
                        className="px-2 text-2xl font-normal"
                        onClick={() => {
                            props.content7();
                            toggleDropDown();
                        }}
                    >
                        More Info
                    </p>
                </div>
            ) : (
                <div className="absolute right-20 left-20  mt-3 invisible flex flex-col opacity-0 transition-all duration-300 items-center bg-light_primary dark:bg-dark_primary rounded px-3 py-4 gap-2 z-10">
                    <p className="px-2 text-2xl font-normal">Videos</p>
                    <p className="px-2 text-2xl font-normal">Episodes</p>
                    <p className="px-2 text-2xl font-normal">Reviews</p>
                    <p className="px-2 text-2xl font-normal">Recommendation</p>
                    <p className="px-2 text-2xl font-normal">Stats</p>
                    <p className="px-2 text-2xl font-normal">
                        Character & staff
                    </p>
                    <p className="px-2 text-2xl font-normal">More Info</p>
                </div>
            )}
        </div>
    );
}
