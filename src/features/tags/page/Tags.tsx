import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Cards from "../../../Components/Cards";
import { Tags } from "../../../types/Question";
import { useTags } from "../../../useHooks/useTags";

const TagsSectioin = () => {
  const { data, error, loading } = useTags();
  // console.log(data);
  const [tags, setTags] = useState<Tags[]>();

  useEffect(() => {
    if (data) setTags(data.data || []);
  }, [data]);
  if (error) return <div>{error.message}</div>;
  if (loading) return <div>Loading...</div>;
  return (
    <div className="flex flex-col p-3  px-6 md:px-8 lg:px-10 xl:px-14">
      {/* Header  */}
      <div className="flex justify-between">
        <div>
          {" "}
          <h1 className="text-2xl font-semibold">Tags</h1>
          <p className="text-sm text-gray-500">All the tags</p>
        </div>
        <Link
          to={"/app/createTag"}
          className="bg-emerald-600 text-white hover:bg-emerald-700 rounded-md px-2.5 py-1 text-base h-8"
        >
          Create
        </Link>
      </div>

      {/* Body  */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mt-3">
        {tags.map((tag: Tags) => (
          <Cards key={tag._id}>
            {" "}
            <div>
              <div className="text-xl font-semibold">{tag.name}</div>
              <div className="text-sm text-gray-700 leading-relaxed">
                {tag.body}
              </div>
            </div>
            <div className="mt-1 text-sm text-gray-600">
              questions-{tag.questionCounter}
            </div>
          </Cards>
        ))}
      </div>
    </div>
  );
};

export default TagsSectioin;
