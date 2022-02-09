import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getReviewsAPI } from "../../../config";

export default function Reviews() {
    const params = useParams();
    const [data, setData] = useState([]);

    useEffect(() => {
        getReviewsAPI(params.id).then((results) => {
            setData(results.data);
        });
    }, [params.id]);

    return (
        <div className="flex flex-col gap-10 pt-10">
            {data ? (
                data.map((data) => (
                    <div className="grid grid-cols-[1fr,9fr] gap-5">
                        <img
                            className="rounded-full object-cover border-4 border-light_secondary dark:border-dark_secondary w-28 h-28"
                            src={data?.user?.images?.jpg?.image_url}
                            alt=""
                        />
                        <div className="border-2 border-light_secondary dark:border-dark_secondary rounded-2xl px-5 pb-4 pt-2">
                            <div className="flex  py-2">
                                <h5 className="pr-2 text-2xl font-bold ">
                                    {data?.user?.username}
                                </h5>
                                <p className="text-lg pt-1 text-gray-500 ">
                                    {data.date}
                                </p>
                            </div>
                            <p>{data.review}</p>
                        </div>
                    </div>
                ))
            ) : (
                <h1 className="text-3xl">Not Available</h1>
            )}
        </div>
    );
}
