import React from "react";

export default function DetailsLoading() {
    return (
        <div>
            <div className="w-full transition-all duration-300 animate-pulse h-96 bg-light_secondary dark:bg-dark_secondary"></div>
            <div className="w-full transition-all duration-300 animate-pulse h-fit bg-light_primary dark:bg-dark_primary ">
                <div className="container flex flex-col px-5 pb-10 mx-auto">
                    <div className="flex flex-col items-center md:flex-row md:items-start md:gap-10">
                        <div className="w-56 md:-mt-28 -mt-44 xl:w-72 h-80 bg-light_secondary dark:bg-dark_secondary rounded-2xl "></div>
                        <div className="md:-mt-10 flex flex-col md:w-2/3 lg:w-[75%] xl:w-full gap-7">
                            <div className="md:bg-light_primary bg-light_secondary dark:bg-dark_secondary w-44 h-7 md:dark:bg-dark_primary"></div>
                            <div className="flex justify-between md:flex-col lg:flex-row md:gap-5 lg:gap-10">
                                <div className="bg-light_secondary md:order-2 lg:order-1 w-44 h-7 dark:bg-dark_secondary"></div>
                                <div className="flex gap-10 md:order-1 lg:order-2">
                                    <div className="w-44 bg-light_secondary h-7 dark:bg-dark_secondary"></div>
                                    <div className="w-44 bg-light_secondary h-7 dark:bg-dark_secondary"></div>
                                    <div className="w-44 bg-light_secondary h-7 dark:bg-dark_secondary"></div>
                                </div>
                            </div>
                            <div className="flex flex-col gap-5">
                                <div className="w-full h-5 bg-light_secondary dark:bg-dark_secondary"></div>
                                <div className="w-full h-5 bg-light_secondary dark:bg-dark_secondary"></div>
                                <div className="w-full h-5 bg-light_secondary dark:bg-dark_secondary"></div>
                                <div className="w-full h-5 bg-light_secondary dark:bg-dark_secondary"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
