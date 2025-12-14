import { Route, Routes } from "react-router-dom";
import "./App.css";
import AskForm from "./components/AskForm";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "./components/ui/sidebar";
import { SocketProvider } from "./SocketContext";
import Bookmark from "./features/Bookmark/Bookmark";
import UserProfile from "./features/UserProfile/pages/UserProfile";
import Discussions from "./features/discussions/components/Discussions";
import QuestionPage from "./features/discussions/pages/QuestionPage";
import Home from "./features/home/Home";
import Notification from "./features/notification/page/Notification";
import { AppSidebar } from "./features/sidebar/Sidebar";
import { useAuth } from "./services/useAuth";
import TagsSectioin from "./features/tags/page/Tags";
import TagForm from "./features/tags/components/TagForm";

function App() {
  const { user } = useAuth();

  if (!user) return <div>Unauthorized</div>;
  return (
    <div className="  min-h-screen overflow-x-hidden  ">
      
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset>
            <main className="pt-3 min-w-0 overflow-y-auto">
              <SidebarTrigger />
              <div className="">
                <SocketProvider>
                  <Routes>
                    <Route path="/" element={<Home />}></Route>
                    <Route
                      path="/questions/:id"
                      element={<Discussions />}
                    ></Route>
                    <Route path="/questions" element={<QuestionPage />}></Route>

                    <Route path="/popup" element={<AskForm />}></Route>
                    <Route path="/user" element={<UserProfile />}></Route>
                    <Route path="/bookmark" element={<Bookmark />}></Route>
                    <Route path="/tags" element={<TagsSectioin />}></Route>
                    <Route path="/createTag" element={<TagForm />}></Route>
                    <Route
                      path="/notification"
                      element={<Notification />}
                    ></Route>
                  </Routes>
                </SocketProvider>
              </div>
            </main>
          </SidebarInset>
        </SidebarProvider>
      
    </div>
  );
}

export default App;
