"use client";

import useLoadImage from "@/hooks/useLoadImage";
import usePlayer from "@/hooks/usePlayer";
import { Song } from "@/types";
import Image from "next/image";
import { LikeButton } from ".";

interface MediaItemProps {
    data: Song;
    onClick?: (id: string) => void;
}

const MediaItem: React.FC<MediaItemProps> = ({ data, onClick }) => {
    const imageUrl = useLoadImage(data);
    const player = usePlayer();

    const handleClick = () => {
        if (onClick) {
            return onClick(data.id);
        }
        return player.setId(data.id);
    };
    return (
        <div className="flex gap-x-4 item-center p-2" onClick={handleClick}>
            <div className="relative rounded-md min-h-[40px] min-w-[40px] overflow-hidden">
                <Image fill src={imageUrl || "/images/liked.png"} alt="Song Image" className="object-cover" />
            </div>
            <div className="flex flex-col gap-y-1 overflow-hidden">
                <p className="text-white truncate"> {data.title} </p>
                <p className="text-neutral-400 text-sm truncate"> {data.artist} </p>
            </div>
            <div>
                <LikeButton songId={data.id} />
            </div>
        </div>
    );
};

export default MediaItem;
