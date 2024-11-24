import { useNavigate } from "react-router-dom";
import ProductsForm from "../components/Form";
import axios from "axios";
import Toastify from "toastify-js";

export default function AddCuisine({ base_url }) {
  const navigate = useNavigate();

  async function handleSubmit(e, name, description, price, imgUrl, categoryId) {
    e.preventDefault();
    try {
      const body = { name, description, price: +price, imgUrl, categoryId: +categoryId };

      // Sending the POST request to add the new cuisine
      const { data } = await axios.post(`${base_url}/apis/restaurant-app/cuisines`, body, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });

      // Redirect to the homepage after successful submission
      navigate("/");

      // Show success toast notification
      Toastify({
        text: `Succeed add new cuisine ${data.data.name}`,
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "bottom",
        position: "right",
        stopOnFocus: true,
        style: {
          background: "#008000",
          zIndex: 9999,
        },
      }).showToast();
    } catch (error) {
      // Show error toast notification if request fails
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

  // Default empty object for form inputs to ensure controlled inputs
  const initialFormData = {
    name: "",
    description: "",
    price: "",
    imgUrl: "",
    categoryId: "",
  };

  return (
    <>
      {/* Pass initial form data with default values */}
      <ProductsForm base_url={base_url} handleSubmit={handleSubmit} nameProp="Add Cuisine" initialData={initialFormData} />
    </>
  );
}
