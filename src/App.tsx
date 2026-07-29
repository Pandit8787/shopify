import AppRouter from "@/router";
import CustomCursor from "@/components/layout/CustomCursor";
import ParticlesBg from "@/components/layout/ParticlesBg";
import AuroraBackdrop from "@/components/layout/AuroraBackdrop";
import { useUIStore } from "@/stores/ui";
import { useEffect } from "react";
import SearchOverlay from "@/components/layout/SearchOverlay";
import QuickViewModal from "@/components/shop/QuickViewModal";
import BackToTop from "@/components/layout/BackToTop";
import Toaster from "@/components/ui/Toaster";

export default function App() {
  const theme = useUIStore((s) => s.theme);
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);
  return (
    <>
      <AuroraBackdrop />
      <ParticlesBg />
      <CustomCursor />
      <AppRouter />
      <SearchOverlay />
      <QuickViewModal />
      <BackToTop />
      <Toaster />
    </>
  );
}
