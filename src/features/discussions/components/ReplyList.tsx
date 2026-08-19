import { MessageCircle, Trash2, UserRound } from "lucide-react";
import { useEffect, useState } from "react";
import DOMPurify from "dompurify";

import { Reply } from "../../../types/Question";
import Service from "../../../services/genricServices";
import { useAuth } from "../../../services/useAuth";
import { useSocket } from "../../../services/useSocket";
import { useReplies } from "../hooks/useReplies";

interface Props {
  id: string;
}

const avatarGradients = [
  "from-emerald-400 to-teal-500",
  "from-indigo-400 to-violet-500",
  "from-orange-400 to-amber-500",
  "from-blue-400 to-cyan-500",
  "from-violet-400 to-fuchsia-500",
];

const ReplyList = ({ id }: Props) => {
  const [replyList, setReplyList] = useState<Reply[]>([]);

  const { data, error, loading } = useReplies(id);
  const { socket, ready } = useSocket();
  const { user } = useAuth();

  useEffect(() => {
    if (data?.data) {
      setReplyList(data.data);
    }
  }, [data]);

  /*
   * ----------------------------------------------------------
   * Socket updates
   * ----------------------------------------------------------
   */

  useEffect(() => {
    if (!ready || !socket) return;

    const handleReplyUpdated = (reply: Reply) => {
      setReplyList((prev) => {
        const exists = prev.some((r) => r._id === reply._id);

        if (exists) {
          return prev.map((r) => (r._id === reply._id ? reply : r));
        }

        return [...prev, reply];
      });
    };

    const handleReplyDeleted = (reply: Reply) => {
      setReplyList((prev) => prev.filter((r) => r._id !== reply._id));
    };

    socket.on("reply:updated", handleReplyUpdated);
    socket.on("reply:deleted", handleReplyDeleted);

    return () => {
      socket.off("reply:updated", handleReplyUpdated);
      socket.off("reply:deleted", handleReplyDeleted);
    };
  }, [ready, socket]);

  /*
   * ----------------------------------------------------------
   * Loading
   * ----------------------------------------------------------
   */

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2].map((item) => (
          <div
            key={item}
            className="
              animate-pulse
              rounded-2xl
              border
              border-gray-100
              bg-white/60
              p-5
            "
          >
            <div className="flex gap-4">
              <div className="h-10 w-10 rounded-full bg-gray-200" />

              <div className="flex-1 space-y-3">
                <div className="h-3 w-32 rounded bg-gray-200" />
                <div className="h-3 w-4/5 rounded bg-gray-200" />
                <div className="h-3 w-2/3 rounded bg-gray-200" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="
          rounded-2xl
          border
          border-red-100
          bg-red-50/60
          px-5
          py-4
          text-sm
          text-red-500
        "
      >
        {error.message}
      </div>
    );
  }

  if (!replyList.length) {
    return (
      <div
        className="
          flex
          flex-col
          items-center
          justify-center
          rounded-2xl
          border
          border-dashed
          border-gray-200
          bg-white/40
          px-6
          py-12
          text-center
        "
      >
        <div
          className="
            mb-4
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-2xl
            bg-emerald-50
            text-emerald-500
          "
        >
          <MessageCircle className="h-6 w-6" />
        </div>

        <h3 className="font-semibold text-gray-800">No replies yet</h3>

        <p className="mt-1 max-w-sm text-sm text-gray-500">
          Be the first developer to share an answer or help solve this question.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {replyList.map((rep, index) => {
        const username = rep.user?.username || "User";

        const initials = username.trim().slice(0, 2).toUpperCase();

        const gradient = avatarGradients[index % avatarGradients.length];

        const isOwner = rep.user?._id === user?._id;

        return (
          <article
            key={rep._id}
            className="
              group
              relative
              overflow-hidden
              rounded-2xl
              border
              border-gray-100
              bg-white/70
              p-5
              shadow-sm
              shadow-gray-200/30
              backdrop-blur-xl
              transition-all
              duration-200
              hover:-translate-y-[1px]
              hover:border-emerald-100
              hover:shadow-md
            "
          >
            {/* subtle colored accent */}

            <div
              className="
                absolute
                left-0
                top-5
                h-10
                w-1
                rounded-r-full
                bg-gradient-to-b
                from-emerald-400
                to-teal-500
                opacity-60
              "
            />

            <div className="flex gap-4">
              {/* ------------------------------------------------
                  Avatar
              ------------------------------------------------ */}

              <div
                className={`
                  flex
                  h-10
                  w-10
                  shrink-0
                  items-center
                  justify-center
                  rounded-xl
                  bg-gradient-to-br
                  ${gradient}
                  text-xs
                  font-bold
                  text-white
                  shadow-sm
                `}
              >
                {initials}
              </div>

              {/* ------------------------------------------------
                  Content
              ------------------------------------------------ */}

              <div className="min-w-0 flex-1">
                {/* Header */}

                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                      <span className="text-sm font-bold text-gray-800">
                        {username}
                      </span>

                      {isOwner && (
                        <span
                          className="
                            rounded-full
                            bg-emerald-50
                            px-2
                            py-0.5
                            text-[10px]
                            font-semibold
                            text-emerald-600
                          "
                        >
                          You
                        </span>
                      )}
                    </div>

                    <div className="mt-0.5 flex items-center gap-1.5 text-[11px] text-gray-400">
                      <UserRound className="h-3 w-3" />

                      <span>
                        {new Date(rep.createdAt).toLocaleDateString(undefined, {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                  </div>

                  {/* Delete */}

                  {isOwner && (
                    <button
                      type="button"
                      aria-label="Delete reply"
                      onClick={() => {
                        const reply = new Service("/api/replies");

                        reply.delete(rep._id);
                      }}
                      className="
                        flex
                        h-8
                        w-8
                        shrink-0
                        items-center
                        justify-center
                        rounded-lg
                        text-gray-300
                        opacity-0
                        transition-all
                        hover:bg-red-50
                        hover:text-red-500
                        group-hover:opacity-100
                      "
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>

                {/* ------------------------------------------------
                    Reply body
                ------------------------------------------------ */}

                <div
                  className="
                    prose
                    prose-sm
                    mt-4
                    max-w-none
                    text-gray-600
                    prose-headings:text-gray-900
                    prose-p:leading-7
                    prose-a:text-emerald-600
                    prose-a:no-underline
                    hover:prose-a:underline
                    prose-strong:text-gray-800
                  "
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(rep.body),
                  }}
                />

                {/* ------------------------------------------------
                    Footer
                ------------------------------------------------ */}

                <div
                  className="
                    mt-4
                    flex
                    items-center
                    justify-between
                    border-t
                    border-gray-100
                    pt-3
                  "
                >
                  <span
                    className="
                      text-[11px]
                      font-medium
                      text-gray-400
                    "
                  >
                    Reply #{index + 1}
                  </span>

                  {isOwner && (
                    <button
                      type="button"
                      onClick={() => {
                        const reply = new Service("/api/replies");

                        reply.delete(rep._id);
                      }}
                      className="
                        flex
                        items-center
                        gap-1.5
                        rounded-lg
                        px-2
                        py-1
                        text-[11px]
                        font-medium
                        text-gray-400
                        transition
                        hover:bg-red-50
                        hover:text-red-500
                        sm:opacity-0
                        sm:group-hover:opacity-100
                      "
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      Delete
                    </button>
                  )}
                </div>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default ReplyList;
