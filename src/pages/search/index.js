import React, { useEffect, useState } from "react";
import { getSearchAPI } from "../../config";
import CardList from "../../components/card list";
import Pagination from "../../components/pagination";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";

export default function Search() {
    // Router
    const params = useParams();
    const navigate = useNavigate();

    // Query String
    let [searchParams, setSearchParams] = useSearchParams();
    const orderBy = searchParams.get("order_by");
    const sortBy = searchParams.get("sort");

    // State
    const [nextPage, setNextPage] = useState(0);
    const [order, setOrder] = useState([]);
    const [sort, setSort] = useState("asc");
    const [queryParams, setQueryParams] = useState([]);

    const baseUrl = `/search/${params.value}/page/${params.number}`;

    const scrollTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    const handleChangeOrderBy = (e) => {
        if (e.target.value !== "") {
            setOrder(e.target.value);
        } else {
            setOrder("");
        }
    };

    const handleChangeSort = () => {
        if (sort === "asc") {
            setSort("desc");
        } else {
            setSort("asc");
        }
    };

    const applyFilter = () => {
        setQueryParams(
            `?${order !== "" ? `&order_by=${order}` : ""}&${
                sort !== "" ? `sort=${sort}` : ""
            }`
        );
        navigate(
            `${baseUrl}?${order !== "" ? `&order_by=${order}` : ""}&${
                sort !== "" ? `sort=${sort}` : ""
            }`
        );
        console.log(sort);
    };

    useEffect(() => {
        let mounted = true;
        scrollTop();
        getSearchAPI(params.value, params.number).then((result) => {
            if (mounted) {
                setNextPage(result.pagination.last_visible_page);
                setOrder("");
            } else {
                return;
            }
        });
        return () => (mounted = false);
    }, [params.value]);

    useEffect(() => {
        scrollTop();
    }, [params.number]);

    return (
        <div className="flex flex-col gap-2 pt-10">
            <div className="container flex flex-col items-center justify-center gap-5 px-10 mx-auto md:px-5">
                <div className="flex gap-5">
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
                            value={order}
                            onChange={(e) => handleChangeOrderBy(e)}
                            className="h-10 pl-5 pr-10 transition-all duration-300 outline-none appearance-none rounded-xl focus:ring-4 focus:ring-light_primary focus:dark:ring-dark_primary bg-light_secondary dark:bg-dark_secondary focus:outline-none active:outline-none"
                        >
                            <option value={""}>Order By</option>
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
                    <div class="relative inline-flex">
                        {sort === "asc" ? (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="w-6 h-6 absolute top-0 right-0 mx-4 my-2 pointer-events-none"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M7 11l5-5m0 0l5 5m-5-5v12"
                                />
                            </svg>
                        ) : (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="w-6 h-6 absolute top-0 right-0 mx-4 my-2 pointer-events-none"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M17 13l-5 5m0 0l-5-5m5 5V6"
                                />
                            </svg>
                        )}

                        <button
                            onClick={handleChangeSort}
                            className="h-10 pl-5 pr-10 transition-all duration-300 appearance-none rounded-xl focus:ring-4 focus:ring-light_primary focus:dark:ring-dark_primary bg-light_secondary dark:bg-dark_secondary"
                        >
                            Sort
                        </button>
                    </div>
                </div>
                <div>
                    <button
                        onClick={applyFilter}
                        className="px-5 py-2 text-lg transition-all duration-300 rounded-xl focus:ring-4 focus:ring-light_primary focus:dark:ring-dark_primary bg-light_secondary dark:bg-dark_secondary"
                    >
                        Apply
                    </button>
                </div>
            </div>
            <div className="flex flex-col justify-between min-h-screen">
                <CardList
                    api={getSearchAPI(
                        params.value,
                        params.number,
                        orderBy,
                        sortBy
                    )}
                    title={`Result for ${params.value}`}
                    all={true}
                ></CardList>
                <Pagination
                    title="search"
                    query={queryParams}
                    maxPage={nextPage}
                ></Pagination>
            </div>
        </div>
    );
}
