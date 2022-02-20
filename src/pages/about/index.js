import React from "react";

export default function About() {
    return (
        <div className="flex flex-col items-center justify-center w-full min-h-screen">
            <img
                className="w-44"
                src="https://i.postimg.cc/QCc0QC1d/logo.png"
                alt="logo"
            />
            <p className="px-10 text-center text-md md:text-2xl md:px-32 lg:px-64 xl:px-80">
                This website was made by M.Faqih Ridho in 2022. Website made
                with the pourpose of study and try React js,React Redux and
                Tailwind.{" "}
                <a
                    className="underline"
                    target={"_blank"}
                    href="https://dribbble.com/shots/14879802-MyAnimeList-Website-Redesign/attachments/6591878?mode=media"
                >
                    Design inspiration for this project
                </a>{" "}
                .This project uses{" "}
                <a
                    className="underline"
                    target={"_blank"}
                    href="https://dribbble.com/shots/14879802-MyAnimeList-Website-Redesign/attachments/6591878?mode=media"
                >
                    Jikan FREE API
                </a>{" "}
                .New routes and details page are still under construction
            </p>
        </div>
    );
}
