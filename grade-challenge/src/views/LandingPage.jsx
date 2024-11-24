import { useEffect, useState } from "react";
import axios from "axios";
import Footer from "../components/Footer";
import Carousel from "../components/Carousel";
import Card from "../components/Card";

export default function LandingPage() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [filter, setFilter] = useState("");
  const [categories, setCategories] = useState([]);
  const pagination = getPagination();

  function getPagination() {
    const rangeSize = 10;
    const startPage = Math.floor((currentPage - 1) / rangeSize) * rangeSize + 1;
    const endPage = Math.min(startPage + rangeSize - 1, totalPage);
    let temp = [];
    for (let i = startPage; i <= endPage; i++) {
      temp.push(i);
    }

    return temp;
  }

  async function fetchCategories() {
    try {
      const { data } = await axios.get("https://h8-phase2-gc.vercel.app/apis/pub/restaurant-app/categories");
      setCategories(data.data);
    } catch (error) {
      console.error(error);
    }
  }

  async function fetchProducts() {
    try {
      let url = `https://h8-phase2-gc.vercel.app/apis/pub/restaurant-app/cuisines?page=${currentPage}&limit=12&q=${search}`;
      if (filter) url += `&i=${filter}`;
      if (sort) url += `&sort=${sort}`;

      const { data } = await axios.get(url);
      setProducts(data.data.query);
      setCurrentPage(data.data.pagination.currentPage);
      setTotalPage(data.data.pagination.totalPage);
    } catch (error) {
      console.error(error);
    }
  }

  function handlePrev() {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  function handleNext() {
    if (currentPage < totalPage) {
      setCurrentPage(currentPage + 1);
    }
  }

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

  useEffect(() => {
    fetchProducts(currentPage);
  }, [search, sort, filter, currentPage]);

  return (
    <>
      <Carousel />
      <h1 className="text-5xl font-bold text-center text-white mt-10" style={{ fontFamily: "Playfair Display" }}>
        Our Menu
      </h1>

      <div className="flex justify-center mt-6 gap-4">
        <select className="px-4 py-2 border rounded bg-gray-700 text-white focus:outline-none" onChange={(e) => setFilter(e.target.value)} value={filter}>
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category.id}>{category.name}</option>
          ))}
        </select>

        <input className="px-4 py-2 w-1/2 border rounded focus:outline-none bg-gray-700 text-white" type="text" placeholder="Search menu..." onChange={(e) => setSearch(e.target.value)} />

        <select className="px-4 py-2 border rounded bg-gray-700 text-white focus:outline-none" onChange={(e) => setSort(e.target.value)} value={sort}>
          <option value="">Sort by</option>
          <option value="asc">ASC</option>
          <option value="desc">DESC</option>
        </select>
      </div>

      <hr className="mt-10" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10 justify-items-center">
        {products.map((product) => (
          <Card key={product.id} product={product} />
        ))}
      </div>

      <div className="flex justify-center items-center gap-4 mt-10">
        <button onClick={handlePrev} disabled={currentPage === 1} className="px-4 py-2 bg-gray-500 text-white rounded disabled:opacity-50">
          Prev
        </button>

        {/* Number Pagination */}
        <div className="flex items-center gap-x-1">
          {pagination.map((el) => (
            <button type="button" key={el} className={el === currentPage ? "min-h-[38px] min-w-[53px] flex justify-center items-center bg-blue-950 py-2 px-3 text-sm rounded-lg border-2 text-white" : "min-h-[38px] min-w-[53px] flex justify-center items-center rounded-lg border-2  hover:bg-blue-950 hover:border-2  py-2 px-3 text-sm text-white"} onClick={() => setCurrentPage(el)}>
              {el}
            </button>
          ))}
        </div>
        {/*  */}

        <button onClick={handleNext} disabled={currentPage === totalPage} className="px-4 py-2 bg-gray-500 text-white rounded disabled:opacity-50">
          Next
        </button>
      </div>

      <div className="justify-items-center mt-5 text-white">
        <p>
          Page {currentPage} of {totalPage} page
        </p>
      </div>
      <Footer />
    </>
  );
}
