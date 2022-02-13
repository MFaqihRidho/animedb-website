import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCharactersAPI, getStaffAPI } from "../../../config";
import { useSelector, useDispatch } from "react-redux";
import ContentLoading from "../../content loading";

export default function Character_Staff() {
    const params = useParams();
    const [character, setCharacter] = useState([]);
    const [staff, setStaff] = useState([]);
    const loading = useSelector((state) => state.contentLoading);
    const dispatch = useDispatch();

    useEffect(() => {
        let mounted = true;
        dispatch({ type: "LOADING_CONTENT_TRUE" });
        getCharactersAPI(params.id).then((result) => {
            if (mounted) {
                setCharacter(result.data);
                dispatch({ type: "LOADING_CONTENT_FALSE" });
            } else {
                return;
            }
        });
        getStaffAPI(params.id).then((result) => {
            if (mounted) {
                setStaff(result.data);
                dispatch({ type: "LOADING_CONTENT_FALSE" });
            } else {
                return;
            }
        });
        return () => (mounted = false);
    }, [params.id]);
    return (
        <div className="pt-10">
            {loading ? (
                <ContentLoading></ContentLoading>
            ) : (
                <div className="flex flex-col gap-10 ">
                    <h1 className="text-4xl font-bold text-center">
                        Characters
                    </h1>
                    {character?.length !== 0 ? (
                        character?.map((data) => (
                            <div className="flex justify-between gap-5 overflow-hidden border-4 border-gray-700 lg:flex dark:border-gray-200 rounded-2xl">
                                <div className="flex flex-col self-start text-2xl">
                                    <img
                                        className="h-full"
                                        src={
                                            data?.character?.images?.jpg
                                                ?.image_url
                                        }
                                        alt=""
                                    />
                                    <div className="py-3 text-center">
                                        <p>{data?.character.name}</p>
                                        <p>{data?.role}</p>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-7">
                                    {data?.voice_actors.length !== 0
                                        ? data?.voice_actors.map((data) => (
                                              <div className="flex flex-row justify-end gap-3">
                                                  <div className="py-3 text-center">
                                                      <p>
                                                          {data?.person?.name}
                                                      </p>
                                                      <p>{data?.language}</p>
                                                  </div>
                                                  <img
                                                      className="object-cover w-20 h-28"
                                                      src={
                                                          data?.person?.images
                                                              ?.jpg?.image_url
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
                            staff?.map((data) => (
                                <div className="flex pr-4 overflow-hidden border-2 rounded-xl">
                                    <img
                                        className="object-cover w-20 h-28"
                                        src={data?.person.images.jpg.image_url}
                                        alt=""
                                    />
                                    <div className="px-3 py-3">
                                        <p>{data?.person?.name}</p>
                                        <p>
                                            {data?.divositions?.length !== 0
                                                ? data?.positions
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
            )}
        </div>
    );
}
