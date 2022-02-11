import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getStatAPI } from "../../../config";

export default function Stats() {
    const params = useParams();
    const [data, setData] = useState([]);

    useEffect(() => {
        let mounted = true;
        getStatAPI(params.id).then((result) => {
            if (mounted) {
                setData(result.data);
            } else {
                return;
            }
        });
        return () => (mounted = false);
    }, [params.id]);
    return (
        <div className="">
            {data?.length !== 0 ? (
                <div className="flex justify-between w-full">
                    <div className="pt-10 flex flex-col gap-2 w-full">
                        <h1 className="text-3xl font-bold mb-3">
                            Summary Stats
                        </h1>
                        <p className="text-xl font-bold">
                            Watching :{" "}
                            <span className="font-normal">
                                {data?.watching
                                    .toString()
                                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                            </span>
                        </p>
                        <p className="text-xl font-bold">
                            Completed :{" "}
                            <span className="font-normal">
                                {data?.completed
                                    .toString()
                                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                            </span>
                        </p>
                        <p className="text-xl font-bold">
                            On-Hold :{" "}
                            <span className="font-normal">
                                {data?.on_hold
                                    .toString()
                                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                            </span>
                        </p>
                        <p className="text-xl font-bold">
                            Dropped :{" "}
                            <span className="font-normal">
                                {data?.dropped
                                    .toString()
                                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                            </span>
                        </p>
                        <p className="text-xl font-bold">
                            Plan to Watch :{" "}
                            <span className="font-normal">
                                {data?.plan_to_watch
                                    .toString()
                                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                            </span>
                        </p>
                        <p className="text-xl font-bold">
                            Total :{" "}
                            <span className="font-normal">
                                {data?.total
                                    .toString()
                                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                            </span>
                        </p>
                    </div>
                    <div className="pt-10 flex flex-col gap-2">
                        <h1 className="text-3xl font-bold mb-3">
                            Scored Stats
                        </h1>
                        <div className="flex flex-col gap-3 w-full">
                            {data?.scores !== 0 ? (
                                data?.scores
                                    .slice(0)
                                    .reverse()
                                    .map((data) => (
                                        <div
                                            className={`grid grid-cols-[1fr,40fr] items-center gap-3 w-full`}
                                        >
                                            <p>{data.score}</p>
                                            <div className="flex flex-row items-center gap-2">
                                                <div
                                                    style={{
                                                        width: `${data.percentage}%`,
                                                    }}
                                                    className={`h-3  bg-light_secondary dark:bg-dark_secondary`}
                                                ></div>
                                                <p className="whitespace-nowrap">
                                                    {data.percentage}% : (
                                                    {data.votes
                                                        .toString()
                                                        .replace(
                                                            /\B(?=(\d{3})+(?!\d))/g,
                                                            ","
                                                        )}
                                                    votes)
                                                </p>
                                            </div>
                                        </div>
                                    ))
                            ) : (
                                <h1 className="text-3xl ">Not Available</h1>
                            )}
                        </div>
                    </div>
                </div>
            ) : (
                <h1 className="text-3xl ">Not Available</h1>
            )}
        </div>
    );
}
