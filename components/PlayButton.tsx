import React from "react";
import { FaPlay } from "react-icons/fa";

const PlayButton = () => {
    return (
        <button className=" transition duration-1000 p-3 opacity-0 rounded-full grid place-content-center bg-green-500 drop-shadow-md translate-y-1/4 group-hover:opacity-100 group-hover:translate-y-0 hover:scale-110">
            <FaPlay className="text-black" />
        </button>
    );
};

export default PlayButton;
