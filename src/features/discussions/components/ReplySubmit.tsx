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
    <div className="flex flex-col mx-2 sm:mx-5">
      <h2 className="font-semibold text-xl text-emerald-700 mb-2 ml-2" >
        Reply to the question
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit, onError)}
        className="flex flex-col border bg-muted "
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

        <div className="flex justify-center pb-2">
          <button
            type="submit"
            className="bg-emerald-700 text-white rounded-sm px-2"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReplySubmit;
