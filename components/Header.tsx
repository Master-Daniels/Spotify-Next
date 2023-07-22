"use client";

import { ChildrenProp } from "@/types";

import { useRouter } from "next/navigation";

import { twMerge } from "tailwind-merge";

import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";
import { FaUserAlt } from "react-icons/fa";

import { Button } from ".";
import useAuthModal from "@/hooks/useAuth";
import { useUser } from "@/hooks/useUser";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { toast } from "react-hot-toast";
import usePlayer from "@/hooks/usePlayer";

const Header: React.FC<ChildrenProp> = ({ children, styles }) => {
    const router = useRouter();
    const player = usePlayer();
    const { onOpen } = useAuthModal();

    const supabaseClient = useSupabaseClient();
    const { user } = useUser();

    const handleLogout = async () => {
        const { error } = await supabaseClient.auth.signOut();

        player.reset();
        router.refresh();

        if (error) {
            toast.error(error.message);
        } else {
            toast.success("Logged out successfully", {
                style: {
                    background: "#000",
                    color: "#fff",
                },
            });
        }
    };

    return (
        <div
            className={twMerge(
                `
          h-fit
          bg-gradient-to-b
          from-green-700
          p-6
            `,
                styles
            )}
        >
            <div className="w-full mb-4 flex items-center justify-between">
                <div className="hidden md:flex gap-x-2 items-center">
                    <button className="rounded-full bg-black flex items-center opacity-75 transition justify-center">
                        <RxCaretLeft
                            onClick={() => router.back()}
                            size={35}
                            className="text-white hover:text-green-400"
                        />
                    </button>
                    <button className="rounded-full bg-black flex items-center opacity-75 transition justify-center">
                        <RxCaretRight
                            onClick={() => router.forward()}
                            size={35}
                            className="text-white hover:text-green-400"
                        />
                    </button>
                </div>
                <div className="flex md:hidden gap-x-4 items-center">
                    <button className="rounded-full p-2 bg-white flex items-center justify-center hover:opacity-75 transition">
                        <HiHome size={20} className="text-black" />
                    </button>
                    <button className="rounded-full p-2 bg-white flex items-center justify-center hover:opacity-75 transition">
                        <BiSearch size={20} className="text-black" />
                    </button>
                </div>
                <div className="flex justify-between items-center gap-x-4">
                    {user ? (
                        <>
                            <div>
                                <Button
                                    onClick={handleLogout}
                                    styles="bg-white text-black font-medium px-6 py-1 hover:bg-green-400 border-none outline-none transition duration-1000"
                                >
                                    Log Out
                                </Button>
                            </div>
                            <div>
                                <Button
                                    onClick={() => router.push("/accounts")}
                                    styles="bg-white text-black font-medium p-2 hover:bg-green-400 transition duration-1000"
                                >
                                    <FaUserAlt />
                                </Button>
                            </div>
                        </>
                    ) : (
                        <>
                            <div>
                                <Button
                                    onClick={() => onOpen("Sign Up")}
                                    styles="bg-tranparent text-black font-medium px-5 py-1 hover:bg-white
                                bord transition hover:scale-110 duration-1000"
                                >
                                    Sign Up
                                </Button>
                            </div>
                            <div>
                                <Button
                                    onClick={() => onOpen("Log In")}
                                    styles="bg-white text-black font-medium px-6 py-1 hover:bg-green-400 hover:text-white border-none outline-none hover:scale-110 transition duration-1000"
                                >
                                    Log In
                                </Button>
                            </div>
                        </>
                    )}
                </div>
            </div>
            {children}
        </div>
    );
};

export default Header;
