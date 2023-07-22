"use client";
import useLoadImage from "@/hooks/useLoadImage";
import { PlayButton } from ".";
import { Song } from "@/types";
import Image from "next/image";

interface SongItemProps {
    data: Song;
    onClick: (id: string) => void;
}

const SongItem: React.FC<SongItemProps> = ({ data, onClick }) => {
    const imagePath = useLoadImage(data);

    return (
        <div className="relative group flex flex-col items-center justify-center rounded-md overflow-hidden gap-x-4 bg-neutral-400/5 hover:bg-neutral-400/10 transition p-3">
            <div className="relative aspect-square w-full h-full rounded-md overflow-hidden">
                <Image
                    className="object-cover"
                    src={imagePath || ""}
                    fill
                    alt="Song"
                    sizes="(max-width: 768px) 100vw"
                    priority
                />
            </div>
            <div className="flex flex-col items-start w-full pt-4 gap-y-1">
                <p className="font-semibold w-full truncate">{data.title}</p>
                <p className="text-sm text-neutral-400 w-full truncate">By {data.artist}</p>
            </div>
            <div className="absolute bottom-4 right-5" onClick={() => onClick(data.id)}>
                <PlayButton />
            </div>
        </div>
    );
};

export default SongItem;
