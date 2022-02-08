import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDetailsAPI } from "../../config";
import Videos from "../../components/content/videos";

export default function Details() {
    const params = useParams();
    const [data, setData] = useState([]);
    const [content, setContent] = useState(0);

    const switchContent = (index) => {
        setContent(index);
    };

    useEffect(() => {
        switchContent(1);
        getDetailsAPI(params.id).then((result) => {
            setData(result.data);
        });
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
                        <div className="md:flex  -mt-44  md:-mt-40  md:flex-col md:items-center md:gap-10">
                            <img
                                className="relative h-96 md:h-full md:max-w-xs  rounded-2xl "
                                src={data?.images?.jpg?.image_url}
                                alt=""
                            />
                            <div className="hidden md:flex w-2/3 xl:hidden  flex-col items-center rounded-2xl transition-colors duration-300 py-2 px-2  bg-yellow-400 dark:bg-yellow-600">
                                <p className="font-bold text-md">SCORE</p>

                                <div className="flex items-end font-bold">
                                    <p className="text-5xl">
                                        {data.score
                                            ? Math.floor(data.score)
                                            : "NA"}
                                    </p>
                                    <p className="text-3xl">
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
                                <div className="flex flex-col  md:flex-row items-center mb-3 order-1 md:justify-start justify-center lg:order-2 gap-3 lg:gap-5">
                                    <h3 className="flex gap-1  text-xl font-bold">
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
                            <p className="pt-3 md:pr-5 lg:max-w-full lg:min-h-[18rem] xl:min-h-[7rem] md:max-w-synopsis lg:pr-0 text-justify	 md:text-left text-md">
                                {data.synopsis}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center flex-col xl:flex-row justify-between px-5 w-full gap-10 pb-10 pt-7">
                        <div className="flex md:hidden w-1/2 xl:flex xl:w-[11%]  justify-center flex-col items-center rounded-2xl transition-colors duration-300 py-1 px-1  bg-yellow-400 dark:bg-yellow-600">
                            <p className="font-bold text-md">SCORE</p>

                            <div className="flex items-end font-bold">
                                <p className="text-5xl">
                                    {data.score ? Math.floor(data.score) : "NA"}
                                </p>
                                <p className="text-3xl">
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
                                        {data.type ? data.type : "unknown"}
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
                                <p className="text-center md:flex gap-1 font-bold">
                                    Genre :
                                    <p className="font-normal  dark:font-light">
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
                                        {data.status ? data.status : "unknown"}
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
            <div className="min-h-fit w-full px-5 py-10">
                <div className="container justify-between  w-full mx-auto flex">
                    <button
                        onClick={() => switchContent(1)}
                        className={`uppercase border-b-4 border-b-transparent  pb-2 ${
                            content === 1
                                ? "border-b-4 border-b-light_secondary dark:border-b-dark_secondary"
                                : "border-b-4 border-b-transparent"
                        } font-bold text-xl`}
                    >
                        Videos
                    </button>
                    <button
                        onClick={() => switchContent(2)}
                        className={`uppercase border-b-4 border-b-transparent  pb-2 ${
                            content === 2
                                ? "border-b-4 border-b-light_secondary dark:border-b-dark_secondary"
                                : "border-b-4 border-b-transparent"
                        } font-bold text-xl`}
                    >
                        Episodes
                    </button>
                    <button
                        onClick={() => switchContent(3)}
                        className={`uppercase border-b-4 border-b-transparent  pb-2 ${
                            content === 3
                                ? "border-b-4 border-b-light_secondary dark:border-b-dark_secondary"
                                : "border-b-4 border-b-transparent"
                        } font-bold text-xl`}
                    >
                        Reviews
                    </button>
                    <button
                        onClick={() => switchContent(4)}
                        className={`uppercase border-b-4 border-b-transparent  pb-2 ${
                            content === 4
                                ? "border-b-4 border-b-light_secondary dark:border-b-dark_secondary"
                                : "border-b-4 border-b-transparent"
                        } font-bold text-xl`}
                    >
                        recommendations
                    </button>
                    <button
                        onClick={() => switchContent(5)}
                        className={`uppercase border-b-4 border-b-transparent  pb-2 ${
                            content === 5
                                ? "border-b-4 border-b-light_secondary dark:border-b-dark_secondary"
                                : "border-b-4 border-b-transparent"
                        } font-bold text-xl`}
                    >
                        Stats
                    </button>
                    <button
                        onClick={() => switchContent(6)}
                        className={`uppercase border-b-4 border-b-transparent  pb-2 ${
                            content === 6
                                ? "border-b-4 border-b-light_secondary dark:border-b-dark_secondary"
                                : "border-b-4 border-b-transparent"
                        } font-bold text-xl`}
                    >
                        Character & staff
                    </button>
                    <button
                        onClick={() => switchContent(7)}
                        className={`uppercase border-b-4 border-b-transparent  pb-2 ${
                            content === 7
                                ? "border-b-4 border-b-light_secondary dark:border-b-dark_secondary"
                                : "border-b-4 border-b-transparent"
                        } font-bold text-xl`}
                    >
                        More Info
                    </button>
                </div>
                <div className="container mx-auto min-h-fit">
                    <div className={content === 1 ? "block" : "hidden"}>
                        <Videos></Videos>
                    </div>
                </div>
            </div>
        </div>
    );
}
