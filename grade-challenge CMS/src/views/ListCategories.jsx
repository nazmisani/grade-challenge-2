import axios from "axios";
import { useEffect, useState } from "react";

export default function ListCategories() {
  const [categories, setCategory] = useState([]);

  async function fetchCategories() {
    try {
      const { data } = await axios.get("https://h8-phase2-gc.vercel.app/apis/restaurant-app/categories", {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });
      setCategory(data.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <>
      <div className="max-w-7xl mx-12 m-32 m p-6 bg-gray-800 rounded-lg shadow-lg">
        <h1 className="text-white text-2xl font-bold mb-6">Cuisine categories</h1>
        <table className="min-w-full table-auto border-collapse border border-gray-200 text-left text-white">
          <thead className="bg-gray-600">
            <tr>
              <th className="border px-4 py-2">No</th>
              <th className="border px-4 py-2">Name</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category, index) => (
              <tr key={category.id} className="bg-gray-700 hover:bg-gray-600">
                <td className="border px-4 py-2 text-center">{index + 1}</td>
                <td className="border px-4 py-2">{category.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
