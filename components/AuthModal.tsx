"use client";

import { Modal } from "@/components";
import useAuthModal from "@/hooks/useAuth";
import { useSessionContext, useSupabaseClient } from "@supabase/auth-helpers-react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const AuthModal = () => {
    const supabaseClient = useSupabaseClient();
    const router = useRouter();
    const { session } = useSessionContext();

    const { isOpen, onClose, data } = useAuthModal();

    useEffect(() => {
        if (session) {
            router.refresh;
            onClose();
        }
    }, [session, onClose, router]);

    const onChange = (open: boolean) => {
        if (!open) onClose();
    };
    const modalText = {
        title: data === "Log In" ? "Welcome Back" : "Sign Up",
        description: data === "Log In" ? "Login in to your account" : "Sign Up for a new account",
    };
    return (
        <Modal {...{ isOpen, onChange, ...modalText }}>
            <Auth
                theme="dark"
                providers={["google", "github"]}
                supabaseClient={supabaseClient}
                appearance={{
                    theme: ThemeSupa,
                    variables: {
                        default: {
                            colors: {
                                brand: "#404040",
                                brandAccent: "#22c55e",
                            },
                        },
                    },
                }}
            />
        </Modal>
    );
};

export default AuthModal;
