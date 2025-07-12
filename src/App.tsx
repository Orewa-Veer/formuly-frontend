import { Route, Routes } from "react-router-dom";
import "./App.css";
import AskForm from "./Components/AskForm";
import Discussions from "./Components/Discussions";
import Home from "./Components/Home";
import QuestionPage from "./Components/QuestionPage";
import { AppSidebar } from "./Components/Sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "./Components/ui/sidebar";
import { AuthProvider } from "./services/AuthContext";
import useCurrentCustomer from "./useHooks/useCurrentCustomer";
import UserProfile from "./Components/UserProfile";

function App() {
  const user = useCurrentCustomer();
  if (!user) return <div>Unauthorized</div>;
  return (
    <AuthProvider>
      <div className="  h-full w-full flex ">
        <div className={`transition-all duration-200 ease-in-out flex-1  `}>
          <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
              <main className="pt-3">
                <SidebarTrigger />
                <div className="flex flex-col flex-1">
                  <Routes>
                    <Route path="/" element={<Home />}></Route>
                    <Route
                      path="/questions/:id"
                      element={<Discussions />}
                    ></Route>
                    <Route path="/questions" element={<QuestionPage />}></Route>
                    <Route path="/popup" element={<AskForm />}></Route>
                    <Route path="/user" element={<UserProfile />}></Route>
                  </Routes>
                </div>
              </main>
            </SidebarInset>
          </SidebarProvider>
        </div>
      </div>
    </AuthProvider>
  );
}

export default App;
