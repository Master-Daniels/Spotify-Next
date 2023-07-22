import { ProductWithPrice, Song } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const getActiveProductsWithPrices = async (): Promise<ProductWithPrice[]> => {
    const supabase = createServerComponentClient({
        cookies,
    });

    const { data, error } = await supabase
        .from("products")
        .select("*, prices(*)")
        .eq("prices.active", true)
        .order("metadata->index")
        .order("unit_amount", { foreignTable: "prices" });

    if (error) {
        console.log(error.message);
        return [];
    }

    return (data as any) || [];
};

export default getActiveProductsWithPrices;
