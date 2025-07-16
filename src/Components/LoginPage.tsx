import { zodResolver } from "@hookform/resolvers/zod";
import { FieldErrors, useForm } from "react-hook-form";
import z from "zod";
import apiClient from "../services/api-Client";
import { useNavigate } from "react-router-dom";
const schema = z.object({
  username: z
    .string()
    .min(3, { message: "username must be atleast 3 characters" }),
  email: z.string().email().min(3).max(255),
  password: z
    .string()
    .min(8, { message: "password must be atleast 3 digits" })
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
    <div className="p-3 pl-5 flex items-center h-lvh justify-center bg-gray-100">
      <form
        action=""
        onSubmit={handleSubmit(onSubmit, onError)}
        className="flex flex-col gap-3 w-xl bg-white/10 border border-white/20 p-5 backdrop-blur-lg shadow-xl rounded-lg transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg"
      >
        <div className="flex flex-col gap-2 text-lg font-semibold ">
          <label htmlFor="login-username">Enter Username</label>
          <input
            id="login-username"
            {...register("username")}
            type="text"
            className="border border-gray-800 px-2.5 py-0.5 rounded-md backdrop-blur-md"
          />
          {errors.username && (
            <div className="text-red-700">{errors.username.message}</div>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="login-email" className="text-lg font-semibold">
            Enter Email
          </label>
          <input
            id="login-email"
            {...register("email")}
            type="text"
            className="border border-gray-800 px-2.5 py-0.5 rounded-md backdrop-blur-md"
          />
          {errors.email && (
            <div className="text-red-700">{errors.email.message}</div>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="login-password" className="text-lg font-semibold">
            Enter Password
          </label>
          <input
            id="login-password"
            {...register("password")}
            type="text"
            className="border border-gray-800 px-2.5 py-0.5 rounded-md backdrop-blur-md"
          />
          {errors.password && (
            <div className="text-red-700">{errors.password.message}</div>
          )}
        </div>
        <button
          type="submit"
          className="cursor-pointer bg-blue-400 border-blue-700 ps-3 py-1 inline rounded-lg font-semibold text-white"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
