"use client";

import useGetSongById from "@/hooks/useGetSongById";
import useLoadSongUrl from "@/hooks/useLoadSongUrl";
import usePlayer from "@/hooks/usePlayer";

import { PlayerContent } from ".";

const Player = () => {
    const player = usePlayer();
    const { song } = useGetSongById(player.activeId);
    const songUrl = useLoadSongUrl(song!);

    if (!song || !songUrl || !player.activeId) {
        return null;
    }
    return (
        <div className="fixed bottom-0 w-full bg-gradient-to-r from-black to-green-900 py-2 h-[80px] px-4 rounded-md">
            <PlayerContent {...{ song, songUrl, key: songUrl }} />
        </div>
    );
};

export default Player;
