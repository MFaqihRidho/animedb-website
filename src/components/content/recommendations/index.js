import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CardLoading from "../../card loading";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getRecommendationsAPI } from "../../../config";

export default function Recommendation() {
    const params = useParams();
    const [data, setData] = useState([]);
    const loading = useSelector((state) => state.cardLoading);
    let navigate = useNavigate();
    const dispatch = useDispatch();

    const handleClickEvent = (event) => {
        event.preventDefault();
        navigate(`/details/${event.currentTarget.id}`);
    };

    useEffect(() => {
        let mounted = true;
        dispatch({ type: "LOADING_CARD_TRUE" });
        getRecommendationsAPI(params.id).then((result) => {
            if (mounted) {
                setData(result.data);
                dispatch({ type: "LOADING_CARD_FALSE" });
            } else {
                return;
            }
        });
        return () => (mounted = false);
    }, [params.id]);
    return (
        <div className="py-5">
            {loading === true ? (
                <CardLoading></CardLoading>
            ) : (
                <div className="grid grid-cols-3 gap-3 py-5 px-7 md:px-0 justify-items-center lg:grid-cols-5 lg:gap-10 sm:gap-5 md:grid-cols-3 md:gap-7 card-list">
                    {data?.length !== 0 ? (
                        data.slice(0, 15).map((data) => (
                            <div
                                id={data?.entry?.mal_id}
                                onClick={handleClickEvent}
                                className="relative w-full px-1 py-1 overflow-hidden transition-all duration-200 lg:w-full lg:px-0 lg:py-0 lg:hover:-translate-y-2 lg:hover:px-1 lg:hover:py-1 bg-light_secondary dark:bg-dark_secondary lg:bg-white lg:dark:bg-black lg:hover:bg-light_secondary lg:hover:dark:bg-dark_secondary h-fit card rounded-xl "
                            >
                                <img
                                    src={
                                        data?.entry?.images.jpg.large_image_url
                                    }
                                    alt=""
                                    className="h-80 w-56 object-cover rounded-xl"
                                />
                                <p
                                    className={`text-center mx-auto overflow-hidden max-w-superMini text-ellipsis whitespace-nowrap md:max-w-mini lg:whitespace-normal sm:text-black sm:dark:text-white lg:text-white lg:dark:text-black text-sm md:text-lg lg:text-xl font-semibold`}
                                >
                                    {data?.entry?.title}
                                </p>
                            </div>
                        ))
                    ) : (
                        <h1 className="text-3xl">Not Available</h1>
                    )}
                </div>
            )}
        </div>
    );
}
