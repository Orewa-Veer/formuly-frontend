import { Bookmark, Reply } from "lucide-react";
import { useEffect, useState } from "react";
import { GoTriangleUp } from "react-icons/go";
import { useParams } from "react-router-dom";
import { Question } from "../../../types/Question";
import { useSocket } from "../../../services/useSocket";
import { useADiscuss } from "../hooks/useDiscussion";
import ReplyList from "./ReplyList";
import ReplySubmit from "./ReplySubmit";
import { Spinner } from "@/components/ui/shadcn-io/spinner";

const Discussions = () => {
  const { id } = useParams<{ id: string }>();
  const { data, loading, error } = useADiscuss<Question>(id);
  const { socket, ready } = useSocket();
  const [discussion, setDiscussion] = useState<Question>();

  useEffect(() => {
    if (!ready || !socket || !id) return;
    socket.emit("discussion:join", id);
    return () => {
      socket.emit("discussion:leave", id);
    };
  }, [id, ready, socket]);

  useEffect(() => {
    setDiscussion(data);
  }, [data]);

  if (loading)
    return (
      <div className="p-4">
        <Spinner />
      </div>
    );
  if (error) return <div className="p-4 text-red-500">{error.message}</div>;
  if (!discussion) return <div className="p-4">Fetching...</div>;

  return (
    <div className="p-2 sm:p-4 space-y-8 max-w-7xl mx-auto ">
      {/* Question Card */}
    <div className="bg-white/70 backdrop-blur-md border border-gray-300 rounded-2xl shadow-mid hover:shadow-md transition-all duration-300 p-2 ">
  <div className="flex flex-col sm:flex-row gap-6">
    
    {/* Left Actions */}
    <div className="flex sm:flex-col sm:items-center sm:space-y-5 space-x-4 sm:space-x-0 bg-gray-100 rounded-xl p-2 hover:bg-gray-200">
      <button className="group flex flex-col   items-center">
        <GoTriangleUp className="size-6 text-gray-500 group-hover:text-emerald-600 transition-colors" />
        <span className="text-sm font-semibold text-gray-700">
          {discussion.upvoteCounter}
        </span>
      </button>
      <button className="text-sm ">
        <Reply className="size-5"/><span>{discussion.replyCounter}</span>
      </button>
      <button className="p-2 rounded-full hover:bg-gray-100 transition">
        <Bookmark className="size-6 text-emerald-700" />
      </button>
    </div>

    {/* Right Content */}
    <div className="flex-1 min-w-0 ">
      
      <div className="w-full  border-b-2 pb-2">
        {/* Title */}
        <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 leading-snug">
          {discussion.title}
        </h1>
        {/* Meta Info */}
        <div className="flex flex-wrap items-center gap-1 text-xs text-muted-foreground  mb-1.5">
          <span>Asked by</span>
          <span className="font-medium text-gray-800">
            {discussion.user.name}
          </span>
          <span>•</span>
          <span>{new Date(discussion.createdAt).toLocaleString()}</span>
        </div>
        {/* Tags */}
        {discussion.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {discussion.tags.map((tag) => (
              <span
                key={tag.name}
                className="rounded-full px-2 py-.5 text-[11px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 transition"
              >
                {tag.name}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Body */}
      <div
        className="prose prose-sm sm:prose  text-gray-700 leading-relaxed mt-5 "
        dangerouslySetInnerHTML={{ __html: discussion.body }}
      ></div>

      {/* Action Buttons */}
    </div>
  </div>
</div>


      {/* Replies */}
      <div>
        <ReplyList  id={discussion._id} />
      </div>

      {/* Reply Input */}
      <div className="">
        <ReplySubmit discuss={discussion} />
      </div>
    </div>
  );
};

export default Discussions;
