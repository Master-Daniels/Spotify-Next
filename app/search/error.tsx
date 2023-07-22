"use client";

import { Box, Button } from "@/components";
import { useRouter } from "next/navigation";
import React from "react";

const Error = () => {
    const router = useRouter();
    return (
        <Box styles="h-full grid place-content-center place-items-center gap-y-4">
            <p className="text-neutral-400">Something Went wrong</p>
            <div className="flex gap-x-4 items-center">
                <Button onClick={() => router.refresh()} styles="rounded-md p-2">
                    Refresh
                </Button>
                <p>Or</p>
                <Button onClick={() => router.push("/")} styles="rounded-md p-2 whitespace-nowrap ">
                    Go Home
                </Button>
            </div>
        </Box>
    );
};

export default Error;
