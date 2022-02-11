import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getVideosAPI } from "../../../config";

export default function Videos() {
    const params = useParams();
    const [data, setData] = useState([]);

    useEffect(() => {
        let mounted = true;
        getVideosAPI(params.id).then((result) => {
            if (mounted) {
                setData(result.data);
            } else {
                return;
            }
        });
        return () => (mounted = false);
    }, [params.id]);
    return (
        <div className="flex flex-col gap-10 py-5">
            {data?.length !== 0 ? (
                data.promo.map((data) => (
                    <div>
                        <p className="py-5 text-3xl">{data.title}</p>
                        <div className="iframe-container rounded-xl overflow-hidden w-full h-[45rem] relative">
                            <iframe
                                src={data?.trailer?.embed_url}
                                frameborder="0"
                                className="w-full h-full "
                            ></iframe>
                        </div>
                    </div>
                ))
            ) : (
                <h1 className="text-3xl">Not Available</h1>
            )}
        </div>
    );
}
