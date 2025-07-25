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
} from "../../Components/ui/sidebar";
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
    <Sidebar variant="inset">
      <SidebarHeader className="mt-2 mb-3">
        <div className="flex justify-around text-[#059669] font-sans font-extrabold text-4xl px-3 pb-0 ">
          <span>Forumly</span>
          <MessageSquare className="size-9 relative top-1" />
        </div>

        <span className="text-xs text-[#6B7280] px-3">Developer Community</span>
      </SidebarHeader>
      <SidebarContent className="  ">
        <SidebarGroup>
          <SidebarGroupContent className="text-sm font-medium">
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem
                  key={item.title}
                  className={`${
                    active === item.title && "bg-emerald-50 text-emerald-600"
                  } px-4 py-2 hover:bg-emerald-50 hover:text-emerald-600 `}
                >
                  <SidebarMenuButton
                    className="hover:bg-emerald-50 hover:text-emerald-600"
                    asChild
                    onClick={() => setactive(item.title)}
                  >
                    <Link to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              <SidebarMenuItem
                key={"notification"}
                className={`${
                  active === "Notifications" && "bg-emerald-50 text-emerald-600"
                } px-4 py-2 hover:bg-emerald-50 hover:text-emerald-600 `}
              >
                <SidebarMenuButton
                  className="hover:bg-emerald-50 hover:text-emerald-600"
                  asChild
                  onClick={() => setactive("Notifications")}
                >
                  <Link to={"/app/notification"}>
                    <Bell />
                    <span className="flex items-center gap-2">
                      Notifications{" "}
                      {data.length === 0 ? (
                        ""
                      ) : (
                        <div className="size-4 rounded-full items-center flex justify-center text-xs bg-red-600 text-white">
                          {data.length}
                        </div>
                      )}
                    </span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        {/* <SidebarGroup className="">
          <SidebarGroupContent>
            <SidebarMenu>
              <Collapsible defaultOpen className="group/collapsible">
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton className="mb-3  ">
                      <BsTags />
                      <a
                        href="#"
                        className="text-[#374151] text-sm font-sans font-medium"
                      >
                        Popular Tags
                      </a>
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                </SidebarMenuItem>
              </Collapsible>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup> */}
        {/* <SidebarGroup className="mb-3">
          <SidebarGroupContent>
            <SidebarMenu>
              <Collapsible defaultOpen className="group/collapsible">
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton>
                      <MdOutlinePeopleAlt />
                      <a
                        href="#"
                        className="font-sans text-sm font-medium text-[#374151]"
                      >
                        Communities
                      </a>
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <SidebarMenuSub>
                    <CollapsibleContent>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton
                          asChild
                          className="hover:bg-emerald-50 hover:text-emerald-600"
                        >
                          <Link
                            to="#"
                            className="font-sans text-xs font-medium"
                          >
                            Frontend Developers
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton
                          asChild
                          className="hover:bg-emerald-50 hover:text-emerald-600"
                        >
                          <a href="#" className="font-sans text-xs font-medium">
                            Backend Engineers
                          </a>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton
                          asChild
                          className="hover:bg-emerald-50 hover:text-emerald-600"
                        >
                          <a href="#" className="font-sans text-xs font-medium">
                            DevOps & Cloud
                          </a>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton
                          asChild
                          className="hover:bg-emerald-50 hover:text-emerald-600"
                        >
                          <a href="#" className="font-sans text-xs font-medium">
                            Mobile Development
                          </a>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    </CollapsibleContent>
                  </SidebarMenuSub>
                </SidebarMenuItem>
              </Collapsible>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup> */}
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size={"lg"}
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <Avatar className="h-8 w-8 rounded-lg ">
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      className="rounded-full"
                    />
                    <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">
                      {user?.username}
                    </span>
                    <span className="text-muted-foreground truncate text-xs">
                      {user?.email}
                    </span>
                  </div>
                  <BsThreeDotsVertical className="ml-auto size-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg bg-gray-100 border border-gray-200 shadow-lg p-3"
                side={isMobile ? "bottom" : "right"}
                align="end"
                sideOffset={4}
              >
                <DropdownMenuLabel className="p-0 font-normal ">
                  {" "}
                  <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    <Avatar className="h-8 w-8 rounded-lg">
                      <AvatarImage
                        src="https://github.com/shadcn.png"
                        className="rounded-full"
                      />
                      <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-medium">
                        {user?.username}
                      </span>
                      <span className="text-muted-foreground truncate text-xs">
                        {user?.email}
                      </span>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className=" border-1 border-gray-300 mb-2" />
                <DropdownMenuGroup className="flex flex-col gap-2 mb-2 pl-1">
                  <DropdownMenuItem className="flex text-sm font-medium items-center ">
                    <Link to={"/app/user"} className="flex items-center gap-2">
                      <UserCircle className="size-5" />
                      Account
                    </Link>
                  </DropdownMenuItem>
                  {/* <DropdownMenuItem className="flex text-sm font-medium items-center gap-2">
                    <IoNotifications className="size-5" />
                    Notifications
                  </DropdownMenuItem> */}
                </DropdownMenuGroup>
                <DropdownMenuSeparator className=" border-1 border-gray-300" />
                <DropdownMenuItem
                  className="flex text-sm font-medium items-center gap-2 mt-2 pl-1 text-red-700 cursor-pointer"
                  onClick={handleLogout}
                >
                  <LogOut className="size-5" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
