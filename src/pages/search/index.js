import React, { useEffect, useState } from "react";
import { getSearchAPI } from "../../config";
import CardList from "../../components/card list";
import Pagination from "../../components/pagination";
import { useParams, useNavigate, useLocation } from "react-router-dom";

export default function Search() {
    const params = useParams();
    const navigate = useNavigate();
    const { search } = useLocation();
    let query = new URLSearchParams(search);
    const sortBy = query.get("sort_by");
    const [nextPage, setNextPage] = useState(0);
    const [queryParams, setQueryParams] = useState(0);
    const baseUrl = `/search/${params.value}/page/${params.number}`;

    const scrollTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    const handleChangeSortBy = (e) => {
        navigate(`${baseUrl}?sort_by=${e.target.value}`);
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
    }, [params.number, sortBy]);

    return (
        <div className="flex flex-col gap-2 pt-10">
            <div className="container px-10 mx-auto md:px-5">
                <div class="relative inline-flex">
                    <svg
                        class="w-2 h-2 absolute top-0 right-0 m-4 pointer-events-none"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 412 232"
                    >
                        <path
                            d="M206 171.144L42.678 7.822c-9.763-9.763-25.592-9.763-35.355 0-9.763 9.764-9.763 25.592 0 35.355l181 181c4.88 4.882 11.279 7.323 17.677 7.323s12.796-2.441 17.678-7.322l181-181c9.763-9.764 9.763-25.592 0-35.355-9.763-9.763-25.592-9.763-35.355 0L206 171.144z"
                            fill="#648299"
                            fill-rule="nonzero"
                        />
                    </svg>
                    <select
                        value={sortBy ? sortBy : ""}
                        onChange={(e) => handleChangeSortBy(e)}
                        className="h-10 pl-5 pr-10 rounded-full appearance-none bg-light_secondary dark:bg-dark_secondary focus:outline-none"
                    >
                        <option>Sort By</option>
                        <option value={"title"}>title</option>
                        <option value={"type"}>type</option>
                        <option value={"rating"}>rating</option>
                        <option value={"start_date"}>start date</option>
                        <option value={"end_date"}>end date</option>
                        <option value={"episodes"}>episodes</option>
                        <option value={"score"}>score</option>
                        <option value={"scored_by"}>scored by</option>
                        <option value={"rank"}>rank</option>
                        <option value={"popularity"}>popularity</option>
                        <option value={"members"}>members</option>
                        <option value={"favorites"}>favorites</option>
                    </select>
                </div>
            </div>
            <div className="flex flex-col justify-between min-h-screen">
                <CardList
                    api={getSearchAPI(params.value, params.number, sortBy)}
                    title={`Result for ${params.value}`}
                    all={true}
                    state={[params.value, params.number, sortBy]}
                ></CardList>
                <Pagination
                    title="search"
                    query={search}
                    maxPage={nextPage}
                ></Pagination>
            </div>
        </div>
    );
}
