import PageContent from "./components/PageContent";
import { Header, ListItem } from "@/components";
import getSongs from "@/actions/getSongs";

export const revalidate = 0;

export default async function Home() {
    const songs = await getSongs();
    return (
        <div
            className="
             bg-neutral-900
             rounded-lg
             h-full
             w-full
             overflow-hidden
             overflow-y-auto"
        >
            <Header>
                <div className="mb-2">
                    <h1 className="text-white text-2xl font-medium">Welcome Back</h1>
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 mt-4">
                        <ListItem name="Liked Songs" href="liked" />
                    </div>
                </div>
            </Header>
            <div className="mt-2 mb-7 px-6">
                <div className="flex justify-between items-center">
                    <h1 className="text-white text-xl font-medium underline">Newest Songs</h1>
                </div>
                <div>
                    <PageContent songs={songs} />
                </div>
            </div>
        </div>
    );
}
