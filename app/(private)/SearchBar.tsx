"use client";
import * as _ from "lodash";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import User from "../components/User";
import Loading from "../loading";
import LoadingSVG from "../components/LoadingSVG";
// import User from "../components/user";

export default function SearchBar() {
    const [searchResults, setSearchResults] = useState([]);
    const [visible, setVisible] = useState(true);
    const [loading, setLoading] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            // @ts-ignore
            if (ref.current && !ref.current.contains(e.target)) {
                setVisible(false);
            }
        };

        document.addEventListener("click", handleClickOutside);

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    });

    const debouncedFetchSearchResults = _.debounce(fetchSearchResults, 500);

    async function fetchSearchResults(searchText: string) {
        setLoading(true);
        const res = await fetch("/api/search?q=" + searchText);
        if (res.ok) {
            const json = await res.json();
            setVisible(true);
            setSearchResults(json.data);
        } else {
            setSearchResults([]);
            setVisible(false);
        }
        setLoading(false);
    }

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        debouncedFetchSearchResults(e.target.value);
    }

    function handleClick(e: React.MouseEvent<HTMLInputElement>) {
        setVisible(true);
    }

    return (
        <div
            className="flex flex-row max-w-md w-full justify-end relative"
            ref={ref}
        >
            <div className="relative my-2">
                <input
                    onChange={handleChange}
                    onClick={handleClick}
                    type="text"
                    className=" p-2 rounded-md shadow-md bg-gray-100 text-black max-w-xs transition duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Search"
                />
                {loading && (
                    <div className="absolute inset-y-0 right-0 pr-2 flex items-center dark:text-green-600">
                        <LoadingSVG />
                    </div>
                )}
            </div>

            {visible && searchResults.length > 0 && (
                <ul className="flex flex-col bg-gray-200 text-black absolute shadow-lg rounded-lg mt-1 p-2 top-14 w-full max-w-sm right-2"                >
                    {searchResults.map((res: UserI) => {
                        return (
                            <li
                                key={res.id}
                                className="my-3"
                                onClick={() => setVisible(false)}
                            >
                                <User user={res} />
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
}