import React from "react";
import { useEffect, useState } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { getUpcomingAPI } from "../../config";
import "@splidejs/splide/dist/css/splide.min.css";
import "@splidejs/splide/dist/css/themes/splide-sea-green.min.css";

export default function Hero() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState([]);

    useEffect(() => {
        getUpcomingAPI().then((result) => {
            console.log(result);
            setData(result.data);
        });
    }, []);

    return (
        <div className="w-full p-5 transition-all duration-300 dark:bg-dark_primary bg-light_primary min-h-fit">
            <div className="container mx-auto text-gray-700 dark:text-gray-200">
                <h1 className="pt-4 text-4xl font-semibold text-center ">
                    Top Upcoming Anime
                </h1>

                <Splide
                    options={{
                        autoplay: true,
                        type: "fade",
                    }}
                >
                    {data.map((data) => (
                        <SplideSlide>
                            <div className="flex w-full overflow-hidden transition-all duration-300 bg-white h-96 dark:bg-gray-500 rounded-3xl">
                                {data.trailer.embed_url ? (
                                    <div className="relative w-2/3 h-full rounded iframe-container">
                                        <iframe
                                            src={data.trailer.embed_url}
                                            frameborder="0"
                                            className="absolute top-0 bottom-0 w-full h-full"
                                        ></iframe>
                                    </div>
                                ) : (
                                    <h1 className="m-auto text-5xl font-semibold w-2/3 text-center">
                                        No Trailer available
                                    </h1>
                                )}

                                <div className="w-1/2 px-5 py-16">
                                    <h3 className="text-5xl font-semibold">
                                        {data.title}
                                    </h3>
                                    <p className="text-xl">{data.synopsis}</p>
                                    <p className="text-xl">{data.type}</p>
                                    <div className="relative bottom-0 flex">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-7 h-7"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                            />
                                        </svg>
                                        <p className="px-2 text-xl">
                                            {data.aired.from
                                                ? `${data.aired.prop.from.day}/${data.aired.prop.from.month}/${data.aired.prop.from.year}`
                                                : "unknown"}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </SplideSlide>
                    ))}
                </Splide>
            </div>
        </div>
    );
}
