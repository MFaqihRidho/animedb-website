import React from "react";
import { useEffect, useState } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { getUpcomingAPI } from "../../config";
import { useSelector, useDispatch } from "react-redux";
import "@splidejs/splide/dist/css/splide.min.css";
import "@splidejs/splide/dist/css/themes/splide-sea-green.min.css";

export default function Hero() {
    const [data, setData] = useState([]);
    const loading = useSelector((state) => state.heroLoading);
    const dispatch = useDispatch();

    useEffect(() => {
        getUpcomingAPI().then((result) => {
            console.log(result);
            setData(result.data);
            dispatch({ type: "LOADING_HERO" });
        });
    }, []);

    return (
        <div className="w-full -mt-1 p-5 transition-all duration-300 dark:bg-dark_primary bg-light_primary min-h-screen md:min-h-fit">
            <div className="container mx-auto text-gray-700 dark:text-gray-200">
                <h1 className="pt-4 text-3xl sm:text-4xl font-semibold text-center ">
                    Top Upcoming Anime
                </h1>

                {loading === true ? (
                    <div className="w-[90%] m-auto flex mt-10 overflow-hidden animate-pulse bg-white h-96 dark:bg-gray-600 rounded-3xl shadow-sm">
                        <div className="relative w-full md:w-2/3 h-full rounded dark:bg-gray-700 bg-gray-200"></div>
                        <div className="w-1/2 px-5 py-16 hidden md:block">
                            <div className="w-full my-3 dark:bg-gray-700 bg-gray-200 h-12"></div>
                            <div className="w-1/2 my-3 dark:bg-gray-700 bg-gray-200 h-8"></div>
                            <div className="w-1/4 mt-36 dark:bg-gray-700 bg-gray-200 h-8"></div>
                        </div>
                    </div>
                ) : (
                    <Splide
                        options={{
                            autoplay: true,
                            type: "fade",
                            pagination: false,
                        }}
                    >
                        {data.map((data) => (
                            <SplideSlide>
                                <div className="flex w-full overflow-hidden transition-all duration-300 bg-white h-96 dark:bg-gray-500 rounded-3xl">
                                    {data.trailer.embed_url ? (
                                        <div className="relative hidden xl:block w-2/3 h-full rounded iframe-container">
                                            <iframe
                                                src={data.trailer.embed_url}
                                                frameborder="0"
                                                className="absolute top-0 bottom-0 w-full h-full"
                                            ></iframe>
                                        </div>
                                    ) : (
                                        <h1 className="m-auto xl:block hidden text-5xl font-semibold w-2/3 text-center">
                                            No Trailer available
                                        </h1>
                                    )}

                                    {data.images.jpg.large_image_url ? (
                                        <img
                                            src={
                                                data.images.jpg.large_image_url
                                            }
                                            alt=""
                                            className="block xl:hidden object-cover w-full"
                                        />
                                    ) : (
                                        <h1 className="block xl:hidden m-auto text-5xl font-semibold w-2/3 text-center">
                                            No image available
                                        </h1>
                                    )}

                                    <div className="w-1/2 px-5 py-16 hidden md:block m-auto">
                                        <h3 className="text-6xl max-h-[11.5rem] overflow-hidden elipsiss font-semibold">
                                            {data.title}
                                        </h3>
                                        <p className="text-xl max-h-14 truncate ">
                                            {data.synopsis}
                                        </p>
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
                                <h3 className="text-center text-2xl my-3 block md:hidden">
                                    {data.title}
                                </h3>
                            </SplideSlide>
                        ))}
                    </Splide>
                )}
            </div>
        </div>
    );
}
