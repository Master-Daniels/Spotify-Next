import { useEffect, useMemo, useState } from "react";
import { useSessionContext } from "@supabase/auth-helpers-react";

import { Song } from "@/types";
import { toast } from "react-hot-toast";

const useGetSongById = (id: string) => {
    const [isLoading, setIsLoading] = useState(false);
    const [song, setSong] = useState<Song | undefined>(undefined);
    const { supabaseClient } = useSessionContext();

    useEffect(() => {
        if (!id) return;
        const fetchSong = async () => {
            setIsLoading(true);

            const { data, error } = await supabaseClient.from("songs").select("*").eq("id", id).single();

            if (error) {
                setIsLoading(false);
                return toast.error(error.message);
            }
            setSong(data as Song);
        };
        fetchSong();
    }, [supabaseClient, id]);

    return useMemo(
        () => ({
            isLoading,
            song,
        }),
        [song, isLoading]
    );
};

export default useGetSongById;
