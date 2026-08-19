import DOMPurify from "dompurify";
import {
  ArrowUp,
  CalendarDays,
  CheckCircle2,
  MessageSquare,
  Share2,
  Sparkles,
  UserRound,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { GoTriangleUp } from "react-icons/go";
import { Link } from "react-router-dom";

import { Button } from "../../../components/ui/button";
import Service from "../../../services/genricServices";
import { useAuth } from "../../../services/useAuth";
import { Question } from "../../../types/Question";
import { useDiscussion } from "../../discussions/hooks/useDiscussion";
import { useUpvotes } from "../hooks/useUpvotes";

type TabType = "discussion" | "reply" | "upvote";

const tagStyles = [
  "bg-orange-50 text-orange-700 border-orange-100",
  "bg-blue-50 text-blue-700 border-blue-100",
  "bg-violet-50 text-violet-700 border-violet-100",
  "bg-emerald-50 text-emerald-700 border-emerald-100",
  "bg-indigo-50 text-indigo-700 border-indigo-100",
];

const UserProfile = () => {
  const { user } = useAuth();

  const { data, loading, error } = useDiscussion({
    user: user?._id,
  });

  const { data: upvotes } = useUpvotes();

  const [feed, setFeed] = useState<Question[]>([]);
  const [active, setActive] = useState<TabType>("discussion");

  /*
   * ----------------------------------------------------------
   * Initial discussion data
   * ----------------------------------------------------------
   */

  useEffect(() => {
    if (data?.data) {
      setFeed(data.data);
    }
  }, [data]);

  /*
   * ----------------------------------------------------------
   * Data
   * ----------------------------------------------------------
   */

  const discussions = data?.data ?? [];
  const upvotedQuestions = upvotes?.data ?? [];

  /*
   * ----------------------------------------------------------
   * Stats
   * ----------------------------------------------------------
   */

  const totalUpvotes = useMemo(
    () =>
      discussions.reduce(
        (total, discussion) => total + (discussion.upvoteCounter || 0),
        0,
      ),
    [discussions],
  );

  const totalReplies = useMemo(
    () =>
      discussions.reduce(
        (total, discussion) => total + (discussion.replyCounter || 0),
        0,
      ),
    [discussions],
  );

  /*
   * ----------------------------------------------------------
   * Tab handlers
   * ----------------------------------------------------------
   */

  const showDiscussions = () => {
    setFeed(discussions);
    setActive("discussion");
  };

  const showUpvotes = () => {
    setFeed(upvotedQuestions);
    setActive("upvote");
  };

  const showReplies = () => {
    /*
     * You don't currently have a reply hook/data source here.
     * Keeping the tab functional without pretending we have data.
     */
    setFeed([]);
    setActive("reply");
  };

  /*
   * ----------------------------------------------------------
   * Upvote
   * ----------------------------------------------------------
   */

  const handleUpvote = async (id: string) => {
    try {
      await new Service(`/api/upvote/${id}`).post();
    } catch (error) {
      console.error("Failed to upvote discussion:", error);
    }
  };

  /*
   * ----------------------------------------------------------
   * Share
   * ----------------------------------------------------------
   */

  const handleShare = async (discussion: Question) => {
    const url = `${window.location.origin}/app/questions/${discussion._id}`;

    try {
      if (navigator.share) {
        await navigator.share({
          title: discussion.title,
          url,
        });

        return;
      }

      await navigator.clipboard.writeText(url);
    } catch (error) {
      /*
       * User cancelling native share is not really an error.
       */
      console.log("Share cancelled");
    }
  };

  /*
   * ----------------------------------------------------------
   * Loading
   * ----------------------------------------------------------
   */

  if (loading) {
    return (
      <div className="min-h-full bg-gradient-to-br from-emerald-50/60 via-white to-indigo-50/40">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="animate-pulse space-y-6">
            <div className="h-52 rounded-[2rem] bg-white/70" />

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="h-28 rounded-2xl bg-white/70" />
              <div className="h-28 rounded-2xl bg-white/70" />
              <div className="h-28 rounded-2xl bg-white/70" />
            </div>

            <div className="h-16 rounded-2xl bg-white/70" />

            <div className="h-40 rounded-2xl bg-white/70" />
            <div className="h-40 rounded-2xl bg-white/70" />
          </div>
        </div>
      </div>
    );
  }

  /*
   * ----------------------------------------------------------
   * Error
   * ----------------------------------------------------------
   */

  if (error) {
    return (
      <div className="min-h-full bg-gradient-to-br from-emerald-50/60 via-white to-indigo-50/40">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
          <div className="rounded-[2rem] border border-red-100 bg-red-50/70 p-10 text-center shadow-lg shadow-red-100/30 backdrop-blur-xl">
            <h2 className="text-lg font-bold text-gray-900">
              Couldn't load your profile
            </h2>

            <p className="mt-2 text-sm text-red-500">{error.message}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-full overflow-hidden bg-gradient-to-br from-emerald-50/50 via-white to-indigo-50/50">
      {/* =====================================================
          BACKGROUND DECORATION
      ====================================================== */}

      <div className="pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full bg-emerald-200/30 blur-3xl" />

      <div className="pointer-events-none absolute -right-32 top-80 h-96 w-96 rounded-full bg-indigo-200/25 blur-3xl" />

      <div className="pointer-events-none absolute left-1/2 top-[45rem] h-72 w-72 -translate-x-1/2 rounded-full bg-violet-200/20 blur-3xl" />

      <div className="relative mx-auto w-full max-w-6xl px-3 py-5 sm:px-6 sm:py-8 lg:px-8">
        {/* ===================================================
            PROFILE HERO
        ==================================================== */}

        <section
          className="
            relative
            overflow-hidden
            rounded-[2rem]
            border
            border-white/80
            bg-white/60
            shadow-xl
            shadow-gray-200/30
            backdrop-blur-2xl
          "
        >
          {/* Decorative gradient */}

          <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-r from-emerald-500/20 via-teal-400/10 to-indigo-500/20" />

          <div className="absolute -right-16 -top-20 h-52 w-52 rounded-full bg-emerald-300/20 blur-3xl" />

          <div className="absolute -left-20 top-12 h-44 w-44 rounded-full bg-indigo-300/15 blur-3xl" />

          <div className="relative p-6 sm:p-8 lg:p-10">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end">
              {/* Avatar */}

              <div className="relative mx-auto sm:mx-0">
                <div
                  className="
                    flex
                    h-28
                    w-28
                    items-center
                    justify-center
                    overflow-hidden
                    rounded-[2rem]
                    border-4
                    border-white
                    bg-gradient-to-br
                    from-emerald-400
                    via-teal-500
                    to-indigo-500
                    text-3xl
                    font-extrabold
                    text-white
                    shadow-xl
                    shadow-emerald-200/50
                  "
                >
                  {user?.name?.slice(0, 2).toUpperCase() || (
                    <UserRound className="h-12 w-12" />
                  )}
                </div>

                <div
                  className="
                    absolute
                    -bottom-2
                    -right-2
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    rounded-xl
                    border-4
                    border-white
                    bg-emerald-500
                    text-white
                    shadow-md
                  "
                >
                  <CheckCircle2 className="h-4 w-4" />
                </div>
              </div>

              {/* User information */}

              <div className="flex-1 text-center sm:text-left">
                <div className="mb-2 flex flex-wrap items-center justify-center gap-2 sm:justify-start">
                  <span
                    className="
                      inline-flex
                      items-center
                      gap-1.5
                      rounded-full
                      bg-emerald-50
                      px-3
                      py-1
                      text-[10px]
                      font-bold
                      uppercase
                      tracking-widest
                      text-emerald-700
                    "
                  >
                    <Sparkles className="h-3 w-3" />
                    Developer
                  </span>
                </div>

                <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                  {user?.name || user?.username || "Developer"}
                </h1>

                <p className="mt-1 text-sm font-medium text-gray-500">
                  @{user?.username}
                </p>

                <div className="mt-3 flex flex-wrap items-center justify-center gap-3 text-xs text-gray-500 sm:justify-start">
                  <span className="inline-flex items-center gap-1.5">
                    <CalendarDays className="h-3.5 w-3.5 text-emerald-500" />
                    Joined the community
                  </span>

                  <span className="hidden text-gray-300 sm:inline">•</span>

                  <span className="inline-flex items-center gap-1.5">
                    <MessageSquare className="h-3.5 w-3.5 text-indigo-500" />
                    {discussions.length} discussions
                  </span>
                </div>
              </div>
            </div>

            {/* Small profile footer */}

            <div className="mt-7 flex flex-wrap items-center justify-between gap-3 border-t border-gray-200/60 pt-5">
              <p className="text-xs text-gray-400">
                Your contributions to the developer community
              </p>

              <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
                <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
                Active member
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================
            STATS
        ==================================================== */}

        <section className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {/* Discussions */}

          <div
            className="
              group
              relative
              overflow-hidden
              rounded-[1.5rem]
              border
              border-emerald-100
              bg-gradient-to-br
              from-emerald-50
              to-white
              p-5
              shadow-lg
              shadow-emerald-100/20
              transition-all
              hover:-translate-y-1
              hover:shadow-xl
            "
          >
            <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-emerald-200/30 blur-2xl" />

            <div className="relative flex items-start justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-emerald-600">
                  Discussions
                </p>

                <p className="mt-2 text-3xl font-extrabold text-gray-900">
                  {discussions.length}
                </p>

                <p className="mt-1 text-xs text-gray-500">
                  Questions you've asked
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600 transition-transform group-hover:scale-110">
                <MessageSquare className="h-5 w-5" />
              </div>
            </div>
          </div>

          {/* Replies */}

          <div
            className="
              group
              relative
              overflow-hidden
              rounded-[1.5rem]
              border
              border-indigo-100
              bg-gradient-to-br
              from-indigo-50
              to-white
              p-5
              shadow-lg
              shadow-indigo-100/20
              transition-all
              hover:-translate-y-1
              hover:shadow-xl
            "
          >
            <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-indigo-200/30 blur-2xl" />

            <div className="relative flex items-start justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                  Replies
                </p>

                <p className="mt-2 text-3xl font-extrabold text-gray-900">
                  {totalReplies}
                </p>

                <p className="mt-1 text-xs text-gray-500">
                  Conversations you've joined
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-600 transition-transform group-hover:scale-110">
                <MessageSquare className="h-5 w-5" />
              </div>
            </div>
          </div>

          {/* Upvotes */}

          <div
            className="
              group
              relative
              overflow-hidden
              rounded-[1.5rem]
              border
              border-violet-100
              bg-gradient-to-br
              from-violet-50
              to-white
              p-5
              shadow-lg
              shadow-violet-100/20
              transition-all
              hover:-translate-y-1
              hover:shadow-xl
            "
          >
            <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-violet-200/30 blur-2xl" />

            <div className="relative flex items-start justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-violet-600">
                  Upvotes
                </p>

                <p className="mt-2 text-3xl font-extrabold text-gray-900">
                  {totalUpvotes}
                </p>

                <p className="mt-1 text-xs text-gray-500">
                  Appreciation received
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-100 text-violet-600 transition-transform group-hover:scale-110">
                <ArrowUp className="h-5 w-5" />
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================
            ACTIVITY
        ==================================================== */}

        <section className="mt-8">
          <div className="mb-5">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-600">
              Your activity
            </p>

            <h2 className="mt-1 text-2xl font-extrabold tracking-tight text-gray-900">
              Community contributions
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Explore your questions, replies and upvoted discussions.
            </p>
          </div>

          {/* Tabs */}

          <div
            className="
              mb-6
              flex
              overflow-x-auto
              rounded-2xl
              border
              border-gray-200/70
              bg-white/60
              p-1.5
              shadow-sm
              backdrop-blur-xl
            "
          >
            {[
              {
                key: "discussion" as const,
                label: "Discussions",
                count: discussions.length,
                action: showDiscussions,
              },
              {
                key: "reply" as const,
                label: "Replies",
                count: totalReplies,
                action: showReplies,
              },
              {
                key: "upvote" as const,
                label: "Upvoted",
                count: upvotedQuestions.length,
                action: showUpvotes,
              },
            ].map((tab) => (
              <button
                key={tab.key}
                type="button"
                onClick={tab.action}
                className={`
                  flex
                  min-w-fit
                  flex-1
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  px-4
                  py-2.5
                  text-sm
                  font-semibold
                  transition-all
                  ${
                    active === tab.key
                      ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-md shadow-emerald-200/40"
                      : "text-gray-500 hover:bg-gray-100/80 hover:text-gray-800"
                  }
                `}
              >
                {tab.label}

                <span
                  className={`
                    rounded-full px-2 py-0.5 text-[10px]
                    ${
                      active === tab.key
                        ? "bg-white/20 text-white"
                        : "bg-gray-100 text-gray-500"
                    }
                  `}
                >
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          {/* =================================================
              EMPTY STATE
          ================================================== */}

          {!feed.length && (
            <div
              className="
                rounded-[1.75rem]
                border
                border-dashed
                border-gray-200
                bg-white/50
                px-6
                py-16
                text-center
                backdrop-blur-xl
              "
            >
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-100 to-indigo-100">
                {active === "upvote" ? (
                  <ArrowUp className="h-7 w-7 text-emerald-600" />
                ) : (
                  <MessageSquare className="h-7 w-7 text-emerald-600" />
                )}
              </div>

              <h3 className="mt-5 text-lg font-bold text-gray-900">
                {active === "discussion"
                  ? "No discussions yet"
                  : active === "reply"
                    ? "No replies yet"
                    : "No upvoted discussions"}
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
                {active === "discussion"
                  ? "Ask your first question and start a conversation with the community."
                  : active === "reply"
                    ? "Your replies will appear here when you join conversations."
                    : "Questions you upvote will appear here for easy access."}
              </p>

              {active === "discussion" && (
                <Button
                  asChild
                  className="mt-5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-md shadow-emerald-200/40 hover:from-emerald-600 hover:to-teal-600"
                >
                  <Link to="/app/popup">Ask your first question</Link>
                </Button>
              )}
            </div>
          )}

          {/* =================================================
              FEED
          ================================================== */}

          <div className="space-y-4">
            {feed.map((discuss, index) => (
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
                  shadow-gray-200/20
                  backdrop-blur-xl
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:shadow-xl
                  hover:shadow-gray-200/30
                "
              >
                {/* Left gradient accent */}

                <div
                  className={`
                    absolute
                    inset-y-0
                    left-0
                    w-1
                    ${
                      index % 3 === 0
                        ? "bg-gradient-to-b from-emerald-400 to-teal-500"
                        : index % 3 === 1
                          ? "bg-gradient-to-b from-indigo-400 to-violet-500"
                          : "bg-gradient-to-b from-orange-400 to-pink-500"
                    }
                  `}
                />

                <div className="flex gap-4 p-5 sm:p-6">
                  {/* Voting */}

                  <div className="hidden shrink-0 flex-col items-center sm:flex">
                    <button
                      type="button"
                      onClick={() => handleUpvote(discuss._id)}
                      className="
                        flex
                        h-11
                        w-11
                        items-center
                        justify-center
                        rounded-xl
                        border
                        border-gray-200
                        bg-white
                        text-gray-400
                        shadow-sm
                        transition-all
                        hover:-translate-y-0.5
                        hover:border-emerald-200
                        hover:bg-emerald-50
                        hover:text-emerald-600
                      "
                      aria-label="Upvote"
                    >
                      <GoTriangleUp size={23} />
                    </button>

                    <span className="mt-1 text-sm font-extrabold text-gray-800">
                      {discuss.upvoteCounter}
                    </span>

                    <div className="mt-3 flex items-center gap-1 text-xs font-medium text-gray-400">
                      <MessageSquare className="h-3.5 w-3.5" />
                      {discuss.replyCounter}
                    </div>
                  </div>

                  {/* Content */}

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div className="min-w-0">
                        <h3 className="text-lg font-bold leading-snug text-gray-900 transition-colors group-hover:text-emerald-700 sm:text-xl">
                          <Link to={`/app/questions/${discuss._id}`}>
                            {discuss.title}
                          </Link>
                        </h3>

                        <div
                          className="
                            mt-2
                            line-clamp-2
                            text-sm
                            leading-6
                            text-gray-500
                            prose-p:m-0
                            prose-headings:m-0
                          "
                          dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(discuss.body),
                          }}
                        />
                      </div>

                      {/* Share */}

                      <button
                        type="button"
                        onClick={() => handleShare(discuss)}
                        className="
                          flex
                          h-9
                          w-9
                          shrink-0
                          items-center
                          justify-center
                          self-end
                          rounded-xl
                          text-gray-400
                          transition-all
                          hover:bg-indigo-50
                          hover:text-indigo-600
                          sm:self-start
                        "
                        aria-label="Share discussion"
                      >
                        <Share2 className="h-4 w-4" />
                      </button>
                    </div>

                    {/* Tags */}

                    {discuss.tags?.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {discuss.tags.map((tag, tagIndex) => (
                          <span
                            key={tag.name}
                            className={`
                              rounded-full
                              border
                              px-2.5
                              py-1
                              text-[10px]
                              font-bold
                              ${tagStyles[tagIndex % tagStyles.length]}
                            `}
                          >
                            {tag.name}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Mobile stats */}

                    <div className="mt-4 flex items-center gap-4 sm:hidden">
                      <button
                        type="button"
                        onClick={() => handleUpvote(discuss._id)}
                        className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-emerald-600"
                      >
                        <GoTriangleUp size={18} />
                        {discuss.upvoteCounter}
                      </button>

                      <span className="flex items-center gap-1.5 text-xs font-medium text-gray-400">
                        <MessageSquare className="h-3.5 w-3.5" />
                        {discuss.replyCounter}
                      </span>
                    </div>

                    {/* Footer */}

                    <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-gray-100 pt-4">
                      <div className="flex items-center gap-2">
                        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-400 to-teal-500 text-[9px] font-bold text-white">
                          {(discuss.user?.username || "U")
                            .slice(0, 2)
                            .toUpperCase()}
                        </div>

                        <div className="flex flex-col">
                          <span className="text-xs font-bold text-gray-700">
                            {discuss.user?.username}
                          </span>

                          <span className="text-[10px] text-gray-400">
                            Contributor
                          </span>
                        </div>
                      </div>

                      <Link
                        to={`/app/questions/${discuss._id}`}
                        className="
                          text-xs
                          font-bold
                          text-emerald-600
                          transition-colors
                          hover:text-emerald-700
                        "
                      >
                        View discussion →
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <div className="h-10" />
      </div>
    </div>
  );
};

export default UserProfile;
