import { useForm, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { FiArrowRight } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { setUserData } from "../redux/user";

interface FormData {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const dispatch = useDispatch();

  const onSubmit: SubmitHandler<FormData> = (data) => {
    const storedUserData = sessionStorage.getItem("userData");

    if (storedUserData) {
      const userData = JSON.parse(storedUserData);

      if (
        userData.email === data.email &&
        userData.password === data.password
      ) {
        toast.success("Login successful!");
        dispatch(setUserData(userData));
        localStorage.setItem("user", JSON.stringify(userData));
      } else {
        toast.error("Invalid email or password");
      }
    } else {
      toast.error("Invalid email or password");
    }
  };

  return (
    <div className="h-full flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Login Page</h2>
        </div>
        <p>Are you new here?</p>.
        <div className="flex items-center justify-between">
          <p>Please sign up...</p>
          <Link to={"/register"}>
            <FiArrowRight />{" "}
          </Link>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
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
              {...register("password", { required: true })}
              className="border border-gray-300 p-2 rounded w-full"
            />
            {errors.password && (
              <p className="text-red-500 mt-1">Password is required</p>
            )}
          </div>
          <div className="mt-6">
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded w-full hover:bg-blue-600"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
