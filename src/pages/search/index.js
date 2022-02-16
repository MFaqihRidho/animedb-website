import React, { useEffect, useState } from "react";
import { getSearchAPI } from "../../config";
import CardList from "../../components/card list";
import Pagination from "../../components/pagination";
import { useParams } from "react-router-dom";

export default function Search() {
    const params = useParams();
    const [nextPage, setNextPage] = useState(0);

    const scrollTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    useEffect(() => {
        let mounted = true;
        scrollTop();
        getSearchAPI(params.value, params.number).then((result) => {
            if (mounted) {
                setNextPage(result.pagination.last_visible_page);
            } else {
                return;
            }
        });
        return () => (mounted = false);
    }, []);

    useEffect(() => {
        scrollTop();
    }, [params.number]);

    return (
        <div className="flex flex-col justify-between min-h-screen pt-10">
            <CardList
                api={getSearchAPI(params.value, params.number, "popularity")}
                title={`Result for ${params.value}`}
                all={true}
                state={[params.value, params.number]}
            ></CardList>
            <Pagination title="search" maxPage={nextPage}></Pagination>
        </div>
    );
}
