import React from "react";
import Hero from "../../components/hero";
import CardList from "../../components/card list";
import { getSeasonAPI } from "../../config";
import { getAiringAPI } from "../../config";
import { getTodayAPI } from "../../config";

export default function Home() {
    return (
        <div className="Home">
            <Hero></Hero>
            <CardList
                firstCard={true}
                api={getSeasonAPI(2022, "summer", 1)}
                title={"Summer 2022"}
            ></CardList>
            <CardList api={getAiringAPI()} title={"Airing"}></CardList>
            <CardList api={getTodayAPI()} title={"Today"}></CardList>
        </div>
    );
}
