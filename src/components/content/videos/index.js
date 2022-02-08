import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getVideosAPI } from "../../../config";

export default function Videos() {
    const params = useParams();
    const [data, setData] = useState([]);

    useEffect(() => {
        getVideosAPI(params.id).then((results) => {
            setData(results.data);
        });
    }, [params.id]);
    return (
        <div className="flex flex-col py-10">
            {data?.promo
                ? data.promo.map((data) => (
                      <div className="iframe-container w-full h-full relative">
                          <iframe
                              src={data?.trailer?.embed_url}
                              frameborder="0"
                              className=" w-full h-full"
                          ></iframe>
                      </div>
                  ))
                : null}
        </div>
    );
}
