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
        let mounted = true;
        dispatch({ type: "LOADING_HERO_TRUE" });
        getUpcomingAPI(1).then((result) => {
            if (mounted) {
                setData(result.data);
                dispatch({ type: "LOADING_HERO_FALSE" });
            } else {
                return;
            }
        });
        return () => (mounted = false);
    }, [dispatch]);

    return (
        <div className="w-full min-h-screen p-5 mb-10 -mt-1 transition-all duration-300 dark:bg-dark_primary bg-light_primary md:min-h-fit">
            <div className="container mx-auto text-gray-700 dark:text-gray-200">
                <h1 className="pt-4 text-3xl font-semibold text-center sm:text-4xl ">
                    Top Upcoming
                </h1>
                {loading && (
                    <div className="w-[90%] m-auto flex mt-10 overflow-hidden animate-pulse bg-white h-96 dark:bg-gray-600 rounded-3xl shadow-sm">
                        <div className="relative w-full h-full bg-gray-200 rounded md:w-2/3 dark:bg-gray-700"></div>
                        <div className="hidden w-1/2 px-5 py-16 md:block">
                            <div className="w-full h-12 my-3 bg-gray-200 dark:bg-gray-700"></div>
                            <div className="w-1/2 h-8 my-3 bg-gray-200 dark:bg-gray-700"></div>
                            <div className="w-1/4 h-8 bg-gray-200 mt-36 dark:bg-gray-700"></div>
                        </div>
                    </div>
                )}
                {!loading && (
                    <Splide
                        options={{
                            autoplay: true,
                            type: "fade",
                            pagination: false,
                        }}
                    >
                        {data?.map((data) => (
                            <SplideSlide>
                                <div className="flex mx-auto overflow-hidden transition-all duration-300 bg-white w-fit md:w-full h-96 dark:bg-gray-500 rounded-3xl">
                                    {data?.trailer.embed_url ? (
                                        <div className="relative hidden w-2/3 h-full rounded xl:block iframe-container">
                                            <iframe
                                                src={data?.trailer.embed_url}
                                                title={data?.title}
                                                frameborder="0"
                                                className="absolute top-0 bottom-0 w-full h-full"
                                            ></iframe>
                                        </div>
                                    ) : (
                                        <h1 className="hidden w-2/3 m-auto text-5xl font-semibold text-center xl:block">
                                            No Trailer available
                                        </h1>
                                    )}

                                    {data?.images.jpg.image_url ? (
                                        <a
                                            href={
                                                data?.trailer.url
                                                    ? data?.trailer.url
                                                    : `https://www.youtube.com/results?search_query=${data?.title}`
                                            }
                                            className="relative block xl:hidden"
                                        >
                                            <img
                                                src={data?.images.jpg.image_url}
                                                alt=""
                                                className="block object-cover w-full h-full xl:hidden md:max-w-xs"
                                            />
                                        </a>
                                    ) : (
                                        <h1 className="block w-2/3 m-auto text-4xl font-semibold text-center xl:hidden">
                                            No image available
                                        </h1>
                                    )}

                                    <div className="hidden w-1/2 px-5 py-16 m-auto md:block">
                                        <h3 className="md:text-6xl max-h-[11.5rem] overflow-hidden elipsiss font-semibold">
                                            {data?.title}
                                        </h3>
                                        <p className="text-xl truncate max-h-14 ">
                                            {data?.synopsis}
                                        </p>
                                        <p className="text-xl">{data?.type}</p>
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
                                                {data?.aired.from
                                                    ? `${data?.aired.prop.from.day}/${data?.aired.prop.from.month}/${data?.aired.prop.from.year}`
                                                    : "unknown"}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <h3 className="block my-3 text-2xl text-center md:hidden">
                                    {data?.title}
                                </h3>
                            </SplideSlide>
                        ))}
                    </Splide>
                )}
            </div>
        </div>
    );
}
