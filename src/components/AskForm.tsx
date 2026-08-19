import { Button } from "./ui/button";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTags } from "../useHooks/useTags";
import Service from "../services/genricServices";
import { Tags } from "../useHooks/useTags";
import { SimpleEditor } from "./tiptap-templates/simple/simple-editor";
import DOMPurify from "dompurify";
import clsx from "clsx";
import { FaArrowRight, FaCheck, FaRegLightbulb } from "react-icons/fa";
import { MdClose, MdLocalOffer } from "react-icons/md";
import { IoIosRocket } from "react-icons/io";

export interface FormStu {
  title: string;
  body: string;
  tags: string;
}

export interface DiscussStru {
  title: string;
  body: string;
  tagId: string[];
}

const AskForm = () => {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormStu>();

  const [tagsId, setTagsId] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const { data, error } = useTags();

  const toggleTag = (tag: Tags) => {
    setTagsId((prev) =>
      prev.includes(tag._id)
        ? prev.filter((t) => t !== tag._id)
        : [...prev, tag._id],
    );
  };

  const removeTag = (tagId: string) => {
    setTagsId((prev) => prev.filter((id) => id !== tagId));
  };

  const onSubmit = async (formData: FormStu) => {
    setSubmitError(null);

    const clean = DOMPurify.sanitize(formData.body || "");

    if (!clean.trim()) {
      setSubmitError("Please add some details to your question.");
      return;
    }

    if (tagsId.length === 0) {
      setSubmitError("Please select at least one tag.");
      return;
    }

    const newDiscuss: DiscussStru = {
      title: formData.title.trim(),
      body: clean,
      tagId: tagsId,
    };

    try {
      setIsSubmitting(true);

      const discuss = new Service("/api/discussion");

      await discuss.post<DiscussStru>(newDiscuss);

      reset();
      setTagsId([]);
    } catch (err) {
      console.error(err);
      setSubmitError(
        "Something went wrong while posting your question. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (error) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="rounded-2xl border border-red-200 bg-red-50 px-6 py-4 text-sm font-medium text-red-600 shadow-sm">
          {error.message}
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="flex items-center gap-3 rounded-2xl border border-white/80 bg-white/60 px-6 py-4 shadow-lg backdrop-blur-xl">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-emerald-200 border-t-emerald-600" />
          <span className="text-sm font-medium text-gray-600">
            Loading tags...
          </span>
        </div>
      </div>
    );
  }

  const selectedTags = data.data.filter((tag) => tagsId.includes(tag._id));

  return (
    <div
      className="
        relative
        min-h-screen
        overflow-hidden
        bg-gradient-to-br
        from-slate-50
        via-white
        to-emerald-50/40
      "
    >
      {/* =====================================================
          BACKGROUND DECORATION
      ====================================================== */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-32 top-20 h-80 w-80 rounded-full bg-emerald-300/20 blur-3xl" />

        <div className="absolute right-[-120px] top-[-80px] h-96 w-96 rounded-full bg-violet-300/20 blur-3xl" />

        <div className="absolute bottom-[-100px] left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-blue-300/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        {/* ===================================================
            HEADER
        ==================================================== */}

        <div className="mb-8">
          <div
            className="
              mb-4
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-white/80
              bg-white/60
              px-4
              py-2
              shadow-md
              shadow-emerald-100/30
              backdrop-blur-xl
            "
          >
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100">
              <IoIosRocket className="h-3.5 w-3.5 text-emerald-600" />
            </span>

            <span className="text-xs font-bold text-emerald-700">
              Start a discussion
            </span>
          </div>

          <h1
            className="
              text-4xl
              font-extrabold
              tracking-tight
              text-gray-900
              sm:text-5xl
            "
          >
            Ask the community.
            <br />
            <span
              className="
                bg-gradient-to-r
                from-emerald-500
                via-teal-500
                to-indigo-600
                bg-clip-text
                text-transparent
              "
            >
              Get unstuck together.
            </span>
          </h1>

          <p className="mt-4 max-w-2xl text-base leading-relaxed text-gray-600">
            Describe what you're working on, share what you've tried, and let
            the community help you find the right solution.
          </p>
        </div>

        {/* ===================================================
            FORM
        ==================================================== */}

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="
            overflow-hidden
            rounded-[2rem]
            border
            border-white/80
            bg-white/60
            shadow-xl
            shadow-gray-200/40
            backdrop-blur-xl
          "
        >
          {/* Top accent */}
          <div className="h-1.5 bg-gradient-to-r from-emerald-500 via-teal-500 to-indigo-600" />

          <div className="p-6 sm:p-8 lg:p-10">
            {/* =================================================
                TITLE
            ================================================== */}

            <div>
              <div className="mb-3 flex items-center justify-between">
                <div>
                  <label
                    htmlFor="form-title"
                    className="text-base font-bold text-gray-900"
                  >
                    Question title
                  </label>

                  <p className="mt-1 text-xs text-gray-500">
                    Be specific and imagine you're asking another developer.
                  </p>
                </div>

                <span className="hidden rounded-full bg-gray-100 px-3 py-1 text-[11px] font-medium text-gray-500 sm:block">
                  Required
                </span>
              </div>

              <input
                id="form-title"
                type="text"
                placeholder="e.g. How do I handle authentication in NestJS?"
                {...register("title", {
                  required: "A question title is required",
                  minLength: {
                    value: 10,
                    message: "Try making your title a little more descriptive",
                  },
                })}
                className="
                  w-full
                  rounded-xl
                  border
                  border-gray-200
                  bg-white/70
                  px-4
                  py-3.5
                  text-sm
                  font-medium
                  text-gray-900
                  outline-none
                  transition-all
                  placeholder:text-gray-400
                  focus:border-emerald-400
                  focus:bg-white
                  focus:ring-4
                  focus:ring-emerald-100
                "
              />

              {errors.title && (
                <p className="mt-2 text-xs font-medium text-red-500">
                  {errors.title.message}
                </p>
              )}
            </div>

            {/* =================================================
                BODY
            ================================================== */}

            <div className="mt-8">
              <div className="mb-3 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-100">
                  <FaRegLightbulb className="h-4 w-4 text-blue-600" />
                </div>

                <div>
                  <label
                    htmlFor="body"
                    className="text-base font-bold text-gray-900"
                  >
                    Explain your question
                  </label>

                  <p className="text-xs text-gray-500">
                    Include relevant context, code and what you've already
                    tried.
                  </p>
                </div>
              </div>

              <div
                className="
                  overflow-hidden
                  rounded-2xl
                  border
                  border-gray-200
                  bg-white/70
                  transition-all
                  focus-within:border-emerald-400
                  focus-within:bg-white
                  focus-within:ring-4
                  focus-within:ring-emerald-100
                "
              >
                <Controller
                  control={control}
                  name="body"
                  render={({ field }) => (
                    <SimpleEditor
                      content={field.value}
                      onChange={field.onChange}
                    />
                  )}
                />
              </div>
            </div>

            {/* =================================================
                TAGS
            ================================================== */}

            <div className="mt-8">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-100">
                    <MdLocalOffer className="h-4 w-4 text-violet-600" />
                  </div>

                  <div>
                    <label className="text-base font-bold text-gray-900">
                      Tags
                    </label>

                    <p className="text-xs text-gray-500">
                      Add tags that describe your question.
                    </p>
                  </div>
                </div>

                {tagsId.length > 0 && (
                  <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700">
                    {tagsId.length} selected
                  </span>
                )}
              </div>

              {/* Selected tags */}
              {selectedTags.length > 0 && (
                <div className="mb-4 flex flex-wrap gap-2">
                  {selectedTags.map((tag) => (
                    <button
                      key={tag._id}
                      type="button"
                      onClick={() => removeTag(tag._id)}
                      className="
                        group
                        inline-flex
                        items-center
                        gap-2
                        rounded-full
                        bg-emerald-100
                        px-3
                        py-1.5
                        text-xs
                        font-semibold
                        text-emerald-700
                        transition-all
                        hover:bg-emerald-200
                      "
                    >
                      {tag.name}

                      <MdClose className="h-3.5 w-3.5 opacity-60 transition-opacity group-hover:opacity-100" />
                    </button>
                  ))}
                </div>
              )}

              {/* Available tags */}
              <div
                className="
                  rounded-2xl
                  border
                  border-gray-200
                  bg-white/50
                  p-4
                "
              >
                <div className="flex flex-wrap gap-2">
                  {data.data.map((tag) => {
                    const isSelected = tagsId.includes(tag._id);

                    return (
                      <button
                        key={tag._id}
                        type="button"
                        onClick={() => toggleTag(tag)}
                        className={clsx(
                          `
                            group
                            inline-flex
                            items-center
                            gap-2
                            rounded-full
                            border
                            px-3
                            py-1.5
                            text-xs
                            font-semibold
                            transition-all
                            duration-150
                          `,
                          isSelected
                            ? `
                              border-emerald-500
                              bg-emerald-500
                              text-white
                              shadow-md
                              shadow-emerald-200
                            `
                            : `
                              border-gray-200
                              bg-white
                              text-gray-600
                              hover:-translate-y-0.5
                              hover:border-emerald-300
                              hover:bg-emerald-50
                              hover:text-emerald-700
                            `,
                        )}
                      >
                        {isSelected && <FaCheck className="h-2.5 w-2.5" />}

                        {tag.name}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* =================================================
                ERROR
            ================================================== */}

            {submitError && (
              <div
                className="
                  mt-6
                  flex
                  items-center
                  gap-3
                  rounded-xl
                  border
                  border-red-200
                  bg-red-50
                  px-4
                  py-3
                  text-sm
                  font-medium
                  text-red-600
                "
              >
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-100">
                  !
                </span>

                {submitError}
              </div>
            )}

            {/* =================================================
                FOOTER
            ================================================== */}

            <div
              className="
                mt-8
                flex
                flex-col-reverse
                gap-4
                border-t
                border-gray-200/70
                pt-6
                sm:flex-row
                sm:items-center
                sm:justify-between
              "
            >
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100">
                  <FaCheck className="h-2.5 w-2.5 text-emerald-600" />
                </span>
                Be specific. Be helpful. Be kind.
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="
                  group
                  h-11
                  rounded-xl
                  bg-gradient-to-r
                  from-emerald-500
                  to-teal-500
                  px-6
                  font-semibold
                  text-white
                  shadow-lg
                  shadow-emerald-200
                  transition-all
                  hover:-translate-y-0.5
                  hover:shadow-xl
                  hover:shadow-emerald-200
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                "
              >
                {isSubmitting ? (
                  <>
                    <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Posting...
                  </>
                ) : (
                  <>
                    Post Question
                    <FaArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </Button>
            </div>
          </div>
        </form>

        {/* ===================================================
            HELPFUL TIP
        ==================================================== */}

        <div
          className="
            mt-6
            flex
            items-start
            gap-4
            rounded-2xl
            border
            border-indigo-100
            bg-indigo-50/60
            p-5
            backdrop-blur-sm
          "
        >
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-indigo-100">
            <FaRegLightbulb className="h-4 w-4 text-indigo-600" />
          </div>

          <div>
            <h3 className="text-sm font-bold text-indigo-900">
              Want better answers?
            </h3>

            <p className="mt-1 text-xs leading-relaxed text-indigo-700/80">
              Questions with a clear title, relevant tags and enough context
              tend to get much better answers from the community.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AskForm;
