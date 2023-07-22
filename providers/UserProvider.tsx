"use client";
import { UserContextProvider } from "@/hooks/useUser";

import { ChildrenProp } from "@/types";

function UserProvider({ children }: ChildrenProp) {
    return <UserContextProvider>{children}</UserContextProvider>;
}

export default UserProvider;
