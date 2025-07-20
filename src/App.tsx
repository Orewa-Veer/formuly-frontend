import { Route, Routes } from "react-router-dom";
import "./App.css";
import AskForm from "./Components/AskForm";
import Bookmark from "./features/Bookmark/Bookmark";
import Discussions from "./features/discussions/components/Discussions";
import Home from "./features/home/Home";
import Notification from "./features/notification/page/Notification";
import QuestionPage from "./features/discussions/pages/QuestionPage";
import { AppSidebar } from "./features/sidebar/Sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "./Components/ui/sidebar";
import UserProfile from "./features/UserProfile/UserProfile";
import useCurrentCustomer from "./useHooks/useCurrentCustomer";
import { SocketProvider } from "./SocketContext";

function App() {
  const user = useCurrentCustomer();

  if (!user) return <div>Unauthorized</div>;
  return (
    <div className="  h-full w-full flex ">
      <div className={`transition-all duration-200 ease-in-out flex-1  `}>
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset>
            <main className="pt-3">
              <SidebarTrigger />
              <div className="flex flex-col flex-1">
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
    </div>
  );
}

export default App;
