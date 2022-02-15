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
import DetailsLoading from "../../components/details loading";
import MobileContentNav from "../../components/mobile/mobilenav content";

export default function Details() {
    const params = useParams();
    const [data, setData] = useState([]);
    const [content, setContent] = useState(0);
    const [contentNav, setContentNav] = useState(true);
    const loading = useSelector((state) => state.detailsLoading);

    const dispatch = useDispatch();

    const [isVisible, setIsVisible] = useState(true);

    const toggleContentNav = () => {
        setContentNav(!contentNav);
        contentNav ? setContent(5) : setContent(1);
    };

    const switchContent = (index) => {
        setContent(index);
        console.log(content);
    };

    const scrollTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    const listenToScroll = () => {
        let heightToShowFrom = 5000;
        const winScroll =
            document.body.scrollTop || document.documentElement.scrollTop;

        if (winScroll > heightToShowFrom) {
            isVisible && // to limit setting state only the first time
                setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", listenToScroll);
        return () => window.removeEventListener("scroll", listenToScroll);
    }, []);

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
                <DetailsLoading></DetailsLoading>
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
                                            {data?.scored_by
                                                ? ` ${data?.scored_by
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
                                        {data?.title}
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
                                                    {data?.rank
                                                        ? `#${data?.rank}`
                                                        : " NA"}
                                                </p>
                                            </h3>
                                            <h3 className="flex gap-1 text-xl font-bold">
                                                Popularity: {}
                                                <p className="font-normal">
                                                    {data?.popularity
                                                        ? `#${data?.popularity}`
                                                        : " NA"}
                                                </p>
                                            </h3>
                                            <h3 className="flex gap-1 text-xl font-bold">
                                                Members: {}
                                                <p className="font-normal">
                                                    {data?.members
                                                        ? data?.members
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
                                    <p className="pt-3 md:pr-5 lg:max-w-full lg:min-h-[18rem] xl:min-h-[7rem] md:max-w-synopsis lg:pr-0 text-justify mx-auto self-center md:text-left text-md">
                                        {data?.synopsis}
                                    </p>
                                </div>
                            </div>
                            <div className="flex flex-col items-center justify-between w-full gap-10 px-5 pb-10 xl:flex-row pt-7">
                                <div className="flex md:hidden w-1/2 xl:flex xl:w-[11%]  justify-center flex-col items-center rounded-2xl transition-colors duration-300 py-1 px-1  bg-yellow-400 dark:bg-yellow-600">
                                    <p className="font-bold text-md">SCORE</p>

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
                                                      Math.floor(data?.score)
                                                  )
                                                      .toFixed(2)
                                                      .toString()
                                                      .replace("0", "")
                                                : ""}
                                        </p>
                                    </div>
                                    <p className="font-normal dark:font-light ">
                                        {data?.scored_by
                                            ? ` ${data?.scored_by
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
                                                {data?.type
                                                    ? data?.type
                                                    : "unknown"}
                                            </p>
                                        </p>
                                        <p className="flex gap-1 font-bold">
                                            Episode :
                                            <p className="font-normal dark:font-light">
                                                {data?.episodes
                                                    ? data?.episodes
                                                    : "unknown"}
                                            </p>
                                        </p>
                                        <p className="gap-1 font-bold text-center md:flex">
                                            Genre :
                                            <p className="font-normal dark:font-light">
                                                {data?.genres
                                                    ? data?.genres
                                                          .map(
                                                              (data) =>
                                                                  data?.name
                                                          )
                                                          .join(",")
                                                    : "unknown"}
                                            </p>
                                        </p>
                                        <p className="gap-1 font-bold text-center md:flex">
                                            Theme :
                                            <p className="font-normal dark:font-light">
                                                {data?.themes
                                                    ? data?.themes
                                                          .map(
                                                              (data) =>
                                                                  data?.name
                                                          )
                                                          .join(",")
                                                    : "unknown"}
                                            </p>
                                        </p>
                                        <p className="flex gap-1 font-bold">
                                            Duration :
                                            <p className="font-normal dark:font-light">
                                                {data?.duration
                                                    ? data?.duration
                                                    : "unknown"}
                                            </p>
                                        </p>
                                    </div>
                                    <div className="w-full  bg-gray-700 dark:bg-gray-200 h-[1px]"></div>
                                    <div className="flex flex-col items-center justify-center w-full gap-4 p-5 xl:flex-row">
                                        <p className="flex gap-1 font-bold">
                                            Status :
                                            <p className="font-normal dark:font-light">
                                                {data?.status
                                                    ? data?.status
                                                    : "unknown"}
                                            </p>
                                        </p>
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
                                                    ? data?.broadcast.string
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
                                                    ? data?.studios.length !== 0
                                                        ? data?.studios
                                                              .map(
                                                                  (data) =>
                                                                      data?.name
                                                              )
                                                              .join(",")
                                                        : "unknown"
                                                    : "unknown"}
                                            </a>
                                        </p>
                                        <p className="flex gap-1 font-bold">
                                            Rating :
                                            <p className="font-normal dark:font-light">
                                                {data?.rating
                                                    ? data?.rating
                                                    : "unknown"}
                                            </p>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full px-5 py-10 min-h-fit">
                        <div className="container flex flex-row justify-around md:justify-between w-full mx-auto">
                            <button
                                onClick={() => switchContent(1)}
                                className={`uppercase border-b-4 ${
                                    contentNav ? "md:block" : "md:hidden"
                                } border-b-transparent hover:border-b-4 lg:block hover:border-b-light_secondary hover:dark:border-b-dark_secondary pb-2 ${
                                    content === 1
                                        ? "block border-b-4 border-b-light_secondary dark:border-b-dark_secondary"
                                        : "hidden border-b-4 border-b-transparent"
                                } font-bold text-xl`}
                            >
                                Videos
                            </button>
                            <button
                                onClick={() => switchContent(2)}
                                className={`uppercase border-b-4 ${
                                    contentNav ? "md:block" : "md:hidden"
                                } border-b-transparent hover:border-b-4 lg:block hover:border-b-light_secondary hover:dark:border-b-dark_secondary pb-2 ${
                                    content === 2
                                        ? "block border-b-4 border-b-light_secondary dark:border-b-dark_secondary"
                                        : "hidden border-b-4 border-b-transparent"
                                } font-bold text-xl`}
                            >
                                Episodes
                            </button>
                            <button
                                onClick={() => switchContent(3)}
                                className={`uppercase border-b-4 ${
                                    contentNav ? "md:block" : "md:hidden"
                                } border-b-transparent hover:border-b-4 lg:block hover:border-b-light_secondary hover:dark:border-b-dark_secondary  pb-2 ${
                                    content === 3
                                        ? "block border-b-4 border-b-light_secondary dark:border-b-dark_secondary"
                                        : "hidden border-b-4 border-b-transparent"
                                } font-bold text-xl`}
                            >
                                Reviews
                            </button>
                            <button
                                onClick={() => switchContent(4)}
                                className={`uppercase border-b-4 ${
                                    contentNav ? "md:block" : "md:hidden"
                                } border-b-transparent hover:border-b-4 lg:block hover:border-b-light_secondary hover:dark:border-b-dark_secondary  pb-2 ${
                                    content === 4
                                        ? "block border-b-4 border-b-light_secondary dark:border-b-dark_secondary"
                                        : "hidden border-b-4 border-b-transparent"
                                } font-bold text-xl`}
                            >
                                recommendations
                            </button>
                            <button
                                onClick={() => switchContent(5)}
                                className={`uppercase border-b-4 ${
                                    contentNav ? "md:hidden" : "md:block"
                                } lg:block border-b-transparent hover:border-b-4 hover:border-b-light_secondary hover:dark:border-b-dark_secondary  pb-2 ${
                                    content === 5
                                        ? "block border-b-4 border-b-light_secondary dark:border-b-dark_secondary"
                                        : "hidden border-b-4 border-b-transparent"
                                } font-bold text-xl`}
                            >
                                Stats
                            </button>
                            <button
                                onClick={() => switchContent(6)}
                                className={`uppercase border-b-4 ${
                                    contentNav ? "md:hidden" : "md:block"
                                } lg:block border-b-transparent hover:border-b-4 hover:border-b-light_secondary hover:dark:border-b-dark_secondary  pb-2 ${
                                    content === 6
                                        ? "block border-b-4 border-b-light_secondary dark:border-b-dark_secondary"
                                        : "hidden border-b-4 border-b-transparent"
                                } font-bold text-xl`}
                            >
                                Character & staff
                            </button>
                            <button
                                onClick={() => switchContent(7)}
                                className={`uppercase self-end border-b-4 ${
                                    contentNav ? "md:hidden" : "md:block"
                                } lg:block border-b-transparent hover:border-b-4 hover:border-b-light_secondary hover:dark:border-b-dark_secondary  pb-2 ${
                                    content === 7
                                        ? "block border-b-4 border-b-light_secondary dark:border-b-dark_secondary"
                                        : "hidden border-b-4 border-b-transparent"
                                } font-bold text-xl`}
                            >
                                More Info
                            </button>
                            <button className="pb-2 hidden md:block lg:hidden border-b-4 border-b-transparent hover:border-b-light_secondary hover:dark:border-b-dark_secondary">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-7 h-7 "
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    onClick={toggleContentNav}
                                >
                                    <path d="M8 5a1 1 0 100 2h5.586l-1.293 1.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L13.586 5H8zM12 15a1 1 0 100-2H6.414l1.293-1.293a1 1 0 10-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L6.414 15H12z" />
                                </svg>
                            </button>
                            <MobileContentNav
                                content1={() => switchContent(1)}
                                content2={() => switchContent(2)}
                                content3={() => switchContent(3)}
                                content4={() => switchContent(4)}
                                content5={() => switchContent(5)}
                                content6={() => switchContent(6)}
                                content7={() => switchContent(7)}
                            ></MobileContentNav>
                        </div>
                        <div className="container flex flex-col mx-auto min-h-[500px]">
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
                            {isVisible && (
                                <button
                                    onClick={scrollTop}
                                    className="text-center flex flex-col items-center fixed bottom-10 right-0 left-0 mx-auto animate-bounce"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-10 w-10"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M4.293 15.707a1 1 0 010-1.414l5-5a1 1 0 011.414 0l5 5a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414 0zm0-6a1 1 0 010-1.414l5-5a1 1 0 011.414 0l5 5a1 1 0 01-1.414 1.414L10 5.414 5.707 9.707a1 1 0 01-1.414 0z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    <p>Back To Top ?</p>
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
