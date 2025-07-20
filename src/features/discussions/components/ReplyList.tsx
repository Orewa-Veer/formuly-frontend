import { useEffect, useState } from "react";
import { GoTriangleUp } from "react-icons/go";
import { MdDelete } from "react-icons/md";
import { Reply } from "../../../types/Question";
import Service from "../../../services/genricServices";
import { useAuth } from "../../../services/useAuth";
import { useSocket } from "../../../services/useSocket";
import { useReplies } from "../hooks/useReplies";
interface Props {
  id: string;
}
const ReplyList = ({ id }: Props) => {
  const [replyList, setReplyList] = useState<Reply[] | []>([]);
  const { data, error, loading } = useReplies(id);
  const { socket, ready } = useSocket();
  const { user } = useAuth();
  useEffect(() => {
    setReplyList(data || []);
  }, [data]);
  useEffect(() => {
    if (!ready || !socket) return;
    console.log(socket);
    const handleReplyUpdated = (reply: Reply) => {
      console.log("In replies", reply);
      setReplyList((prev) => {
        const exists = prev.find((r) => r._id === reply._id);

        if (exists) {
          return prev.map((r) => (r._id === reply._id ? reply : r));
        } else {
          return [...prev, reply];
        }
      });
    };
    const handleReplyDeleted = (reply: Reply) => {
      setReplyList((prev) => prev.filter((r) => r._id !== reply._id));
    };
    console.log("Reply updated using socket");
    socket.on("reply:updated", handleReplyUpdated);
    socket.on("reply:deleted", handleReplyDeleted);

    return () => {
      socket.off("reply:updated", handleReplyUpdated);
      socket.off("reply:deleted", handleReplyDeleted);
    };
  }, [ready, socket]);
  if (loading) return <div>Loading Replies...</div>;
  if (error) return <div>{error.message}</div>;
  if (!data) return <div>No Replies Yet</div>;

  return (
    <div>
      <div className="ml-6 space-y-5 mt-6 text-gray-600 ">
        {replyList.map((rep) => (
          <div
            key={rep._id}
            className="backdrop-blur-sm shadow-sm  bg-white/20 border border-gray-300/40 px-10 p-6 mx-10 gap-5  flex flex-col rounded-md"
          >
            {/* user which replied */}
            <div className="flex items-center gap-3">
              {/* <img src={rep.user.avatar} alt="" className="size-6" /> */}
              <span>{rep.user.username}</span>
              <span className="text-sm flex gap-1 items-center">
                {rep.upvoteCounter}
                <GoTriangleUp />
              </span>
            </div>
            <p className="text-xs text-gray-1 00">
              {new Date(rep.createdAt).toLocaleString().slice(0, 9)}
            </p>
            {/* body  */}

            <div dangerouslySetInnerHTML={{ __html: rep.body }} />

            {/* footing */}
            <div className="flex gap-2 justify-end">
              <GoTriangleUp className="size-8 cursor-pointer" />

              <div
                className={`flex items-center ${
                  rep.user._id !== user._id ? "hidden" : ""
                } cursor-pointer hover:text-red-500`}
                onClick={() => {
                  const reply = new Service("/api/replies");
                  reply.delete(rep._id);
                }}
              >
                <MdDelete />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReplyList;
