"use client";
import useAuthModal from "@/hooks/useAuth";
import { useUser } from "@/hooks/useUser";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaPlay } from "react-icons/fa";
import { FcLike } from "react-icons/fc";

interface ListItemProps {
    name: string;
    href: string;
}

const ListItem: React.FC<ListItemProps> = ({ name, href }) => {
    const router = useRouter();
    const { user } = useUser();
    const authModal = useAuthModal();

    const onClick = () => {
        // add authentication before push
        if (!user) return authModal.onOpen();
        router.push(href);
    };
    return (
        <button
            onClick={onClick}
            type="button"
            className="relative group flex items-center rounded-md overflow-hidden gap-x-4 bg-neutral-100/10 hover:bg-neutral-100/20 transition duration-1000 ease-in-out pr-4"
        >
            <div className="relative min-h-[64px] min-w-[64px] grid place-content-center bg-green-400/20 ">
                {/* <Image src={image} alt="like" fill className="object-contain" /> */}
                <FcLike className="object-contain text-white" size={30} />
            </div>
            <p className="font-medium truncate py-5">{name}</p>
            <div className="absolute transition opacity-0 rounded-full flex items-center justify-center bg-green-400 p-3 pl-[0.9rem] drop-shadow-md right-5 group-hover:opacity-100 hover:scale-110">
                <FaPlay className="text-black" />
            </div>
        </button>
    );
};

export default ListItem;
