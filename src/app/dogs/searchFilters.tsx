import React, { useId } from "react";
import Select from "react-select";
import { SearchFilters } from "../utils/types";

export default function SearchFilters({
  breeds,
  searchParams,
  favoriteDogs,
  handleBreedSelector,
  handleInputChange,
  handleSortSelector,
  handleMatch,
  handleSearch,
}: SearchFilters) {
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
