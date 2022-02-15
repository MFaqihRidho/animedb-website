import React from "react";
import { getSearchAPI } from "../../config";
import CardList from "../../components/card list";
import { useParams } from "react-router-dom";

export default function Search() {
    const params = useParams();
    console.log(params.value);
    return (
        <div className="min-h-screen">
            <CardList
                api={getSearchAPI(params.value)}
                number={1}
                title={"Result"}
                all={true}
            ></CardList>
        </div>
    );
}
