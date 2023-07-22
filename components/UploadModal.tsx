"use client";

import useUploadModal from "@/hooks/useUpload";
import { Input, Modal } from ".";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { Button } from ".";
import { toast } from "react-hot-toast";
import uniqid from "uniqid";
import { useUser } from "@/hooks/useUser";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";

const UploadModal = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { isOpen, onClose } = useUploadModal();
    const { user } = useUser();
    const SupabaseClient = useSupabaseClient();
    const router = useRouter();

    const { register, handleSubmit, reset } = useForm<FieldValues>({
        defaultValues: {
            author: "",
            title: "",
            song: null,
            image: null,
        },
    });

    const onChange = (open: boolean): void => {
        if (!open) {
            reset();
            onClose();
        }
    };

    const onSubmit: SubmitHandler<FieldValues> = async (values) => {
        console.log(values);

        // upload to supabase
        try {
            setIsLoading(true);

            const song = values.song?.[0];
            const image = values.image?.[0];
            if (!song || !image || !user) {
                toast.error("Missing song or image");
                return;
            }
            const uniqueID = uniqid();

            // Upload song
            const { data: songData, error: songError } = await SupabaseClient.storage
                .from("songs")
                .upload(`song-${values.title}-${uniqueID}`, song, {
                    cacheControl: "3600",
                    upsert: false,
                });
            if (songError) {
                setIsLoading(false);
                return toast.error("Failed to upload song");
            }

            // Upload Image
            const { data: imageData, error: imageError } = await SupabaseClient.storage
                .from("images")
                .upload(`image-${values.title}-${uniqueID}`, image, {
                    cacheControl: "3600",
                    upsert: false,
                });
            if (imageError) {
                setIsLoading(false);
                return toast.error("Failed image upload");
            }

            const { error: supabaseError } = await SupabaseClient.from("songs").insert({
                user_id: user.id,
                title: values.title,
                artist: values.artist,
                song_path: songData.path,
                image_path: imageData.path,
            });
            if (supabaseError) {
                setIsLoading(false);
                return toast.error(supabaseError.message);
            }
            router.refresh();
            setIsLoading(false);
            toast.success(`${values.title} by ${values.artist} created successfully!`);
            onClose();
        } catch (error) {
            toast.error("Something went wrong");
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Modal title="Add a song" description="Upload an audio file" isOpen={isOpen} onChange={onChange}>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-4">
                <Input
                    id="title"
                    disabled={isLoading}
                    {...register("title", { required: true })}
                    placeholder="Song Title"
                />
                <Input
                    id="artist"
                    disabled={isLoading}
                    {...register("artist", { required: true })}
                    placeholder="Song Artist(s)"
                />
                <div>
                    <div className="pb-1"> Select a song file </div>
                    <Input
                        id="song"
                        type="file"
                        accept="audio/*"
                        styles="cursor-pointer"
                        disabled={isLoading}
                        {...register("song", { required: true })}
                    />
                </div>
                <div>
                    <div className="pb-1"> Select an image for the song </div>
                    <Input
                        id="image"
                        type="file"
                        accept="image/*"
                        disabled={isLoading}
                        styles="cursor-pointer"
                        {...register("image", { required: true })}
                    />
                </div>
                <Button disabled={isLoading} type="submit" styles="py-2 rounded-md uppercase w-1/3 mx-auto">
                    {isLoading ? "Uploading" : "Create"}
                </Button>
            </form>
        </Modal>
    );
};

export default UploadModal;
