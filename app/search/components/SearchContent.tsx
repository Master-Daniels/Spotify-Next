"use client";

import { LikeButton, MediaItem } from "@/components";
import useOnPlay from "@/hooks/useOnPlay";
import { Song } from "@/types";

interface SearchContentProps {
    songs: Song[];
}
const SearchContent: React.FC<SearchContentProps> = ({ songs }) => {
    const onPlay = useOnPlay(songs);
    if (songs.length === 0) {
        return (
            <div className="flex w-full h-full justify-center mt-20 text-neutral-400">
                No Songs Found. Try Another keyword
            </div>
        );
    }
    return (
        <div className="flex flex-col gap-y-2 px-6">
            {songs.map((song) => (
                <div key={song.id} className="flex items-center gap-x-4 w-full">
                    <div className="flex-1">{<MediaItem onClick={(id: string) => onPlay(id)} data={song} />}</div>
                    <LikeButton songId={song.id} />
                </div>
            ))}
        </div>
    );
};

export default SearchContent;
