"use client";

import { Toaster } from "react-hot-toast";

const ToasterProvider = () => {
    return (
        <Toaster
            toastOptions={{
                style: {
                    background: "#ccc",
                    color: "#fff",
                },
            }}
        />
    );
};

export default ToasterProvider;
