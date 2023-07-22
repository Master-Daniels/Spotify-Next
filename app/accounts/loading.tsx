"use client";
import { Box } from "@/components";
import { BounceLoader } from "react-spinners";

const Loading = () => {
    return (
        <Box styles="h-full flex justify-center items-center">
            <BounceLoader color="#22c55e" />
        </Box>
    );
};

export default Loading;
