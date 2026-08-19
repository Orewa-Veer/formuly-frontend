import { MessageSquare, Share2 } from "lucide-react";
import { FaRegBookmark, FaBookmark } from "react-icons/fa";
import { GoTriangleUp } from "react-icons/go";
import { Link } from "react-router-dom";
import { Question } from "../../../types/Question";
import { Button } from "../../../components/ui/button";
import timeAgo from "@/services/timeAgo";

interface Props {
  discussions: Question[];
  bookmarks?: Set<string>;
  handleUpvotes: (discuss_id: string) => void;
  handleBookmark: (discuss_id: string) => void;
}

const tagStyles = [
  "bg-orange-50 text-orange-700 border-orange-100",
  "bg-blue-50 text-blue-700 border-blue-100",
  "bg-violet-50 text-violet-700 border-violet-100",
  "bg-emerald-50 text-emerald-700 border-emerald-100",
  "bg-indigo-50 text-indigo-700 border-indigo-100",
];

const QuestionCard = ({
  discussions,
  bookmarks,
  handleUpvotes,
  handleBookmark,
}: Props) => {
  if (!discussions.length) {
    return null;
  }

  return (
    <div className="flex flex-col gap-4">
      {discussions.map((discuss) => {
        const isBookmarked = bookmarks?.has(discuss._id);

        return (
          <article
            key={discuss._id}
            className="
              group
              relative
              overflow-hidden
              rounded-[1.5rem]
              border
              border-white/80
              bg-white/65
              shadow-lg
              shadow-gray-200/25
              backdrop-blur-xl
              transition-all
              duration-300
              hover:-translate-y-0.5
              hover:border-emerald-200
              hover:shadow-xl
              hover:shadow-emerald-100/30
            "
          >
            {/* -------------------------------------------------
                TOP ACCENT
            -------------------------------------------------- */}

            <div
              className="
                absolute
                left-0
                top-0
                h-1
                w-0
                bg-gradient-to-r
                from-emerald-500
                via-teal-500
                to-indigo-500
                transition-all
                duration-300
                group-hover:w-full
              "
            />

            <div className="flex min-w-0">
              {/* -------------------------------------------------
                  VOTE COLUMN
              -------------------------------------------------- */}

              <div
                className="
                  hidden
                  w-[88px]
                  shrink-0
                  flex-col
                  items-center
                  border-r
                  border-gray-100
                  bg-gray-50/30
                  px-3
                  py-6
                  sm:flex
                "
              >
                <button
                  type="button"
                  onClick={() => handleUpvotes(discuss._id)}
                  aria-label="Upvote question"
                  className="
                    flex
                    flex-col
                    items-center
                    justify-center
                    rounded-xl
                    border
                    border-gray-200
                    bg-white/80
                    px-3
                    py-2
                    shadow-sm
                    transition-all
                    hover:-translate-y-0.5
                    hover:border-emerald-300
                    hover:bg-emerald-50
                    hover:shadow-md
                  "
                >
                  <GoTriangleUp
                    className="
                      h-6
                      w-6
                      text-gray-400
                      transition-colors
                      group-hover:text-emerald-500
                    "
                  />

                  <span className="mt-0.5 text-sm font-bold text-gray-800">
                    {discuss.upvoteCounter}
                  </span>
                </button>

                <div
                  className="
                    mt-5
                    flex
                    flex-col
                    items-center
                    gap-1
                    text-gray-500
                  "
                >
                  <MessageSquare className="h-4 w-4" />

                  <span className="text-xs font-semibold">
                    {discuss.replyCounter}
                  </span>

                  <span className="text-[10px] text-gray-400">replies</span>
                </div>
              </div>

              {/* -------------------------------------------------
                  MAIN CONTENT
              -------------------------------------------------- */}

              <div className="min-w-0 flex-1 p-5 sm:p-6">
                {/* Header */}

                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    {/* Question label */}

                    <div className="mb-2 flex items-center gap-2">
                      <span
                        className="
                          h-2
                          w-2
                          rounded-full
                          bg-emerald-500
                          shadow-sm
                          shadow-emerald-300
                        "
                      />

                      <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600">
                        Question
                      </span>

                      <span className="text-gray-300">•</span>

                      <span className="text-[11px] text-gray-400">
                        {timeAgo(`${discuss.createdAt}`)}
                      </span>
                    </div>

                    {/* Title */}

                    <h3
                      className="
                        text-lg
                        font-bold
                        leading-snug
                        text-gray-900
                        transition-colors
                        sm:text-xl
                      "
                    >
                      <Link
                        to={`/app/questions/${discuss._id}`}
                        className="
                          hover:text-emerald-600
                          focus:outline-none
                          focus-visible:rounded
                          focus-visible:ring-2
                          focus-visible:ring-emerald-400
                        "
                      >
                        {discuss.title}
                      </Link>
                    </h3>
                  </div>

                  {/* Desktop actions */}

                  <div className="hidden shrink-0 items-center gap-2 sm:flex">
                    <Button
                      type="button"
                      size="icon"
                      variant="ghost"
                      aria-label={
                        isBookmarked ? "Remove bookmark" : "Bookmark question"
                      }
                      onClick={() => handleBookmark(discuss._id)}
                      className={`
                        h-9
                        w-9
                        rounded-xl
                        transition-all
                        ${
                          isBookmarked
                            ? "bg-emerald-100 text-emerald-600 hover:bg-emerald-200"
                            : "text-gray-400 hover:bg-emerald-50 hover:text-emerald-600"
                        }
                      `}
                    >
                      {isBookmarked ? (
                        <FaBookmark className="h-3.5 w-3.5" />
                      ) : (
                        <FaRegBookmark className="h-3.5 w-3.5" />
                      )}
                    </Button>

                    <Button
                      type="button"
                      size="icon"
                      variant="ghost"
                      aria-label="Share question"
                      className="
                        h-9
                        w-9
                        rounded-xl
                        text-gray-400
                        transition-all
                        hover:bg-indigo-50
                        hover:text-indigo-600
                      "
                    >
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Body */}

                <div
                  className="
                    mt-3
                    line-clamp-3
                    max-w-4xl
                    text-sm
                    leading-relaxed
                    text-gray-600
                    [&_*]:whitespace-normal
                  "
                  dangerouslySetInnerHTML={{
                    __html: discuss.body,
                  }}
                />

                {/* Tags */}

                {discuss.tags?.length > 0 && (
                  <div className="mt-5 flex flex-wrap gap-2">
                    {discuss.tags.map((cat, index) => (
                      <span
                        key={cat.name}
                        className={`
                          rounded-full
                          border
                          px-3
                          py-1
                          text-[11px]
                          font-semibold
                          transition-all
                          hover:-translate-y-0.5
                          ${tagStyles[index % tagStyles.length]}
                        `}
                      >
                        {cat.name}
                      </span>
                    ))}
                  </div>
                )}

                {/* -------------------------------------------------
                    MOBILE ACTIONS
                -------------------------------------------------- */}

                <div
                  className="
                    mt-5
                    flex
                    items-center
                    justify-between
                    border-t
                    border-gray-100
                    pt-4
                    sm:hidden
                  "
                >
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => handleUpvotes(discuss._id)}
                      className="
                        flex
                        items-center
                        gap-1.5
                        rounded-lg
                        border
                        border-gray-200
                        bg-white
                        px-3
                        py-1.5
                        text-xs
                        font-bold
                        text-gray-700
                        transition-all
                        hover:border-emerald-300
                        hover:bg-emerald-50
                        hover:text-emerald-600
                      "
                    >
                      <GoTriangleUp className="h-4 w-4" />
                      {discuss.upvoteCounter}
                    </button>

                    <div className="flex items-center gap-1.5 text-xs font-medium text-gray-500">
                      <MessageSquare className="h-4 w-4" />
                      {discuss.replyCounter}
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    <Button
                      type="button"
                      size="icon"
                      variant="ghost"
                      onClick={() => handleBookmark(discuss._id)}
                      className={`
                        h-8
                        w-8
                        rounded-lg
                        ${isBookmarked ? "text-emerald-600" : "text-gray-400"}
                      `}
                    >
                      {isBookmarked ? (
                        <FaBookmark className="h-3.5 w-3.5" />
                      ) : (
                        <FaRegBookmark className="h-3.5 w-3.5" />
                      )}
                    </Button>

                    <Button
                      type="button"
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8 rounded-lg text-gray-400"
                    >
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* -------------------------------------------------
                    FOOTER
                -------------------------------------------------- */}

                <div className="mt-5 flex items-center justify-between">
                  {/* User */}

                  <div className="flex min-w-0 items-center gap-2.5">
                    <div
                      className="
                        flex
                        h-8
                        w-8
                        shrink-0
                        items-center
                        justify-center
                        rounded-full
                        bg-gradient-to-br
                        from-emerald-400
                        to-teal-500
                        text-[10px]
                        font-bold
                        text-white
                        shadow-sm
                      "
                    >
                      {discuss.user.username?.slice(0, 2).toUpperCase()}
                    </div>

                    <div className="flex min-w-0 items-center gap-2">
                      <span className="max-w-[140px] truncate text-xs font-bold text-gray-700">
                        {discuss.user.username}
                      </span>

                      <span className="hidden text-gray-300 sm:inline">•</span>

                      <span className="hidden text-[11px] text-gray-400 sm:inline">
                        asked {timeAgo(`${discuss.createdAt}`)}
                      </span>
                    </div>
                  </div>

                  {/* Desktop stats */}

                  <div className="hidden items-center gap-4 text-[11px] font-medium text-gray-400 sm:flex">
                    <span className="flex items-center gap-1.5">
                      <MessageSquare className="h-3.5 w-3.5" />
                      {discuss.replyCounter} replies
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default QuestionCard;
