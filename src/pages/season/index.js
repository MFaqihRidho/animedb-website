import React, { useEffect, useState } from "react";
import { getSeasonAPI, getSeasonListAPI } from "../../config";
import CardList from "../../components/card list";
import Pagination from "../../components/pagination";
import { useParams, useNavigate } from "react-router-dom";

export default function Season() {
    // Router
    const params = useParams();
    const navigate = useNavigate();

    const [nextPage, setNextPage] = useState([]);
    const [season, setSeason] = useState([]);
    const [year, setYear] = useState([]);
    const [list, setList] = useState([]);

    const scrollTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    const applyFilter = () => {
        navigate(`/season/page/1/${year}/${season}`);
        setYear("");
        setSeason("");
    };

    useEffect(() => {
        let mounted = true;
        scrollTop();
        getSeasonListAPI().then((result) => {
            if (mounted) {
                setList(result.data);
            } else {
                return;
            }
        });
        getSeasonAPI(params.year, params.season, 1).then((result) => {
            if (mounted) {
                setNextPage(result.pagination.last_visible_page);
            } else {
                return;
            }
        });
        return () => (mounted = false);
    }, [params]);

    return (
        <div className="min-h-screen py-10">
            <div className="container flex pb-5 flex-col items-center justify-center gap-5 px-10 mx-auto md:px-5">
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
                                value={year}
                                onChange={(e) => setYear(e.target.value)}
                                className="h-10 pl-5 pr-10 transition-all duration-300 outline-none appearance-none rounded-xl focus:ring-4 focus:ring-light_primary focus:dark:ring-dark_primary bg-light_secondary dark:bg-dark_secondary focus:outline-none active:outline-none"
                            >
                                <option value={""}>Year</option>
                                {list.map((data) => (
                                    <option value={data.year}>
                                        {data.year}
                                    </option>
                                ))}
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
                                value={season}
                                onChange={(e) => setSeason(e.target.value)}
                                className="h-10 pl-5 pr-10 transition-all duration-300 outline-none appearance-none rounded-xl focus:ring-4 focus:ring-light_primary focus:dark:ring-dark_primary bg-light_secondary dark:bg-dark_secondary focus:outline-none active:outline-none"
                            >
                                <option value={""}>Season</option>

                                <option value={"winter"}> winter</option>
                                <option value={"spring"}>spring</option>
                                <option value={"summer"}>summer</option>
                                <option value={"fall"}>fall</option>
                            </select>
                        </div>
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
            <CardList
                title={`${params.season} ${params.year}`}
                api={getSeasonAPI(params.year, params.season, params.number)}
                all={true}
                firstCard={true}
                link={false}
            ></CardList>
            <Pagination
                title={"season"}
                maxPage={nextPage}
                query={`/${params.year}/${params.season}`}
            ></Pagination>
        </div>
    );
}
