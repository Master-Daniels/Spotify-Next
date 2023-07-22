import getLikedSongs from "@/actions/getLikedSongs";
import { Header } from "@/components";
import LikedContent from "./components/LikedContent";
import { AiFillHeart } from "react-icons/ai";

export const revalidate = 0;

const Liked = async () => {
    const songs = await getLikedSongs();

    return (
        <div className="bg-neutral-900 rounded-lg w-full h-full overflow-hidden overflow-y-auto">
            <Header>
                <div className="mt-20">
                    <div className="flex flex-col md:flex-row items-center gap-x-5">
                        <div className="relative h-32 w-32 lg:h-34 lg:w-34 grid place-content-center rounded-lg bg-neutral-100/10 hover:bg-neutral-100/20 cursor-pointer">
                            <AiFillHeart className="object cover text-5xl" color="#ff160c" size={70} />
                        </div>
                        <div className="flex flex-col gap-y-2 mt-4 md:mt-0">
                            <p className="hidden md:block font-semibold text-sm">Playlist</p>
                            <h3 className="text-white text-4xl sm:text-5xl lg:text-5xl font-bold">Liked Songs</h3>
                        </div>
                    </div>
                </div>
            </Header>
            <LikedContent songs={songs} />
        </div>
    );
};

export default Liked;
