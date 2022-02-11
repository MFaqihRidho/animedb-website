import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDetailsAPI } from "../../config";
import { useSelector, useDispatch } from "react-redux";
import Videos from "../../components/content/videos";
import Episodes from "../../components/content/Episodes";
import Reviews from "../../components/content/reviews";
import Recommendation from "../../components/content/recommendations";
import Stats from "../../components/content/stats";
import Character_Staff from "../../components/content/character & staff";
import More_Info from "../../components/content/more info";

export default function Details() {
    const params = useParams();
    const [data, setData] = useState([]);
    const loading = useSelector((state) => state.detailsLoading);
    const [content, setContent] = useState(0);
    const dispatch = useDispatch();

    const switchContent = (index) => {
        setContent(index);
    };

    const scrollTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    useEffect(() => {
        let mounted = true;
        scrollTop();
        dispatch({ type: "LOADING_DETAILS_TRUE" });
        getDetailsAPI(params.id).then((result) => {
            if (mounted) {
                setData(result.data);
                switchContent(1);
                dispatch({ type: "LOADING_DETAILS_FALSE" });
            } else {
                return;
            }
        });
        return () => (mounted = false);
    }, [params.id]);
    return (
        <div className="w-full min-h-screen text-gray-700 dark:text-gray-200">
            {loading ? (
                <div>
                    <div className="w-full animate-pulse transition-all duration-300 h-96 bg-light_secondary dark:bg-dark_secondary"></div>
                    <div className="w-full animate-pulse transition-all duration-300 h-fit bg-light_primary dark:bg-dark_primary ">
                        <div className="container flex flex-col px-5 pb-10 mx-auto">
                            <div className="flex flex-col items-center md:flex-row md:items-start md:gap-10">
                                <div className="md:-mt-28 -mt-44 w-56 xl:w-72 h-80 bg-light_secondary dark:bg-dark_secondary rounded-2xl "></div>
                                <div className="md:-mt-10 flex flex-col md:w-2/3 lg:w-[75%] xl:w-full gap-7">
                                    <div className="md:bg-light_primary bg-light_secondary dark:bg-dark_secondary w-44 h-7 md:dark:bg-dark_primary"></div>
                                    <div className="flex md:flex-col lg:flex-row md:gap-5 lg:gap-10 justify-between">
                                        <div className="bg-light_secondary md:order-2 lg:order-1 w-44 h-7 dark:bg-dark_secondary"></div>
                                        <div className="flex md:order-1 lg:order-2 gap-10">
                                            <div className="w-44 bg-light_secondary h-7 dark:bg-dark_secondary"></div>
                                            <div className="w-44 bg-light_secondary h-7 dark:bg-dark_secondary"></div>
                                            <div className="w-44 bg-light_secondary h-7 dark:bg-dark_secondary"></div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-5">
                                        <div className="bg-light_secondary w-full h-5 dark:bg-dark_secondary"></div>
                                        <div className="bg-light_secondary w-full h-5 dark:bg-dark_secondary"></div>
                                        <div className="bg-light_secondary w-full h-5 dark:bg-dark_secondary"></div>
                                        <div className="bg-light_secondary w-full h-5 dark:bg-dark_secondary"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div>
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
                    <div className="w-full transition-all duration-300 h-fit bg-light_primary dark:bg-dark_primary">
                        <div className="container flex flex-col mx-auto">
                            <div className="flex flex-col items-center w-full px-5 md:items-start lg:items-center md:flex-row">
                                <div className="md:flex -mt-44 md:-mt-40 md:flex-col md:items-center md:gap-10">
                                    <img
                                        className="relative h-96 md:h-full md:max-w-xs rounded-2xl "
                                        src={data?.images?.jpg?.image_url}
                                        alt=""
                                    />
                                    <div className="flex-col items-center hidden w-2/3 px-2 py-2 transition-colors duration-300 bg-yellow-400 md:flex xl:hidden rounded-2xl dark:bg-yellow-600">
                                        <p className="font-bold text-md">
                                            SCORE
                                        </p>

                                        <div className="flex items-end font-bold">
                                            <p className="text-5xl">
                                                {data?.score
                                                    ? Math.floor(data?.score)
                                                    : "NA"}
                                            </p>
                                            <p className="text-3xl">
                                                {data?.score
                                                    ? (
                                                          data?.score -
                                                          Math.floor(
                                                              data?.score
                                                          )
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
                                    <h1 className="relative mt-5 text-2xl font-bold text-center md:whitespace-nowrap md:overflow-hidden md:text-ellipsis md:text-3xl md:text-left md:max-w-read lg:max-w-full ">
                                        {data.title}
                                    </h1>
                                    <div className="flex flex-col justify-between w-full pt-5 lg:flex-row">
                                        <div className="order-2 mt-3 md:mt-0 lg:order-1">
                                            <h3 className="text-2xl font-bold text-center md:text-left">
                                                Synopsis
                                            </h3>
                                        </div>
                                        <div className="flex flex-col items-center justify-center order-1 gap-3 mb-3 md:flex-row md:justify-start lg:order-2 lg:gap-5">
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
                                    <p className="pt-3 md:pr-5 lg:max-w-full lg:min-h-[18rem] xl:min-h-[7rem] md:max-w-synopsis lg:pr-0 text-justify	 md:text-left text-md">
                                        {data.synopsis}
                                    </p>
                                </div>
                            </div>
                            <div className="flex flex-col items-center justify-between w-full gap-10 px-5 pb-10 xl:flex-row pt-7">
                                <div className="flex md:hidden w-1/2 xl:flex xl:w-[11%]  justify-center flex-col items-center rounded-2xl transition-colors duration-300 py-1 px-1  bg-yellow-400 dark:bg-yellow-600">
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
                                <div className="flex-col items-start w-full border-2 border-gray-700 lg:flex dark:border-gray-200 justify-evenly rounded-xl">
                                    <div className="flex flex-col items-center justify-center w-full gap-4 p-5 xl:flex-row">
                                        <p className="flex gap-1 font-bold">
                                            Type :
                                            <p className="font-normal dark:font-light">
                                                {data.type
                                                    ? data.type
                                                    : "unknown"}
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
                                        <p className="gap-1 font-bold text-center md:flex">
                                            Genre :
                                            <p className="font-normal dark:font-light">
                                                {data.genres
                                                    ? data.genres
                                                          .map(
                                                              (data) =>
                                                                  data.name
                                                          )
                                                          .join(",")
                                                    : "unknown"}
                                                {data.themes
                                                    ? data.themes.map(
                                                          (data) =>
                                                              `,${data.name}`
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
                                                {data.status
                                                    ? data.status
                                                    : "unknown"}
                                            </p>
                                        </p>
                                    </div>
                                    <div className="w-full  bg-gray-700 dark:bg-gray-200 h-[1px]"></div>
                                    <div className="flex flex-col items-center justify-center w-full gap-4 p-5 xl:flex-row">
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
                                                              .map(
                                                                  (data) =>
                                                                      data.name
                                                              )
                                                              .join(",")
                                                        : "unknown"
                                                    : "unknown"}
                                            </a>
                                        </p>
                                        <p className="flex gap-1 font-bold">
                                            Rating :
                                            <p className="font-normal dark:font-light">
                                                {data.rating
                                                    ? data.rating
                                                    : "unknown"}
                                            </p>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full px-5 py-10 min-h-fit">
                        <div className="container flex justify-between w-full mx-auto">
                            <button
                                onClick={() => switchContent(1)}
                                className={`uppercase border-b-4 border-b-transparent hover:border-b-4 hover:border-b-light_secondary hover:dark:border-b-dark_secondary pb-2 ${
                                    content === 1
                                        ? "border-b-4 border-b-light_secondary dark:border-b-dark_secondary"
                                        : "border-b-4 border-b-transparent"
                                } font-bold text-xl`}
                            >
                                Videos
                            </button>
                            <button
                                onClick={() => switchContent(2)}
                                className={`uppercase border-b-4 border-b-transparent hover:border-b-4 hover:border-b-light_secondary hover:dark:border-b-dark_secondary pb-2 ${
                                    content === 2
                                        ? "border-b-4 border-b-light_secondary dark:border-b-dark_secondary"
                                        : "border-b-4 border-b-transparent"
                                } font-bold text-xl`}
                            >
                                Episodes
                            </button>
                            <button
                                onClick={() => switchContent(3)}
                                className={`uppercase border-b-4 border-b-transparent hover:border-b-4 hover:border-b-light_secondary hover:dark:border-b-dark_secondary  pb-2 ${
                                    content === 3
                                        ? "border-b-4 border-b-light_secondary dark:border-b-dark_secondary"
                                        : "border-b-4 border-b-transparent"
                                } font-bold text-xl`}
                            >
                                Reviews
                            </button>
                            <button
                                onClick={() => switchContent(4)}
                                className={`uppercase border-b-4 border-b-transparent hover:border-b-4 hover:border-b-light_secondary hover:dark:border-b-dark_secondary  pb-2 ${
                                    content === 4
                                        ? "border-b-4 border-b-light_secondary dark:border-b-dark_secondary"
                                        : "border-b-4 border-b-transparent"
                                } font-bold text-xl`}
                            >
                                recommendations
                            </button>
                            <button
                                onClick={() => switchContent(5)}
                                className={`uppercase border-b-4 border-b-transparent hover:border-b-4 hover:border-b-light_secondary hover:dark:border-b-dark_secondary  pb-2 ${
                                    content === 5
                                        ? "border-b-4 border-b-light_secondary dark:border-b-dark_secondary"
                                        : "border-b-4 border-b-transparent"
                                } font-bold text-xl`}
                            >
                                Stats
                            </button>
                            <button
                                onClick={() => switchContent(6)}
                                className={`uppercase border-b-4 border-b-transparent hover:border-b-4 hover:border-b-light_secondary hover:dark:border-b-dark_secondary  pb-2 ${
                                    content === 6
                                        ? "border-b-4 border-b-light_secondary dark:border-b-dark_secondary"
                                        : "border-b-4 border-b-transparent"
                                } font-bold text-xl`}
                            >
                                Character & staff
                            </button>
                            <button
                                onClick={() => switchContent(7)}
                                className={`uppercase border-b-4 border-b-transparent hover:border-b-4 hover:border-b-light_secondary hover:dark:border-b-dark_secondary  pb-2 ${
                                    content === 7
                                        ? "border-b-4 border-b-light_secondary dark:border-b-dark_secondary"
                                        : "border-b-4 border-b-transparent"
                                } font-bold text-xl`}
                            >
                                More Info
                            </button>
                        </div>
                        <div className="container mx-auto min-h-fit">
                            <div>
                                {content === 1 ? <Videos></Videos> : null}
                            </div>
                            <div>
                                {content === 2 ? <Episodes></Episodes> : null}
                            </div>
                            <div>
                                {content === 3 ? <Reviews></Reviews> : null}
                            </div>
                            <div>
                                {content === 4 ? (
                                    <Recommendation></Recommendation>
                                ) : null}
                            </div>
                            <div>{content === 5 ? <Stats></Stats> : null}</div>
                            <div>
                                {content === 6 ? (
                                    <Character_Staff></Character_Staff>
                                ) : null}
                            </div>
                            <div>
                                {content === 7 ? <More_Info></More_Info> : null}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
