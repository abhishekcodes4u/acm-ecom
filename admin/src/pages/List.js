import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const List = ({ token }) => {
  const [list, setList] = useState([]);
  const fetchList = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/product/list",
        { headers: { token } }
      );
      console.log(response);
      if (response.data.success) setList(response.data.products);
      else toast.error(response.data.message);
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  const removeProduct = async (id) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/product/remove",
        { id },
        { headers: { token } }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };
  useEffect(() => {
    fetchList();
  }, []);
  return (
    <>
      <p className="mb-4 font-bold text-3xl">Product List</p>
      <div className="flex flex-col gap-2">
        {/* list table  */}
        <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className="text-center">Status</b>
        </div>
        {/* list rows  */}
        {list.map((item, index) => (
          <div
            className="grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm"
            key={index}
          >
            <img className="w-12" src={item.image[0]} />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>Rs. {item.price}</p>
            <p
              className="text-center md:text-center cursor-pointer text-lg border bg-red-500 text-white rounded-full hover:bg-red-700"
              onClick={() => removeProduct(item._id)}
            >
              X
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

export default List;
