import { zodResolver } from "@hookform/resolvers/zod";
import DOMPurify from "dompurify";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { MessageCircle, Send } from "lucide-react";

import { SimpleEditor } from "../../../components/tiptap-templates/simple/simple-editor";
import Service from "../../../services/genricServices";
import { Question } from "../../../types/Question";

const schema = z.object({
  body: z
    .string()
    .min(1, { message: "Please write something before submitting." })
    .max(3000, { message: "Maximum 3000 characters allowed." }),
});

type FormSch = z.infer<typeof schema>;

interface ReplyProps {
  discuss: Question;
}

const ReplySubmit = ({ discuss }: ReplyProps) => {
  const {
    control,
    reset,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormSch>({
    resolver: zodResolver(schema),
    defaultValues: {
      body: "",
    },
  });

  const body = watch("body");

  /*
   * ----------------------------------------------------------
   * Submit
   * ----------------------------------------------------------
   */

  const onSubmit = async (data: FormSch) => {
    const clean = DOMPurify.sanitize(data.body);

    try {
      const reply = new Service(`/api/replies/${discuss._id}`);

      await reply.post({
        body: clean,
      });

      reset();
    } catch (error) {
      console.error("Failed to submit reply", error);
    }
  };

  /*
   * ----------------------------------------------------------
   * Character count
   * ----------------------------------------------------------
   */

  const characterCount = body?.length ?? 0;

  const characterPercentage = Math.min((characterCount / 3000) * 100, 100);

  return (
    <div className="w-full">
      {/* ======================================================
          HEADER
      ======================================================= */}

      <div className="mb-5 flex items-start gap-3">
        <div
          className="
            flex
            h-10
            w-10
            shrink-0
            items-center
            justify-center
            rounded-xl
            bg-gradient-to-br
            from-emerald-400
            to-teal-500
            text-white
            shadow-md
            shadow-emerald-100
          "
        >
          <MessageCircle className="h-5 w-5" />
        </div>

        <div>
          <h2 className="text-lg font-bold tracking-tight text-gray-900">
            Share your answer
          </h2>

          <p className="mt-0.5 text-sm text-gray-500">
            Help the community by sharing what you know.
          </p>
        </div>
      </div>

      {/* ======================================================
          FORM
      ======================================================= */}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="
          overflow-hidden
          rounded-2xl
          border
          border-emerald-100
          bg-white/70
          shadow-sm
          shadow-emerald-100/30
          backdrop-blur-xl
          transition-all
          focus-within:border-emerald-200
          focus-within:shadow-md
          focus-within:shadow-emerald-100/40
        "
      >
        {/* --------------------------------------------------
            Editor
        --------------------------------------------------- */}

        <div className="bg-white/50">
          <Controller
            control={control}
            name="body"
            render={({ field }) => (
              <SimpleEditor content={field.value} onChange={field.onChange} />
            )}
          />
        </div>

        {/* --------------------------------------------------
            Error
        --------------------------------------------------- */}

        {errors.body && (
          <div className="border-t border-red-100 bg-red-50/60 px-4 py-2.5">
            <p className="text-xs font-medium text-red-500">
              {errors.body.message}
            </p>
          </div>
        )}

        {/* --------------------------------------------------
            Footer
        --------------------------------------------------- */}

        <div
          className="
            flex
            flex-col
            gap-3
            border-t
            border-gray-100
            bg-gray-50/60
            px-4
            py-3
            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >
          {/* Character counter */}

          <div className="flex items-center gap-3">
            <div className="h-1.5 w-24 overflow-hidden rounded-full bg-gray-200">
              <div
                className={`
                  h-full
                  rounded-full
                  transition-all
                  duration-300
                  ${
                    characterPercentage > 90
                      ? "bg-orange-500"
                      : "bg-gradient-to-r from-emerald-400 to-teal-500"
                  }
                `}
                style={{
                  width: `${characterPercentage}%`,
                }}
              />
            </div>

            <span
              className={`
                text-[11px]
                font-medium
                ${
                  characterPercentage > 90 ? "text-orange-500" : "text-gray-400"
                }
              `}
            >
              {characterCount}/3000
            </span>
          </div>

          {/* Submit */}

          <button
            type="submit"
            disabled={isSubmitting}
            className="
              inline-flex
              items-center
              justify-center
              gap-2
              rounded-xl
              bg-gradient-to-r
              from-emerald-500
              to-teal-500
              px-4
              py-2
              text-sm
              font-semibold
              text-white
              shadow-md
              shadow-emerald-200/50
              transition-all
              duration-200
              hover:-translate-y-0.5
              hover:from-emerald-600
              hover:to-teal-600
              hover:shadow-lg
              hover:shadow-emerald-200/60
              disabled:cursor-not-allowed
              disabled:opacity-60
              disabled:hover:translate-y-0
            "
          >
            <span>{isSubmitting ? "Posting..." : "Post Answer"}</span>

            {!isSubmitting && <Send className="h-4 w-4" />}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReplySubmit;
