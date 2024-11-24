import { useNavigate, useParams } from "react-router-dom";
import ProductsForm from "../components/Form";
import axios from "axios";
import { useEffect, useState } from "react";
import Toastify from "toastify-js";

export default function EditCuisine({ base_url }) {
  const [cuisine, setCuisine] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  async function handleSubmit(e, name, description, price, imgUrl, categoryId) {
    e.preventDefault();
    try {
      const body = { name, description, price: +price, imgUrl, categoryId: +categoryId };

      const { data } = await axios.put(`${base_url}/apis/restaurant-app/cuisines/${id}`, body, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });
      navigate("/");
      Toastify({
        text: `Succedd edit cuisine`,
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

  async function fetchProduct() {
    try {
      const { data } = await axios.get(`https://h8-phase2-gc.vercel.app/apis/pub/restaurant-app/cuisines/${id}`);
      setCuisine(data.data || {});
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchProduct();
  }, []);

  return <>{cuisine && Object.keys(cuisine).length > 0 ? <ProductsForm base_url={base_url} cuisine={cuisine} handleSubmit={handleSubmit} nameProp="Edit Cuisine" /> : <div>Loading...</div>}</>;
}
