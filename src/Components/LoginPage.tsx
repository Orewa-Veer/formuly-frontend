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
    <div className="p-3 pl-5">
      <form
        action=""
        onSubmit={handleSubmit(onSubmit, onError)}
        className="flex flex-col gap-3 w-xl border border-black p-5"
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="login-username">Enter Username</label>
          <input
            id="login-username"
            {...register("username")}
            type="text"
            className="border border-black"
          />
          {errors.username && (
            <div className="text-red-700">{errors.username.message}</div>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="login-email">Enter Email</label>
          <input
            id="login-email"
            {...register("email")}
            type="text"
            className="border border-black"
          />
          {errors.email && (
            <div className="text-red-700">{errors.email.message}</div>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="login-password">Enter Password</label>
          <input
            id="login-password"
            {...register("password")}
            type="text"
            className="border border-black"
          />
          {errors.password && (
            <div className="text-red-700">{errors.password.message}</div>
          )}
        </div>
        <button
          type="submit"
          className="cursor-pointer bg-blue-400 border-blue-700 ps-3 py-1 inline"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
