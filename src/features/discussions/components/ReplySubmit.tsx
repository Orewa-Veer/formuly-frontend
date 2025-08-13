import { zodResolver } from "@hookform/resolvers/zod";
import DOMPurify from "dompurify";
import { Controller, FieldErrors, useForm } from "react-hook-form";
import z from "zod";
import { SimpleEditor } from "../../../components/tiptap-templates/simple/simple-editor";
import Service from "../../../services/genricServices";
import { Question } from "../../../types/Question";

const schema = z.object({
  body: z.string().max(3000, { message: "Max word limit exceeded" }),
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
    const clean = DOMPurify.sanitize(data.body);
    const reply = new Service(`/api/replies/${discuss._id}`);
    reply.post({ body: clean }).catch((ex) => console.log(ex.message));
    reset();
  };

  const onError = (error: FieldErrors<FormSch>) => {
    console.log(error);
  };

  return (
    <div className="flex flex-col gap-4 p-6 rounded-xl border border-gray-200/10 bg-white/5 backdrop-blur-lg shadow-lg mt-6">
      <h2 className="font-semibold text-xl text-emerald-700">
        Reply to the question
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit, onError)}
        className="flex flex-col gap-4"
      >
        <Controller
          control={control}
          name="body"
          render={({ field }) => (
            <SimpleEditor content={field.value} onChange={field.onChange} />
          )}
        />

        {errors.body && (
          <p className="text-red-500 text-sm">{errors.body.message}</p>
        )}

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-5 py-2 bg-emerald-700 text-white font-medium rounded-lg shadow hover:bg-emerald-600 transition-colors duration-200"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReplySubmit;
