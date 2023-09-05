import { Dog } from "../utils/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

export default function Dog({
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
