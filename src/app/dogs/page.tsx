"use client";
import React, { useId, useState, useEffect } from "react";
import Select, { MultiValue, SingleValue } from "react-select";
import fetchClient, {
  Dog,
  DogSearchParams,
  DogSearchResult,
} from "../../client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faClose } from "@fortawesome/free-solid-svg-icons";

interface ReactSelectOption {
  value: string;
  label: string;
}

interface searchFilters {
  breeds: ReactSelectOption[];
  searchParams: DogSearchParams;
  favoriteDogs: Dog[];
  handleBreedSelector: (selectedItems: MultiValue<ReactSelectOption>) => void;
  handleInputChange: React.ChangeEventHandler<HTMLInputElement>;
  handleSortSelector: (selectedItem: SingleValue<ReactSelectOption>) => void;
  handleMatch: () => void;
  handleSearch: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
}

function SearchFilters({
  breeds,
  searchParams,
  favoriteDogs,
  handleBreedSelector,
  handleInputChange,
  handleSortSelector,
  handleMatch,
  handleSearch,
}: searchFilters) {
  const customStyles = {
    option: (defaultStyles: any, state: any) => ({
      ...defaultStyles,
      backgroundColor: "#fff",
      color: "#000",
      "&:hover": {
        backgroundColor: "#FACC15",
      },
    }),
    multiValue: (defaultStyles: any, state: any) => ({
      ...defaultStyles,
      backgroundColor: "#FACC15",
    }),
    multiValueRemove: (defaultStyles: any, state: any) => ({
      ...defaultStyles,
      "&:hover": {
        backgroundColor: "#EAB308",
      },
    }),
  };

  return (
    <form
      onSubmit={handleSearch}
      className="flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0"
    >
      <div className="flex flex-col md:w-1/4">
        <label htmlFor="breeds">Breeds:</label>
        <Select
          isMulti
          placeholder="Select breed(s)"
          inputId="breeds"
          name="breeds"
          options={breeds}
          onChange={handleBreedSelector}
          instanceId={useId()}
          styles={customStyles}
        />
      </div>
      <div className="flex flex-col md:w-1/4">
        <label htmlFor="zipCodes">Zip Codes:</label>
        <input
          type="text"
          id="zipCodes"
          name="zipCodes"
          value={searchParams.zipCodes}
          onChange={handleInputChange}
          className="border rounded-md p-2"
        />
      </div>
      <div className="flex flex-col md:w-1/4">
        <label htmlFor="ageMin">Min Age:</label>
        <input
          type="number"
          min="0"
          max="100"
          name="ageMin"
          id="ageMin"
          value={searchParams.ageMin}
          onChange={handleInputChange}
          className="border rounded-md p-2"
        />
      </div>
      <div className="flex flex-col md:w-1/4">
        <label htmlFor="ageMax">Max Age:</label>
        <input
          type="number"
          min="0"
          max="100"
          name="ageMax"
          id="ageMax"
          value={searchParams.ageMax}
          onChange={handleInputChange}
          className="border rounded-md p-2"
        />
      </div>
      <div className="flex flex-col md:w-1/4">
        <label htmlFor="sort">Sort:</label>
        <Select
          placeholder="Sort"
          inputId="sort"
          name="sort"
          defaultValue={{ value: searchParams.sort, label: "Breeds:Asc" }}
          options={[
            { value: "asc", label: "Breeds:Asc" },
            { value: "desc", label: "Breeds:Desc" },
          ]}
          onChange={handleSortSelector}
          instanceId={useId()}
          styles={customStyles}
        />
      </div>
      <div className="flex justify-start md:justify-end items-start md:items-end mt-auto">
        <button
          type="submit"
          className="w-full md:w-auto px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 focus:outline-none focus:ring focus:ring-blue-300"
        >
          Search
        </button>
      </div>
      <div className="flex justify-start md:justify-end items-start md:items-end mt-auto">
        <button
          onClick={handleMatch}
          disabled={favoriteDogs.length === 0}
          className="w-full md:w-auto px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 disabled:bg-stone-500 disabled:cursor-not-allowed focus:outline-none focus:ring focus:ring-blue-300"
        >
          Match
        </button>
      </div>
    </form>
  );
}

function Modal({
  isOpen,
  closeModal,
  dog,
}: {
  isOpen: boolean;
  closeModal: () => void;
  dog: Dog;
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-gray-600 opacity-75"></div>
      <div className="relative bg-white rounded-lg shadow-xl p-10">
        <button
          onClick={closeModal}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 focus:outline-none"
        >
          <FontAwesomeIcon icon={faClose} />
        </button>
        <h2 className="text-2xl mb-4">
          Meet Your New Best Friend: <br />
          <span className="font-semibold">{dog.name}</span>
        </h2>
        <img
          className="w-full object-cover rounded-md mb-4"
          src={dog.img}
          alt={dog.name}
        />
        <p>Breed: {dog.breed}</p>
        <p>Age: {dog.age}</p>
        <p>Zip Code: {dog.zip_code}</p>
        <button
          onClick={() =>
            alert("This is a demo app, please adopt from your local shelter(s)")
          }
          className="px-3 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 mt-4"
        >
          Contact
        </button>
      </div>
    </div>
  );
}

function Dog({
  dog,
  searchResults,
  favoriteDogs,
  setFavoriteDogs,
}: {
  dog: Dog;
  searchResults: Dog[];
  favoriteDogs: Dog[];
  setFavoriteDogs: any;
}) {
  const isFavoriteDog = (dogId: string) => {
    return favoriteDogs?.some((dog) => dog.id === dogId);
  };

  const toggleFavorite = (dogId: string) => {
    if (isFavoriteDog(dogId)) {
      // If the dog is already a favorite, remove it.
      const updatedFavorites = favoriteDogs.filter((dog) => dog.id !== dogId);
      setFavoriteDogs(updatedFavorites);
    } else {
      // If the dog is not a favorite, add it.
      const dogToAdd = searchResults.find((dog) => dog.id === dogId);
      setFavoriteDogs([...favoriteDogs, dogToAdd!]);
    }
  };

  return (
    <li key={dog.id} className="bg-white shadow-md rounded-md flex relative">
      <button
        className={`bg-black/50 rounded-tr-md rounded-bl-md absolute top-0 right-0 p-2 ${
          isFavoriteDog(dog.id) ? "text-rose-400" : "text-stone-400"
        }`}
        onClick={() => toggleFavorite(dog.id)}
      >
        <FontAwesomeIcon icon={faHeart} />
      </button>
      <div className="flex flex-col">
        <div className="flex-shrink-0">
          <img
            className="w-96 h-72 object-cover rounded-t-md"
            src={dog.img}
            alt={dog.name}
          />
        </div>
        <div className="flex flex-col flex-grow p-2">
          <p className="text-lg font-bold">{dog.name}</p>
          <p>Breed: {dog.breed}</p>
          <p>Age: {dog.age}</p>
          <p>Zip Code: {dog.zip_code}</p>
        </div>
      </div>
    </li>
  );
}

function DogList({
  searchResults,
  favoriteDogs,
  setFavoriteDogs,
}: {
  searchResults: Dog[];
  favoriteDogs: Dog[];
  setFavoriteDogs: React.Dispatch<React.SetStateAction<Dog[]>>;
}) {
  return (
    <div className="h-full mb-4">
      <ul className="flex flex-wrap gap-4">
        {searchResults.map((dog) => (
          <Dog
            key={dog.id}
            dog={dog}
            searchResults={searchResults}
            favoriteDogs={favoriteDogs}
            setFavoriteDogs={setFavoriteDogs}
          />
        ))}
      </ul>
    </div>
  );
}

function SearchPage() {
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

export default SearchPage;
