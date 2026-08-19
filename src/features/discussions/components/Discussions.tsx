import {
  Bookmark,
  MessageCircle,
  Share2,
  UserRound,
  Sparkles,
} from "lucide-react";
import { useEffect, useState } from "react";
import { GoTriangleUp } from "react-icons/go";
import { useParams } from "react-router-dom";

import { Question } from "../../../types/Question";
import { useSocket } from "../../../services/useSocket";
import { useADiscuss } from "../hooks/useDiscussion";
import ReplyList from "./ReplyList";
import ReplySubmit from "./ReplySubmit";

import { Spinner } from "@/components/ui/spinner";
import Service from "@/services/genricServices";
import timeAgo from "@/services/timeAgo";

const tagStyles = [
  "bg-orange-100/80 text-orange-700 border-orange-200",
  "bg-blue-100/80 text-blue-700 border-blue-200",
  "bg-violet-100/80 text-violet-700 border-violet-200",
  "bg-emerald-100/80 text-emerald-700 border-emerald-200",
  "bg-indigo-100/80 text-indigo-700 border-indigo-200",
];

const Discussions = () => {
  const { id } = useParams<{ id: string }>();

  const { data, loading, error } = useADiscuss<Question>(id);
  const { socket, ready } = useSocket();

  const [discussion, setDiscussion] = useState<Question>();
  const [bookmarked, setBookmarked] = useState(false);

  /*
   * Join discussion room
   */
  useEffect(() => {
    if (!ready || !socket || !id) return;

    socket.emit("discussion:join", id);

    return () => {
      socket.emit("discussion:leave", id);
    };
  }, [id, ready, socket]);

  /*
   * Initial discussion
   */
  useEffect(() => {
    if (data) {
      setDiscussion(data);
    }
  }, [data]);

  /*
   * Socket updates
   */
  useEffect(() => {
    if (!ready || !socket || !id) return;

    const handleDiscussionUpdate = (updated: Question) => {
      if (updated._id === id) {
        setDiscussion(updated);
      }
    };

    socket.on("discussions:updated", handleDiscussionUpdate);

    return () => {
      socket.off("discussions:updated", handleDiscussionUpdate);
    };
  }, [ready, socket, id]);

  /*
   * Upvote
   */
  const handleUpvote = async () => {
    if (!discussion) return;

    try {
      const upvote = new Service(`/api/upvote/${discussion._id}`);
      await upvote.post();
    } catch (err) {
      console.error("Failed to upvote discussion", err);
    }
  };

  /*
   * Bookmark
   */
  const handleBookmark = async () => {
    if (!discussion) return;

    try {
      const bookmark = new Service(`/api/bookmark/${discussion._id}`);

      const response = await bookmark.post();

      setBookmarked(response.data.status === "added");
    } catch (err) {
      console.error("Failed to update bookmark", err);
    }
  };

  /*
   * Loading
   */
  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-100 to-violet-100">
            <Spinner />
          </div>

          <p className="text-sm font-medium text-gray-500">
            Loading discussion...
          </p>
        </div>
      </div>
    );
  }

  /*
   * Error
   */
  if (error) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-12">
        <div className="rounded-3xl border border-red-100 bg-red-50/80 p-10 text-center">
          <h2 className="font-bold text-gray-900">
            Couldn't load this discussion
          </h2>

          <p className="mt-2 text-sm text-red-500">{error.message}</p>
        </div>
      </div>
    );
  }

  if (!discussion) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-sm text-gray-500">Discussion not found.</p>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* =====================================================
          BACKGROUND
      ====================================================== */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="
            absolute
            -left-40
            top-10
            h-[420px]
            w-[420px]
            rounded-full
            bg-emerald-200/30
            blur-3xl
          "
        />

        <div
          className="
            absolute
            -right-40
            top-[25%]
            h-[500px]
            w-[500px]
            rounded-full
            bg-violet-200/25
            blur-3xl
          "
        />

        <div
          className="
            absolute
            bottom-0
            left-[35%]
            h-[350px]
            w-[350px]
            rounded-full
            bg-blue-200/20
            blur-3xl
          "
        />
      </div>

      {/* =====================================================
          CONTENT
      ====================================================== */}

      <div className="relative mx-auto w-full max-w-6xl px-3 py-6 sm:px-6 sm:py-10 lg:px-8">
        {/* =================================================
            QUESTION HERO
        ================================================== */}

        <article
          className="
            relative
            overflow-hidden
            rounded-[2rem]
            border
            border-white/80
            bg-white/75
            shadow-2xl
            shadow-gray-300/20
            backdrop-blur-xl
          "
        >
          {/* Hero background */}

          <div
            className="
              absolute
              inset-x-0
              top-0
              h-52
              bg-gradient-to-br
              from-emerald-100/90
              via-teal-50/60
              to-violet-100/80
            "
          />

          {/* Decorative circles */}

          <div
            className="
              absolute
              -right-20
              -top-24
              h-64
              w-64
              rounded-full
              border-[35px]
              border-white/30
            "
          />

          <div
            className="
              absolute
              right-24
              top-16
              h-5
              w-5
              rounded-full
              bg-violet-300/60
            "
          />

          <div
            className="
              absolute
              right-40
              top-28
              h-3
              w-3
              rounded-full
              bg-emerald-400/70
            "
          />

          <div className="relative p-6 sm:p-9 lg:p-11">
            {/* Question badge */}

            <div className="mb-7 flex items-center justify-between">
              <div
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  border
                  border-white/80
                  bg-white/70
                  px-4
                  py-2
                  text-xs
                  font-bold
                  text-emerald-700
                  shadow-sm
                  backdrop-blur-md
                "
              >
                <Sparkles className="h-3.5 w-3.5" />
                Developer Question
              </div>

              <span className="hidden text-xs font-medium text-gray-500 sm:block">
                Asked {timeAgo(`${discussion.createdAt}`)}
              </span>
            </div>

            {/* Title */}

            <h1
              className="
                max-w-4xl
                text-3xl
                font-black
                leading-[1.15]
                tracking-tight
                text-gray-900
                sm:text-4xl
                lg:text-5xl
              "
            >
              {discussion.title}
            </h1>

            {/* Author */}

            <div className="mt-7 flex items-center gap-3">
              <div
                className="
                  flex
                  h-11
                  w-11
                  shrink-0
                  items-center
                  justify-center
                  rounded-2xl
                  bg-gradient-to-br
                  from-emerald-500
                  to-teal-500
                  text-sm
                  font-bold
                  text-white
                  shadow-lg
                  shadow-emerald-200
                "
              >
                {(discussion.user.name || discussion.user.username || "U")
                  .slice(0, 2)
                  .toUpperCase()}
              </div>

              <div>
                <div className="flex items-center gap-1.5">
                  <UserRound className="h-3.5 w-3.5 text-emerald-600" />

                  <span className="text-sm font-bold text-gray-800">
                    {discussion.user.name || discussion.user.username}
                  </span>
                </div>

                <span className="text-xs text-gray-500">
                  Asked {timeAgo(`${discussion.createdAt}`)}
                </span>
              </div>
            </div>

            {/* Tags */}

            {discussion.tags?.length > 0 && (
              <div className="mt-7 flex flex-wrap gap-2">
                {discussion.tags.map((tag, index) => (
                  <span
                    key={tag.name}
                    className={`
                      rounded-xl
                      border
                      px-3
                      py-1.5
                      text-xs
                      font-bold
                      shadow-sm
                      transition-all
                      hover:-translate-y-0.5
                      hover:shadow-md
                      ${tagStyles[index % tagStyles.length]}
                    `}
                  >
                    {tag.name}
                  </span>
                ))}
              </div>
            )}

            {/* Divider */}

            <div className="my-9 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

            {/* Body */}

            <div
              className="
                prose
                prose-base
                max-w-none
                text-gray-700
                prose-headings:font-bold
                prose-headings:text-gray-900
                prose-p:leading-8
                prose-a:font-semibold
                prose-a:text-emerald-600
                prose-a:no-underline
                hover:prose-a:underline
                prose-strong:text-gray-900
              "
              dangerouslySetInnerHTML={{
                __html: discussion.body,
              }}
            />

            {/* =================================================
                ACTION BAR
            ================================================== */}

            <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
              {/* Left */}

              <div className="flex items-center gap-2">
                {/* Upvote */}

                <button
                  type="button"
                  onClick={handleUpvote}
                  className="
                    group
                    flex
                    items-center
                    gap-2
                    rounded-2xl
                    border
                    border-emerald-100
                    bg-emerald-50
                    px-4
                    py-2.5
                    text-sm
                    font-bold
                    text-emerald-700
                    transition-all
                    hover:-translate-y-0.5
                    hover:bg-emerald-100
                    hover:shadow-md
                  "
                >
                  <GoTriangleUp
                    className="
                      h-5
                      w-5
                      transition-transform
                      group-hover:-translate-y-0.5
                    "
                  />

                  <span>{discussion.upvoteCounter}</span>

                  <span className="hidden sm:inline">Upvotes</span>
                </button>

                {/* Replies */}

                <div
                  className="
                    flex
                    items-center
                    gap-2
                    rounded-2xl
                    border
                    border-violet-100
                    bg-violet-50
                    px-4
                    py-2.5
                    text-sm
                    font-bold
                    text-violet-700
                  "
                >
                  <MessageCircle className="h-4 w-4" />

                  <span>{discussion.replyCounter}</span>

                  <span className="hidden sm:inline">Replies</span>
                </div>
              </div>

              {/* Right */}

              <div className="flex items-center gap-2">
                {/* Bookmark */}

                <button
                  type="button"
                  onClick={handleBookmark}
                  aria-label={
                    bookmarked ? "Remove bookmark" : "Bookmark question"
                  }
                  className={`
                    flex
                    h-11
                    w-11
                    items-center
                    justify-center
                    rounded-2xl
                    border
                    transition-all
                    hover:-translate-y-0.5
                    hover:shadow-md
                    ${
                      bookmarked
                        ? "border-emerald-200 bg-emerald-100 text-emerald-600"
                        : "border-gray-200 bg-white text-gray-400 hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-600"
                    }
                  `}
                >
                  <Bookmark
                    className="h-4.5 w-4.5"
                    fill={bookmarked ? "currentColor" : "none"}
                  />
                </button>

                {/* Share */}

                <button
                  type="button"
                  className="
                    flex
                    h-11
                    w-11
                    items-center
                    justify-center
                    rounded-2xl
                    border
                    border-gray-200
                    bg-white
                    text-gray-400
                    transition-all
                    hover:-translate-y-0.5
                    hover:border-violet-200
                    hover:bg-violet-50
                    hover:text-violet-600
                    hover:shadow-md
                  "
                >
                  <Share2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </article>

        {/* =====================================================
            REPLIES
        ====================================================== */}

        <section className="mt-10">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <div
                  className="
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    rounded-xl
                    bg-violet-100
                  "
                >
                  <MessageCircle className="h-4 w-4 text-violet-600" />
                </div>

                <h2 className="text-xl font-extrabold text-gray-900">
                  {discussion.replyCounter}{" "}
                  {discussion.replyCounter === 1 ? "Reply" : "Replies"}
                </h2>
              </div>

              <p className="mt-2 text-sm text-gray-500">
                Join the conversation and share your knowledge.
              </p>
            </div>
          </div>

          <div
            className="
              rounded-[1.75rem]
              border
              border-white/80
              bg-white/65
              p-4
              shadow-xl
              shadow-gray-200/20
              backdrop-blur-xl
              sm:p-6
            "
          >
            <ReplyList id={discussion._id} />
          </div>
        </section>

        {/* =====================================================
            REPLY COMPOSER
        ====================================================== */}

        <section className="mt-8 pb-12">
          <div
            className="
              relative
              overflow-hidden
              rounded-[2rem]
              border
              border-emerald-100
              bg-gradient-to-br
              from-emerald-100/80
              via-white/70
              to-violet-100/60
              p-5
              shadow-xl
              shadow-emerald-100/20
              backdrop-blur-xl
              sm:p-8
            "
          >
            {/* Decorative background */}

            <div
              className="
                pointer-events-none
                absolute
                -right-20
                -top-20
                h-52
                w-52
                rounded-full
                bg-violet-200/30
                blur-3xl
              "
            />

            <div className="relative mb-6">
              <div className="flex items-center gap-3">
                <div
                  className="
                    flex
                    h-11
                    w-11
                    items-center
                    justify-center
                    rounded-2xl
                    bg-gradient-to-br
                    from-emerald-500
                    to-teal-500
                    text-white
                    shadow-lg
                    shadow-emerald-200
                  "
                >
                  <MessageCircle className="h-5 w-5" />
                </div>

                <div>
                  <h3 className="font-extrabold text-gray-900">
                    Share your answer
                  </h3>

                  <p className="mt-0.5 text-xs text-gray-500">
                    Help another developer move forward.
                  </p>
                </div>
              </div>
            </div>

            <div className="relative">
              <ReplySubmit discuss={discussion} />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Discussions;
