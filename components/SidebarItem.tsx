import Link from "next/link";

import { IconType } from "react-icons";

import { twMerge } from "tailwind-merge";

interface SidebarItemProps {
    Icon: IconType;
    label: string;
    active?: boolean;
    href: string;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ Icon, label, active, href }) => {
    return (
        <Link
            href={href}
            className={twMerge(
                `
    flex
    items-center
    gap-x-2
    h-auto 
    w-fit 
    text-md 
    font-medium 
    cursor-pointer 
    hover:text-green-400
    transition
    text-neutral-400
    py-1
    ml-5
    `,
                active && "text-white"
            )}
        >
            <Icon size={26} />
            <p className="truncate w-full">{label}</p>
        </Link>
    );
};

export default SidebarItem;
