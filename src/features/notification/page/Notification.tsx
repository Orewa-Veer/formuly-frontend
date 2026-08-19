import {
  ArrowUp,
  Bell,
  CheckCheck,
  MessageCircle,
  Sparkles,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { Button } from "../../../components/ui/button";
import Service from "../../../services/genricServices";
import timeAgo from "../../../services/timeAgo";
import { useSocket } from "../../../services/useSocket";
import { Notifications } from "../../../types/Question";
import { FilterNotifications } from "../components/FilterNotifications";
import { useNotification } from "../hooks/useNotification";
import { Spinner } from "@/components/ui/spinner";

const Notification = () => {
  const [type, setType] = useState("");
  const [limit, setLimit] = useState(10);
  const [notifications, setNotifications] = useState<Notifications[]>([]);

  const { data, loading } = useNotification({
    seen: "false",
    type,
    limit,
  });

  const { socket, ready } = useSocket();

  /*
   * ----------------------------------------------------------
   * Load notifications
   * ----------------------------------------------------------
   */

  useEffect(() => {
    if (data?.data) {
      setNotifications(data.data);
    }
  }, [data]);

  /*
   * ----------------------------------------------------------
   * Socket events
   * ----------------------------------------------------------
   */

  useEffect(() => {
    if (!ready || !socket) return;

    const addNotification = (notif: Notifications) => {
      setNotifications((prev) => {
        // Prevent duplicates if the same notification arrives twice
        if (prev.some((item) => item._id === notif._id)) {
          return prev;
        }

        return [notif, ...prev];
      });
    };

    const clearNotifications = () => {
      setNotifications([]);
    };

    const deleteNotification = (notif: Notifications) => {
      setNotifications((prev) => prev.filter((item) => item._id !== notif._id));
    };

    socket.on("notification:new", addNotification);
    socket.on("allNotification:seen", clearNotifications);
    socket.on("notificDeleted", deleteNotification);

    return () => {
      socket.off("notification:new", addNotification);
      socket.off("allNotification:seen", clearNotifications);
      socket.off("notificDeleted", deleteNotification);
    };
  }, [ready, socket]);

  /*
   * ----------------------------------------------------------
   * Actions
   * ----------------------------------------------------------
   */

  const markAllSeen = useCallback(() => {
    new Service(`/api/notification/mark-all-seen`)
      .post()
      .then(() => {
        setNotifications([]);
      })
      .catch(console.error);
  }, []);

  const markSingleSeen = useCallback((id: string) => {
    new Service(`/api/notification/${id}`).post().catch(console.error);

    setNotifications((prev) =>
      prev.filter((notification) => notification._id !== id),
    );
  }, []);

  const handleShowMore = () => {
    setLimit((prev) => prev + 10);
  };

  /*
   * ----------------------------------------------------------
   * Render
   * ----------------------------------------------------------
   */

  return (
    <div className="relative min-h-[calc(100vh-1rem)] overflow-hidden">
      {/* ======================================================
          BACKGROUND DECORATION
      ======================================================= */}

      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-32 -top-32 h-80 w-80 rounded-full bg-emerald-200/30 blur-3xl" />

        <div className="absolute -right-32 top-20 h-96 w-96 rounded-full bg-indigo-200/25 blur-3xl" />

        <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-violet-200/20 blur-3xl" />
      </div>

      {/* ======================================================
          MAIN
      ======================================================= */}

      <main className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        {/* ====================================================
            HEADER
        ===================================================== */}

        <div className="mb-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            {/* Heading */}

            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-200/70 bg-emerald-50/80 px-3 py-1.5 text-xs font-semibold text-emerald-700 shadow-sm backdrop-blur-sm">
                <Sparkles className="h-3.5 w-3.5" />
                Stay in the loop
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-200/60">
                  <Bell className="h-6 w-6" />
                </div>

                <div>
                  <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                    Notifications
                  </h1>

                  <p className="mt-1 text-sm text-gray-500 sm:text-base">
                    See what's happening around your questions.
                  </p>
                </div>
              </div>
            </div>

            {/* Actions */}

            <div className="flex flex-wrap items-center gap-2">
              <FilterNotifications value={type} setValue={setType} />

              <Button
                variant="outline"
                size="sm"
                onClick={markAllSeen}
                disabled={!notifications.length}
                className="
                  h-9
                  rounded-xl
                  border-gray-200
                  bg-white/70
                  px-3
                  shadow-sm
                  backdrop-blur-sm
                  transition-all
                  hover:-translate-y-0.5
                  hover:border-emerald-200
                  hover:bg-emerald-50
                  hover:text-emerald-700
                "
              >
                <CheckCheck className="mr-1.5 h-4 w-4" />
                Mark all seen
              </Button>
            </div>
          </div>
        </div>

        {/* ====================================================
            NOTIFICATION PANEL
        ===================================================== */}

        <section
          className="
            overflow-hidden
            rounded-[1.75rem]
            border
            border-white/80
            bg-white/55
            shadow-xl
            shadow-gray-200/30
            backdrop-blur-xl
          "
        >
          {/* Panel header */}

          <div
            className="
              flex
              items-center
              justify-between
              border-b
              border-gray-100/80
              bg-white/40
              px-5
              py-4
              sm:px-6
            "
          >
            <div>
              <h2 className="text-sm font-bold text-gray-900">
                Recent activity
              </h2>

              <p className="mt-0.5 text-xs text-gray-400">
                {notifications.length > 0
                  ? `${notifications.length} unread notification${
                      notifications.length === 1 ? "" : "s"
                    }`
                  : "You're all caught up"}
              </p>
            </div>

            {loading && (
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <Spinner />
                Updating
              </div>
            )}
          </div>

          {/* ==================================================
              LIST
          =================================================== */}

          <div className="p-3 sm:p-4">
            {loading && !notifications.length ? (
              <div className="flex min-h-[280px] flex-col items-center justify-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50">
                  <Spinner />
                </div>

                <div className="text-center">
                  <p className="font-semibold text-gray-700">
                    Loading notifications
                  </p>

                  <p className="mt-1 text-xs text-gray-400">
                    Checking for recent activity...
                  </p>
                </div>
              </div>
            ) : notifications.length === 0 ? (
              /* ==================================================
                 EMPTY STATE
              =================================================== */

              <div className="flex min-h-[360px] flex-col items-center justify-center px-6 text-center">
                <div
                  className="
                    relative
                    mb-5
                    flex
                    h-20
                    w-20
                    items-center
                    justify-center
                    rounded-[1.75rem]
                    bg-gradient-to-br
                    from-emerald-50
                    to-teal-100
                    shadow-inner
                  "
                >
                  <Bell className="h-8 w-8 text-emerald-500" />

                  <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-sm" />
                </div>

                <h3 className="text-lg font-bold text-gray-900">
                  You're all caught up
                </h3>

                <p className="mt-2 max-w-sm text-sm leading-relaxed text-gray-500">
                  No new notifications right now. We'll let you know when
                  someone replies to your questions or interacts with them.
                </p>

                <Link
                  to="/app/questions"
                  className="
                    mt-6
                    inline-flex
                    items-center
                    rounded-xl
                    bg-gradient-to-r
                    from-emerald-500
                    to-teal-500
                    px-4
                    py-2.5
                    text-sm
                    font-semibold
                    text-white
                    shadow-md
                    shadow-emerald-200/50
                    transition-all
                    hover:-translate-y-0.5
                    hover:shadow-lg
                  "
                >
                  Explore questions
                </Link>
              </div>
            ) : (
              <div className="space-y-2">
                {notifications.map((notific) => {
                  const isReply = notific.type === "reply";

                  return (
                    <div
                      key={notific._id}
                      className="
                        group
                        relative
                        overflow-hidden
                        rounded-2xl
                        border
                        border-gray-100
                        bg-white/70
                        p-4
                        shadow-sm
                        transition-all
                        duration-200
                        hover:-translate-y-0.5
                        hover:border-gray-200
                        hover:bg-white
                        hover:shadow-md
                        sm:p-5
                      "
                    >
                      {/* Colored side accent */}

                      <div
                        className={`absolute inset-y-0 left-0 w-1 ${
                          isReply
                            ? "bg-gradient-to-b from-blue-400 to-indigo-500"
                            : "bg-gradient-to-b from-emerald-400 to-teal-500"
                        }`}
                      />

                      <div className="flex gap-4">
                        {/* Icon */}

                        <div
                          className={`
                            flex
                            h-11
                            w-11
                            shrink-0
                            items-center
                            justify-center
                            rounded-2xl
                            transition-transform
                            duration-200
                            group-hover:scale-105
                            ${
                              isReply
                                ? "bg-blue-50 text-blue-600"
                                : "bg-emerald-50 text-emerald-600"
                            }
                          `}
                        >
                          {isReply ? (
                            <MessageCircle className="h-5 w-5" />
                          ) : (
                            <ArrowUp className="h-5 w-5" />
                          )}
                        </div>

                        {/* Content */}

                        <div className="min-w-0 flex-1">
                          <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                            <div className="min-w-0 pr-2">
                              <p className="text-sm leading-6 text-gray-600">
                                Someone{" "}
                                <span
                                  className={`font-semibold ${
                                    isReply
                                      ? "text-blue-600"
                                      : "text-emerald-600"
                                  }`}
                                >
                                  {isReply ? "replied" : "upvoted"}
                                </span>{" "}
                                your discussion
                              </p>

                              <Link
                                to={`/app/questions/${notific.discussId._id}`}
                                onClick={() => markSingleSeen(notific._id)}
                                className="
                                  mt-1
                                  block
                                  truncate
                                  text-sm
                                  font-bold
                                  text-gray-900
                                  transition-colors
                                  hover:text-emerald-600
                                  sm:text-base
                                "
                              >
                                {notific.discussId.title}
                              </Link>
                            </div>

                            {/* Time */}

                            <span className="shrink-0 text-[11px] font-medium text-gray-400">
                              {timeAgo(`${notific.date}`)}
                            </span>
                          </div>

                          {/* Bottom row */}

                          <div className="mt-3 flex items-center justify-between">
                            <span
                              className={`
                                inline-flex
                                items-center
                                rounded-full
                                px-2.5
                                py-1
                                text-[10px]
                                font-bold
                                uppercase
                                tracking-wider
                                ${
                                  isReply
                                    ? "bg-blue-50 text-blue-600"
                                    : "bg-emerald-50 text-emerald-600"
                                }
                              `}
                            >
                              {isReply ? "New reply" : "New upvote"}
                            </span>

                            <Link
                              to={`/app/questions/${notific.discussId._id}`}
                              onClick={() => markSingleSeen(notific._id)}
                              className="
                                text-xs
                                font-semibold
                                text-gray-400
                                opacity-0
                                transition-all
                                group-hover:text-emerald-600
                                group-hover:opacity-100
                              "
                            >
                              View discussion →
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* ==================================================
              SHOW MORE
          =================================================== */}

          {notifications.length > 0 && (
            <div className="border-t border-gray-100/80 bg-white/30 p-4">
              <Button
                variant="outline"
                onClick={handleShowMore}
                className="
                  h-10
                  w-full
                  rounded-xl
                  border-gray-200
                  bg-white/70
                  text-sm
                  font-semibold
                  text-gray-600
                  shadow-sm
                  backdrop-blur-sm
                  transition-all
                  hover:-translate-y-0.5
                  hover:border-emerald-200
                  hover:bg-emerald-50
                  hover:text-emerald-700
                "
              >
                Show more notifications
              </Button>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default Notification;
