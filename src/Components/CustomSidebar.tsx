import {
  Bookmark,
  //   Calendar,
  Home,

  //   Inbox,
  MessageCircle,
  MessageSquare,
  Search,
  Settings,
} from "lucide-react";
import useCurrentCustomer from "../useHooks/useCurrentCustomer";
import { Link } from "react-router-dom";

// Menu items.
const items = [
  {
    title: "Home",
    url: "/app/",
    icon: Home,
  },
  {
    title: "Questions",
    url: "/app/questions",
    icon: MessageCircle,
  },
  {
    title: "Bookmark",
    url: "/app/bookmarks",
    icon: Bookmark,
  },
  {
    title: "Search",
    url: "#",
    icon: Search,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
];
interface Props {
  open: boolean;
}

export function AppSidebar({ open }: Props) {
  const user = useCurrentCustomer();
  return (
    <>
      <div
        className={`${
          open ? "w-60" : "w-0 hidden "
        } border h-[95vh] bg-white/10 rouned-md backdrop-blur-md p-3 shadow-md transition-all duration-200 ease-in-out overflow-hidden border-gray-200/20 fixed top-5 z-10 left-2`}
      >
        {/* Heading */}
        <div className="flex flex-col mt-3">
          <h1 className="flex gap-2 items-center text-4xl font-bold text-emerald-700">
            <MessageSquare className="size-10" />
            <span>Forumly</span>
          </h1>
          <span className="text-sm text-gray-600">Developers Community</span>
        </div>
        {/* Main Body  */}
        <div className="flex flex-col  mt-5">
          {/* Sections  */}
          <div>
            {items.map((item) => (
              <Link
                to={item.url}
                className="flex items-center gap-2 p-3 hover:bg-gray-100 cursor-pointer"
              >
                <item.icon />
                <span>{item.title}</span>
              </Link>
            ))}
          </div>
          {/* Tags  */}
          <div></div>
        </div>
        {/* footer  */}
        <div>
          <div className="  fixed bottom-3 left-3 backdrop-blur-md shadow-md px-5 py-1 hover:shadow-lg hover:bg-white/20 hover:border-white/40">
            <Link to={"/app/user"} className="flex justify-between gap-3">
              <div
                id="image"
                className="size-8 rounded-full bg-gray-800 border-gray-400"
              ></div>
              <div>{user?.user?.username}</div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
