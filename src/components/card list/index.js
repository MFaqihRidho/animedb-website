import React from "react";
import CardLoading from "../card loading";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

export default function CardList(props) {
    const [data, setData] = useState([]);
    const loading = useSelector((state) => state.cardLoading);
    const dispatch = useDispatch();

    const handleClickEvent = (event) => {
        event.preventDefault();
        console.log(event.currentTarget.id);
    };

    useEffect(() => {
        props.api.then((result) => {
            setData(result.data);
            dispatch({ type: "LOADING_CARD" });
        });
    }, []);

    return (
        <div className="w-full pt-2 transition-all duration-300 bg-white dark:bg-black min-h-fit">
            <div className="container mx-auto text-gray-700 dark:text-gray-200">
                {" "}
                <div className="flex items-center px-7 md:px-0 justify-between mb-3">
                    <h1 className="lg:text-2xl text-lg md:text-xl font-bold">
                        {props.title}
                    </h1>
                    <div className="lg:w-2/3 h-0.5 w-1/6 sm:w-1/2 bg-gray-200 dark:bg-gray-500"></div>
                    <button className="text-lg md:text-xl font-extrabold text-light_secondary dark:text-dark_secondary">
                        VIEW ALL
                    </button>
                </div>
                {loading === true ? (
                    <CardLoading></CardLoading>
                ) : (
                    <div className="grid grid-cols-1 gap-5 py-5 px-7 md:px-0 justify-items-center lg:grid-cols-5 lg:gap-10 sm:grid-cols-2 sm:gap-6 md:grid-cols-3 md:gap-7 card-list">
                        {data.slice(0, 5).map((data) => (
                            <div
                                id={data.mal_id}
                                onClick={handleClickEvent}
                                className="relative w-[80%] md:w-full px-1 py-1 overflow-hidden transition-all duration-200 md:px-0 md:py-0 md:hover:-translate-y-2 md:hover:px-1 md:hover:py-1 bg-light_secondary dark:bg-dark_secondary md:bg-white md:dark:bg-black md:hover:bg-light_secondary md:hover:dark:bg-dark_secondary h-fit card rounded-xl "
                            >
                                <img
                                    src={data.images.jpg.large_image_url}
                                    alt=""
                                    className="rounded-xl min-w-full min-h-full"
                                />
                                <p
                                    className={`text-center mx-auto max-w-fit sm:text-black sm:dark:text-white md:text-white md:dark:text-black text-xl font-semibold`}
                                >
                                    {data.title}
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
