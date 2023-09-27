// src/components/Register.tsx

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { FiArrowRight } from "react-icons/fi";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  address: string;
  age: number;
}

const Register: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const Navigate = useNavigate();
  const onSubmit: SubmitHandler<FormData> = (data) => {
    sessionStorage.setItem("userData", JSON.stringify(data));
    toast.success("Registration successful!");
    Navigate("/login");
  };

  return (
    <div className="h-full flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-4">Register Page</h2>
        <p>Are you already registered?</p>
        <div className="flex items-center justify-between">
          <p>Please log in...</p>
          <Link to={"/login"}>
            <FiArrowRight />{" "}
          </Link>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="firstName" className="block text-gray-600">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              {...register("firstName", { required: true })}
              className="border border-gray-300 p-2 rounded w-full"
            />
            {errors.firstName && (
              <p className="text-red-500 mt-1">First name is required</p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="lastName" className="block text-gray-600">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              {...register("lastName", { required: true })}
              className="border border-gray-300 p-2 rounded w-full"
            />
            {errors.lastName && (
              <p className="text-red-500 mt-1">Last name is required</p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-600">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              {...register("email", { required: true })}
              className="border border-gray-300 p-2 rounded w-full"
            />
            {errors.email && (
              <p className="text-red-500 mt-1">Email address is required</p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-600">
              Password
            </label>
            <input
              type="password"
              id="password"
              {...register("password", {
                required: true,
                pattern: {
                  value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/,
                  message:
                    "Password must contain at least 1 numeric, 1 capital letter, 1 small letter, and 1 special symbol, and be at least 8 characters long",
                },
              })}
              className="border border-gray-300 p-2 rounded w-full"
            />
            {errors.password && (
              <p className="text-red-500 mt-1">{errors.password.message}</p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="address" className="block text-gray-600">
              Address
            </label>
            <input
              type="text"
              id="address"
              {...register("address", { required: true })}
              className="border border-gray-300 p-2 rounded w-full"
            />
            {errors.address && (
              <p className="text-red-500 mt-1">Address is required</p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="age" className="block text-gray-600">
              Age
            </label>
            <input
              type="number"
              id="age"
              {...register("age", { required: true, min: 18 })}
              className="border border-gray-300 p-2 rounded w-full"
            />
            {errors.age && (
              <p className="text-red-500 mt-1">
                Age must be at least 18 years old
              </p>
            )}
          </div>
          <div className="mt-6">
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded w-full hover:bg-blue-600"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
