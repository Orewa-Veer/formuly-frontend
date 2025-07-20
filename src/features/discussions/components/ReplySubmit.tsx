import { zodResolver } from "@hookform/resolvers/zod";
import { FieldErrors, useForm } from "react-hook-form";
import z from "zod";
import { Question } from "../../../types/Question";
import Service from "../../../services/genricServices";
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
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSch>({ resolver: zodResolver(schema) });
  const onSubmit = (data: FormSch) => {
    const reply = new Service(`/api/replies/${discuss._id}`);
    reply.post(data).catch((ex) => console.log(ex.message));
    reset();
  };
  const onError = (error: FieldErrors<FormSch>) => {
    console.log(error);
  };
  return (
    <div className="flex flex-col gap-3 pl-2 mt-3  backdrop-blur-lg border-white/20">
      <div className="font-semibold text-xl"> Reply to the question</div>
      <form
        action=""
        onSubmit={handleSubmit(onSubmit, onError)}
        className="flex flex-col gap-3 w-xl border rounded-md  p-5"
      >
        <div className="flex flex-col gap-2">
          <label
            htmlFor="reply-body"
            className="text-sm text-gray-600 font-semibold"
          >
            Enter Body
          </label>
          <input
            id="reply-body"
            {...register("body")}
            type="text"
            className="border border-gray-300/50 rounded-sm"
          />
          {errors.body && (
            <div className="text-red-700">{errors.body.message}</div>
          )}
        </div>

        <div className="flex items-center justify-center">
          <button
            type="submit"
            className="cursor-pointer bg-blue-700/60 border-blue-700/80 rounded-md w-fit px-3 py-0.5 inline"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReplySubmit;
