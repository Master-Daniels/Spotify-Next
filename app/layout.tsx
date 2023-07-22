import { Poppins } from "next/font/google";
import { Player, Sidebar } from "@/components";

import { UserProvider, SupabaseProvider, ModalProvider, ToasterProvider } from "@/providers";
import "./globals.css";
import getsongsByUserId from "@/actions/getSongsByUserId";
import getActiveProductsWithPrices from "@/actions/getActiveProductsWithPrices";

const poppins = Poppins({ weight: ["100", "200", "300", "400", "500", "600"], subsets: ["latin-ext"] });

export const metadata = {
    title: "Spotify Next",
    description: "Listen To music and so much more!!!",
};

export const revalidate = 0;

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    const userSongs = await getsongsByUserId();
    const products = await getActiveProductsWithPrices();
    return (
        <html lang="en">
            <body className={poppins.className}>
                <ToasterProvider />
                <SupabaseProvider>
                    <UserProvider>
                        <ModalProvider products={products} />
                        <Sidebar songs={userSongs}>{children}</Sidebar>
                        <Player />
                    </UserProvider>
                </SupabaseProvider>
            </body>
        </html>
    );
}
