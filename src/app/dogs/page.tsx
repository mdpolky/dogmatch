"use client";
import React, { useState, useEffect } from "react";
import { MultiValue, SingleValue } from "react-select";
import fetchClient from "../utils/client";
import {
  Dog,
  DogSearchParams,
  DogSearchResult,
  ReactSelectOption,
} from "../utils/types";
import Modal from "./modal";
import SearchFilters from "./searchFilters";
import DogList from "./dogList";

export default function SearchPage() {
  const itemsPerPage = 25;
  const [breeds, setBreeds] = useState<ReactSelectOption[]>([]);
  const [searchParams, setSearchParams] = useState<DogSearchParams>({
    breeds: [],
    zipCodes: [],
    ageMin: 0,
    ageMax: 100,
    size: itemsPerPage,
    from: 0,
    sort: "asc",
  });
  const [favoriteDogs, setFavoriteDogs] = useState<Dog[]>([]);
  const [match, setMatch] = useState<Dog | null>();
  const [isMatched, setIsMatched] = useState(false);
  const [searchResults, setSearchResults] = useState<Dog[]>([]);
  const [totalResults, setTotalResults] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const [nextPage, setNextPage] = useState("");
  const [prevPage, setPrevPage] = useState("");

  const handleBreedSelector = (
    selectedItems: MultiValue<ReactSelectOption>
  ) => {
    setSearchParams({
      ...searchParams,
      breeds: selectedItems.map((selectOption) => {
        return selectOption.value;
      }),
    });
  };

  const handleSortSelector = (selectedItem: SingleValue<ReactSelectOption>) => {
    if (!selectedItem) {
      return;
    }
    setSearchParams({
      ...searchParams,
      sort: selectedItem.value,
    });
  };

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    const { name, value } = event.target;

    if (name === "zipCodes") {
      setSearchParams({
        ...searchParams,
        zipCodes: value.split(","),
      });
    } else if (name === "ageMin") {
      setSearchParams({
        ...searchParams,
        ageMin: parseInt(value) || 0,
      });
    } else if (name === "ageMax") {
      setSearchParams({
        ...searchParams,
        ageMax: parseInt(value) || 100,
      });
    }
  };

  const handleMatch = async (favoriteDogs: Dog[]) => {
    {
      const dogIds = favoriteDogs.map((dog) => dog.id);
      const matchResponse = await fetchClient("POST", "/dogs/match", {
        body: JSON.stringify(dogIds),
      });

      if (!matchResponse.ok) {
        throw new Error("Match failed");
      }
      const { match } = await matchResponse.json();
      setMatch(favoriteDogs.find((dog) => dog.id === match));
      setIsMatched(true);
    }
  };

  const closeModal = () => {
    setIsMatched(false);
    setMatch(null);
  };

  const handleSearch = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const queryParams = new URLSearchParams();
      if (searchParams.breeds && searchParams.breeds.length > 0)
        searchParams.breeds.forEach((breed) => {
          queryParams.append("breeds[]", breed);
        });
      if (
        searchParams.zipCodes &&
        searchParams.zipCodes.some((zipCode) => zipCode.trim() !== "")
      )
        queryParams.append("zipCodes", searchParams.zipCodes.join(","));
      if (searchParams.ageMin)
        queryParams.append("ageMin", searchParams.ageMin.toString());
      if (searchParams.ageMax)
        queryParams.append("ageMax", searchParams.ageMax.toString());
      if (searchParams.size)
        queryParams.append("size", searchParams.size.toString());
      if (searchParams.sort)
        queryParams.append("sort", `breed:${searchParams.sort}`);
      queryParams.append("from", ((currentPage - 1) * itemsPerPage).toString());

      const searchResponse = await fetchClient(
        "GET",
        `/dogs/search?${queryParams.toString()}`
      );

      if (!searchResponse.ok) {
        throw new Error("Search failed");
      }

      const searchData: DogSearchResult = await searchResponse.json();
      const { resultIds, total, next, prev } = searchData;

      const dogsResponse = await fetchClient("POST", "/dogs", {
        body: JSON.stringify(resultIds),
      });

      if (!dogsResponse.ok) {
        throw new Error("Getting dogs by ids failed");
      }

      const dogsData: Dog[] = await dogsResponse.json();

      setSearchResults(dogsData);
      setTotalResults(total);
      setNextPage(next!);
      setPrevPage(prev!);
    } catch (error) {
      console.error("Error searching dogs:", error);
    }
  };

  useEffect(() => {
    // Immediately invoke the async function
    (async () => {
      try {
        const response = await fetchClient("GET", "/dogs/breeds");

        if (!response.ok) {
          throw new Error("All Breeds failed");
        }

        const data: string[] = await response.json();
        setBreeds(
          data.map((breed) => {
            return { value: breed, label: breed };
          })
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    })();
  }, []);

  useEffect(() => {
    const syntheticEvent = new Event(
      "submit"
    ) as unknown as React.FormEvent<HTMLFormElement>;
    handleSearch(syntheticEvent);
  }, [currentPage, searchParams]);

  return (
    <div className="flex flex-col h-screen">
      <Modal isOpen={isMatched} closeModal={closeModal} dog={match!} />
      <header className="py-2 px-4">
        <img
          src="https://res.cloudinary.com/dnxa7tvty/image/upload/v1693588314/dogfetch/mdp_dogfetch_logo_h.png"
          alt="DogFetch Logo"
          className="w-full max-w-xs mb-4"
        />
        <SearchFilters
          breeds={breeds}
          searchParams={searchParams}
          favoriteDogs={favoriteDogs}
          handleBreedSelector={handleBreedSelector}
          handleInputChange={handleInputChange}
          handleSortSelector={handleSortSelector}
          handleMatch={() => handleMatch(favoriteDogs)}
          handleSearch={handleSearch}
        />
      </header>
      <div className="flex-grow overflow-y-auto px-4 py-2">
        <h2 className="text-xl font-semibold mt-8">Search Results</h2>
        <p className="mb-4">Total Results: {totalResults}</p>
        <DogList
          searchResults={searchResults}
          favoriteDogs={favoriteDogs}
          setFavoriteDogs={setFavoriteDogs}
        />
      </div>
      <footer className="text-white py-2 px-4">
        <div className="flex justify-between">
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={!prevPage}
            className="px-3 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 disabled:bg-stone-500 disabled:cursor-not-allowed"
          >
            Previous Page
          </button>
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={!nextPage}
            className="px-3 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 disabled:bg-stone-500 disabled:cursor-not-allowed"
          >
            Next Page
          </button>
        </div>
      </footer>
    </div>
  );
}
