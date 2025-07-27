import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { FieldErrors, useForm } from "react-hook-form";
import z from "zod";
import apiClient from "@/services/api-Client";
const schema = z.object({
  name: z.string().max(20, { message: "Max word limit  exceeded" }),

  body: z.string().max(3000, { message: "Max word limit exceeded" }),
});
type TagData = z.infer<typeof schema>;
const TagForm = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<TagData>({ resolver: zodResolver(schema) });
  const onSubmit = (data: TagData) => {
    apiClient
      .post("/api/tags", data)
      .catch((ex: AxiosError) => console.error(ex));
    reset();
  };
  const onError = (error: FieldErrors<TagData>) => {
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
          <label htmlFor="tag-name"></label>Name
          <input
            id="tag-name"
            {...register("name")}
            type="text"
            className="border border-gray-800 px-2.5 py-0.5 rounded-md backdrop-blur-md"
          />
          {errors.name && (
            <div className="text-red-700">{errors.name.message}</div>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="tag-body" className="text-lg font-semibold">
            Body
          </label>
          <input
            id="tag-body"
            {...register("body")}
            type="text"
            className="border border-gray-800 px-2.5 py-0.5 rounded-md backdrop-blur-md"
          />
          {errors.body && (
            <div className="text-red-700">{errors.body.message}</div>
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

export default TagForm;
