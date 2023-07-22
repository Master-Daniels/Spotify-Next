"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSessionContext } from "@supabase/auth-helpers-react";
import useAuthModal from "@/hooks/useAuth";
import { useUser } from "@/hooks/useUser";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { toast } from "react-hot-toast";

interface LikeButtonProps {
    songId: string;
}

interface IconProps {
    isLiked: boolean;
    color?: string;
    size?: number;
}

const Icon: React.FC<IconProps> = ({ isLiked, color, size }) =>
    isLiked ? <AiFillHeart color={color} size={size} /> : <AiOutlineHeart color={color} size={size} />;

const LikeButton: React.FC<LikeButtonProps> = ({ songId }) => {
    const [isLiked, setIsLiked] = useState<boolean>(false);

    const router = useRouter();

    const { supabaseClient } = useSessionContext();
    const authModal = useAuthModal();
    const { user } = useUser();

    useEffect(() => {
        if (!user?.id) return;
        const fetchData = async () => {
            const { data, error } = await supabaseClient
                .from("liked_songs")
                .select("*")
                .eq("user_id", user?.id)
                .eq("song_id", songId)
                .single();

            if (!error && data) setIsLiked(true);
            console.error(error);
        };
        fetchData();
    }, [songId, supabaseClient, user?.id]);

    const handleLike = async () => {
        if (!user) return authModal.onOpen();
        if (isLiked) {
            const { error } = await supabaseClient
                .from("liked_songs")
                .delete()
                .eq("user_id", user?.id)
                .eq("song_id", songId);

            if (error) {
                toast.error(error.message);
            } else {
                setIsLiked(false);
                toast.success(`You removed this song from liked your songs`);
            }
        } else {
            const { error } = await supabaseClient.from("liked_songs").insert({
                song_id: songId,
                user_id: user?.id,
            });
            if (error) {
                toast.error(error.message);
            } else {
                setIsLiked(true);
                toast.success("Liked!");
            }
        }
        router.refresh();
    };

    return (
        <button className="hover:opacity-75 transition duration-1000" onClick={handleLike}>
            <Icon isLiked={isLiked} color={isLiked ? "red" : "white"} size={30} />
        </button>
    );
};

export default LikeButton;
