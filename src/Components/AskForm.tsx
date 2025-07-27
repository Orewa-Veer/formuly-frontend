import { Button } from "./ui/button";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTags } from "../..../../useHooks/useTags";
import Service from "../services/genricServices";
import { Tags } from "../useHooks/useTags";
import { SimpleEditor } from "./tiptap-templates/simple/simple-editor";
import DOMPurify from "dompurify";
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
  const [tagValue, setTags] = useState<string[]>([]);
  const { data, error } = useTags();
  const onSubmit = (data: FormStu) => {
    const clean = DOMPurify.sanitize(data.body);
    const newDiscuss = {
      title: data.title,
      body: clean,
      tagId: tagsId,
    };
    const discuss = new Service("/api/discussion");
    discuss.post<DiscussStru>(newDiscuss);
    reset();
  };
  if (!data) return <div>No tags exist</div>;
  if (error) return <div>{error.message}</div>;
  const handleClick = (tag: Tags) => {
    if (!tagsId.includes(tag._id)) {
      setTagsId((prev) => [...prev, tag._id]);
      setTags((prev) => [...prev, tag.name]);
    } else {
      setTagsId((prev) => prev.filter((t) => t !== tag._id));
      setTags((prev) => prev.filter((t) => t !== tag.name));
    }
  };
  return (
    <div className="pt-5 p-3 sm:px-5 md:px-8 lg:px-10 xl:px-14 max-w-5xl ">
      <form
        action=""
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-3 backdrop-blur-md shadow-md rounded-sm p-6"
      >
        <div className="flex flex-col space-y-1">
          <label htmlFor="form-title" className="font-semibold text-lg">
            Title
          </label>
          <input
            id="form-title"
            type="text"
            placeholder="Enter the title"
            {...register("title", { required: true })}
            className="border rounded-sm px-2 py-1"
          />
        </div>

        <div className="flex space-y-1 flex-col">
          <label htmlFor="body" className="font-semibold text-lg">
            Body
          </label>
          <Controller
            control={control}
            name="body"
            render={({ field }) => (
              <SimpleEditor
                // key={field.value}
                content={field.value}
                onChange={field.onChange}
              />
            )}
          ></Controller>
        </div>
        <div className="flex space-y-1 flex-col">
          <label htmlFor="form-tags" className="font-semibold text-lg">
            Tags
          </label>
          <input
            id="form-tags"
            type="text"
            placeholder="Enter the tags"
            {...register("tags")}
            value={tagValue.join()}
            className="border rounded-sm px-2 py-1"
          />
        </div>
        <div className="flex gap-3 mt-1">
          {data.data.map((tag) => (
            <div
              key={tag.name}
              className="border rounded-full px-2 py-0.5 text-xs border-black  cursor-pointer"
              onClick={() => {
                handleClick(tag);
              }}
            >
              {tag.name}
            </div>
          ))}
        </div>
        <Button variant={"outline"} type="submit" className="w-fit">
          {" "}
          Submit Form
        </Button>
      </form>
    </div>
  );
};

export default AskForm;
