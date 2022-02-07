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
                <div className="w-full h-96 absolute bg-light_primary dark:bg-dark_primary transition-all duration-300 opacity-60 dark:opacity-80"></div>
                {data?.trailer?.images?.maximum_image_url ? (
                    <img
                        className="w-full h-96 object-cover"
                        src={data?.trailer?.images?.maximum_image_url}
                        alt=""
                    />
                ) : (
                    <div className="w-full h-96 transition-all duration-300 bg-light_secondary dark:bg-dark_secondary"></div>
                )}
            </div>
            <div className="w-full h-fit bg-light_primary dark:bg-dark_primary transition-all duration-300 ">
                <div className="container mx-auto flex flex-col">
                    <div className="flex">
                        <img
                            className="rounded-2xl relative h-full -mt-40"
                            src={data?.images?.jpg?.image_url}
                            alt=""
                        />
                        <div className=" px-7 w-full">
                            <h1 className="text-3xl relative font-bold -mt-11">
                                {data.title}
                            </h1>
                            <div className="pt-5 flex justify-between w-full">
                                <div>
                                    <h3 className="text-2xl font-bold">
                                        Synopsis
                                    </h3>
                                </div>
                                <div className="flex gap-5">
                                    <h3 className="text-xl font-bold flex gap-1">
                                        Ranked:{""}
                                        <p className="font-normal">
                                            {data.rank
                                                ? `#${data.rank}`
                                                : " unknown"}
                                        </p>
                                    </h3>
                                    <h3 className="text-xl font-bold flex gap-1">
                                        Popularity: {}
                                        <p className="font-normal">
                                            {data.popularity
                                                ? `#${data.popularity}`
                                                : " unknown"}
                                        </p>
                                    </h3>
                                    <h3 className="text-xl font-bold flex gap-1">
                                        Members: {}
                                        <p className="font-normal">
                                            {data.members
                                                ? data.members
                                                      .toString()
                                                      .replace(
                                                          /\B(?=(\d{3})+(?!\d))/g,
                                                          ","
                                                      )
                                                : " unknown"}
                                        </p>
                                    </h3>
                                </div>
                            </div>
                            <p className="pt-3 text-md text-left">
                                {data.synopsis}
                            </p>
                        </div>
                    </div>
                    <div className="flex gap-10 justify-between w-full pt-7 pb-10">
                        <div className="flex w-[11%]  flex-col items-center rounded-2xl transition-colors duration-300 py-2 px-2  bg-yellow-400 dark:bg-yellow-600">
                            <p className="text-md font-bold">SCORE</p>

                            <div className="flex font-bold items-end">
                                <p className="text-3xl">
                                    {data.score
                                        ? Math.floor(data.score)
                                        : "unknown"}
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
                            <p className="font-normal dark:font-light  ">
                                {data.scored_by
                                    ? ` ${data.scored_by
                                          .toString()
                                          .replace(
                                              /\B(?=(\d{3})+(?!\d))/g,
                                              ","
                                          )} users`
                                    : "unknown"}
                            </p>
                        </div>
                        <div className=" flex w-full items-start justify-evenly flex-col border-2 rounded-xl">
                            <div className="flex justify-center w-full items-center gap-4 px-5">
                                <p className="flex gap-1 font-bold">
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
                            <div className="w-full bg-white h-[1px]"></div>
                            <div className="flex w-full justify-center gap-4 items-center px-5">
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
