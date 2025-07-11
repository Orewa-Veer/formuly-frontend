import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "./ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@radix-ui/react-collapsible";
import { Home } from "lucide-react";
import { useState } from "react";
import { BsTags } from "react-icons/bs";
import { FaRegBookmark, FaRegClock } from "react-icons/fa";
import { FaArrowTrendUp, FaRegMessage } from "react-icons/fa6";
import { MdOutlinePeopleAlt } from "react-icons/md";
import { Link } from "react-router-dom";

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
    title: "Rent",
    url: "#",
    icon: FaArrowTrendUp,
  },
  {
    title: "Recent",
    url: "#",
    icon: FaRegClock,
  },
  {
    title: "Bookmark",
    url: "/bookmark",
    icon: FaRegBookmark,
  },
];

export function AppSidebar() {
  const [active, setactive] = useState("Home");
  return (
    <Sidebar variant="floating" className="fixed  ">
      <SidebarContent className="mt-4 ml-3 shadow-md ">
        <SidebarGroup>
          <SidebarGroupLabel className="flex justify-between text-[#059669] font-sans font-bold text-3xl px-3 pb-0">
            <span>Forumly</span>
          </SidebarGroupLabel>
          <SidebarGroupLabel className="text-xs text-[#6B7280] px-3">
            Developer Community
          </SidebarGroupLabel>
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
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup className="mb-8">
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
        </SidebarGroup>
        <SidebarGroup className="mb-8">
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
                        <SidebarMenuSubButton className="hover:bg-emerald-50 hover:text-emerald-600">
                          <Link
                            to="#"
                            className="font-sans text-xs font-medium"
                          >
                            Frontend Developers
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton className="hover:bg-emerald-50 hover:text-emerald-600">
                          <a href="#" className="font-sans text-xs font-medium">
                            Backend Engineers
                          </a>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton className="hover:bg-emerald-50 hover:text-emerald-600">
                          <a href="#" className="font-sans text-xs font-medium">
                            DevOps & Cloud
                          </a>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton className="hover:bg-emerald-50 hover:text-emerald-600">
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
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
