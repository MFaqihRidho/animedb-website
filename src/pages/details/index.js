import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDetailsAPI } from "../../config";
import Detail from "../../details";

export default function Details() {
    const params = useParams();
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            await getDetailsAPI(params.id).then((result) => {
                setData(result.data);
            });
        };
        fetchData();
    }, [params.id]);
    return (
        <div className="w-full min-h-screen text-gray-700 dark:text-gray-200">
            <div>
                <div className="absolute w-full transition-all duration-300 h-96 bg-light_primary dark:bg-dark_primary opacity-60 dark:opacity-80"></div>
                {data?.trailer?.images?.maximum_image_url ? (
                    <img
                        className="object-cover w-full h-96"
                        src={data?.trailer?.images?.maximum_image_url}
                        alt=""
                    />
                ) : (
                    <div className="w-full transition-all duration-300 h-96 bg-light_secondary dark:bg-dark_secondary"></div>
                )}
            </div>
            <div className="w-full transition-all duration-300 h-fit bg-light_primary dark:bg-dark_primary ">
                <div className="container flex flex-col mx-auto">
                    <div className="flex flex-col w-full px-5 items-center md:items-start lg:items-center md:flex-row">
                        <div className="flex -mt-56 md:-mt-40  flex-col items-center gap-10">
                            <img
                                className="relative  md:max-w-xs  rounded-2xl "
                                src={data?.images?.jpg?.image_url}
                                alt=""
                            />
                            <div className="flex w-2/3 xl:hidden  flex-col items-center rounded-2xl transition-colors duration-300 py-2 px-2  bg-yellow-400 dark:bg-yellow-600">
                                <p className="font-bold text-md">SCORE</p>

                                <div className="flex items-end font-bold">
                                    <p className="text-3xl">
                                        {data.score
                                            ? Math.floor(data.score)
                                            : "NA"}
                                    </p>
                                    <p className="text-2xl">
                                        {data.score
                                            ? (
                                                  data.score -
                                                  Math.floor(data.score)
                                              )
                                                  .toFixed(2)
                                                  .toString()
                                                  .replace("0", "")
                                            : ""}
                                    </p>
                                </div>
                                <p className="font-normal dark:font-light ">
                                    {data.scored_by
                                        ? ` ${data.scored_by
                                              .toString()
                                              .replace(
                                                  /\B(?=(\d{3})+(?!\d))/g,
                                                  ","
                                              )} users`
                                        : "NA"}
                                </p>
                            </div>
                        </div>
                        <div className="w-full px-7 md:-mt-16 ">
                            <h1 className="relative md:whitespace-nowrap md:overflow-hidden md:text-ellipsis text-2xl md:text-3xl text-center mt-5 md:text-left md:max-w-read lg:max-w-full font-bold ">
                                {data.title}
                            </h1>
                            <div className="flex flex-col lg:flex-row justify-between w-full pt-5">
                                <div className="order-2 mt-3  md:mt-0 lg:order-1">
                                    <h3 className="text-2xl text-center md:text-left  font-bold">
                                        Synopsis
                                    </h3>
                                </div>
                                <div className="flex flex-col md:flex-row items-center mb-3 order-1 md:justify-start justify-center lg:order-2 gap-3 md:gap-5">
                                    <h3 className="flex gap-1 text-xl font-bold">
                                        Ranked:{""}
                                        <p className="font-normal">
                                            {data.rank
                                                ? `#${data.rank}`
                                                : " NA"}
                                        </p>
                                    </h3>
                                    <h3 className="flex gap-1 text-xl font-bold">
                                        Popularity: {}
                                        <p className="font-normal">
                                            {data.popularity
                                                ? `#${data.popularity}`
                                                : " NA"}
                                        </p>
                                    </h3>
                                    <h3 className="flex gap-1 text-xl font-bold">
                                        Members: {}
                                        <p className="font-normal">
                                            {data.members
                                                ? data.members
                                                      .toString()
                                                      .replace(
                                                          /\B(?=(\d{3})+(?!\d))/g,
                                                          ","
                                                      )
                                                : " NA"}
                                        </p>
                                    </h3>
                                </div>
                            </div>
                            <p className="pt-3 pr-5 lg:max-w-full min-h-[7rem] md:max-w-synopsis lg:pr-0 text-left text-md">
                                {data.synopsis}
                            </p>
                        </div>
                    </div>
                    <div className="flex justify-between px-5 w-full gap-10 pb-10 pt-7">
                        <div className="hidden xl:flex w-[11%]  flex-col items-center rounded-2xl transition-colors duration-300 py-2 px-2  bg-yellow-400 dark:bg-yellow-600">
                            <p className="font-bold text-md">SCORE</p>

                            <div className="flex items-end font-bold">
                                <p className="text-3xl">
                                    {data.score ? Math.floor(data.score) : "NA"}
                                </p>
                                <p className="text-2xl">
                                    {data.score
                                        ? (data.score - Math.floor(data.score))
                                              .toFixed(2)
                                              .toString()
                                              .replace("0", "")
                                        : ""}
                                </p>
                            </div>
                            <p className="font-normal dark:font-light ">
                                {data.scored_by
                                    ? ` ${data.scored_by
                                          .toString()
                                          .replace(
                                              /\B(?=(\d{3})+(?!\d))/g,
                                              ","
                                          )} users`
                                    : "NA"}
                            </p>
                        </div>
                        <div className="flex-col items-start w-full border-2 border-gray-700 lg:flex dark:border-gray-200 justify-evenly rounded-xl">
                            <div className="flex flex-col xl:flex-row items-center justify-center w-full gap-4 p-5">
                                <p className="flex gap-1  font-bold">
                                    Type :
                                    <p className="font-normal dark:font-light">
                                        {data.type}
                                    </p>
                                </p>
                                <p className="flex gap-1 font-bold">
                                    Episode :
                                    <p className="font-normal dark:font-light">
                                        {data.episodes
                                            ? data.episodes
                                            : "unknown"}
                                    </p>
                                </p>
                                <p className="flex gap-1 font-bold">
                                    Genre :
                                    <p className="font-normal dark:font-light">
                                        {data.genres
                                            ? data.genres
                                                  .map((data) => data.name)
                                                  .join(",")
                                            : "unknown"}
                                        {data.themes
                                            ? data.themes.map(
                                                  (data) => `,${data.name}`
                                              )
                                            : "unknown"}
                                    </p>
                                </p>
                                <p className="flex gap-1 font-bold">
                                    Duration :
                                    <p className="font-normal dark:font-light">
                                        {data.duration
                                            ? data.duration
                                            : "unknown"}
                                    </p>
                                </p>
                                <p className="flex gap-1 font-bold">
                                    Status :
                                    <p className="font-normal dark:font-light">
                                        {data.status}
                                    </p>
                                </p>
                            </div>
                            <div className="w-full  bg-gray-700 dark:bg-gray-200 h-[1px]"></div>
                            <div className="flex flex-col xl:flex-row items-center justify-center w-full gap-4 p-5">
                                <p className="flex gap-1 font-bold">
                                    Aired :
                                    <p className="font-normal dark:font-light">
                                        {data?.aired?.string}
                                    </p>
                                </p>
                                <p className="flex gap-1 font-bold">
                                    Broadcast :
                                    <p className="font-normal dark:font-light">
                                        {data?.broadcast?.string
                                            ? data.broadcast.string
                                            : "unknown"}
                                    </p>
                                </p>
                                <p className="flex gap-1 font-bold">
                                    Studios :
                                    <a
                                        href="/"
                                        className="font-normal dark:font-light"
                                    >
                                        {data?.studios
                                            ? data.studios.length !== 0
                                                ? data.studios
                                                      .map((data) => data.name)
                                                      .join(",")
                                                : "unknown"
                                            : "unknown"}
                                    </a>
                                </p>
                                <p className="flex gap-1 font-bold">
                                    Rating :
                                    <p className="font-normal dark:font-light">
                                        {data.rating ? data.rating : "unknown"}
                                    </p>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
