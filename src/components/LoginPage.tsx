import { zodResolver } from "@hookform/resolvers/zod";
import { FieldErrors, useForm } from "react-hook-form";
import z from "zod";
import apiClient from "../services/api-Client";
import { useNavigate } from "react-router-dom";

const schema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters" }),
  email: z.string().email("Invalid email").min(3).max(255),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .max(255),
});

type Login = z.infer<typeof schema>;

const LoginPage = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Login>({ resolver: zodResolver(schema) });

  const onSubmit = (data: Login) => {
    apiClient
      .post("/api/login", data)
      .then((res) => {
        if (res.status === 200) navigate("/app");
      })
      .catch((ex) => console.error(ex));
  };

  const onError = (error: FieldErrors<Login>) => {
    console.error(error);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4">
      <form
        onSubmit={handleSubmit(onSubmit, onError)}
        className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 space-y-6 border border-gray-200 dark:border-gray-700"
      >
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 text-center">
          Login to Your Account
        </h1>

        {/* Username */}
        <div className="space-y-1">
          <label
            htmlFor="login-username"
            className="block font-medium text-gray-700 dark:text-gray-300"
          >
            Username
          </label>
          <input
            id="login-username"
            {...register("username")}
            type="text"
            className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.username && (
            <p className="text-sm text-red-500">{errors.username.message}</p>
          )}
        </div>

        {/* Email */}
        <div className="space-y-1">
          <label
            htmlFor="login-email"
            className="block font-medium text-gray-700 dark:text-gray-300"
          >
            Email
          </label>
          <input
            id="login-email"
            {...register("email")}
            type="email"
            className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div className="space-y-1">
          <label
            htmlFor="login-password"
            className="block font-medium text-gray-700 dark:text-gray-300"
          >
            Password
          </label>
          <input
            id="login-password"
            {...register("password")}
            type="password"
            className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.password && (
            <p className="text-sm text-red-500">{errors.password.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg shadow-md transition-all duration-200"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
