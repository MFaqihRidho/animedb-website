import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getEpisodesAPI } from "../../../config";

export default function Episodes() {
    const params = useParams();
    const [data, setData] = useState([]);

    useEffect(() => {
        getEpisodesAPI(params.id).then((results) => {
            setData(results.data);
        });
    }, [params.id]);
    return (
        <div className="flex flex-col pt-10 w-full items-start">
            {data?.length !== 0 ? (
                data.map((data) => (
                    <div className="text-2xl py-2 grid grid-cols-[0.5fr,0.5fr,1fr,1fr]">
                        <p className="min-w-[10ch]">Episode : {data.mal_id}</p>
                        <p className="min-w-[30ch] max-w-[35ch] max-w text-ellipsis whitespace-nowrap overflow-hidden">
                            Title :{" "}
                            <a
                                target="_blank"
                                rel="noopener noreferrer"
                                className="underline-offset-2  decoration-1 underline"
                                href={data.url}
                            >
                                {data.title}
                            </a>
                        </p>
                        <p className="px-10">
                            Aired : {data.aired ? data.aired : "NA"}
                        </p>
                        <p>
                            Discussion :{" "}
                            <a
                                target="_blank"
                                rel="noopener noreferrer"
                                className="underline-offset-2  decoration-1 underline"
                                href={data.forum_url}
                            >
                                Forum
                            </a>
                        </p>
                    </div>
                ))
            ) : (
                <h1 className="text-3xl">Not Available</h1>
            )}

            <p></p>
        </div>
    );
}
