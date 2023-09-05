import { Dog } from "../utils/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

export default function Modal({
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
