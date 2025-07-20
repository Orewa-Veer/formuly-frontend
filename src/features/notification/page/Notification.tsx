import { ArrowUp, Bell, MessageCircle, MessageSquare } from "lucide-react";
import { useEffect, useState } from "react";
import Cards from "../../../Components/Cards";
import { Button } from "../../../Components/ui/button";
import timeAgo from "../../../services/timeAgo";
import { useSocket } from "../../../services/useSocket";
import { Notifications } from "../../../types/Question";
import { useData } from "../../../useHooks/useData";
import { useNotification } from "../hooks/useNotification";
import { FilterNotifications } from "../components/FilterNotifications";
import { Link } from "react-router-dom";
import Service from "../../../services/genricServices";

const Notification = () => {
  const [seen, setSeen] = useState("false");
  const [type, setType] = useState("");
  const { data } = useNotification({ seen: seen, type: type });
  const [notifications, setNotifications] = useState<Notifications[]>([]);
  const { socket, ready } = useSocket();
  useEffect(() => {
    setNotifications(data);
  }, [data]);
  useEffect(() => {
    if (!ready || !socket) return;
    const handleNotific = (notifc: Notifications) => {
      console.log(notifc);
      setNotifications((prev) => [...prev, notifc]);
    };
    socket.on("notification:new", handleNotific);
    return () => {
      socket.off("notification:new", handleNotific);
    };
  }, [ready, socket]);
  // const handleClick = () => {
  //   const notific = new Service("/api/notification/mark-all-seen");
  //   notific.post().then(res=>)
  // };

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
                className="shadow-xl backdrop-blur-2xl border-white/80 hover:bg-emerald-700"
                onClick={() => handleAllSeen()}
              >
                Mark All Seen
              </Button>
            </div>
          </div>
          {/* Cards  */}
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
                {`New ${notific.type} your discussion Titled  `}{" "}
                <Link
                  to={`/app/questions/${notific.discussId._id}`}
                  onClick={() => handleNotificClick(notific._id)}
                >
                  ${notific.discussId.title}
                </Link>
                {/* <span>{notific.userId}</span> */}
                <span className="w-full  text-gray-600 text-sm">{`${timeAgo(
                  `${notific.date}`
                )}`}</span>
              </div>
            </Cards>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Notification;
