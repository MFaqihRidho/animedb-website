import React, { useState, useEffect } from "react";
import CardList from "../../components/card list";
import Pagination from "../../components/pagination";
import { useParams } from "react-router-dom";

export default function PagesCard(props) {
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
        props?.api(1).then((result) => {
            if (mounted) {
                setNextPage(result.pagination.last_visible_page);
            } else {
                return;
            }
        });
        return () => (mounted = false);
    }, [props]);

    useEffect(() => {
        scrollTop();
    }, [params]);

    return (
        <div className="min-h-screen py-10">
            <CardList
                title={`${props.title} Anime`}
                api={props?.api(params.number)}
                all={true}
                rank={props.rank}
                firstCard={true}
            ></CardList>
            <Pagination title={props.title} maxPage={nextPage}></Pagination>
        </div>
    );
}
