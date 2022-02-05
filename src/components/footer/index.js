import React, { useEffect, useState } from "react";
import { SocialIcon } from "react-social-icons";
import { useSelector, useDispatch } from "react-redux";

export default function Footer() {
    const dark = useSelector((state) => state.dark);
    const dispatch = useDispatch();
    useEffect(() => {
        if (localStorage.dark === "false") {
            dispatch({ type: "LIGHT_MODE" });
        } else {
            dispatch({ type: "DARK_MODE" });
        }
    }, [dark]);

    return (
        <footer className="w-full mt-10 transition-all duration-300 h-52 bg-light_primary dark:bg-dark_primary">
            <div className="container flex flex-col items-center justify-center h-full mx-auto text-gray-700 transition-all duration-300 dark:text-gray-200 bg-light_primary dark:bg-dark_primary">
                <div className="py-3">
                    <SocialIcon
                        bgColor={dark ? "#f3f4f6" : "#374151"}
                        style={{ height: "30px", width: "30px" }}
                        url="https://github.com/MFaqihRidho"
                        target={"_blank"}
                        rel="noreferrer"
                        className="mx-3 text-black"
                    />
                    <SocialIcon
                        bgColor={dark ? "#f3f4f6" : "#374151"}
                        style={{ height: "30px", width: "30px" }}
                        url="https://codepen.io/mfaqihridho"
                        target={"_blank"}
                        rel="noreferrer"
                        className="mx-3"
                    />
                    <SocialIcon
                        bgColor={dark ? "#f3f4f6" : "#374151"}
                        style={{ height: "30px", width: "30px" }}
                        url="https://www.instagram.com/mfaqihridho/"
                        target={"_blank"}
                        rel="noreferrer"
                        className="mx-3"
                    />
                </div>
                <h5 className="mb-3 text-xl md:mb-5">MFaqihRidho © 2022</h5>
                <div className="w-full h-0.5 bg-gray-700 dark:bg-gray-200 mb-2"></div>
                <p className="mb-2 ">
                    Powered By{" "}
                    <a
                        href="https://jikan.moe"
                        className="border-b-2"
                        target="_blank"
                        rel="noreferrer"
                        className="text-gray-700 dark:text-gray-200"
                    >
                        JIKAN API{" "}
                    </a>
                </p>
                <p className="text-center ">
                    Icon vector created by ikaika -{" "}
                    <a href="https://www.freepik.com/vectors/icon">
                        www.freepik.com
                    </a>
                </p>
            </div>
        </footer>
    );
}
