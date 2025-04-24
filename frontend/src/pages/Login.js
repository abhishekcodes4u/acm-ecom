import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { ShopContext } from "../context/ShopContext";
import { Navigate } from "react-router-dom";

const Login = () => {
  const [currentState, setCurrentState] = useState("Sign Up");

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const { token, setToken, backend_url, navigate } = useContext(ShopContext);
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      if (currentState !== "Sign Up") {
        const response = await axios.post(backend_url + "/api/user/login", {
          email,
          password,
        });
        if (response.data.success) {
          console.log("login");
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
          toast.success("Login Successfully");
        } else {
          toast.error("Something went Wrong");
        }
      } else {
        const response = await axios.post(backend_url + "/api/user/register", {
          name,
          email,
          password,
        });
        if (response.data.success) {
          console.log("registered");
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
          toast.success(response.data.message);
        } else {
          toast.error("Something went wrong");
        }
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);
  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800"
    >
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className="prata-regular text-3xl">{currentState}</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>
      {currentState === "Login" ? (
        ""
      ) : (
        <input
          type="text"
          className="border-2 w-full px-3 py-2 border-gray"
          placeholder="Name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      )}
      <input
        type="email"
        className="border-2 w-full px-3 py-2 border-gray"
        placeholder="Email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        className="border-2 w-full px-3 py-2 border-gray"
        placeholder="Password"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div className="w-full flex justify-between text-sm mt-[-8px]">
        <p>Forgot your password?</p>
        {currentState === "Login" ? (
          <p
            onClick={() => setCurrentState("Sign Up")}
            className="cursor-pointer text-white bg-black font-bold p-2 rounded-1"
          >
            Create account
          </p>
        ) : (
          <p
            onClick={() => setCurrentState("Login")}
            className="cursor-pointer text-white bg-black font-bold p-2 rounded-1"
          >
            Login Here
          </p>
        )}
      </div>
      <button className="bg-black text-white font-light px-8 py-2 mt-4">
        {currentState === "Login" ? "Sign In" : "Sign Up"}
      </button>
    </form>
  );
};

export default Login;
