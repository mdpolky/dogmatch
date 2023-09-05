import { Dog as DogType } from "../utils/types";
import Dog from "./dog";

export default function DogList({
  searchResults,
  favoriteDogs,
  setFavoriteDogs,
}: {
  searchResults: DogType[];
  favoriteDogs: DogType[];
  setFavoriteDogs: React.Dispatch<React.SetStateAction<DogType[]>>;
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
