import { FieldErrors, useForm } from "react-hook-form";
import apiClient from "../services/api-Client";
import z from "zod";
import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";

const schema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters" })
    .max(255),
  name: z
    .string()
    .min(3, { message: "Name must be at least 3 characters" })
    .max(255),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .max(255),
  email: z.string().email(),
});

type RegisterForm = z.infer<typeof schema>;

const Register = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>({ resolver: zodResolver(schema) });

  const onSubmit = (data: RegisterForm) => {
    apiClient
      .post("/api/register", data)
      .then((res) => res.status === 200 && navigate("/app/home"))
      .catch((ex) => console.log(ex));
  };

  const onError = (error: FieldErrors<RegisterForm>) => console.error(error);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-200 via-blue-100 to-purple-200 p-4">
      <div className="w-full max-w-lg bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl p-8 relative">
        {/* Header */}
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-2">
          Create an Account
        </h1>
        <p className="text-gray-600 text-center mb-6">
          Fill in your details to get started
        </p>

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit, onError)}
          className="flex flex-col gap-5"
        >
          {/* Username */}
          <div>
            <label
              htmlFor="username"
              className="text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <div className="relative">
              <FaUser className="absolute left-3 top-3 text-gray-400" />
              <input
                id="username"
                {...register("username")}
                placeholder="Enter your username"
                type="text"
                className="pl-10 w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-emerald-400 focus:outline-none transition"
              />
            </div>
            {errors.username && (
              <p className="text-red-600 text-sm mt-1">
                {errors.username.message}
              </p>
            )}
          </div>

          {/* Name */}
          <div>
            <label htmlFor="name" className="text-sm font-medium text-gray-700">
              Full Name
            </label>
            <div className="relative">
              <FaUser className="absolute left-3 top-3 text-gray-400" />
              <input
                id="name"
                {...register("name")}
                placeholder="Enter your full name"
                type="text"
                className="pl-10 w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-emerald-400 focus:outline-none transition"
              />
            </div>
            {errors.name && (
              <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <div className="relative">
              <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
              <input
                id="email"
                {...register("email")}
                placeholder="Enter your email"
                type="email"
                className="pl-10 w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-emerald-400 focus:outline-none transition"
              />
            </div>
            {errors.email && (
              <p className="text-red-600 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div className="relative">
              <FaLock className="absolute left-3 top-3 text-gray-400" />
              <input
                id="password"
                {...register("password")}
                placeholder="Enter your password"
                type="password"
                className="pl-10 w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-emerald-400 focus:outline-none transition"
              />
            </div>
            {errors.password && (
              <p className="text-red-600 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-emerald-500 text-white py-2 rounded-lg font-semibold hover:bg-emerald-600 transition-transform transform hover:-translate-y-0.5 shadow-md"
          >
            Sign Up
          </button>
        </form>

        {/* Footer */}
        <p className="text-sm text-gray-600 text-center mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-emerald-600 hover:underline font-semibold"
          >
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
