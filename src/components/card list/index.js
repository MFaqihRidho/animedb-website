import React from "react";
import CardLoading from "../card loading";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

export default function CardList(props) {
    const [data, setData] = useState([]);
    const [error, setError] = useState("false");
    const [all, setAll] = useState(false);
    const loading = useSelector((state) => state.cardLoading);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const params = useParams();

    const handleClickEvent = (event) => {
        event.preventDefault();
        navigate(`/details/${event.currentTarget.id}`);
    };

    useEffect(() => {
        let mounted = true;
        dispatch({ type: "LOADING_CARD_TRUE" });
        if (props.all === true) {
            setAll(true);
        }
        props.api
            .then((result) => {
                if (mounted) {
                    if (result.error) {
                        console.log(error);
                    } else {
                        setData(result.data);
                    }
                    if (props.firstCard) {
                        dispatch({ type: "LOADING_CARD_FALSE" });
                    } else {
                        return;
                    }
                } else {
                    return;
                }
            })
            .catch((error) => {
                if (mounted) {
                    setError(error);
                    if (props.firstCard) {
                        dispatch({ type: "LOADING_CARD_FALSE" });
                    } else {
                        return;
                    }
                } else {
                    return;
                }
            });
        return () => (mounted = false);
    }, [params, dispatch, error, props.all, props.api, props.firstCard]);

    return (
        <div className="w-full px-3 pt-2 transition-all duration-300 bg-white md:px-5 dark:bg-black min-h-fit">
            <div className="container mx-auto text-gray-700 dark:text-gray-200">
                {" "}
                <div className="flex items-center justify-between mb-3 px-7 md:px-0">
                    <h1 className="text-lg font-bold lg:text-2xl md:text-xl">
                        {props.title}
                    </h1>
                    <div className="lg:w-2/3 h-0.5 w-1/6 sm:w-1/2 bg-gray-200 dark:bg-gray-500"></div>
                    {props?.link === true ? (
                        <button
                            onClick={() => navigate(props.navigate)}
                            className="text-lg font-extrabold md:text-xl text-light_secondary dark:text-dark_secondary"
                        >
                            {all ? "VIEW LESS" : "VIEW ALL"}
                        </button>
                    ) : (
                        <button
                            onClick={() => setAll(!all)}
                            className="text-lg font-extrabold md:text-xl text-light_secondary dark:text-dark_secondary"
                        >
                            {all ? "VIEW LESS" : "VIEW ALL"}
                        </button>
                    )}
                </div>
                {loading === true ? (
                    <CardLoading></CardLoading>
                ) : data?.length !== 0 && loading === false ? (
                    <div className="grid grid-cols-3 gap-3 px-5 py-5 md:px-0 justify-items-center lg:grid-cols-5 lg:gap-10 sm:gap-5 md:grid-cols-3 md:gap-7 card-list">
                        {all
                            ? data?.map((data) => (
                                  <div
                                      id={data.mal_id}
                                      onClick={handleClickEvent}
                                      className="relative w-full px-1 py-1 overflow-hidden transition-all duration-200 lg:w-full lg:px-0 lg:py-0 lg:hover:-translate-y-2 lg:hover:px-1 lg:hover:py-1 bg-light_secondary dark:bg-dark_secondary lg:bg-white lg:dark:bg-black lg:hover:bg-light_secondary lg:hover:dark:bg-dark_secondary h-fit card rounded-xl "
                                  >
                                      {props?.rank ? (
                                          <p className="hidden text-xl text-center lg:block">
                                              <span className="text-md text-bold">
                                                  {data?.rank}
                                              </span>
                                          </p>
                                      ) : null}
                                      <img
                                          src={data.images.jpg.image_url}
                                          alt=""
                                          className="object-cover w-full h-32 md:h-80 lg:h-60 xl:h-80 rounded-xl"
                                      />
                                      <p
                                          className={`text-center mx-auto overflow-hidden max-w-superMini text-ellipsis whitespace-nowrap md:max-w-mini lg:whitespace-normal sm:text-black sm:dark:text-white lg:text-white lg:dark:text-black text-sm md:text-lg lg:text-xl font-semibold`}
                                      >
                                          {data.title}
                                      </p>
                                      {props?.rank ? (
                                          <p className="text-center lg:hidden">
                                              <span className="text-md text-bold">
                                                  {data?.rank}
                                              </span>
                                          </p>
                                      ) : null}
                                  </div>
                              ))
                            : data?.slice(0, 5).map((data) => (
                                  <div
                                      id={data.mal_id}
                                      onClick={handleClickEvent}
                                      className="relative w-full px-1 py-1 overflow-hidden transition-all duration-200 lg:w-full lg:px-0 lg:py-0 lg:hover:-translate-y-2 lg:hover:px-1 lg:hover:py-1 bg-light_secondary dark:bg-dark_secondary lg:bg-white lg:dark:bg-black lg:hover:bg-light_secondary lg:hover:dark:bg-dark_secondary h-fit card rounded-xl "
                                  >
                                      <img
                                          src={data.images.jpg.image_url}
                                          alt=""
                                          className="object-cover w-full h-32 md:h-80 lg:h-60 xl:h-80 rounded-xl"
                                      />
                                      <p
                                          className={`text-center mx-auto overflow-hidden max-w-superMini text-ellipsis whitespace-nowrap md:max-w-mini lg:whitespace-normal sm:text-black sm:dark:text-white lg:text-white lg:dark:text-black text-sm md:text-lg lg:text-xl font-semibold`}
                                      >
                                          {data.title}
                                      </p>
                                  </div>
                              ))}
                    </div>
                ) : (
                    <div className="min-h-screen mt-10">
                        <h1 className="text-3xl font-bold text-center">
                            {error}
                        </h1>
                    </div>
                )}
            </div>
        </div>
    );
}
