import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import {
  Bell,
  Home,
  LogOut,
  MessageSquare,
  Tag,
  UserCircle,
} from "lucide-react";
import { FaRegBookmark } from "react-icons/fa";
import { FaRegMessage } from "react-icons/fa6";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

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

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";

import Service from "../../services/genricServices";
import { useAuth } from "../../services/useAuth";
import { useNotification } from "../notification/hooks/useNotification";
import { useSocket } from "@/services/useSocket";

const items = [
  {
    title: "Home",
    url: "/app",
    icon: Home,
    iconStyle: "bg-blue-100 text-blue-600",
  },
  {
    title: "Questions",
    url: "/app/questions",
    icon: FaRegMessage,
    iconStyle: "bg-emerald-100 text-emerald-600",
  },
  {
    title: "Bookmarks",
    url: "/app/bookmark",
    icon: FaRegBookmark,
    iconStyle: "bg-yellow-100 text-yellow-600",
  },
  {
    title: "Tags",
    url: "/app/tags",
    icon: Tag,
    iconStyle: "bg-violet-100 text-violet-600",
  },
];

export function AppSidebar() {
  const { isMobile } = useSidebar();
  const { user } = useAuth();
  const { data } = useNotification({ seen: "false" });
  const { socket, ready } = useSocket();

  const navigate = useNavigate();
  const location = useLocation();

  const [notificLen, setNotificLen] = useState(0);

  useEffect(() => {
    if (data?.data?.length !== undefined) {
      setNotificLen(data.data.length);
    }
  }, [data]);

  useEffect(() => {
    if (!ready || !socket) return;

    const handleNotification = () => {
      setNotificLen((prev) => prev + 1);
    };

    socket.on("notification:new", handleNotification);

    return () => {
      socket.off("notification:new", handleNotification);
    };
  }, [ready, socket]);

  const handleLogout = async () => {
    const logout = new Service("/api/logout");

    try {
      await logout.post();
      navigate("/login");
    } catch (ex) {
      console.log(ex);
    }
  };

  const isActive = (url: string) => {
    if (url === "/app") {
      return location.pathname === "/app";
    }

    return location.pathname.startsWith(url);
  };

  const initials = user?.username?.trim()?.slice(0, 2).toUpperCase() || "U";

  return (
    <Sidebar
      variant="inset"
      className="
        border-r-0
        bg-gradient-to-b
        from-indigo-50/90
        via-white/90
        to-emerald-50/80
        backdrop-blur-xl
      "
    >
      {/* =====================================================
          HEADER
      ====================================================== */}
      <SidebarHeader className="px-5 pt-6 pb-5">
        <div
          className="
            relative overflow-hidden
            rounded-2xl
            border border-white/70
            bg-white/60
            px-4 py-4
            shadow-lg shadow-indigo-100/40
            backdrop-blur-xl
          "
        >
          {/* Decorative gradient */}
          <div
            className="
              pointer-events-none
              absolute -right-8 -top-8
              h-20 w-20
              rounded-full
              bg-violet-300/30
              blur-2xl
            "
          />

          <div className="relative flex items-center gap-3">
            <div
              className="
                flex h-11 w-11 shrink-0
                items-center justify-center
                rounded-2xl
                bg-gradient-to-br
                from-emerald-500
                to-teal-500
                shadow-lg
                shadow-emerald-200
              "
            >
              <MessageSquare className="h-6 w-6 text-white" />
            </div>

            <div className="flex flex-col">
              <span
                className="
                  bg-gradient-to-r
                  from-emerald-600
                  via-teal-600
                  to-indigo-600
                  bg-clip-text
                  text-xl
                  font-extrabold
                  tracking-tight
                  text-transparent
                "
              >
                Cheeku
              </span>

              <span className="text-[11px] font-medium text-gray-500">
                Developer Community
              </span>
            </div>
          </div>
        </div>
      </SidebarHeader>

      {/* =====================================================
          NAVIGATION
      ====================================================== */}
      <SidebarContent className="px-3">
        <SidebarGroup>
          <SidebarGroupContent>
            {/* Section title */}
            <div className="mb-3 px-3">
              <span
                className="
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-[0.15em]
                  text-gray-400
                "
              >
                Explore
              </span>
            </div>

            <SidebarMenu className="space-y-2">
              {items.map((item) => {
                const active = isActive(item.url);

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      className={`
                        group
                        h-12
                        rounded-xl
                        transition-all
                        duration-200

                        ${
                          active
                            ? `
                              border
                              border-white/80
                              bg-white/75
                              shadow-md
                              shadow-emerald-100/50
                              backdrop-blur-md
                            `
                            : `
                              hover:bg-white/50
                              hover:shadow-sm
                            `
                        }
                      `}
                    >
                      <Link
                        to={item.url}
                        className="flex items-center gap-3 px-2.5"
                      >
                        {/* Icon */}
                        <div
                          className={`
                            flex h-9 w-9
                            items-center justify-center
                            rounded-xl
                            transition-all
                            duration-200
                            ${item.iconStyle}

                            ${
                              active
                                ? "scale-105 shadow-sm"
                                : "group-hover:scale-110"
                            }
                          `}
                        >
                          <item.icon className="h-[18px] w-[18px]" />
                        </div>

                        {/* Text */}
                        <span
                          className={`
                            text-sm
                            font-semibold
                            ${
                              active
                                ? "text-gray-900"
                                : "text-gray-600 group-hover:text-gray-900"
                            }
                          `}
                        >
                          {item.title}
                        </span>

                        {/* Active indicator */}
                        {active && (
                          <div
                            className="
                              ml-auto
                              h-2
                              w-2
                              rounded-full
                              bg-gradient-to-r
                              from-emerald-500
                              to-teal-500
                              shadow-sm
                              shadow-emerald-300
                            "
                          />
                        )}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}

              {/* =================================================
                  NOTIFICATIONS
              ================================================== */}
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  className={`
                    group
                    h-12
                    rounded-xl
                    transition-all
                    duration-200

                    ${
                      isActive("/app/notification")
                        ? `
                          border
                          border-white/80
                          bg-white/75
                          shadow-md
                          shadow-emerald-100/50
                          backdrop-blur-md
                        `
                        : `
                          hover:bg-white/50
                          hover:shadow-sm
                        `
                    }
                  `}
                >
                  <Link
                    to="/app/notification"
                    className="flex items-center gap-3 px-2.5"
                  >
                    <div
                      className="
                        flex h-9 w-9
                        items-center justify-center
                        rounded-xl
                        bg-rose-100
                        text-rose-500
                        transition-transform
                        group-hover:scale-110
                      "
                    >
                      <Bell className="h-[18px] w-[18px]" />
                    </div>

                    <span
                      className={`
                        text-sm
                        font-semibold
                        ${
                          isActive("/app/notification")
                            ? "text-gray-900"
                            : "text-gray-600 group-hover:text-gray-900"
                        }
                      `}
                    >
                      Notifications
                    </span>

                    {notificLen > 0 && (
                      <span
                        className="
                          ml-auto
                          flex
                          min-w-5
                          h-5
                          items-center
                          justify-center
                          rounded-full
                          bg-gradient-to-r
                          from-rose-500
                          to-pink-500
                          px-1.5
                          text-[10px]
                          font-bold
                          text-white
                          shadow-sm
                          shadow-rose-200
                        "
                      >
                        {notificLen > 99 ? "99+" : notificLen}
                      </span>
                    )}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* =====================================================
          USER
      ====================================================== */}
      <SidebarFooter className="px-3 pb-4 pt-3">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              className="
                group
                relative
                flex
                w-full
                items-center
                gap-3
                overflow-hidden
                rounded-2xl
                border
                border-white/80
                bg-white/60
                px-3
                py-3
                text-left
                shadow-md
                shadow-indigo-100/30
                backdrop-blur-xl
                transition-all
                duration-200
                hover:bg-white/80
                hover:shadow-lg
              "
            >
              {/* Gradient decoration */}
              <div
                className="
                  pointer-events-none
                  absolute
                  -bottom-8
                  -right-8
                  h-20
                  w-20
                  rounded-full
                  bg-emerald-300/20
                  blur-2xl
                "
              />

              <Avatar
                className="
                  relative
                  flex
                  h-10
                  w-10
                  shrink-0
                  items-center
                  justify-center
                  overflow-hidden
                  rounded-xl
                  bg-gradient-to-br
                  from-emerald-400
                  to-teal-500
                  shadow-md
                "
              >
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt={user?.username ?? "User"}
                  className="h-full w-full object-cover"
                />

                <AvatarFallback
                  className="
                    flex
                    h-full
                    w-full
                    items-center
                    justify-center
                    bg-gradient-to-br
                    from-emerald-400
                    to-teal-500
                    text-xs
                    font-bold
                    text-white
                  "
                >
                  {initials}
                </AvatarFallback>
              </Avatar>

              <div className="relative flex min-w-0 flex-1 flex-col">
                <span className="truncate text-sm font-bold text-gray-800">
                  {user?.username || "User"}
                </span>

                <span className="truncate text-[11px] text-gray-500">
                  {user?.email}
                </span>
              </div>

              <BsThreeDotsVertical
                className="
                  relative
                  h-4
                  w-4
                  shrink-0
                  text-gray-400
                  transition-colors
                  group-hover:text-gray-700
                "
              />
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            side={isMobile ? "top" : "right"}
            align="end"
            sideOffset={10}
            className="
              z-50
              w-64
              rounded-2xl
              border
              border-white/70
              bg-white/90
              p-2
              shadow-2xl
              shadow-indigo-200/30
              backdrop-blur-xl
            "
          >
            <DropdownMenuLabel className="p-2">
              <div className="flex items-center gap-3">
                <Avatar
                  className="
                    flex
                    h-10
                    w-10
                    shrink-0
                    items-center
                    justify-center
                    overflow-hidden
                    rounded-xl
                    bg-gradient-to-br
                    from-emerald-400
                    to-teal-500
                  "
                >
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt={user?.username ?? "User"}
                    className="h-full w-full object-cover"
                  />

                  <AvatarFallback
                    className="
                      flex
                      h-full
                      w-full
                      items-center
                      justify-center
                      bg-gradient-to-br
                      from-emerald-400
                      to-teal-500
                      text-xs
                      font-bold
                      text-white
                    "
                  >
                    {initials}
                  </AvatarFallback>
                </Avatar>

                <div className="min-w-0">
                  <p className="truncate text-sm font-bold text-gray-800">
                    {user?.username}
                  </p>

                  <p className="truncate text-xs font-normal text-gray-500">
                    {user?.email}
                  </p>
                </div>
              </div>
            </DropdownMenuLabel>

            <DropdownMenuSeparator className="my-2 bg-gray-100" />

            <DropdownMenuGroup>
              <DropdownMenuItem
                asChild
                className="rounded-xl focus:bg-emerald-50"
              >
                <Link
                  to="/app/user"
                  className="
                    flex
                    cursor-pointer
                    items-center
                    gap-3
                    rounded-xl
                    px-3
                    py-2.5
                  "
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                    <UserCircle className="h-4 w-4" />
                  </div>

                  <span className="text-sm font-semibold text-gray-700">
                    Account
                  </span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuSeparator className="my-2 bg-gray-100" />

            <DropdownMenuItem
              onClick={handleLogout}
              className="
                cursor-pointer
                rounded-xl
                px-3
                py-2.5
                text-red-600
                focus:bg-red-50
                focus:text-red-600
              "
            >
              <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-lg bg-red-100">
                <LogOut className="h-4 w-4" />
              </div>

              <span className="text-sm font-semibold">Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
