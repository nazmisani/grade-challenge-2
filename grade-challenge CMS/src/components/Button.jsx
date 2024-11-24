import { Link } from "react-router-dom";

export default function Button({ nameProp }) {
  return (
    <>
      <button type="submit" className=" bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:outline-none">
        {nameProp}
      </button>
    </>
  );
}
