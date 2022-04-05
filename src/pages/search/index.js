import React, { useEffect, useState } from "react";
import { getSearchAPI } from "../../config";
import CardList from "../../components/card list";
import Pagination from "../../components/pagination";
import { useDispatch } from "react-redux";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";

export default function Search() {
    // Router
    const params = useParams();
    const navigate = useNavigate();

    // Query String
    let [searchParams] = useSearchParams();
    const orderBy = searchParams.get("order_by");
    const sortBy = searchParams.get("sort");
    const typeBy = searchParams.get("type");
    const statusBy = searchParams.get("status");
    const ratingBy = searchParams.get("rating");

    // State
    const [data, setData] = useState([]);
    const [nextPage, setNextPage] = useState(0);
    const [order, setOrder] = useState(false);
    const [sort, setSort] = useState("asc");
    const [type, setType] = useState(false);
    const [status, setStatus] = useState(false);
    const [rating, setRating] = useState(false);
    const [queryParams, setQueryParams] = useState([]);

    // redux
    const dispatch = useDispatch();

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
            setOrder(false);
        }
    };

    const handleChangeSort = () => {
        if (sort === "asc") {
            setSort("desc");
        } else {
            setSort("asc");
        }
    };

    const handleChangeType = (e) => {
        if (e.target.value !== "") {
            setType(e.target.value);
        } else {
            setType(false);
        }
    };

    const handleChangeStatus = (e) => {
        if (e.target.value !== "") {
            setStatus(e.target.value);
        } else {
            setStatus(false);
        }
    };

    const handleChangeRating = (e) => {
        if (e.target.value !== "") {
            setRating(e.target.value);
        } else {
            setRating(false);
        }
    };

    const applyFilter = () => {
        setQueryParams(
            `?${order ? `&order_by=${order}` : ""}${
                sort ? `&sort=${sort}` : ""
            }${type ? `&type=${type}` : ""}${
                status ? `&status=${status}` : ""
            }${rating ? `&rating=${rating}` : ""}`
        );
        navigate(
            `${baseUrl}?${order ? `&order_by=${order}` : ""}${
                sort ? `&sort=${sort}` : ""
            }${type ? `&type=${type}` : ""}${
                status ? `&status=${status}` : ""
            }${rating ? `&rating=${rating}` : ""}`
        );
        setOrder(false);
        setType(false);
        setSort(false);
        setStatus(false);
        setRating(false);
    };

    useEffect(() => {
        let mounted = true;
        scrollTop();
        dispatch({ type: "LOADING_CARD_TRUE" });
        getSearchAPI(
            params.value,
            params.number,
            orderBy,
            sortBy,
            typeBy,
            statusBy,
            ratingBy
        ).then((result) => {
            if (mounted) {
                setNextPage(result.pagination.last_visible_page);
                setData(result.data);
                dispatch({ type: "LOADING_CARD_FALSE" });
            } else {
                return;
            }
        });
        return () => (mounted = false);
    }, [params, orderBy, ratingBy, sortBy, statusBy, typeBy, dispatch]);

    useEffect(() => {
        scrollTop();
    }, [params]);

    useEffect(() => {
        setOrder(false);
        setType(false);
        setSort(false);
        setStatus(false);
        setRating(false);
    }, [params.value]);

    return (
        <div className="flex flex-col gap-2 pt-10">
            <div className="container flex flex-col items-center justify-center gap-5 px-10 mx-auto md:px-5">
                <div className="flex flex-col items-center gap-5 md:flex-row">
                    <div className="flex flex-row gap-5">
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
                                value={type}
                                onChange={(e) => handleChangeType(e)}
                                className="h-10 pl-5 pr-10 transition-all duration-300 outline-none appearance-none rounded-xl focus:ring-4 focus:ring-light_primary focus:dark:ring-dark_primary bg-light_secondary dark:bg-dark_secondary focus:outline-none active:outline-none"
                            >
                                <option value={""}>Type</option>
                                <option value={"tv"}>tv</option>
                                <option value={"movie"}>movie</option>
                                <option value={"ova"}>ova</option>
                                <option value={"special"}>special</option>
                                <option value={"ona"}>ona</option>
                                <option value={"music"}>music</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex flex-row gap-5 ">
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
                                value={status}
                                onChange={(e) => handleChangeStatus(e)}
                                className="h-10 pl-5 pr-10 transition-all duration-300 outline-none appearance-none rounded-xl focus:ring-4 focus:ring-light_primary focus:dark:ring-dark_primary bg-light_secondary dark:bg-dark_secondary focus:outline-none active:outline-none"
                            >
                                <option value={""}>Status</option>
                                <option value={"airing"}>airing</option>
                                <option value={"complete"}>complete</option>
                                <option value={"upcoming"}>upcoming</option>
                            </select>
                        </div>
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
                                value={rating}
                                onChange={(e) => handleChangeRating(e)}
                                className="h-10 pl-5 pr-10 transition-all duration-300 outline-none appearance-none rounded-xl focus:ring-4 focus:ring-light_primary focus:dark:ring-dark_primary bg-light_secondary dark:bg-dark_secondary focus:outline-none active:outline-none"
                            >
                                <option value={""}>Rating</option>
                                <option value={"G"}>G - All Ages</option>
                                <option value={"pg"}>PG - Children</option>
                                <option value={"pg13"}>PG-13 - Teens</option>
                                <option value={"r17"}>R - 17+ Adults</option>
                            </select>
                        </div>
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
                            value={sort}
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
                <div className="flex flex-col gap-3 md:flex-row md:gap-5">
                    <p
                        className={`md:text-xl ${orderBy ? "block" : "hidden"}`}
                    >{`Order By: ${orderBy}`}</p>
                    <p
                        className={`md:text-xl ${typeBy ? "block" : "hidden"}`}
                    >{`Type: ${typeBy}`}</p>
                    <p
                        className={`md:text-xl ${
                            statusBy ? "block" : "hidden"
                        }`}
                    >{`Status: ${statusBy}`}</p>
                    <p
                        className={`md:text-xl ${
                            ratingBy ? "block" : "hidden"
                        }`}
                    >{`Rating: ${ratingBy}`}</p>
                    <p
                        className={`md:text-xl ${sortBy ? "block" : "hidden"}`}
                    >{`Sort: ${
                        sortBy === "asc" ? "ascending" : "descending"
                    }`}</p>
                </div>
            </div>
            <div className="flex flex-col justify-between min-h-screen">
                <CardList
                    data={data}
                    haveData={true}
                    title={`Result for ${params.value}`}
                    all={true}
                    firstCard={true}
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
