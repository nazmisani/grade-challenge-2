import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

export default function LoginPage({ base_url }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${base_url}/apis/login`, { email, password });
      localStorage.setItem("access_token", data.data.access_token);

      navigate("/");
      Toastify({
        text: "Succeed Login",
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "bottom", // Top or bottom
        position: "right", // Left, center, or right
        stopOnFocus: true,
        style: {
          background: "#34D399",
          color: "black",
          border: "solid #000000",
          borderRadius: "8px",
          boxShadow: "2px 2px black",
          zIndex: 9999,
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

  return (
    <>
      <h1 className="text-5xl font-bold text-center text-white my-10" style={{ fontFamily: "Playfair Display" }}>
        Flavor of the World
      </h1>
      <div className="flex items-center justify-center">
        <div className="bg-gray-800 rounded-lg shadow-lg flex">
          <div className="hidden md:block">
            <img src="https://i.pinimg.com/736x/00/25/1e/00251ef0ca3772e4e433085b5dd4ac6b.jpg" alt="Login Illustration" style={{ width: 400 }} />
          </div>
          <div className="p-6 w-full md:w-96">
            <h2 className="text-white text-2xl font-semibold text-center mb-4">Login</h2>
            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-300 text-sm font-medium mb-1">
                  Email
                </label>
                <input type="email" id="email" name="email" className="w-full px-3 py-2 bg-gray-700 text-gray-200 rounded-md focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Enter your email" onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="mb-16">
                <label htmlFor="password" className="block text-gray-300 text-sm font-medium mb-1">
                  Password
                </label>
                <input type="password" id="password" name="password" className="w-full px-3 py-2 bg-gray-700 text-gray-200 rounded-md focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Enter your password" onChange={(e) => setPassword(e.target.value)} />
              </div>
              <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md focus:ring-2 focus:ring-blue-500 outline-none">
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
