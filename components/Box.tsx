import React from "react";
import { ChildrenProp } from "@/types";
import { twMerge } from "tailwind-merge";

import { Database } from "@/types/db";

const Box: React.FC<ChildrenProp> = ({ children, styles }) => {
    return (
        <div
            className={twMerge(
                `
          bg-neutral-900
            rounded-lg
            h-fit
            w-full
  `,
                styles
            )}
        >
            {children}
        </div>
    );
};

export default Box;
