import { create } from "zustand";
import type { User } from "@/services/types";
import { notifications } from "@/fixtures";

interface AuthState {
  user: User | null;
  isAuthed: boolean;
  isGuest: boolean;
  notifications: typeof notifications;
  login: (email: string, password?: string) => Promise<User>;
  loginOtp: (email: string, code: string) => Promise<User>;
  loginGoogle: () => Promise<User>;
  loginApple: () => Promise<User>;
  continueGuest: () => void;
  logout: () => void;
  markNotificationRead: (id: string) => void;
}

const demoUser: User = {
  id: "u-0001",
  name: "Aarav Mehta",
  email: "aarav@luxe.shop",
  avatar:
    "https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&w=256&q=80",
  wallet: 1240.5,
  rewardPoints: 28650,
  referralCode: "AARAV-LUXE-5K",
  addresses: [
    {
      id: "addr-1",
      line1: "221B, Pinnacle Heights, BKC",
      city: "Mumbai",
      country: "India",
      zip: "400051",
      phone: "+91 98200 12345",
    },
  ],
};

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isAuthed: false,
  isGuest: false,
  notifications,
  login: async (email) => {
    await new Promise((r) => setTimeout(r, 800));
    const user: User = {
      ...demoUser,
      email,
      name: email.split("@")[0].replace(/[^a-zA-Z]/g, " ") || demoUser.name,
    };
    set({ user, isAuthed: true, isGuest: false });
    return user;
  },
  loginOtp: async (email) => {
    await new Promise((r) => setTimeout(r, 600));
    const user: User = { ...demoUser, email };
    set({ user, isAuthed: true, isGuest: false });
    return user;
  },
  loginGoogle: async () => {
    await new Promise((r) => setTimeout(r, 500));
    set({ user: demoUser, isAuthed: true, isGuest: false });
    return demoUser;
  },
  loginApple: async () => {
    await new Promise((r) => setTimeout(r, 500));
    set({ user: demoUser, isAuthed: true, isGuest: false });
    return demoUser;
  },
  continueGuest: () => set({ isGuest: true, isAuthed: false, user: null }),
  logout: () => set({ user: null, isAuthed: false, isGuest: false }),
  markNotificationRead: (id) =>
    set({
      notifications: get().notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n
      ),
    }),
}));
