import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

export default function DetailProduct() {
  const [product, setProduct] = useState([]);
  const { id } = useParams();

  async function fetchProducts() {
    try {
      const { data } = await axios.get(`https://h8-phase2-gc.vercel.app/apis/pub/restaurant-app/cuisines/${id}`);
      setProduct(data.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <div className="max-w-3xl mx-auto m-10 p-6 bg-gray-800 rounded-lg shadow-lg">
        {/* Image Section */}
        <div className="relative">
          <img src={product?.imgUrl} className="w-full rounded-lg object-cover" />
          <div className="absolute inset-0 bg-black bg-opacity-30 rounded-lg" />
        </div>
        {/* Food Details */}
        <div className="mt-6">
          <h1 className="text-2xl font-bold text-white">{product?.name}</h1>
          <p className="text-white mt-2 italic">{product?.description}</p>
          <div className="mt-4 flex justify-between items-center">
            <span className="text-lg font-semibold text-green-600">Rp. {product?.price}</span>
            <span className="text-sm px-4 py-1 bg-gray-200 text-gray-800 rounded-full">{product.Category?.name}</span>
          </div>
          {/* Action Button */}
          <div className="mt-6 flex justify-end">
            <Link to={"/"} className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-200">
              Back to home
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
