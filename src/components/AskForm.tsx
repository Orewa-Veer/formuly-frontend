import { Button } from "./ui/button";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTags } from "../useHooks/useTags";
import Service from "../services/genricServices";
import { Tags } from "../useHooks/useTags";
import { SimpleEditor } from "./tiptap-templates/simple/simple-editor";
import DOMPurify from "dompurify";
import Cards from "./Cards";
import clsx from "clsx";

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
  const { register, control, handleSubmit, reset } = useForm<FormStu>();
  const [tagsId, setTagsId] = useState<string[]>([]);
  const { data, error } = useTags();

  const onSubmit = (formData: FormStu) => {
    const clean = DOMPurify.sanitize(formData.body);
    const newDiscuss = {
      title: formData.title,
      body: clean,
      tagId: tagsId,
    };
    const discuss = new Service("/api/discussion");
    discuss.post<DiscussStru>(newDiscuss);
    reset();
    setTagsId([]);
  };

  const toggleTag = (tag: Tags) => {
    setTagsId((prev) =>
      prev.includes(tag._id)
        ? prev.filter((t) => t !== tag._id)
        : [...prev, tag._id]
    );
  };

  if (error) return <div className="text-red-500">{error.message}</div>;
  if (!data) return <div>Loading tags...</div>;

  return (
    <div className="pt-5 px-3 sm:px-5 md:px-8 lg:px-10 xl:px-14 max-w-5xl mx-auto">
      <Cards className="p-6 sm:p-8 lg:p-10">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          {/* Title */}
          <div>
            <label
              htmlFor="form-title"
              className="block font-semibold text-lg mb-1"
            >
              Title
            </label>
            <input
              id="form-title"
              type="text"
              placeholder="Enter a clear, descriptive title"
              {...register("title", { required: true })}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />
          </div>

          {/* Body */}
          <div>
            <label htmlFor="body" className="block font-semibold text-lg mb-1">
              Body
            </label>
            <Controller
              control={control}
              name="body"
              render={({ field }) => (
                <SimpleEditor content={field.value} onChange={field.onChange} />
              )}
            />
          </div>

          {/* Tags */}
          <div>
            <label className="block font-semibold text-lg mb-2">Tags</label>
            <div className="flex flex-wrap gap-2">
              {data.data.map((tag) => {
                const isSelected = tagsId.includes(tag._id);
                return (
                  <button
                    key={tag._id}
                    type="button"
                    onClick={() => toggleTag(tag)}
                    className={clsx(
                      "px-3 py-1 text-sm rounded-full border transition-colors",
                      isSelected
                        ? "bg-emerald-500 text-white border-emerald-500"
                        : "bg-white text-gray-700 border-gray-300 hover:bg-emerald-50"
                    )}
                  >
                    {tag.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Submit */}
          <div>
            <Button variant="outline" type="submit">
              Submit Question
            </Button>
          </div>
        </form>
      </Cards>
    </div>
  );
};

export default AskForm;
