import React from "react";
import CardList from "../../components/card list";
import { getTopAPI } from "../../config";

export default function Anime() {
    return (
        <div className="min-h-screen py-10">
            <CardList
                title="Top Anime"
                api={getTopAPI(1)}
                link={true}
                navigate={"/topAnime/page/1"}
            ></CardList>
        </div>
    );
}
