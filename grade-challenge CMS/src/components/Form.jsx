import { useEffect, useState } from "react";
import Button from "./Button";
import axios from "axios";
import Toastify from "toastify-js"; // Pastikan Toastify diimport jika diperlukan

export default function ProductsForm({ base_url, cuisine, handleSubmit, nameProp }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [imgUrl, setImgUrl] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState([]);

  async function fetchCategories() {
    try {
      const { data } = await axios.get(`${base_url}/apis/restaurant-app/categories`, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });
      setCategories(data.data);
    } catch (error) {
      Toastify({
        text: error.response?.data?.error,
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "bottom",
        position: "right",
        stopOnFocus: true,
        style: {
          background: "#F87171",
          color: "black",
          border: "solid #000000",
          borderRadius: "8px",
          boxShadow: "2px 2px black",
          zIndex: 9999,
        },
      }).showToast();
    }
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (cuisine) {
      setName(cuisine.name);
      setDescription(cuisine.description);
      setPrice(cuisine.price);
      setImgUrl(cuisine.imgUrl);
      setCategoryId(cuisine.categoryId);
    }
  }, [cuisine]);

  const handleFormSubmit = (e) => {
    e.preventDefault(); // Prevent form default submission
    console.log({ name, description, price, imgUrl, categoryId });
    handleSubmit(e, name, description, price, imgUrl, categoryId);
  };

  return (
    <div className="max-w-md mx-auto m-32 p-6 bg-gray-800 rounded-lg shadow-lg">
      <h1 className="text-white text-2xl font-bold mb-6">{nameProp}</h1>
      <form onSubmit={handleFormSubmit}>
        {/* Name Input */}
        <div className="mb-4">
          <label htmlFor="name" className="block text-white mb-2">
            Name
          </label>
          <input type="text" id="name" name="name" placeholder="Enter name" className="w-full px-3 py-2 text-gray-900 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none" value={name} onChange={(e) => setName(e.target.value)} />
        </div>

        {/* Description Input */}
        <div className="mb-4">
          <label htmlFor="description" className="block text-white mb-2">
            Description
          </label>
          <textarea id="description" name="description" rows="3" placeholder="Enter description" className="w-full px-3 py-2 text-gray-900 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none" value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>

        {/* Price Input */}
        <div className="mb-4">
          <label htmlFor="price" className="block text-white mb-2">
            Price
          </label>
          <input type="number" id="price" name="price" placeholder="Enter price" className="w-full px-3 py-2 text-gray-900 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none" value={price} onChange={(e) => setPrice(e.target.value)} />
        </div>

        {/* Image URL Input */}
        <div className="mb-4">
          <label htmlFor="imgUrl" className="block text-white mb-2">
            Image URL
          </label>
          <input type="text" id="imgUrl" name="imgUrl" placeholder="Enter image URL" className="w-full px-3 py-2 text-gray-900 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none" value={imgUrl} onChange={(e) => setImgUrl(e.target.value)} />
        </div>

        {/* Category Input */}
        <div className="mb-4">
          <label htmlFor="category" className="block text-white mb-2">
            Categories
          </label>
          <select className="w-full px-3 py-2 border-2 rounded-md" name="category" value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
            <option value="" disabled>
              Select Category
            </option>
            {categories.map((category) => (
              <option value={category.id} key={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {/* Submit Button */}
        <div className="mt-9">
          <Button type="submit" nameProp={nameProp} />
        </div>
      </form>
    </div>
  );
}
