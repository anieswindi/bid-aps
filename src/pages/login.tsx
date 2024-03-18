import React, { useState } from "react";
import Button from "../components/Button";
import { useRouter } from "next/router";
import { useModalStore } from "../components/Modal/modalStore";
import { useLoaderStore } from "../components/Loader/loaderStore";

const Login: React.FC = (props) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const setMessage = useModalStore((state) => state.setModalMessage);
  const setModalLoading = useLoaderStore((state) => state.setLoading);

  const onSubmit = () => {
    setLoading(true);
    if (
      formData.email === "Hershel_Romaguera@hotmail.com" &&
      formData.password === "12345678"
    ) {
      localStorage.setItem(
        "bid-app-user",
        JSON.stringify({
          ...formData,
          user_id: "495b3fc2-3f33-4c4a-a8f3-85e01b1777d0",
        })
      );
      router.push("/");

      setLoading(false);
      setFormData({
        email: "",
        password: "",
      });
    } else {
      setLoading(false);
      setMessage({
        isShow: true,
        type: "error",
        message: "Your account not found! Please try again",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col gap-4 items-center justify-center w-full">
      <div className="bg-indigo-300 shadow-md rounded-lg px-8 py-6 w-[30vw]">
        <h1 className="text-2xl font-bold text-center mb-4">Welcome Back!</h1>
        <div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="your@email.com"
              required
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter your password"
              required
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
          </div>

          <Button
            onClick={onSubmit}
            type="submit"
            state={loading ? "loading" : "active"}
            className="w-full border-unset"
            size="large"
            // className="w-full flex justify-center hover:unset py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600"
          >
            Login
          </Button>
        </div>
      </div>

      <div className="grid gap-2 text-left justify-left">
        <span>user: Hershel_Romaguera@hotmail.com</span>
        <span>password: 12345678</span>
      </div>
    </div>
  );
};

export default Login;
