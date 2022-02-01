import React from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";

export default function Hero() {
    return (
        <div className="dark:bg-dark_primary transition-all duration-300 p-5 bg-light_primary w-full min-h-fit">
            <div className="container mx-auto text-gray-700 dark:text-gray-200">
                <h1 className="text-3xl font-semibold text-center py-4">
                    Top Upcoming Anime
                </h1>
                <Splide
                    options={{
                        autoplay: true,
                        type: "fade",
                    }}
                >
                    <SplideSlide>
                        <div className="flex px-16 py-5 h-96 w-full bg-white dark:bg-gray-500 rounded-3xl">
                            <img
                                src="https://cdn.myanimelist.net/images/anime/1245/111800l.jpg"
                                alt=""
                                className="rounded-xl"
                            />
                            <div className="px-5">
                                <h3 className="text-2xl">
                                    Tate no Yuusha no Nariagari Season 2
                                </h3>
                                <p className="text-xl">
                                    rating: PG-13 - Teens 13 or older
                                </p>
                            </div>
                            <div className="iframe-container relative w-full pb-[56.25%] h-0">
                                <iframe
                                    src="https://www.youtube.com/embed/PsdihSpwYMY?enablejsapi=1&wmode=opaque&autoplay=1"
                                    frameborder="0"
                                    className="absolute top-0 bottom-0 w-full h-full"
                                ></iframe>
                            </div>
                        </div>
                    </SplideSlide>
                </Splide>
            </div>
        </div>
    );
}
