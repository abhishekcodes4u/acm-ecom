import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);
  const [status, setStatus] = useState("Order Placed");
  const fetchAllOrders = async () => {
    if (!token) return null;
    try {
      const response = await axios.get("http://localhost:5000/api/order/list", {
        headers: { token },
      });
      if (response.data.success) {
        console.log(response.data.orders);
        setOrders(response.data.orders);
      } else {
        console.log(response.data.message);
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  const handleStatusChange = async (id, newStatus) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/order/status",
        { id, newStatus },
        {
          headers: { token },
        }
      );
      if (response.data.success) {
        const updatedOrders = orders.map((order) =>
          order.id === id ? { ...order, status: newStatus } : order
        );
        setOrders(updatedOrders);
        setStatus(newStatus);
      } else {
        toast.error(response.data.success);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  useEffect(() => {
    fetchAllOrders();
  }, [token, status]);
  return (
    <div className="w-full h-full">
      <h3 className="text-3xl font-bold text-gray-500 pb-1 mb-2 border-b-2">
        Orders
      </h3>
      <div className="flex flex-col overflow-auto w-full h-full m-1">
        {/* complete div */}
        {orders.map((order, index) => (
          // order list
          <div className="flex flex-row justify-between border border-2 p-4 my-4 shadow-md">
            {/* image  */}
            <div className="flex justify-start w-[60px]">
              <img
                className="w-[60px] absolute t-0"
                src={assets.parcel_icon}
                alt=""
              />
            </div>
            {/* name and address */}
            <div>
              {/* name  */}
              <div className="mb-2">
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return (
                      <p
                        className="text-gray-700 font-bold w-[80%]"
                        key={index}
                      >
                        {item.name}x{item.quantity} <span>{item.size}</span>
                      </p>
                    );
                  } else {
                    return (
                      <p
                        className="text-gray-700 font-bold w-[90%]"
                        key={index}
                      >
                        {item.name}x{item.quantity} <span>{item.size}</span>,
                      </p>
                    );
                  }
                })}
              </div>
              {/* address */}
              <p className="text-black font-bold">
                {order.address.firstName.toUpperCase() +
                  " " +
                  order.address.lastName.toUpperCase()}
              </p>
              <div>
                <p>
                  {order.address.address} {order.address.pincode}{" "}
                  {order.address.country}
                </p>
              </div>
            </div>
            {/* payment  */}
            <div>
              <p className="mb-2">
                <span className="text-black font-bold">Items : </span>
                {order.items.length}
              </p>
              <div>
                <p>
                  Method : <span>{order.paymentMethod}</span>
                </p>
                <p>
                  Payment :{" "}
                  <span>{order.status == true ? "Done" : "Pending"}</span>
                </p>
                <p>Date : {new Date(order.date).toDateString()}</p>
              </div>
            </div>
            {/* amount  */}
            <p className=" text-black text-xl">₹ {order.amount}</p>
            {/* change status */}
            <div>
              <select
                className="h-[40px] border
                border-black text-md text-black font-bold p-2"
                value={order.status}
                onChange={(e) => handleStatusChange(order._id, e.target.value)}
              >
                <option value="Order Placed">Order Placed</option>
                <option value="Out for Delivery">Out for Delivery</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
