import { FieldErrors, useForm } from "react-hook-form";
import apiClient from "../services/api-Client";
import z from "zod";
import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
const schema = z.object({
  username: z
    .string()
    .max(255)
    .min(3, { message: "username must be atleast 3 characters" }),
  name: z
    .string()
    .max(255)
    .min(3, { message: "Name must be atleast 3 characters" }),
  password: z
    .string()
    .min(8, { message: "Password must of atleast 8 digits" })
    .max(255),
  email: z.string().email(),
});
type Login = z.infer<typeof schema>;

const Register = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Login>({ resolver: zodResolver(schema) });
  const onSubmit = (data: Login) => {
    apiClient
      .post("/api/register", data)
      .then((res) => res.status === 200 && navigate("/app/home"))
      .catch((ex) => {
        console.log(ex);
        return <div>{ex}</div>;
      });
  };
  const onError = (error: FieldErrors<Login>) => {
    console.error(error);
  };
  return (
    <div className="flex flex-col gap-5 w-fit items-center  p-3">
      <div className="text-5xl font-bold">Fill the User Registration Form</div>
      <form
        action=""
        className="flex flex-col gap-3 w-xl p-10 bg-white/10 border border-white/20 backdrop-blur-lg rounded-sm "
        onSubmit={handleSubmit(onSubmit, onError)}
      >
        {errors.name && <p className="text-black">{errors.name.message}</p>}
        <div className="flex flex-col gap-2 justify-between px-3">
          <label htmlFor="regis-username" className="  block">
            Username
          </label>
          <input
            id="regis-username"
            {...register("username")}
            placeholder="Enter your username"
            type="text"
            className="border rounded-md p-1 "
          />
          {errors.username && (
            <p className="text-red-700">{errors.username.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-2 justify-between px-3 ">
          <label htmlFor="regis-name">Name</label>
          <input
            className="border rounded-md p-1"
            id="regis-name"
            placeholder="Enter your Name"
            {...register("name")}
            type="text"
          />
          {errors.name && <p className="text-red-700">{errors.name.message}</p>}
        </div>
        <div className="flex flex-col gap-2 justify-between px-3 ">
          <label htmlFor="regis-email">Email</label>
          <input
            className="border rounded-md p-1"
            id="regis-email"
            placeholder="Enter your email"
            {...register("email")}
            type="email"
          />
          {errors.email && (
            <p className="text-red-700">{errors.email.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-2 justify-between px-3 ">
          <label htmlFor="regis-password">Password</label>
          <input
            className="border rounded-md p-1"
            id="regis-password"
            placeholder="Enter your Password"
            {...register("password")}
            type="text"
          />
          {errors.password && (
            <p className="text-red-700">{errors.password.message}</p>
          )}
        </div>
        <button
          type="submit"
          className="bg-gray-200/50 border-gray-200/80 rounded-2xl w-fit px-2.5 cursor-pointer hover:bg-blue-500 hover:text-white mx-3"
        >
          Submit
        </button>
      </form>
      <div>
        <Link
          to={"/login"}
          className="bg-blue-400 rounded-md border border-blue-500 px-2 py-0.5"
        >
          Login Here
        </Link>
      </div>
    </div>
  );
};

export default Register;
