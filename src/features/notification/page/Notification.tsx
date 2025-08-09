import { ArrowUp, Bell, MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Cards from "../../../components/Cards";
import { Button } from "../../../components/ui/button";
import Service from "../../../services/genricServices";
import timeAgo from "../../../services/timeAgo";
import { useSocket } from "../../../services/useSocket";
import { Notifications } from "../../../types/Question";
import { FilterNotifications } from "../components/FilterNotifications";
import { useNotification } from "../hooks/useNotification";

const Notification = () => {
  const seen = "false";
  const [type, setType] = useState("");
  const [limit, setLimit] = useState<number>(10);
  const { data } = useNotification({ seen: seen, type: type, limit: limit });
  const [notifications, setNotifications] = useState<Notifications[]>([]);
  const { socket, ready } = useSocket();
  useEffect(() => {
    setNotifications(data.data);
  }, [data]);
  useEffect(() => {
    if (!ready || !socket) return;
    const handleNotific = (notifc: Notifications) => {
      console.log(notifc);
      setNotifications((prev) => [...prev, notifc]);
    };
    const handleAll = () => {
      setNotifications([]);
    };
    const handleDeleted = (notific: Notifications) => {
      console.log(notific);
      setNotifications((prev) => prev.filter((p) => p._id !== notific._id));
    };
    socket.on("notification:new", handleNotific);
    socket.on("allNotification:seen", handleAll);
    socket.on("notificDeleted", handleDeleted);
    return () => {
      socket.off("notification:new", handleNotific);
      socket.off("allNotification:seen", handleAll);
      socket.off("notificDeleted", handleDeleted);
    };
  }, [ready, socket]);
  // const handleClick = () => {
  //   const notific = new Service("/api/notification/mark-all-seen");
  //   notific.post().then(res=>)
  // };
  const handleShowMore = () => {
    setLimit((prev) => prev + 10);
  };
  const handleNotificClick = (id: string) => {
    const noti = new Service(`/api/notification/${id}`);
    noti
      .post()
      .then((res) => console.log(res))
      .catch((ex) => console.log(ex));
  };
  const handleAllSeen = () => {
    const noti = new Service(`/api/notification/mark-all-seen`);
    noti.post().catch((ex) => console.log(ex));
  };

  // console.log(data);
  return (
    <div className="p-3 sm:px-6 md:px-8 lg:px-10 xl:px-14 ">
      {/* container  */}

      <div className="max-w-2xl mx-auto p-6 space-y-6">
        {/* Header  */}

        {/* Body  */}
        <div className="flex flex-col space-y-2 max-w-2xl ">
          <div className="flex gap-2 justify-between mb-8 text-3xl text-gray-800 items-center font-bold">
            <div className="text-4xl font-bold drop-shadow-2xl flex items-center  gap-2">
              <Bell className="size-9 " /> <span>Notifications</span>
            </div>
            <div className="flex gap-2">
              <FilterNotifications value={type} setValue={setType} />
              <Button
                variant={"outline"}
                // className="shadow-xl backdrop-blur-2xl border-white/80 hover:bg-emerald-700"
                onClick={() => handleAllSeen()}
              >
                Mark All Seen
              </Button>
            </div>
          </div>
          {/* Cards  */}
          <div className="space-y-2">
            {notifications.map((notific) => (
              <Cards className="flex items-start gap-3 p-4 rounded-xl shadow-sm border hover:bg-muted transition">
                <div>
                  {notific.type === "reply" ? (
                    <MessageCircle className="text-blue-600" />
                  ) : (
                    <ArrowUp className="text-pink-600" />
                  )}
                </div>
                <div className="flex flex-col">
                  <div className="flex gap-2">
                    <span>
                      {`New ${notific.type} your discussion Titled  `}{" "}
                    </span>
                    <Link
                      className="text-base font-semibold hover:underline"
                      to={`/app/questions/${notific.discussId._id}`}
                      onClick={() => handleNotificClick(notific._id)}
                    >
                      {" "}
                      {notific.discussId.title}
                    </Link>
                  </div>
                  {/* <span>{notific.userId}</span> */}
                  <span className="w-full  text-gray-600 text-sm">{`${timeAgo(
                    `${notific.date}`
                  )}`}</span>
                </div>
              </Cards>
            ))}
          </div>
          <div className="flex justify-center">
            <Button
              variant={"outline"}
              className="w-[25%]"
              onClick={handleShowMore}
            >
              Show More
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notification;
