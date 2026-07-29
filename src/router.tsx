import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import LoginPage from "@/pages/LoginPage";
import HomePage from "@/pages/HomePage";
import ShopPage from "@/pages/ShopPage";
import ProductPage from "@/pages/ProductPage";
import CartPage from "@/pages/CartPage";
import CheckoutPage from "@/pages/CheckoutPage";
import DashboardPage from "@/pages/DashboardPage";
import AdminPage from "@/pages/AdminPage";
import NotFoundPage from "@/pages/NotFoundPage";
import AppShell from "@/components/layout/AppShell";

function Shell({ noShell, children }: { noShell?: boolean; children: React.ReactNode }) {
  if (noShell) return <>{children}</>;
  return <AppShell>{children}</AppShell>;
}

export default function AppRouter() {
  function WrapShell({ children }: { children: React.ReactNode }) {
    return <Shell>{children}</Shell>;
  }
  return (
    <BrowserRouter>
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route
            path="/login"
            element={
              <Shell noShell>
                <LoginPage />
              </Shell>
            }
          />
          <Route
            path="/home"
            element={
              <WrapShell>
                <HomePage />
              </WrapShell>
            }
          />
          <Route
            path="/shop"
            element={
              <WrapShell>
                <ShopPage />
              </WrapShell>
            }
          />
          <Route
            path="/product/:id"
            element={
              <WrapShell>
                <ProductPage />
              </WrapShell>
            }
          />
          <Route
            path="/cart"
            element={
              <WrapShell>
                <CartPage />
              </WrapShell>
            }
          />
          <Route
            path="/checkout"
            element={
              <WrapShell>
                <CheckoutPage />
              </WrapShell>
            }
          />
          <Route
            path="/dashboard"
            element={
              <WrapShell>
                <DashboardPage />
              </WrapShell>
            }
          />
          <Route
            path="/admin/*"
            element={
              <WrapShell>
                <AdminPage />
              </WrapShell>
            }
          />
          <Route
            path="*"
            element={
              <WrapShell>
                <NotFoundPage />
              </WrapShell>
            }
          />
        </Routes>
      </AnimatePresence>
    </BrowserRouter>
  );
}
