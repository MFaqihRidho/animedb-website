import React from "react";
import CardList from "../../components/card list";
import { getTopAPI, getUpcomingAPI } from "../../config";

export default function Anime() {
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
        </div>
    );
}
