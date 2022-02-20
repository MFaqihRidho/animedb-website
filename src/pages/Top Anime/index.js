import React, { useState, useEffect } from "react";
import CardList from "../../components/card list";
import { getTopAPI } from "../../config";
import Pagination from "../../components/pagination";
import { useParams } from "react-router-dom";

export default function TopAnime() {
    const [nextPage, setNextPage] = useState([]);
    const params = useParams();

    const scrollTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    useEffect(() => {
        let mounted = true;
        scrollTop();
        getTopAPI(1).then((result) => {
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
    }, [params]);

    return (
        <div className="min-h-screen py-10">
            <CardList
                title="Top Anime"
                api={getTopAPI(params.number)}
                all={true}
                rank={true}
            ></CardList>
            <Pagination title="topAnime" maxPage={nextPage}></Pagination>
        </div>
    );
}
