import { SidebarProvider, SidebarTrigger } from "../Components/ui/sidebar";
import { AppSidebar } from "../Components/Sidebar";
interface Props {
  children: React.ReactNode;
  open: boolean;
}
export async function Layout({ children, open }: Props) {
  return (
    <SidebarProvider open={open}  >
      <AppSidebar />
      <main>
        <SidebarTrigger/>
        {children}
      </main>
    </SidebarProvider>
  );
}
