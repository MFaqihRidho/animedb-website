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
        <div className="flex flex-col gap-10 py-5">
            {data?.promo
                ? data.promo.map((data) => (
                      <div>
                          <p className="text-3xl py-5">{data.title}</p>
                          <div className="iframe-container rounded-xl overflow-hidden w-full h-[45rem] relative">
                              <iframe
                                  src={data?.trailer?.embed_url}
                                  frameborder="0"
                                  className=" w-full h-full"
                              ></iframe>
                          </div>
                      </div>
                  ))
                : null}
        </div>
    );
}
