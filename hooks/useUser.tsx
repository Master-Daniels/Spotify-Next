import { createContext, useState, useEffect, useContext } from "react";
import { useSessionContext, useUser as useSupaUser, User } from "@supabase/auth-helpers-react";

import { UserDetails, Subscription } from "@/types";

type UserContextType = {
    accessToken: string | null;
    user: User | null;
    userDetails: UserDetails | null;
    isLoading: boolean;
    subscription: Subscription | null;
};

export const UserContext = createContext<UserContextType | null>(null);

export interface Props {
    [propName: string]: any;
}

export const UserContextProvider = (props: Props) => {
    const { isLoading: isLoadingUser, session, supabaseClient: supabase } = useSessionContext();

    const user = useSupaUser();
    
    const accessToken = session?.access_token ?? null;

    const [isLoadingData, setIsloadingData] = useState<boolean>(false);
    const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
    const [subscription, setSubscription] = useState<Subscription | null>(null);

    const getUserDetails = () => supabase.from("users").select("*").single();

    const getSubscription = () =>
        supabase
            .from("subscriptions")
            .select("*, prices(*, products(*))")
            .in("status", ["trialing", "active"])
            .single();

    useEffect(() => {
        if (user && !isLoadingData && !userDetails && !subscription) {
            setIsloadingData(true);
            Promise.allSettled([getUserDetails(), getSubscription()]).then(
                ([userDetailsPromise, subscriptionPromise]) => {
                    if (userDetailsPromise.status === "fulfilled")
                        setUserDetails(userDetailsPromise.value.data as UserDetails);

                    if (subscriptionPromise.status === "fulfilled")
                        setSubscription(subscriptionPromise.value.data as Subscription);

                    setIsloadingData(false);
                }
            );
        } else if (!user && !isLoadingUser && !isLoadingData) {
            setUserDetails(null);
            setSubscription(null);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user, isLoadingUser]);

    const value = {
        accessToken,
        user,
        userDetails,
        isLoading: isLoadingUser || isLoadingData,
        subscription,
    };

    return <UserContext.Provider value={value} {...props} />;
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (context === null) {
        throw new Error(`useUser must be used within a UserContextProvider.`);
    }
    return context;
};
