import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCharactersAPI, getStaffAPI } from "../../../config";

export default function Character_Staff() {
    const params = useParams();
    const [character, setCharacter] = useState([]);
    const [staff, setStaff] = useState([]);

    useEffect(() => {
        let mounted = true;
        getCharactersAPI(params.id).then((result) => {
            if (mounted) {
                setCharacter(result.data);
            } else {
                return;
            }
        });
        getStaffAPI(params.id).then((result) => {
            if (mounted) {
                setStaff(result.data);
            } else {
                return;
            }
        });
        return () => (mounted = false);
    }, [params.id]);
    return (
        <div className="flex flex-col gap-10 pt-10">
            <h1 className="text-4xl font-bold text-center">Characters</h1>
            {character.length !== 0 ? (
                character?.map((data) => (
                    <div className="flex gap-5 justify-between border-4 border-gray-700 lg:flex dark:border-gray-200 rounded-2xl overflow-hidden">
                        <div className="text-2xl flex flex-col self-start">
                            <img
                                className="h-full"
                                src={data?.character?.images?.jpg?.image_url}
                                alt=""
                            />
                            <div className="text-center py-3">
                                <p>{data.character.name}</p>
                                <p>{data.role}</p>
                            </div>
                        </div>
                        <div className="flex flex-col gap-7">
                            {data?.voice_actors.length !== 0
                                ? data.voice_actors.map((data) => (
                                      <div className="flex flex-row gap-3 justify-end">
                                          <div className="text-center py-3">
                                              <p>{data?.person?.name}</p>
                                              <p>{data?.language}</p>
                                          </div>
                                          <img
                                              className="w-20 h-28 object-cover"
                                              src={
                                                  data?.person?.images?.jpg
                                                      ?.image_url
                                              }
                                              alt=""
                                          />
                                      </div>
                                  ))
                                : null}
                        </div>
                    </div>
                ))
            ) : (
                <h1 className="text-3xl ">Not Available Charaters</h1>
            )}
            <h1 className="text-4xl font-bold text-center">Staff</h1>
            <div className="flex flex-col gap-10">
                {staff?.length !== 0 ? (
                    staff.map((data) => (
                        <div className="border-2 pr-4 flex rounded-xl overflow-hidden">
                            <img
                                className="w-20 h-28 object-cover"
                                src={data.person.images.jpg.image_url}
                                alt=""
                            />
                            <div className="py-3 px-3">
                                <p>{data?.person?.name}</p>
                                <p>
                                    {data?.divositions?.length !== 0
                                        ? data.positions
                                              .map((data) => data)
                                              .join(",")
                                        : null}
                                </p>
                            </div>
                        </div>
                    ))
                ) : (
                    <h1 className="text-3xl ">Not Available Staff</h1>
                )}
            </div>
        </div>
    );
}
