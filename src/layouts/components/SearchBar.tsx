"use client";

import { createUrl } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { IoClose, IoSearch } from "react-icons/io5";

const SearchBar = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isInputEditing, setInputEditing] = useState(false);
  const [inputValue, setInputValue] = useState("");

  // Initialize inputValue from URL parameter
  useEffect(() => {
    const searchQuery = searchParams.get("q");
    if (searchQuery) {
      setInputValue(searchQuery);
    } else {
      setInputValue("");
    }
  }, [searchParams]);

  useEffect(() => {
    const inputField = document.getElementById(
      "searchInput",
    ) as HTMLInputElement;
    if (isInputEditing || searchParams.get("q")) {
      inputField.focus();
    }
  }, [searchParams, isInputEditing]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputEditing(true);
    setInputValue(e.target.value);
  };

  const handleClear = () => {
    setInputValue("");
    setInputEditing(false);

    const newParams = new URLSearchParams(searchParams.toString());
    newParams.delete("q");

    router.push(createUrl("/products", newParams));
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const val = e.target as HTMLFormElement;
    const search = val.search as HTMLInputElement;
    const newParams = new URLSearchParams(searchParams.toString());

    if (search.value) {
      newParams.set("q", search.value);
    } else {
      newParams.delete("q");
    }

    router.push(createUrl("/products", newParams));
  };

  return (
    <form
      onSubmit={onSubmit}
      className={`border border-border  rounded-full flex bg-light/90  pl-4 relative`}
    >
      <input
        id="searchInput"
        className="bg-transparent border-none search-input focus:ring-transparent p-2 w-full"
        key={searchParams?.get("q")}
        type="search"
        name="search"
        placeholder="Search for products"
        autoComplete="off"
        value={inputValue}
        onChange={handleChange}
      />
      {inputValue && (
        <button
          type="button"
          className="p-2 m-1 rounded-full"
          onClick={handleClear}
        >
          <IoClose size={20} />
        </button>
      )}
      <button className="search-icon p-2 m-1 rounded-full">
        <IoSearch size={20} />
      </button>
    </form>
  );
};

export default SearchBar;
