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

    socket.on(`reply:updated`, handleReplyUpdated);
    socket.on(`reply:deleted`, handleReplyDeleted);

    return () => {
      socket.off(`reply:updated`, handleReplyUpdated);
      socket.off(`reply:deleted`, handleReplyDeleted);
    };
  }, [ready, socket, id]);

  if (loading) return <div>Loading Replies...</div>;
  if (error) return <div>{error.message}</div>;
  if (!replyList.length) return <div>No Replies Yet</div>;

  return (
    <div className="mt-6 ml-6 sm:ml-10 space-y-5 text-gray-600">
      {replyList.map((rep) => (
        <div
          key={rep._id}
          className="flex  rounded-xs border-l-2 backdrop-blur-lg border-gray-400 bg-gray-50 pl-4 "
        >
          {/* Upvote Section */}
          <div className="flex flex-col items-center gap-1">
            <GoTriangleUp
              className="cursor-pointer text-gray-500 hover:text-blue-500 transition"
              size={22}
            />
            {/* <span className="text-sm font-medium">{rep.upvoteCounter}</span> */}
          </div>

          {/* Reply Content */}
          <div className="flex-1">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className=" text-sm font-medium text-foreground">{rep.user.username} </span>
              <span className=" ">
                {new Date(rep.createdAt).toLocaleDateString(undefined, {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </span>
            </div>

            <div
              className="prose prose-sm max-w-none md:max-w-3xl mt-2 leading-snug whitespace-pre-line"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(rep.body),
              }}
            />

            {/* Actions */}
            <div className="mt-3 flex gap-3 justify-end">
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
