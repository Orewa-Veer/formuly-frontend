import { ArrowUp, Bell, MessageSquare } from "lucide-react";
import { useEffect, useState } from "react";
import Cards from "../../../Components/Cards";
import { Button } from "../../../Components/ui/button";
import timeAgo from "../../../services/timeAgo";
import { useSocket } from "../../../services/useSocket";
import { Notifications } from "../../../types/Question";
import { useData } from "../../../useHooks/useData";
import { useNotification } from "../hooks/useNotification";

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

  // console.log(data);
  return (
    <div className="p-3 sm:px-6 md:px-8 lg:px-10 xl:px-14 ">
      {/* container  */}

      <div className="w-full">
        {/* Header  */}
        <div className="flex gap-2 justify-between mb-8 text-3xl text-blue-600 items-center font-bold">
          <div className="flex items-center">
            <Bell className="size-9 text-blue-600" /> <span>Notifications</span>
          </div>
          <div>
            <Button>Filter</Button>
            <Button>Mark All Seen</Button>
          </div>
        </div>
        {/* Body  */}
        <div className="flex flex-col space-y-2 items-center">
          <Button
            className="bg-white text-emerald-700 hover:bg-emerald-700 hover:text-white"
            // onClick={handleClick}
          >
            Marked All as seen
          </Button>
          {/* Cards  */}
          {notifications.map((notific) => (
            <Cards className="flex gap-2 w-fit bg-white/10 border border-white/20 rounded-sm backdrop-blur-md shadow-sm p-3">
              <div>
                {notific.type === "reply" ? (
                  <MessageSquare className="text-emerald-600" />
                ) : (
                  <ArrowUp />
                )}
              </div>
              <div className="flex flex-col">
                {`Someone ${notific.type} your discussion Titled ${notific.discussId.title} `}
                <span className="w-full text-end text-gray-600 text-sm">{`${timeAgo(
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
