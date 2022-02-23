import React from "react";
import CardList from "../../components/card list";
import {
    getTopAPI,
    getUpcomingAPI,
    getTodayAPI,
    getAiringAPI,
} from "../../config";

export default function Anime() {
    const weekday = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];
    const d = new Date();
    let day = weekday[d.getDay()];
    return (
        <div className="flex flex-col min-h-screen py-10">
            <CardList
                title="Top Anime"
                api={getTopAPI(1)}
                link={true}
                navigate={"/top/page/1"}
                firstCard={true}
            ></CardList>
            <CardList
                title="Upcoming Anime"
                api={getUpcomingAPI(1)}
                link={true}
                navigate={"/upcoming/page/1"}
            ></CardList>
            <CardList
                title="Schedule Anime"
                api={getTodayAPI()}
                link={true}
                navigate={`/schedule/${day}/page/1`}
            ></CardList>
            <CardList
                title="Seasonal Anime"
                api={getAiringAPI()}
                link={true}
                navigate={`/season/page/1/2022/summer`}
            ></CardList>
        </div>
    );
}
