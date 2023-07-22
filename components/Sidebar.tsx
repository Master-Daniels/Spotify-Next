"use client";

import { usePathname } from "next/navigation";
import { useMemo } from "react";

import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";

import { ChildrenProp, Song } from "@/types";

import { SidebarItem, Library } from ".";

import Box from "./Box";
import usePlayer from "@/hooks/usePlayer";
import { twMerge } from "tailwind-merge";

interface SidebarProps extends ChildrenProp {
    songs: Song[];
}

const Sidebar: React.FC<SidebarProps> = ({ children, songs }) => {
    const pathname = usePathname();
    const player = usePlayer();
    const routes = useMemo(
        () => [
            {
                Icon: HiHome,
                label: "Home",
                active: pathname !== "/search",
                href: "/",
            },
            {
                Icon: BiSearch,
                label: "Search",
                active: pathname === "/search",
                href: "/search",
            },
        ],
        [pathname]
    );
    return (
        <div className={twMerge(`flex h-full`, player.activeId && "h-[calc[100%-80px]]")}>
            <div className="hidden md:flex flex-col gap-y-2 bg-black h-full p-2 w-[250px]">
                <Box>
                    <div className="flex flex-col gap-y-4 py-4 w-fit">
                        {routes.map((item) => (
                            <SidebarItem key={item.label} {...item} />
                        ))}
                    </div>
                </Box>

                <Box styles="h-full overflow-y-auto">
                    <Library songs={songs} />
                </Box>
            </div>
            <main className="h-full flex-1 overflow-y-auto py-2">{children}</main>
        </div>
    );
};

export default Sidebar;
