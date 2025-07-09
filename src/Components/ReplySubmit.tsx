import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { useAuth } from "../services/useAuth";
import apiClient from "../services/api-Client";
import { Question } from "../models/Question";
const schema = z.object({
  parentId: z.string(),
  body: z.string(),
  userId: z.string(),
});
type FormSch = z.infer<typeof schema>;
interface Reply {
  discuss: Question;
}

const ReplySubmit = ({ discuss }: Reply) => {
  const user = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSch>({ resolver: zodResolver(schema) });
  const onSubmit = (data: FormSch) => {
    if (user?.user) {
      data.userId = user?.user?._id;
    }
    data.parentId = discuss._id;
    apiClient.post("/api/discussion/" + discuss._id + "replies");
  };
  const onError = () => {};
  return (
    <div className="flex flex-col gap-3">
      <div>Reply to the question</div>
      <form
        action=""
        onSubmit={handleSubmit(onSubmit, onError)}
        className="flex flex-col gap-3 w-xl border border-black p-5"
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="reply-body">Enter Username</label>
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
