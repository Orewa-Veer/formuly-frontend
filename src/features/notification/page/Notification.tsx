import { ArrowUp, Bell, MessageCircle } from "lucide-react";
import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import Cards from "../../../components/Cards";
import { Button } from "../../../components/ui/button";
import Service from "../../../services/genricServices";
import timeAgo from "../../../services/timeAgo";
import { useSocket } from "../../../services/useSocket";
import { Notifications } from "../../../types/Question";
import { FilterNotifications } from "../components/FilterNotifications";
import { useNotification } from "../hooks/useNotification";
import { Spinner } from "@/components/ui/shadcn-io/spinner";

const Notification = () => {
  const [type, setType] = useState("");
  const [limit, setLimit] = useState(10);
  const [notifications, setNotifications] = useState<Notifications[]>([]);

  const { data ,loading} = useNotification({ seen: "false", type, limit });
  const { socket, ready } = useSocket();

  /** Load notifications from API hook */
  useEffect(() => {
    if (data?.data) setNotifications(data.data);
  }, [data]);

  /** Socket event handlers */
  useEffect(() => {
    if (!ready || !socket) return;

    const addNotification = (notif: Notifications) =>
      setNotifications((prev) => [...prev, notif]);

    const clearNotifications = () => setNotifications([]);

    const deleteNotification = (notif: Notifications) =>
      setNotifications((prev) => prev.filter((n) => n._id !== notif._id));

    socket.on("notification:new", addNotification);
    socket.on("allNotification:seen", clearNotifications);
    socket.on("notificDeleted", deleteNotification);

    return () => {
      socket.off("notification:new", addNotification);
      socket.off("allNotification:seen", clearNotifications);
      socket.off("notificDeleted", deleteNotification);
    };
  }, [ready, socket]);

  /** API actions */
  const markAllSeen = useCallback(() => {
    new Service(`/api/notification/mark-all-seen`).post().catch(console.error);
  }, []);

  const markSingleSeen = useCallback((id: string) => {
    new Service(`/api/notification/${id}`).post().catch(console.error);
  }, []);

  /** Pagination */
  const handleShowMore = () => setLimit((prev) => prev + 10);

  return (
    <div className="p-3 sm:px-6 md:px-8 lg:px-10 xl:px-14 max-w-5xl mx-auto">
      <div className="max-w-2xl mx-auto p-4 sm:p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between gap-4 sm:items-center">
          <div className="text-2xl sm:text-4xl font-bold drop-shadow-2xl flex items-center gap-2">
            <Bell className="size-6 sm:size-9" /> Notifications
          </div>
          {loading&&<Spinner/>}
          <div className="flex flex-wrap gap-2">
            <FilterNotifications value={type} setValue={setType} />
            <Button variant="outline" size="sm" onClick={markAllSeen}>
              Mark All Seen
            </Button>
          </div>
        </div>

        {/* Notification List */}
        <div className="space-y-2">
          {notifications.map((notific) => (
            <Cards
              key={notific._id}
              className="flex flex-col sm:flex-row items-start gap-3 p-3 sm:p-4 rounded-xl shadow-sm border hover:bg-muted transition"
            >
              <div className="flex-shrink-0">
                {notific.type === "reply" ? (
                  <MessageCircle className="text-blue-600" />
                ) : (
                  <ArrowUp className="text-pink-600" />
                )}
              </div>

              <div className="flex flex-col flex-1">
                <div className="flex flex-wrap gap-1 sm:gap-2">
                  <span>New {notific.type} on your discussion titled</span>
                  <Link
                    to={`/app/questions/${notific.discussId._id}`}
                    className="text-sm sm:text-base font-semibold hover:underline break-words"
                    onClick={() => markSingleSeen(notific._id)}
                  >
                    {notific.discussId.title}
                  </Link>
                </div>
                <span className="text-gray-600 text-xs sm:text-sm">
                  {timeAgo(`${notific.date}`)}
                </span>
              </div>
            </Cards>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center">
          <Button
            variant="outline"
            className="w-full sm:w-1/4"
            onClick={handleShowMore}
          >
            Show More
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Notification;
