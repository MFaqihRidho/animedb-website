import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getReviewsAPI } from "../../../config";
import { useSelector, useDispatch } from "react-redux";
import ContentLoading from "../../content loading";

export default function Reviews() {
    const params = useParams();
    const [data, setData] = useState([]);
    const loading = useSelector((state) => state.contentLoading);
    const dispatch = useDispatch();

    useEffect(() => {
        let mounted = true;
        dispatch({ type: "LOADING_CONTENT_TRUE" });
        getReviewsAPI(params.id).then((result) => {
            if (mounted) {
                setData(result.data);
                dispatch({ type: "LOADING_CONTENT_FALSE" });
            } else {
                return;
            }
        });
        return () => (mounted = false);
    }, [params.id]);

    return (
        <div className="flex flex-col gap-10 pt-10">
            {loading ? (
                <ContentLoading></ContentLoading>
            ) : data?.length !== 0 ? (
                data?.map((data) => (
                    <div className="grid grid-cols-[1fr,8fr] gap-5">
                        <img
                            className="object-cover border-4 rounded-full border-light_secondary dark:border-dark_secondary w-28 h-28"
                            src={data?.user?.images?.jpg?.image_url}
                            alt=""
                        />

                        <div className="relative px-5 pt-2 pb-4 border-2 border-light_secondary dark:border-dark_secondary rounded-2xl">
                            <div class="w-10 top-5  -left-10 absolute overflow-hidden  inline-block">
                                <div class=" h-16 border-2 border-light_secondary dark:border-dark_secondary bg-white  dark:bg-black  -rotate-45 transform origin-top-right"></div>
                            </div>
                            <div className="flex py-2">
                                <h5 className="pr-2 text-2xl font-bold ">
                                    {data?.user?.username}
                                </h5>
                                <p className="pt-1 text-lg text-gray-500 ">
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
