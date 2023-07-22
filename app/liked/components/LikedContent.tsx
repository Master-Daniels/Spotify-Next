"use client";

import React, { useEffect } from "react";

import { useRouter } from "next/navigation";

import { useUser } from "@/hooks/useUser";
import { Song } from "@/types";
import { LikeButton, MediaItem } from "@/components";
import useOnPlay from "@/hooks/useOnPlay";

interface LikedContentProps {
    songs: Song[];
}
const LikedContent: React.FC<LikedContentProps> = ({ songs }) => {
    const router = useRouter();
    const { isLoading, user } = useUser();
    const onPlay = useOnPlay(songs);
    useEffect(() => {
        if (!isLoading && !user) {
            router.replace("/");
        }
    }, [isLoading, router, user]);

    if (songs.length < 1) {
        return <div className="flex flex-col gap-y-2 w-full px-4 text-neutral-400">No Liked Songs</div>;
    }
    return (
        <div className="flex flex-wrap gap-y-2 p-6">
            {songs.map((song) => (
                <div key={song.id} className="flex items-center justify-between max-w-[200px]  cursor-pointer">
                    <div className="flex-1 flex gap-x-4 hover:bg-neutral-600/50 rounded-md">
                        <MediaItem onClick={(id: string) => onPlay(id)} data={song} />
                        <LikeButton songId={song.id} />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default LikedContent;
