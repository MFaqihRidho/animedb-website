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
            {character?.map((data) => (
                <div className="flex gap-5 border-4 border-gray-700 lg:flex dark:border-gray-200 rounded-2xl overflow-hidden">
                    <img
                        className=""
                        src={data?.character?.images?.jpg?.image_url}
                        alt=""
                    />
                    <div className="py-3 text-2xl self-end">
                        <p>{data.character.name}</p>
                        <p>{data.role}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}
