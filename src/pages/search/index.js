import React, { useEffect, useState } from "react";
import { getSearchAPI } from "../../config";
import CardList from "../../components/card list";
import { useParams } from "react-router-dom";

export default function Search() {
    const params = useParams();

    const scrollTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    useEffect(() => {
        scrollTop();
    }, []);

    return (
        <div className="min-h-fit flex flex-col pt-10">
            <CardList
                api={getSearchAPI(params.value, params.number)}
                title={`Result for ${params.value}`}
                all={true}
            ></CardList>
            <div class="flex flex-col items-center mt-10 mb-3">
                <div class="flex">
                    <div class="h-12 w-12 mr-1 flex justify-center items-center rounded-full bg-light_primary dark:bg-dark_primary cursor-pointer">
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
                        <div class="w-12 md:flex justify-center items-center hidden  cursor-pointer leading-5 transition duration-150 ease-in hover:bg-light_secondary hover:dark:bg-dark_secondary rounded-full  ">
                            1
                        </div>
                        <div class="w-12 cursor-not-allowed	 md:flex justify-center items-center hidden leading-5 transition duration-150 ease-in rounded-full  ">
                            ...
                        </div>
                        <div class="w-12 md:flex justify-center items-center hidden  cursor-pointer leading-5 transition duration-150 ease-in hover:bg-light_secondary hover:dark:bg-dark_secondary rounded-full  ">
                            {params.number - 1}
                        </div>
                        <div class="w-12 md:flex justify-center items-center hidden  cursor-pointer leading-5 transition duration-150 ease-in  rounded-full bg-light_secondary dark:bg-dark_secondary ">
                            {params.number}
                        </div>
                        <div class="w-12 md:flex justify-center items-center hidden  cursor-pointer leading-5 transition duration-150 ease-in hover:bg-light_secondary hover:dark:bg-dark_secondary rounded-full  ">
                            {parseInt(params.number) + 1}
                        </div>
                        <div class="w-12 cursor-not-allowed	 md:flex justify-center items-center hidden leading-5 transition duration-150 ease-in rounded-full  ">
                            ...
                        </div>
                        <div class="w-12 md:flex justify-center items-center hidden  cursor-pointer leading-5 transition duration-150 ease-in hover:bg-light_secondary hover:dark:bg-dark_secondary rounded-full  ">
                            15
                        </div>
                        <div class="w-12 h-12 md:hidden flex justify-center items-center cursor-pointer leading-5 transition duration-150 ease-in rounded-full bg-light_secondary dark:bg-dark_secondary">
                            3
                        </div>
                    </div>
                    <div class="h-12 w-12 ml-1 flex justify-center items-center rounded-full bg-light_primary dark:bg-dark_primary cursor-pointer">
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
