import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getEpisodesAPI } from "../../../config";
import { useSelector, useDispatch } from "react-redux";
import ContentLoading from "../../content loading";

export default function Episodes() {
    const params = useParams();
    const [data, setData] = useState([]);
    const loading = useSelector((state) => state.contentLoading);
    const dispatch = useDispatch();

    useEffect(() => {
        let mounted = true;
        dispatch({ type: "LOADING_CONTENT_TRUE" });
        getEpisodesAPI(params.id).then((result) => {
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
        <div className="flex flex-col items-start w-full pt-10">
            {loading ? (
                <ContentLoading></ContentLoading>
            ) : data?.length !== 0 ? (
                data?.map((data) => (
                    <div className="text-2xl py-2 grid grid-cols-[0.5fr,0.5fr,1.5fr,1fr]">
                        <p className="min-w-[10ch]">Episode : {data?.mal_id}</p>
                        <p className="min-w-[30ch] max-w-[35ch] max-w text-ellipsis whitespace-nowrap overflow-hidden">
                            Title :{" "}
                            <a
                                target="_blank"
                                rel="noopener noreferrer"
                                className="underline underline-offset-2 decoration-1"
                                href={data?.url}
                            >
                                {data?.title}
                            </a>
                        </p>
                        <p className="px-10 overflow-hidden max-w-fit text-ellipsis whitespace-nowrap">
                            Aired : {data?.aired ? data?.aired : "NA"}
                        </p>
                        <p>
                            Discussion :{" "}
                            <a
                                target="_blank"
                                rel="noopener noreferrer"
                                className="underline underline-offset-2 decoration-1"
                                href={data?.forum_url}
                            >
                                Forum
                            </a>
                        </p>
                    </div>
                ))
            ) : (
                <h1 className="text-3xl">Not Available</h1>
            )}
        </div>
    );
}
