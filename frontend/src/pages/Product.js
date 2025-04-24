import React, { useContext, useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import RelatedProducts from "../components/RelatedProducts";

const Product = () => {
  const { products, currency, addToCart } = useContext(ShopContext);
  const [size, setSize] = useState("");
  const mainSectionRef = useRef(null);
  const [productData, setProductData] = useState(null);
  const { productId } = useParams();
  const [image, setImage] = useState("");

  useEffect(() => {
    const foundProduct = products.find((item) => item._id === productId);

    if (foundProduct) {
      setProductData(foundProduct);
      setImage(foundProduct.image[0]);
    }
  }, [productId, products]);

  const scrollToMainSection = () => {
    mainSectionRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  };
  return productData ? (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        <div
          ref={mainSectionRef}
          className="flex-1 flex flex-col-reverse-gap-3 sm:flex-row"
        >
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-hidden justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {productData.image &&
              productData.image.map((item, index) => (
                <img
                  className="flex flex-col w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
                  src={item}
                  key={index}
                  alt=""
                  onClick={() => setImage(item)}
                />
              ))}
          </div>
          <div className="w-full sm:w-[80%] ml-[10px]">
            <img src={image} alt="Main Product" />
          </div>
        </div>
        <div className="flex-1">
          <h1 className="font-medium text-2xl">{productData.name}</h1>
          <div className="flex items-center gap-1 mt-2">
            <img className="w-3 5" src={assets.star_icon} alt="image" />
            <img className="w-3 5" src={assets.star_icon} alt="image" />
            <img className="w-3 5" src={assets.star_icon} alt="image" />
            <img className="w-3 5" src={assets.star_icon} alt="image" />
            <img className="w-3 5" src={assets.star_icon} alt="image" />
            <p className="pl-2">(93)</p>
          </div>
          <p className="mt-2 text-3xl font-medium">
            {currency}
            {productData.price}
          </p>
          <p className="mt-3 text-gray-500 md:w-4/5">
            {productData.description}
          </p>
          <div className="flex flex-col gap-2 my-8">
            <p className="mb-1">Select-Size</p>
            <div className="flex gap-2">
              {productData.sizes.map((item, index) => (
                <button
                  onClick={() => setSize(item)}
                  key={index}
                  className={`border py-2 px-3 bg-gray-100 ${
                    item === size ? "bg-gray-600 text-white" : ""
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
            <button
              onClick={() => addToCart(productData._id, size)}
              className="bg-black mt-3 text-white px-8 py-3 text-sm"
            >
              ADD TO CART
            </button>
            <hr className="mt-8 sm:w-4/5" />
            <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
              <p>100% Original Product</p>
              <p>Cash On Delivery</p>
              <p>Easy Refund within 7 days</p>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-20">
        <div className="flex">
          <p className="border px-5 py-3 text-sm fw-bold">Description</p>
          <p className="border px-5 py-3 text-sm">Reviews (93)</p>
        </div>
        <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book
          </p>
          <p>
            It has survived not only five centuries, but also the leap into
            electronic typesetting, remaining essentially unchanged. It was
            popularised in the 1960s with the release of Letraset sheets
            containing Lorem Ipsum passages, and more recently with desktop
            publishing software like Aldus PageMaker including versions of Lorem
            Ipsum.
          </p>
        </div>
      </div>
      {/* related product */}
      <RelatedProducts
        category={productData.category}
        subCategory={productData.subCategory}
        scrollToMainSection={scrollToMainSection}
      />
    </div>
  ) : (
    <div className="opacity-0"></div>
  );
};

export default Product;
