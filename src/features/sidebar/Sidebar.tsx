import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import {
  Bell,
  Home,
  LogOut,
  MessageSquare,
  Tag,
  UserCircle,
} from "lucide-react";
import { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaRegBookmark } from "react-icons/fa";
import { FaRegMessage } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "../../components/ui/sidebar";
import Service from "../../services/genricServices";
import { useAuth } from "../../services/useAuth";
import { useNotification } from "../notification/hooks/useNotification";

// Menu items.
const items = [
  {
    title: "Home",
    url: "/app",
    icon: Home,
  },
  {
    title: "Questions",
    url: "/app/questions",
    icon: FaRegMessage,
  },
  {
    title: "Bookmark",
    url: "/app/bookmark",
    icon: FaRegBookmark,
  },
  // {
  //   title: `Notifications ${data.length}`,
  //   url: "/app/notification",
  //   icon: Bell,
  // },
  {
    title: "Tags",
    url: "/app/tags",
    icon: Tag,
  },
];

export function AppSidebar() {
  const [active, setactive] = useState("Home");
  const { isMobile } = useSidebar();
  const { data } = useNotification({ seen: "false" });
  const { user } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    const logout = new Service("/api/logout");
    logout
      .post()
      .then(() => navigate("/login"))
      .catch((ex) => console.log(ex));
  };
  return (
    <Sidebar
      variant="inset"
      className="bg-gradient-to-b from-white/80 to-emerald-50/40 backdrop-blur-md border-r border-gray-200 shadow-sm"
    >
      {/* Header */}
      <SidebarHeader className="mt-4 mb-4 px-4">
        <div className="flex items-center gap-2 text-emerald-700 font-bold text-2xl">
          <MessageSquare className="size-8" />
          <span className="tracking-wide">Forumly</span>
        </div>
        <span className="text-xs text-gray-500">Developer Community</span>
      </SidebarHeader>

      {/* Menu */}
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {items.map((item) => (
                <SidebarMenuItem
                  key={item.title}
                  className={`group ${
                    active === item.title
                      ? "bg-emerald-100 text-emerald-700 border-l-4 border-emerald-500"
                      : "text-gray-600"
                  } rounded-md transition-all duration-200`}
                >
                  <SidebarMenuButton
                    asChild
                    onClick={() => setactive(item.title)}
                    className="flex items-center gap-3 px-4 py-2 rounded-md hover:bg-emerald-50 hover:text-emerald-600 transition"
                  >
                    <Link to={item.url}>
                      <item.icon className="size-5 group-hover:scale-110 transition-transform" />
                      <span className="font-medium">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}

              {/* Notifications */}
              <SidebarMenuItem
                className={`group ${
                  active === "Notifications"
                    ? "bg-emerald-100 text-emerald-700 border-l-4 border-emerald-500"
                    : "text-gray-600"
                } rounded-md`}
              >
                <SidebarMenuButton
                  asChild
                  onClick={() => setactive("Notifications")}
                  className="flex items-center gap-3 px-4 py-2 hover:bg-emerald-50 hover:text-emerald-600 transition"
                >
                  <Link to={"/app/notification"}>
                    <Bell className="size-5 group-hover:scale-110 transition-transform" />
                    <span className="flex items-center gap-2 font-medium">
                      Notifications
                      {data.data.length > 0 && (
                        <span className="px-2 py-0.5 bg-red-500 text-white text-xs rounded-full shadow-sm">
                          {data.data.length}
                        </span>
                      )}
                    </span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer - User */}
      <SidebarFooter className="border-t border-gray-200 mt-4 pt-4 px-3">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              className="w-full flex items-center gap-3 rounded-lg px-2.5 py-2 hover:bg-gray-50 transition"
            >
              <Avatar className="relative inline-flex h-9 w-9 items-center justify-center rounded-full overflow-hidden bg-gray-200">
                <AvatarImage
                  src={user?.avatar ?? "https://github.com/shadcn.png"}
                  alt={user?.username ?? "User"}
                  className="h-full w-full object-cover"
                />
                <AvatarFallback className="w-full h-full flex items-center justify-center text-xs font-semibold text-gray-600">
                  {(user?.username?.trim()?.slice(0, 2) || "U").toUpperCase()}
                </AvatarFallback>
              </Avatar>

              <div className="flex flex-col text-sm min-w-0">
                <span className="font-semibold truncate">{user?.username}</span>
                <span className="text-gray-500 text-xs truncate">
                  {user?.email}
                </span>
              </div>

              <BsThreeDotsVertical className="ml-auto text-gray-500" />
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            side={isMobile ? "top" : "right"}
            align="end"
            sideOffset={8}
            className="z-50 min-w-56 rounded-xl bg-white shadow-lg border border-gray-200 p-2"
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-2 py-1.5">
                <Avatar className="relative inline-flex h-8 w-8 items-center justify-center rounded-full overflow-hidden bg-gray-200">
                  <AvatarImage
                    src={user?.avatar ?? "https://github.com/shadcn.png"}
                    alt={user?.username ?? "User"}
                    className="h-full w-full object-cover"
                  />
                  <AvatarFallback className="w-full h-full flex items-center justify-center text-[10px] font-semibold text-gray-600">
                    {(user?.username?.trim()?.slice(0, 2) || "U").toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col text-sm">
                  <span className="font-medium">{user?.username}</span>
                  <span className="text-gray-500 text-xs">{user?.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>

            <DropdownMenuSeparator className="my-2" />

            <DropdownMenuGroup>
              <DropdownMenuItem asChild>
                <Link
                  to="/app/user"
                  className="flex items-center gap-2 text-sm px-2 py-1.5 rounded-md hover:bg-gray-50"
                >
                  <UserCircle className="size-4" />
                  Account
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuSeparator className="my-2" />

            <DropdownMenuItem
              onClick={handleLogout}
              className="flex items-center gap-2 text-sm px-2 py-1.5 rounded-md text-red-600 hover:bg-red-50 cursor-pointer"
            >
              <LogOut className="size-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
