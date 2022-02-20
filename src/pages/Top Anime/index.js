import React from "react";
import CardList from "../../components/card list";
import { getTopAPI } from "../../config";

export default function TopAnime() {
    return (
        <div className="min-h-screen py-10">
            <CardList
                title="Top Anime"
                api={getTopAPI()}
                all={true}
                rank={true}
            ></CardList>
        </div>
    );
}
