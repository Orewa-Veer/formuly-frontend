import { zodResolver } from "@hookform/resolvers/zod";
import { FieldErrors, useForm } from "react-hook-form";
import z from "zod";
import { Question } from "../models/Question";
import apiClient from "../services/api-Client";
const schema = z.object({
  body: z.string(),
});
type FormSch = z.infer<typeof schema>;
interface Reply {
  discuss: Question;
}

const ReplySubmit = ({ discuss }: Reply) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSch>({ resolver: zodResolver(schema) });
  const onSubmit = (data: FormSch) => {
    apiClient
      .post(`/api/replies/${discuss._id}`, data)
      .catch((err) => console.log(err));
  };
  const onError = (error: FieldErrors<FormSch>) => {
    console.log(error);
  };
  return (
    <div className="flex flex-col gap-3">
      <div>Reply to the question</div>
      <form
        action=""
        onSubmit={handleSubmit(onSubmit, onError)}
        className="flex flex-col gap-3 w-xl border border-black p-5"
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="reply-body">Enter Body</label>
          <input
            id="reply-body"
            {...register("body")}
            type="text"
            className="border border-black"
          />
          {errors.body && (
            <div className="text-red-700">{errors.body.message}</div>
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

export default ReplySubmit;
