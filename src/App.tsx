import { Route, Routes } from "react-router-dom";
import "./App.css";
import QuestionPage from "./Components/QuestionPage";
import Home from "./Components/Home";
import { AppSidebar } from "./Components/Sidebar";
import { SidebarProvider } from "./Components/ui/sidebar";
import { AuthProvider } from "./services/AuthContext";
import Discussions from "./Components/Discussions";
import AskForm from "./Components/AskForm";
import useCurrentCustomer from "./useHooks/useCurrentCustomer";

function App() {
  const user = useCurrentCustomer();
  if (!user) return <div>Unauthorized</div>;
  return (
    <AuthProvider>
      <div className="  h-full w-full flex ">
        <aside className="w-64">
          <SidebarProvider>
            <AppSidebar />
          </SidebarProvider>
        </aside>
        <main className="w-full">
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/questions/:id" element={<Discussions />}></Route>
            <Route path="/questions" element={<QuestionPage />}></Route>
            <Route path="/popup" element={<AskForm />}></Route>
          </Routes>
        </main>
      </div>
    </AuthProvider>
  );
}

export default App;
