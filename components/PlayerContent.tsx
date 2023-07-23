"use client";

import { useEffect, useMemo, useState } from "react";

import { BsPauseFill, BsPlayFill } from "react-icons/bs";
import { AiFillStepBackward, AiFillStepForward } from "react-icons/ai";
import { HiSpeakerXMark, HiSpeakerWave } from "react-icons/hi2";
import { RxCross2 } from "react-icons/rx";

import { Song } from "@/types";

import { LikeButton, MediaItem, Slider } from ".";

import usePlayer from "@/hooks/usePlayer";
import useSound from "use-sound";

interface PlayerContentProps {
    song: Song;
    songUrl: string;
}
const PlayerContent: React.FC<PlayerContentProps> = ({ song, songUrl }) => {
    const [volume, setVolume] = useState<number>(1);
    const [isPlaying, setIsPlaying] = useState(false);

    const player = usePlayer();

    const Icon = isPlaying ? BsPauseFill : BsPlayFill;
    const VolumeIcon = volume === 0 ? HiSpeakerXMark : HiSpeakerWave;

    const onPlayNext = () => {
        if (player.ids.length === 0) return;

        const currentIndex = player.ids.findIndex((id) => id === player.activeId);

        const nextSong = player.ids[currentIndex + 1];

        if (!nextSong) {
            return player.setId(player.ids[0]);
        } else {
            return player.setId(nextSong);
        }
    };

    const onPlayPrevious = () => {
        if (player.ids.length === 0) return;

        const currentIndex = player.ids.findIndex((id) => id === player.activeId);

        const previousSong = player.ids[currentIndex - 1];

        if (!previousSong) {
            return player.setId(player.ids[player.ids.length - 1]);
        } else {
            return player.setId(previousSong);
        }
    };

    const [play, { pause, sound }] = useSound(songUrl, {
        volume,
        onplay: () => setIsPlaying(true),
        onend: () => {
            setIsPlaying(true);
            onPlayNext();
        },
        onpause: () => setIsPlaying(false),
        format: ["mp3"],
    });

    useEffect(() => {
        sound?.play();

        return () => {
            sound?.unload();
        };
    }, [sound]);

    const handlePlay = () => {
        if (isPlaying) {
            pause();
        } else {
            play();
        }
    };

    const toggleMute = () => {
        if (volume === 0) {
            setVolume(0.5);
        } else {
            setVolume(0);
        }
    };

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 h-full">
            <div className="flex w-full justify-start">
                <div className="flex items-center gap-x-4">
                    <MediaItem data={song} />
                    <LikeButton songId={song.id} />
                </div>
            </div>
            <div className="flex md:hidden col-auto w-full justify-end items-center gap-x-3">
                <div
                    onClick={handlePlay}
                    className="h-10 w-10 flex items-center justify-center rounded-full bg-white p-1 cursor-pointer hover:scale-110 transition"
                >
                    <Icon className="text-black" size={20} />
                </div>
                <div onClick={player.reset} className="cursor-pointer hover:scale-110 transition duration-1000">
                    <RxCross2 size={30} />
                </div>
            </div>
            <div className="hidden md:flex h-full justify-center items-center w-full max-w-[722px] gap-x-6">
                <AiFillStepBackward
                    onClick={onPlayPrevious}
                    size={30}
                    className="text-neutral-400 cursor-pointer hover:text-white transition duration-1000"
                />
                <div
                    onClick={handlePlay}
                    className="h-10 w-10 flex items-center justify-center rounded-full bg-white p-1 cursor-pointer hover:scale-110 transition"
                >
                    <Icon className="text-black" size={30} />
                </div>
                <AiFillStepForward
                    onClick={onPlayNext}
                    size={30}
                    className="text-neutral-400 cursor-pointer hover:text-white transition duration-1000"
                />
            </div>
            <div className="hidden md:flex w-full justify-end pr-2">
                <div className="flex items-center gap-x-2 w-[150px]">
                    <VolumeIcon onClick={toggleMute} className="cursor-pointer" size={30} />
                    <Slider value={volume} onChange={(value) => setVolume(value)} />
                    <div onClick={player.reset} className="cursor-pointer hover:scale-110 transition duration-1000">
                        <RxCross2 size={20} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlayerContent;
