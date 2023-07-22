"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import queryString from "query-string";

import useDebounce from "@/hooks/useDebounce";

import { Input } from ".";

const SearchInput = () => {
    const router = useRouter();
    const [value, setValue] = useState<string>("");
    const debouncedValue = useDebounce<string>(value);

    useEffect(() => {
        const query = {
            title: debouncedValue,
        };

        const url = queryString.stringifyUrl({
            url: "/search",
            query,
        });
        router.push(url);
    }, [debouncedValue, router]);

    return (
        <Input
            placeholder="What do you want to listen to?"
            value={value}
            onChange={({ target: { value } }) => setValue(value)}
        />
    );
};

export default SearchInput;
