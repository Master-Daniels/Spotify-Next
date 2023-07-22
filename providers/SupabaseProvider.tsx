"use client";
import { useState } from "react";

import { ChildrenProp } from "@/types";
import { Database } from "@/types/db";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";

const SupabaseProvider: React.FC<ChildrenProp> = ({ children }) => {
    const [supabaseClient] = useState(() => createClientComponentClient<Database>());
    return <SessionContextProvider supabaseClient={supabaseClient}>{children}</SessionContextProvider>;
};

export default SupabaseProvider;
