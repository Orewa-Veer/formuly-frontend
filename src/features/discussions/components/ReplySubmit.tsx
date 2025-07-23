import { zodResolver } from "@hookform/resolvers/zod";
import DOMPurfiy from "dompurify";
import { Controller, FieldErrors, useForm } from "react-hook-form";
import z from "zod";
import { SimpleEditor } from "../../../Components/tiptap-templates/simple/simple-editor";
import Service from "../../../services/genricServices";
import { Question } from "../../../types/Question";
import apiClient from "@/services/api-Client";
const schema = z.object({
  body: z.string(),
});
type FormSch = z.infer<typeof schema>;
interface Reply {
  discuss: Question;
}

const ReplySubmit = ({ discuss }: Reply) => {
  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSch>({
    resolver: zodResolver(schema),
    defaultValues: { body: "" },
  });
  const onSubmit = (data: FormSch) => {
    const clean = DOMPurfiy.sanitize(data.body);
    console.log(clean);
    apiClient
      .post(`/api/replies/${discuss._id}`, { body: clean })
      .catch((ex) => console.log(ex));
    // const reply = new Service(`/api/replies/${discuss._id}`);
    // reply.post(clean).catch((ex) => console.log(ex.message));
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
        className="flex flex-col gap-3  border rounded-md  p-5"
      >
        <Controller
          control={control}
          name="body"
          render={({ field }) => (
            <SimpleEditor content={field.value} onChange={field.onChange} />
          )}
        ></Controller>
        {errors.body && (
          <p className="text-red-600 text-sm">{errors.body.message}</p>
        )}

        {/* <div className="flex flex-col gap-2">
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
        </div> */}

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
