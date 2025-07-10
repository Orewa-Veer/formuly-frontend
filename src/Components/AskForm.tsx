import { Button } from "./ui/button";
import { useState } from "react";
import { useForm } from "react-hook-form";
import useTags from "../useHooks/useTags";
import DiscussionService from "../services/discussionServices";
export interface FormStu {
  userId: string;
  title: string;
  body: string;
  tags: string;
}
export interface DiscussStru {
  userId: string;
  title: string;
  body: string;
  tagId: string[];
}

const AskForm = () => {
  const { register, handleSubmit } = useForm<FormStu>();
  const [tagsId, setTagsId] = useState<string[]>([]);
  const { data, error } = useTags();
  const onSubmit = (data: FormStu) => {
    const newDiscuss = {
      userId: data.userId,
      title: data.title,
      body: data.body,
      tagId: tagsId,
    };
    const discuss = new DiscussionService();
    discuss.postDiscussion(newDiscuss);
  };
  if (!data) return <div>No tags exist</div>;
  if (error) return <div>{error.message}</div>;
  const handleClick = (tagId: string) => {
    if (!tagsId.includes(tagId)) {
      setTagsId((prev) => [...prev, tagId]);
    }
  };
  return (
    <div className="pt-5 p-3">
      <form
        action=""
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-3"
      >
        <div className="flex justify-between">
          <label htmlFor="form-title">Title</label>
          <input
            id="form-title"
            type="text"
            placeholder="Enter the title"
            {...register("title", { required: true })}
          />
        </div>
        <div className="flex justify-between">
          <label htmlFor="form-userId">UserId</label>
          <input
            id="form-userId"
            type="text"
            placeholder="Enter the userId"
            {...register("userId", { required: true })}
          />
        </div>
        <div className="flex justify-between">
          <label htmlFor="form-body">Body</label>
          <input
            id="form-body"
            type="text"
            placeholder="Enter the body"
            {...register("body", { required: true })}
          />
        </div>
        <div className="flex justify-between">
          <label htmlFor="form-tags">Tags</label>
          <input
            id="form-tags"
            type="text"
            placeholder="Enter the tags"
            {...register("tags")}
            value={tagsId.join()}
          />
        </div>
        <div className="flex gap-3">
          {data.map((tag) => (
            <div
              key={tag.name}
              className="border rounded-full px-2 py-0.5 text-xs border-black  cursor-pointer"
              onClick={() => {
                handleClick(tag._id);
              }}
            >
              {tag.name}
            </div>
          ))}
        </div>
        <Button type="submit"> Submit Form</Button>
      </form>
    </div>
  );
};

export default AskForm;
