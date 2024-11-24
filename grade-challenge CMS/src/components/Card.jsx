// import { useNavigate } from "react-router-dom";

export default function Card({ product }) {
  // const navigate = useNavigate();
  return (
    <>
      <div key={product.id}>
        <div className="w-64 bg-gray-700 shadow-lg rounded-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:translate-y-[-5px] h-full">
          <div className="relative">
            <div className="absolute inset-0 bg-black opacity-10 rounded-lg blur-[10px]" />
          </div>
          <img src={product.imgUrl} alt="" className="h-48 object-cover w-full cursor-pointer" onClick={() => navigate(`/detail/${product.id}`)} />
          <div className="p-4 flex flex-col h-[calc(100%-12rem)]">
            <h3 className="text-lg text-white font-semibold">{product.name}</h3>
            <p className="text-white mt-2 flex-1">{product.description}</p>
            <p className="text-white mt-5 text-lg font-bold self-start">Rp. {product.price}</p>
          </div>
        </div>
      </div>
    </>
  );
}
