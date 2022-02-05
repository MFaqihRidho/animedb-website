import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDetailsAPI } from "../../config";
import Detail from "../../details";

export default function Details() {
    const params = useParams();
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            await getDetailsAPI(params.id).then((result) =>
                setData(result.data)
            );
        };
        fetchData();
    }, [params.id]);
    return (
        <div className="w-full min-h-screen">
            <div className=""></div>
            <img
                className="w-full"
                src={data?.trailer?.images?.maximum_image_url}
                alt=""
            />
        </div>
    );
}
