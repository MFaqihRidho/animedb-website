import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function Pagination(props) {
    const navigate = useNavigate();
    const params = useParams();

    const [showNoAvailable, setShowNoAvailable] = useState(false);

    const show = () => {
        setShowNoAvailable(true);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            if (showNoAvailable) {
                setShowNoAvailable(false);
            } else {
                return;
            }
        }, 2000);
        return () => clearInterval(interval);
    }, [showNoAvailable]);

    return (
        <div>
            <div class="flex flex-col relative items-center mt-10 mb-3">
                <h1
                    className={`text-2xl md:text-3xl ${
                        showNoAvailable ? "inline-block" : "hidden"
                    } absolute -top-12 md:-top-16`}
                >
                    {" "}
                    No Available Pages!
                </h1>
                <div class="flex">
                    <div
                        onClick={() =>
                            params.number <= 1
                                ? show()
                                : navigate(
                                      `/${props.title}${
                                          params.value ? `/${params.value}` : ""
                                      }/page/${parseInt(params.number) - 1}${
                                          props.query ? props.query : ""
                                      }`
                                  )
                        }
                        class="h-12 w-12 mr-1 flex justify-center items-center rounded-full bg-light_primary dark:bg-dark_primary cursor-pointer"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="100%"
                            height="100%"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="feather feather-chevron-left w-6 h-6"
                        >
                            <polyline points="15 18 9 12 15 6"></polyline>
                        </svg>
                    </div>
                    <div class="flex h-12 font-medium rounded-full bg-light_primary dark:bg-dark_primary">
                        <div
                            onClick={() =>
                                navigate(
                                    `/${props.title}${
                                        params.value ? `/${params.value}` : ""
                                    }/page/${1}${
                                        props.query ? props.query : ""
                                    }`
                                )
                            }
                            class="w-12 md:flex justify-center items-center hidden  cursor-pointer leading-5 transition duration-150 ease-in hover:bg-light_secondary hover:dark:bg-dark_secondary rounded-full  "
                        >
                            1
                        </div>
                        <div class="w-12 cursor-not-allowed	 md:flex justify-center items-center hidden leading-5 transition duration-150 ease-in rounded-full  ">
                            ...
                        </div>
                        <div
                            onClick={() =>
                                params.number <= 1
                                    ? show()
                                    : navigate(
                                          `/${props.title}${
                                              params.value
                                                  ? `/${params.value}`
                                                  : ""
                                          }/page/${
                                              parseInt(params.number) - 1
                                          }${props.query ? props.query : ""}`
                                      )
                            }
                            class="w-12 md:flex justify-center items-center hidden  cursor-pointer leading-5 transition duration-150 ease-in hover:bg-light_secondary hover:dark:bg-dark_secondary rounded-full  "
                        >
                            {params.number > 1 ? params.number - 1 : ""}
                        </div>
                        <div class="w-12 md:flex justify-center items-center hidden  cursor-pointer leading-5 transition duration-150 ease-in  rounded-full bg-light_secondary dark:bg-dark_secondary ">
                            {params.number}
                        </div>
                        <div
                            onClick={() =>
                                parseInt(props.maxPage) >
                                parseInt(params.number)
                                    ? navigate(
                                          `/${props.title}${
                                              params.value
                                                  ? `/${params.value}`
                                                  : ""
                                          }/page/${
                                              parseInt(params.number) + 1
                                          }${props.query ? props.query : ""}`
                                      )
                                    : show()
                            }
                            class="w-12 md:flex justify-center items-center hidden  cursor-pointer leading-5 transition duration-150 ease-in hover:bg-light_secondary hover:dark:bg-dark_secondary rounded-full  "
                        >
                            {parseInt(props.maxPage) > parseInt(params.number)
                                ? parseInt(params.number) + 1
                                : ""}
                        </div>
                        <div class="w-12 cursor-not-allowed	 md:flex justify-center items-center hidden leading-5 transition duration-150 ease-in rounded-full  ">
                            ...
                        </div>
                        <div
                            onClick={() =>
                                navigate(
                                    `/${props.title}${
                                        params.value ? `/${params.value}` : ""
                                    }/page/${props?.maxPage}${
                                        props.query ? props.query : ""
                                    }`
                                )
                            }
                            class="w-12 md:flex justify-center items-center hidden  cursor-pointer leading-5 transition duration-150 ease-in hover:bg-light_secondary hover:dark:bg-dark_secondary rounded-full  "
                        >
                            {props?.maxPage}
                        </div>
                        <div class="w-12 h-12 md:hidden flex justify-center items-center cursor-pointer leading-5 transition duration-150 ease-in rounded-full bg-light_secondary dark:bg-dark_secondary">
                            {params.number}
                        </div>
                    </div>
                    <div
                        onClick={() =>
                            parseInt(props.maxPage) > parseInt(params.number)
                                ? navigate(
                                      `/${props.title}${
                                          params.value ? `/${params.value}` : ""
                                      }/page/${parseInt(params.number) + 1}${
                                          props.query ? props.query : ""
                                      }`
                                  )
                                : show()
                        }
                        class="h-12 w-12 ml-1 flex justify-center items-center rounded-full bg-light_primary dark:bg-dark_primary cursor-pointer"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="100%"
                            height="100%"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="feather feather-chevron-right w-6 h-6"
                        >
                            <polyline points="9 18 15 12 9 6"></polyline>
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    );
}
