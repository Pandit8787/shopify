import { Outlet } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/layout/CartDrawer";

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen flex flex-col">
      <Navbar />
      <main className="relative flex-1">{children}</main>
      <Footer />
      <CartDrawer />
      <Outlet />
    </div>
  );
}
