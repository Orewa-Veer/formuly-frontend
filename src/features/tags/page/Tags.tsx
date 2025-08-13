import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Cards from "../../../components/Cards";
import { Tags } from "../../../useHooks/useTags";
import { useTags } from "../../../useHooks/useTags";
import { Tag as TagIcon, MessageSquare } from "lucide-react";

const TagsSectioin = () => {
  const { data, error, loading } = useTags();
  const [tags, setTags] = useState<Tags[]>([]);

  useEffect(() => {
    if (data) setTags(data.data);
  }, [data]);

  if (error) return <div className="p-6 text-red-500">{error.message}</div>;
  if (loading) return <div className="p-6 text-gray-500">Loading...</div>;
  if (!tags || tags.length === 0)
    return <div className="p-6 text-gray-500">No tags found</div>;

  return (
    <div className="flex flex-col p-4 md:p-6 lg:p-8 xl:p-10 max-w-screen-2xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b pb-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-emerald-700 flex items-center gap-2">
            <TagIcon className="h-7 w-7" /> Tags
          </h1>
          <p className="text-sm text-gray-500">Browse all available tags</p>
        </div>
        <Link
          to={"/app/createTag"}
          className="bg-emerald-600 text-white hover:bg-emerald-700 rounded-md px-4 py-2 text-sm font-medium transition-colors"
        >
          Create Tag
        </Link>
      </div>

      {/* Tags Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {tags.map((tag) => (
          <Cards
            key={tag._id}
            className="p-4 rounded-lg border hover:shadow-md transition-shadow bg-white flex flex-col justify-between"
          >
            <div>
              <div className="inline-block px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-semibold mb-2">
                {tag.name}
              </div>
              <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">
                {tag.body}
              </p>
            </div>
            <div className="mt-4 flex items-center gap-1 text-sm text-gray-500">
              <MessageSquare className="h-4 w-4" />
              {tag.questionCounter} questions
            </div>
          </Cards>
        ))}
      </div>
    </div>
  );
};

export default TagsSectioin;
