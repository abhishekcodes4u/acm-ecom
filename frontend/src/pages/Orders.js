import React, { useContext, useState, useEffect } from "react";
import Title from "../components/Title";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
const Orders = () => {
  const { backend_url, token, currency } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);

  const loadOrderData = async () => {
    try {
      if (!token) {
        return null;
      }
      const response = await axios.get(backend_url + "/api/order/userorders", {
        headers: { token },
        timeout: 5000,
      });
      if (response.data.success) {
        let allOrdersItem = [];
        response.data.orders.map((order) => {
          order.items.map((item) => {
            item["status"] = order.status;
            item["payment"] = order.payment;
            item["paymentMethod"] = order.paymentMethod;
            item["data"] = order.data;
            allOrdersItem.push(item);
          });
        });
        setOrderData(allOrdersItem.reverse());
      }
    } catch (error) {
      console.error("Error occurred:", error);
    }
  };

  useEffect(() => {
    loadOrderData();
  }, [token]);
  return (
    <>
      <div className="w-[50%] sm: w-[30%] min-h-[50vh] my-10 flex items-center justify-center flex-col ml-auto mr-auto p-3 shadow-lg">
        <div className="w-full text-center text-3xl py-2 text-black font-bold">
          Thank You For Ordering With Us
        </div>
        <div className="w-[70%] flex justify-center text-lg p-3">
          Your order is confirmed, Now Leave everything to us, we are preparing
          it for delivery
        </div>
        <hr className="w-[100%]" />
        <div className="w-full flex flex-row items-center justify-around">
          <div className="text-lg font-bold">Need Help ?</div>
          <button className="border rounded-1 p-2 bg-black text-white">
            Contact Us
          </button>
        </div>
      </div>
      <div className="border-t pt-16">
        <div className="text-2xl">
          <Title text1={"MY"} text2={"ORDERS"} />
        </div>
        <div>
          {orderData.map((item, index) => (
            <div
              key={index}
              className="py-4 border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
            >
              <div className="flex items-start gap-6 text-sm">
                <img className="w-16 sm:w-20" src={item.image[0]} alt="" />
                <div>
                  <p className="sm:text-base font-medium">{item.name}</p>
                  <div className="flex items-center gap-3 mt-2 text-base text-gray-500">
                    <p className="text-lg">
                      {currency}
                      {item.price}
                    </p>
                    <p>Quantity:{item.quantity}</p>
                    <p className="text-gray-500">
                      <span className="font-bold">Size :</span>{" "}
                      {item.sizes.map((size) => (
                        <span className="mx-[2px]">{size}</span>
                      ))}
                    </p>
                  </div>
                  <p>
                    Date:
                    <span className="text-gray-400">
                      {new Date(item.date).toDateString()}
                    </span>
                  </p>
                  <p>
                    Payment:
                    <span className="text-gray-400">{item.paymentMethod}</span>
                  </p>
                </div>
              </div>
              <div className="md:w-1/2 flex justify-between">
                <div className="flex items-center gap-2">
                  <p className="min-w-2 h-2 rounded-full bg-green-500"></p>
                  <p className="text-sm md:text-base">{item.status}</p>
                </div>
                <button
                  onClick={loadOrderData}
                  className="border px-4 py-2 text-sm font-medium rounded-2 shadow-md hover:shadow-sm"
                >
                  Track your order
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Orders;
