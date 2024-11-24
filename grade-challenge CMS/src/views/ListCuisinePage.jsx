import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Toastify from "toastify-js";
import "@fortawesome/fontawesome-free/css/all.min.css";

export default function ListCuisine({ base_url }) {
  const [products, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);

  async function fetchProduct() {
    try {
      const { data } = await axios.get(`${base_url}/apis/restaurant-app/cuisines`, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });

      setProduct(data.data);
    } catch (error) {
      const errorMessage = error.response?.data?.error;
      Toastify({
        text: errorMessage,
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

  async function handleDelete(id) {
    try {
      await axios.delete(`${base_url}/apis/restaurant-app/cuisines/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });

      fetchProduct();
      Toastify({
        text: "Successfully deleted data",
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "bottom",
        position: "right",
        stopOnFocus: true,
        style: {
          background: "#008000",
        },
      }).showToast();
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
          background: "#FF0000",
        },
      }).showToast();
    }
  }

  async function handleUpload(file, id) {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("file", file);

      const { data } = await axios.patch(`${base_url}/apis/restaurant-app/cuisines/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });

      fetchProduct();
      Toastify({
        text: data.message,
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "bottom",
        position: "right",
        stopOnFocus: true,
        style: {
          background: "#008000",
        },
      }).showToast();
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
          background: "#FF0000",
        },
      }).showToast();
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <>
      <div className="bg-gray-800 shadow-md rounded-lg max-w-max m-auto my-32 p-4">
        {/* Add Cuisine Button */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-white">Cuisine List</h1>
          <Link to={"/add"} className="bg-green-600 hover:bg-green-500 text-white font-bold py-2 px-4 rounded shadow-md transition duration-300">
            + Add Cuisine
          </Link>
        </div>

        {/* Table */}
        <table className="border border-gray-200 text-left text-white w-full">
          <thead className="bg-gray-200">
            <tr>
              <th className="border bg-gray-600 border-gray-300 px-2 py-2">No</th>
              <th className="border bg-gray-600 border-gray-300 px-2 py-2">Name</th>
              <th className="border bg-gray-600 border-gray-300 px-2 py-2">Description</th>
              <th className="border bg-gray-600 border-gray-300 px-2 py-2">Price</th>
              <th className="border bg-gray-600 border-gray-300 px-2 py-2">Image</th>
              <th className="border bg-gray-600 border-gray-300 px-2 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={product.id}>
                <td className="border border-gray-300 px-2 py-2 text-center">{index + 1}</td>
                <td className="border border-gray-300 px-2 py-2">{product.name}</td>
                <td className="border border-gray-300">{product.description}</td>
                <td className="border border-gray-300 px-2 py-2">Rp. {product.price}</td>
                <td className="border border-gray-300 px-2 py-2">
                  <img src={product.imgUrl} alt={product.name} className="h-28 w-28 object-cover rounded" />
                </td>
                <td className="border border-gray-300 px-2 py-1 text-center">
                  <Link to={`/edit/${product.id}`} className="px-2 py-1">
                    <img src="https://cdn-icons-png.flaticon.com/512/1159/1159633.png" alt="Edit" className="h-8 w-8 inline-block invert" />
                  </Link>
                  <button onClick={() => handleDelete(product.id)} className="px-2 py-1 ml-2">
                    <img src="https://cdn-icons-png.flaticon.com/512/6861/6861362.png" alt="Delete" className="h-8 w-8 inline-block" />
                  </button>
                  <label className="fa-solid fa-upload fa-2xl m-5" htmlFor={`upload${product.id}`} />
                  <input type="file" id={`upload${product.id}`} className="hidden" onChange={(e) => handleUpload(e.target.files[0], product.id)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
