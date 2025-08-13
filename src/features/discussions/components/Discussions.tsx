import { Bookmark } from "lucide-react";
import { useEffect, useState } from "react";
import { GoTriangleUp } from "react-icons/go";
import { useParams } from "react-router-dom";
import { Question } from "../../../types/Question";
import { useSocket } from "../../../services/useSocket";
import { useADiscuss } from "../hooks/useDiscussion";
import ReplyList from "./ReplyList";
import ReplySubmit from "./ReplySubmit";

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

  if (loading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-red-500">{error.message}</div>;
  if (!discussion) return <div className="p-4">Fetching...</div>;

  return (
    <div className="pt-2 sm:pt-6 lg:pt-16 p-2 sm:p-4 space-y-8 max-w-6xl mx-auto">
      {/* Question Card */}
      <div className="bg-white/60 backdrop-blur-md border border-gray-200 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 p-5 sm:p-8">
        <div className="flex flex-col sm:flex-row gap-6">
          {/* Left Actions */}
          <div className="flex sm:flex-col sm:items-center sm:space-y-6 space-x-4 sm:space-x-0">
            <button className="group flex flex-col items-center">
              <GoTriangleUp className="size-8 text-gray-400 group-hover:text-emerald-600 transition-colors" />
              <span className="text-lg font-bold text-gray-700">
                {discussion.upvoteCounter}
              </span>
            </button>
            <button>
              <Bookmark className="text-emerald-700 hover:scale-110 transition-transform" />
            </button>
          </div>

          {/* Right Content */}
          <div className="flex-1 space-y-5">
            {/* Title */}
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
              {discussion.title}
            </h1>

            {/* Meta Info */}
            <div className="text-sm text-gray-500 flex flex-wrap gap-2 items-center">
              <span>Asked by</span>
              <span className="font-semibold text-gray-800">
                {discussion.user.username}
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
                    className="rounded-full px-3 py-1 text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 transition"
                  >
                    {tag.name}
                  </span>
                ))}
              </div>
            )}

            {/* Body */}
            <div
              className="prose max-w-none text-gray-700 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: discussion.body }}
            ></div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 text-sm text-gray-500 border-t border-gray-200 pt-4">
              <button className="hover:text-emerald-600 transition flex items-center gap-1">
                <GoTriangleUp className="size-5" />
                {discussion.upvoteCounter}
              </button>
              <button className="hover:text-blue-500 transition flex items-center gap-1">
                💬 {discussion.replyCounter} Replies
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Replies */}
      <div>
        <ReplyList id={discussion._id} />
      </div>

      {/* Reply Input */}
      <div className="px-2 sm:px-0">
        <ReplySubmit discuss={discussion} />
      </div>
    </div>
  );
};

export default Discussions;
