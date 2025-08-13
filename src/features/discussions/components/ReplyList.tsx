import { useEffect, useState } from "react";
import { GoTriangleUp } from "react-icons/go";
import { MdDelete } from "react-icons/md";
import DOMPurify from "dompurify";
import { Reply } from "../../../types/Question";
import Service from "../../../services/genricServices";
import { useAuth } from "../../../services/useAuth";
import { useSocket } from "../../../services/useSocket";
import { useReplies } from "../hooks/useReplies";

interface Props {
  id: string;
}

const ReplyList = ({ id }: Props) => {
  const [replyList, setReplyList] = useState<Reply[]>([]);
  const { data, error, loading } = useReplies(id);
  const { socket, ready } = useSocket();
  const { user } = useAuth();

  useEffect(() => {
    if (data?.data) setReplyList(data.data);
  }, [data]);

  useEffect(() => {
    if (!ready || !socket) return;

    const handleReplyUpdated = (reply: Reply) => {
      setReplyList((prev) => {
        const exists = prev.find((r) => r._id === reply._id);
        return exists
          ? prev.map((r) => (r._id === reply._id ? reply : r))
          : [...prev, reply];
      });
    };

    const handleReplyDeleted = (reply: Reply) => {
      setReplyList((prev) => prev.filter((r) => r._id !== reply._id));
    };

    socket.on(`reply:updated:${id}`, handleReplyUpdated);
    socket.on(`reply:deleted:${id}`, handleReplyDeleted);

    return () => {
      socket.off(`reply:updated:${id}`, handleReplyUpdated);
      socket.off(`reply:deleted:${id}`, handleReplyDeleted);
    };
  }, [ready, socket, id]);

  if (loading) return <div>Loading Replies...</div>;
  if (error) return <div>{error.message}</div>;
  if (!replyList.length) return <div>No Replies Yet</div>;

  return (
    <div className="mt-6 w-full space-y-5 text-gray-600">
      {replyList.map((rep) => (
        <div
          key={rep._id}
          className="flex gap-4 rounded-xl border border-white/20 bg-white/10 backdrop-blur-md shadow-md hover:shadow-lg transition-all p-4 sm:p-6"
        >
          {/* Upvote Section */}
          <div className="flex flex-col items-center gap-1">
            <GoTriangleUp
              className="cursor-pointer text-gray-500 hover:text-blue-500 transition"
              size={22}
            />
            <span className="text-sm font-medium">{rep.upvoteCounter}</span>
          </div>

          {/* Reply Content */}
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <span className="font-medium">{rep.user.username}</span>
              <span className="text-xs text-gray-400">
                {new Date(rep.createdAt).toLocaleDateString(undefined, {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </span>
            </div>

            <div
              className="prose prose-sm max-w-none mt-2"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(rep.body),
              }}
            />

            {/* Actions */}
            <div className="mt-3 flex gap-3">
              {rep.user?._id === user?._id && (
                <button
                  onClick={() => {
                    const reply = new Service("/api/replies");
                    reply.delete(rep._id);
                  }}
                  className="text-red-500 hover:text-red-600 transition"
                >
                  <MdDelete size={18} />
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReplyList;
