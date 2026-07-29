import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Mail,
  Lock,
  EyeOff,
  Eye,
  Apple,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Fingerprint,
  MessageCircle,
} from "lucide-react";
import { useAuthStore } from "@/stores/auth";
import { cn, delay } from "@/lib/utils";
import { toast } from "@/components/ui/Toaster";
import Logo from "@/components/ui/Logo";

type Stage =
  | "intro"
  | "walk-in"
  | "center"
  | "unzip"
  | "beam"
  | "panel-expand"
  | "idle"
  | "logging-in"
  | "smile"
  | "walk-out"
  | "done";

const stageOrder: Stage[] = [
  "walk-in",
  "center",
  "unzip",
  "beam",
  "panel-expand",
  "idle",
];

export default function LoginPage() {
  const [stage, setStage] = useState<Stage>("intro");
  const [skipIntro, setSkipIntro] = useState(false);
  const timelineRef = useRef<number | null>(null);
  const nav = useNavigate();
  const login = useAuthStore((s) => s.login);
  const loginGoogle = useAuthStore((s) => s.loginGoogle);
  const loginApple = useAuthStore((s) => s.loginApple);
  const loginOtp = useAuthStore((s) => s.loginOtp);
  const continueGuest = useAuthStore((s) => s.continueGuest);

  const [mode, setMode] = useState<"password" | "otp" | "magic">("password");
  const [email, setEmail] = useState("aarav@luxe.shop");
  const [password, setPassword] = useState("••••••••");
  const [otp, setOtp] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const tiltX = useTransform(mouseY, [-300, 300], [-4, 4]);
  const tiltY = useTransform(mouseX, [-400, 400], [-5, 5]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      mouseX.set(e.clientX - cx);
      mouseY.set(e.clientY - cy);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mouseX, mouseY]);

  useEffect(() => {
    if (skipIntro) {
      setStage("idle");
      return;
    }
    const timeline = async () => {
      await delay(100);
      setStage("walk-in");
      await delay(2000);
      setStage("center");
      await delay(500);
      setStage("unzip");
      await delay(1100);
      setStage("beam");
      await delay(1100);
      setStage("panel-expand");
      await delay(900);
      setStage("idle");
    };
    timeline();
    return () => {
      if (timelineRef.current) window.clearTimeout(timelineRef.current);
    };
  }, [skipIntro]);

  const go = async () => {
    setLoading(true);
    try {
      if (mode === "password") await login(email, password);
      else if (mode === "otp") await loginOtp(email, otp || "000000");
      else await login(email);
      toast("Welcome back", "You're now signed in to LUXE.", "success");
      setStage("logging-in");
      await delay(400);
      setStage("smile");
      await delay(900);
      setStage("walk-out");
      await delay(1800);
      setStage("done");
      nav("/home");
    } finally {
      setLoading(false);
    }
  };

  const guest = async () => {
    continueGuest();
    toast("Welcome to LUXE", "Browsing as guest — full access to shop.", "info");
    setStage("walk-out");
    await delay(1400);
    nav("/home");
  };

  const blurBg = ["beam", "panel-expand", "idle", "logging-in", "smile"].includes(stage);

  return (
    <div className="relative h-screen w-full overflow-hidden bg-luxe-bg text-white">
      <div className="absolute inset-0 bg-aurora-gradient animate-auroraShift opacity-60" />
      <div className="absolute inset-0" style={{
        background:
          "radial-gradient(ellipse at 50% 50%, rgba(124,58,237,0.35), transparent 55%), radial-gradient(ellipse at 20% 80%, rgba(212,175,55,0.25), transparent 50%)",
      }} />

      {/* Stars / Dust */}
      <DustLayer count={skipIntro ? 40 : 90} />

      {/* Top branding */}
      <div className="absolute left-0 right-0 top-0 z-30 flex items-center justify-between px-6 py-5 sm:px-10">
        <div className="flex items-center gap-3">
          <Logo />
          <div className="font-display text-xl font-bold">
            <span className="text-gradient-signature">LUXE</span>
            <span className="ml-2 text-[10px] font-mono opacity-60">v1.0 · ATELIER</span>
          </div>
        </div>
        {!skipIntro && stage !== "done" && (
          <button
            onClick={() => setSkipIntro(true)}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-white/80 backdrop-blur hover:bg-white/10"
          >
            Skip introduction <ArrowRight className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      {/* Stage floor + DOF */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-700"
        style={{
          backdropFilter: blurBg ? "blur(14px) saturate(140%)" : "blur(0)",
          opacity: blurBg ? 1 : 0,
          WebkitBackdropFilter: blurBg ? "blur(14px) saturate(140%)" : "blur(0)",
        }}
      />

      {/* Floor gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-[45%]" style={{
        background:
          "linear-gradient(180deg, transparent, rgba(0,0,0,0.8) 60%, #000 100%)",
      }} />
      <div
        className="absolute bottom-0 left-1/2 h-60 w-[140%] -translate-x-1/2 rounded-[50%]"
        style={{
          background:
            "radial-gradient(ellipse at center top, rgba(124,58,237,0.35), transparent 60%)",
          filter: "blur(10px)",
        }}
      />

      {/* Character */}
      <CharacterStage stage={stage} />

      {/* Holographic panel */}
      <motion.div
        className="absolute left-1/2 top-1/2 z-30 w-[min(92vw,480px)] -translate-x-1/2"
        initial={{ y: "-10%", opacity: 0, scale: 0.6 }}
        animate={
          stage === "panel-expand"
            ? { y: "-10%", opacity: 1, scale: 1 }
            : ["idle", "logging-in", "smile"].includes(stage)
            ? { y: "-24%", opacity: 1, scale: 1 }
            : stage === "walk-out"
            ? { y: "-30%", opacity: 0, scale: 0.7 }
            : { y: "-10%", opacity: 0, scale: 0.5 }
        }
        transition={{ type: "spring", damping: 24, stiffness: 220 }}
        style={{ rotateX: tiltX, rotateY: tiltY }}
      >
        <AnimatePresence mode="wait">
          {["panel-expand", "idle", "logging-in", "smile"].includes(stage) && (
            <motion.div
              key="panel"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              className="holo-panel p-[2px]"
            >
              <div className="relative overflow-hidden rounded-[22px] bg-black/50 p-6 sm:p-8">
                <div className="pointer-events-none absolute -top-20 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(212,175,55,0.35), transparent 60%)",
                    mixBlendMode: "screen",
                  }}
                />
                <div className="mb-6 flex items-start justify-between">
                  <div>
                    <div className="eyebrow !bg-gold-500/15 !text-gold-300">
                      <Sparkles className="h-3 w-3" /> Sign in to LUXE
                    </div>
                    <h1 className="mt-3 font-display text-3xl font-bold leading-tight">
                      Your{" "}
                      <span className="text-gradient-signature">holographic</span>{" "}
                      key to the atelier.
                    </h1>
                  </div>
                </div>

                <form
                  className="space-y-4"
                  onSubmit={(e) => {
                    e.preventDefault();
                    go();
                  }}
                >
                  <div>
                    <label className="label-luxe !text-white/60">Email</label>
                    <div className="relative">
                      <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gold-400" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@luxe.atelier"
                        className="input-luxe pl-11 !bg-white/5 !text-white !border-white/10"
                      />
                    </div>
                  </div>

                  <AnimatePresence mode="wait">
                    {mode === "password" && (
                      <motion.div
                        key="pw"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                      >
                        <div className="label-luxe !text-white/60 flex items-center justify-between">
                          Password
                          <button
                            type="button"
                            onClick={() => setMode("otp")}
                            className="underline-offset-4 hover:underline text-gold-400"
                          >
                            Use OTP instead
                          </button>
                        </div>
                        <div className="relative">
                          <Lock className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gold-400" />
                          <input
                            type={showPw ? "text" : "password"}
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            className="input-luxe pl-11 pr-11 !bg-white/5 !text-white !border-white/10"
                          />
                          <button
                            type="button"
                            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1.5 hover:bg-white/10"
                            onClick={() => setShowPw((v) => !v)}
                            aria-label="Toggle password"
                          >
                            {showPw ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </button>
                        </div>
                      </motion.div>
                    )}

                    {mode === "otp" && (
                      <motion.div
                        key="otp"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                      >
                        <div className="label-luxe !text-white/60 flex items-center justify-between">
                          One-time code
                          <button
                            type="button"
                            onClick={() => {
                              toast("Code sent", "Check your email: 000000", "info");
                            }}
                            className="underline-offset-4 hover:underline text-gold-400"
                          >
                            Resend
                          </button>
                        </div>
                        <div className="grid grid-cols-6 gap-2">
                          {[0, 1, 2, 3, 4, 5].map((i) => (
                            <input
                              key={i}
                              inputMode="numeric"
                              maxLength={1}
                              value={otp[i] ?? ""}
                              onChange={(e) => {
                                const v = e.target.value.replace(/\D/g, "").slice(0, 1);
                                const arr = otp.split("");
                                arr[i] = v;
                                setOtp(arr.join(""));
                              }}
                              className="h-14 text-center font-display text-xl font-bold tracking-widest rounded-xl !bg-white/5 !text-white !border-white/10 border outline-none focus:!border-gold-500/60 focus:shadow-glow transition"
                            />
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {mode === "magic" && (
                      <motion.div
                        key="magic"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="rounded-2xl border border-gold-500/30 bg-gold-500/5 p-4 text-sm text-white/80"
                      >
                        We'll email you a secure magic link. No password needed.
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="flex items-center justify-between text-xs">
                    <label className="inline-flex items-center gap-2 text-white/70">
                      <input type="checkbox" defaultChecked className="accent-royalpurple-500" />
                      Remember this device
                    </label>
                    <a href="#" className="text-gold-400 hover:underline">
                      Trouble signing in?
                    </a>
                  </div>

                  <motion.button
                    disabled={loading}
                    type="submit"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="btn-primary w-full group"
                  >
                    {loading ? (
                      <span className="inline-flex items-center gap-2">
                        <span className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                        Crafting your experience…
                      </span>
                    ) : (
                      <>
                        <Fingerprint className="h-4 w-4" /> Unlock Atelier Access
                        <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                      </>
                    )}
                  </motion.button>

                  <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-white/10" />
                    </div>
                    <div className="relative flex justify-center">
                      <span className="bg-black/50 px-3 text-[10px] font-bold uppercase tracking-[0.25em] text-white/40">
                        Or continue with
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={async () => {
                        setLoading(true);
                        await loginGoogle();
                        setLoading(false);
                        toast("Welcome back", "Signed in with Google.", "success");
                        nav("/home");
                      }}
                      className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 py-3 text-sm font-semibold hover:bg-white/10"
                    >
                      <svg viewBox="0 0 48 48" className="h-4 w-4">
                        <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3A12 12 0 1124 12c2.9 0 5.7 1.1 7.7 3l5.7-5.7A20 20 0 1044 24c0-1.2-.1-2.4-.4-3.5z"/>
                        <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8A12 12 0 0124 12c2.9 0 5.7 1.1 7.7 3l5.7-5.7A20 20 0 006.3 14.7z"/>
                        <path fill="#4CAF50" d="M24 44c5.2 0 10-2 13.7-5.2l-6.3-5.2A12 12 0 0112.7 28l-6.5 5A20 20 0 0024 44z"/>
                        <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3a12 12 0 01-3.9 5.6l6.3 5.2C40 35.5 44 30.3 44 24c0-1.2-.1-2.4-.4-3.5z"/>
                      </svg>
                      <span className="hidden md:inline">Google</span>
                    </button>
                    <button
                      type="button"
                      onClick={async () => {
                        setLoading(true);
                        await loginApple();
                        setLoading(false);
                        toast("Welcome back", "Signed in with Apple.", "success");
                        nav("/home");
                      }}
                      className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 py-3 text-sm font-semibold hover:bg-white/10"
                    >
                      <Apple className="h-4 w-4" />
                      <span className="hidden md:inline">Apple</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setMode(mode === "password" ? "otp" : "magic");
                      }}
                      className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 py-3 text-sm font-semibold hover:bg-white/10"
                    >
                      <MessageCircle className="h-4 w-4" />
                      <span className="hidden md:inline">
                        {mode === "magic" ? "OTP" : mode === "otp" ? "PW" : "Magic"}
                      </span>
                    </button>
                  </div>

                  <div className="flex items-center justify-between pt-2 text-xs text-white/60">
                    <div className="inline-flex items-center gap-1.5">
                      <ShieldCheck className="h-3.5 w-3.5 text-gold-400" />
                      End-to-end encrypted
                    </div>
                    <button
                      type="button"
                      onClick={guest}
                      className="text-white/80 hover:text-white underline-offset-4 hover:underline"
                    >
                      Continue as Guest →
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Ambient corner texts */}
      <div className="pointer-events-none absolute bottom-6 left-6 z-20 max-w-xs space-y-1 text-[11px] font-mono text-white/50">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          LUXE • SECURE SESSION
        </div>
        <div className="opacity-80">
          ID · 4A-9F-31 · TOKYO / PARIS / NY
        </div>
      </div>
      <div className="pointer-events-none absolute bottom-6 right-6 z-20 hidden max-w-xs items-end gap-3 text-right text-[11px] font-mono text-white/50 sm:flex">
        <div>
          <div className="opacity-70">Session FPS</div>
          <div className="text-white/80">60 · V-SYNC</div>
        </div>
        <div>
          <div className="opacity-70">Render</div>
          <div className="text-white/80">WebGL · R3F</div>
        </div>
      </div>
    </div>
  );
}

function DustLayer({ count }: { count: number }) {
  const parts = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        top: Math.random() * 100,
        left: Math.random() * 100,
        size: Math.random() * 2.5 + 0.8,
        delay: Math.random() * 6,
        duration: 8 + Math.random() * 10,
        hue: Math.random() > 0.5 ? 48 : 270,
      })),
    [count]
  );
  return (
    <div className="pointer-events-none absolute inset-0 z-20">
      {parts.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full"
          initial={{ opacity: 0, y: 10 }}
          animate={{
            opacity: [0, 0.7, 0],
            y: [0, -40, -80],
            x: [0, Math.sin(p.id) * 10, -Math.cos(p.id) * 20],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            top: `${p.top}%`,
            left: `${p.left}%`,
            width: p.size,
            height: p.size,
            background: `hsla(${p.hue}, 90%, 70%, 0.8)`,
            boxShadow: `0 0 ${p.size * 6}px hsla(${p.hue}, 90%, 60%, 0.6)`,
          }}
        />
      ))}
    </div>
  );
}

function CharacterStage({ stage }: { stage: Stage }) {
  const stageWalkIn = stage === "walk-in";
  const atCenter = ["center", "unzip", "beam", "panel-expand", "idle", "logging-in", "smile"].includes(stage);
  const unzipping = ["unzip", "beam", "panel-expand", "idle", "logging-in", "smile"].includes(stage);
  const smiling = ["smile", "walk-out", "done"].includes(stage);
  const walkOut = ["walk-out", "done"].includes(stage);
  const beam = ["beam", "panel-expand"].includes(stage);

  return (
    <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden">
      {/* Character wrapper */}
      <motion.div
        className="absolute bottom-0 left-0"
        initial={{ x: "-40%", y: "0%" }}
        animate={{
          x: stageWalkIn
            ? "calc(50vw - 140px)"
            : atCenter
            ? "calc(50vw - 140px)"
            : walkOut
            ? "120vw"
            : "calc(50vw - 140px)",
        }}
        transition={{
          type: "tween",
          ease: [0.22, 1, 0.36, 1],
          duration: stageWalkIn ? 2.2 : walkOut ? 2 : 0.5,
        }}
        style={{ width: 300 }}
      >
        <motion.div
          animate={
            stageWalkIn || walkOut
              ? { y: [0, -8, 0, -8, 0] }
              : { y: 0 }
          }
          transition={{
            duration: 0.55,
            repeat: stageWalkIn || walkOut ? Infinity : 0,
          }}
          className="relative"
          style={{ width: 280, height: 520 }}
        >
          {/* Shadow */}
          <motion.div
            className="absolute left-1/2 bottom-0 h-6 w-56 -translate-x-1/2 rounded-[50%]"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(0,0,0,0.65), transparent 70%)",
              filter: "blur(6px)",
            }}
            animate={
              stageWalkIn || walkOut
                ? { scaleX: [0.9, 1.1, 0.9], scaleY: [1, 0.85, 1] }
                : { scaleX: 1, scaleY: 1 }
            }
            transition={{ duration: 0.55, repeat: stageWalkIn || walkOut ? Infinity : 0 }}
          />

          {/* Body / Character SVG */}
          <svg viewBox="0 0 280 520" className="absolute bottom-0 left-0 h-full w-full drop-shadow-[0_20px_30px_rgba(0,0,0,0.55)]">
            <defs>
              <linearGradient id="jacket" x1="0" x2="1">
                <stop offset="0%" stopColor="#111827" />
                <stop offset="50%" stopColor="#7C3AED" />
                <stop offset="100%" stopColor="#1E40AF" />
              </linearGradient>
              <linearGradient id="pants" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#0b0b12" />
                <stop offset="100%" stopColor="#22232f" />
              </linearGradient>
              <linearGradient id="shirt" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#fef3c7" />
                <stop offset="100%" stopColor="#D4AF37" />
              </linearGradient>
              <linearGradient id="bag" x1="0" x2="1" y1="0" y2="1">
                <stop offset="0%" stopColor="#3a2b16" />
                <stop offset="100%" stopColor="#0c0a07" />
              </linearGradient>
              <radialGradient id="bagGlow" cx="50%" cy="40%" r="50%">
                <stop offset="0%" stopColor="#fde68a" stopOpacity="0.9" />
                <stop offset="50%" stopColor="#c084fc" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#000" stopOpacity="0" />
              </radialGradient>
              <linearGradient id="skin" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#f6cfaa" />
                <stop offset="100%" stopColor="#d6a77c" />
              </linearGradient>
            </defs>

            {/* Legs walking or standing */}
            <motion.g
              animate={
                stageWalkIn || walkOut
                  ? {
                      y: [0, -4, 0, -4, 0],
                    }
                  : { y: 0 }
              }
              transition={{ duration: 0.55, repeat: stageWalkIn || walkOut ? Infinity : 0 }}
            >
              <motion.g
                animate={
                  stageWalkIn || walkOut
                    ? { rotate: [-12, 12, -12] }
                    : { rotate: -2 }
                }
                style={{ originX: "132px", originY: "320px" }}
                transition={{ duration: 0.55, repeat: stageWalkIn || walkOut ? Infinity : 0 }}
              >
                <path d="M116 320 C 110 400, 112 470, 104 506 L 140 506 C 148 470, 150 400, 148 320 Z" fill="url(#pants)" />
                <ellipse cx="122" cy="508" rx="28" ry="7" fill="#050505" />
                <path d="M94 498 Q 122 482 150 498 L 148 510 L 96 510 Z" fill="#050505" />
                <path d="M96 504 L 150 504 L 148 510 L 98 510 Z" fill="#D4AF37" opacity="0.85" />
              </motion.g>
              <motion.g
                animate={
                  stageWalkIn || walkOut
                    ? { rotate: [12, -12, 12] }
                    : { rotate: 2 }
                }
                style={{ originX: "158px", originY: "320px" }}
                transition={{ duration: 0.55, repeat: stageWalkIn || walkOut ? Infinity : 0 }}
              >
                <path d="M150 320 C 156 400, 158 470, 166 506 L 202 506 C 194 470, 192 400, 194 320 Z" fill="url(#pants)" />
                <ellipse cx="184" cy="508" rx="28" ry="7" fill="#050505" />
                <path d="M156 498 Q 184 482 212 498 L 210 510 L 158 510 Z" fill="#050505" />
                <path d="M158 504 L 212 504 L 210 510 L 160 510 Z" fill="#D4AF37" opacity="0.85" />
              </motion.g>
            </motion.g>

            {/* Torso */}
            <g>
              <path d="M86 200 Q 86 160 120 152 L 192 152 Q 226 160 226 200 L 230 326 L 82 326 Z" fill="url(#jacket)" />
              <path d="M138 152 L 170 152 L 168 330 L 140 330 Z" fill="url(#shirt)" opacity="0.95" />
              <circle cx="154" cy="200" r="2.2" fill="#0a0a0a" />
              <circle cx="154" cy="230" r="2.2" fill="#0a0a0a" />
              <circle cx="154" cy="260" r="2.2" fill="#0a0a0a" />
              <circle cx="154" cy="290" r="2.2" fill="#0a0a0a" />
              <path d="M96 196 Q 70 170 68 186 L 74 234 L 100 244 Z" fill="url(#jacket)" />
              <path d="M216 196 Q 242 170 244 186 L 238 234 L 212 244 Z" fill="url(#jacket)" />
            </g>

            {/* Neck */}
            <rect x="140" y="136" width="32" height="28" rx="8" fill="url(#skin)" />

            {/* Head */}
            <g style={{ transform: smiling ? "translateY(-1px)" : "none" }}>
              <ellipse cx="156" cy="102" rx="44" ry="52" fill="url(#skin)" />
              {/* Hair */}
              <path d="M112 84 Q 110 52 156 46 Q 204 52 202 88 Q 198 64 156 60 Q 120 64 114 88 Z" fill="#111111" />
              <path d="M194 72 Q 204 88 202 116 L 180 110 Q 190 92 194 72 Z" fill="#111111" />
              {/* Ears */}
              <ellipse cx="112" cy="106" rx="6" ry="10" fill="url(#skin)" />
              <ellipse cx="200" cy="106" rx="6" ry="10" fill="url(#skin)" />
              {/* Eyebrows */}
              <path d="M128 90 Q 140 84 152 90" stroke="#1a1a1a" strokeWidth="3" strokeLinecap="round" fill="none" />
              <path d="M160 90 Q 172 84 184 90" stroke="#1a1a1a" strokeWidth="3" strokeLinecap="round" fill="none" />
              {/* Eyes */}
              {smiling ? (
                <>
                  <path d="M128 104 Q 140 96 152 104" stroke="#111" strokeWidth="2.6" strokeLinecap="round" fill="none" />
                  <path d="M160 104 Q 172 96 184 104" stroke="#111" strokeWidth="2.6" strokeLinecap="round" fill="none" />
                </>
              ) : (
                <>
                  <ellipse cx="140" cy="104" rx="3.4" ry="5" fill="#14213d" />
                  <ellipse cx="172" cy="104" rx="3.4" ry="5" fill="#14213d" />
                  <circle cx="141" cy="102" r="1.2" fill="#fff" />
                  <circle cx="173" cy="102" r="1.2" fill="#fff" />
                </>
              )}
              {/* Nose */}
              <path d="M156 110 Q 150 124 156 128 Q 162 128 160 120" stroke="#9c7349" strokeWidth="1.6" fill="none" strokeLinecap="round" />
              {/* Mouth */}
              {smiling ? (
                <path d="M136 134 Q 156 156 178 134" stroke="#6b1d24" strokeWidth="3" fill="#8a2530" strokeLinecap="round" strokeLinejoin="round" />
              ) : (
                <path d="M140 136 Q 156 144 174 136" stroke="#7a2a30" strokeWidth="2.4" strokeLinecap="round" fill="none" />
              )}
              {/* Cheek blush */}
              <circle cx="122" cy="122" r="7" fill="#f59e9e" opacity="0.35" />
              <circle cx="190" cy="122" r="7" fill="#f59e9e" opacity="0.35" />
            </g>

            {/* Backpack (on back while walking, in hands while unzipping) */}
            <motion.g
              animate={
                unzipping
                  ? { x: [0, -10, 0], y: [0, 40, 86], rotate: [0, 8, 0] }
                  : { x: 0, y: 0, rotate: 0 }
              }
              transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
              style={{ transformOrigin: "214px 226px" }}
            >
              <g>
                {/* Bag strap */}
                <path d="M96 162 Q 68 220 94 284" stroke="#111111" strokeWidth="6" fill="none" strokeLinecap="round" />
                <path d="M214 162 Q 242 220 216 284" stroke="#111111" strokeWidth="6" fill="none" strokeLinecap="round" />
                {/* Bag body */}
                <motion.g
                  animate={unzipping ? { scaleY: [1, 1, 0.78], y: [0, 0, 20] } : { scaleY: 1, y: 0 }}
                  transition={{ duration: 1, ease: "easeInOut" }}
                  style={{ transformOrigin: "156px 280px" }}
                >
                  <rect x="92" y="212" width="128" height="118" rx="20" fill="url(#bag)" stroke="#D4AF37" strokeWidth="1.6" />
                  <rect x="108" y="232" width="96" height="22" rx="10" fill="#000" opacity="0.5" />
                  <circle cx="156" cy="243" r="3.4" fill="#D4AF37" />
                  <rect x="130" y="270" width="52" height="34" rx="8" fill="url(#bag)" stroke="#D4AF37" strokeWidth="1" />
                  <path d="M92 222 L 220 222" stroke="#D4AF37" strokeWidth="2.2" />
                  {/* Zipper teeth */}
                  <path d="M102 222 L 102 228 M110 222 L 110 228 M118 222 L 118 228 M126 222 L 126 228 M134 222 L 134 228 M142 222 L 142 228 M150 222 L 150 228 M158 222 L 158 228 M166 222 L 166 228 M174 222 L 174 228 M182 222 L 182 228 M190 222 L 190 228 M198 222 L 198 228 M206 222 L 206 228" stroke="#D4AF37" strokeWidth="2" />
                </motion.g>
                {/* Glow from bag */}
                <AnimatePresence>
                  {beam && (
                    <>
                      <motion.rect
                        key="glow"
                        initial={{ opacity: 0, scale: 0.6 }}
                        animate={{ opacity: 1, scale: 1.6 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.4 }}
                        x="88"
                        y="210"
                        width="136"
                        height="120"
                        rx="20"
                        fill="url(#bagGlow)"
                      />
                      <motion.path
                        key="beamup"
                        d="M120 216 Q 156 160 156 80 Q 156 160 192 216 Z"
                        fill="url(#bagGlow)"
                        initial={{ opacity: 0, y: 40, scaleY: 0.2 }}
                        animate={{ opacity: [0, 1, 0.5], y: 0, scaleY: [0.2, 1, 1] }}
                        transition={{ duration: 1.4 }}
                      />
                    </>
                  )}
                </AnimatePresence>
              </g>
            </motion.g>

            {/* Arms */}
            <motion.g
              animate={
                stageWalkIn || walkOut
                  ? { rotate: atCenter ? 0 : [14, -14, 14] }
                  : unzipping
                  ? { rotate: -42, x: 6, y: 40 }
                  : { rotate: 0 }
              }
              style={{ originX: "96px", originY: "196px" }}
              transition={{ duration: stageWalkIn || walkOut ? 0.55 : 1, repeat: stageWalkIn || walkOut ? Infinity : 0 }}
            >
              <path d="M96 196 Q 78 240 82 288 L 104 296 Q 112 240 116 206 Z" fill="url(#jacket)" />
              <circle cx="92" cy="296" r="12" fill="url(#skin)" />
            </motion.g>
            <motion.g
              animate={
                stageWalkIn || walkOut
                  ? { rotate: atCenter ? 0 : [-14, 14, -14] }
                  : unzipping
                  ? { rotate: 42, x: -6, y: 40 }
                  : { rotate: 0 }
              }
              style={{ originX: "216px", originY: "196px" }}
              transition={{ duration: stageWalkIn || walkOut ? 0.55 : 1, repeat: stageWalkIn || walkOut ? Infinity : 0 }}
            >
              <path d="M216 196 Q 234 240 230 288 L 208 296 Q 200 240 196 206 Z" fill="url(#jacket)" />
              <circle cx="220" cy="296" r="12" fill="url(#skin)" />
            </motion.g>
          </svg>
        </motion.div>
      </motion.div>

      {/* Beam rays to panel */}
      {beam && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0.6] }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.4 }}
          className="absolute left-1/2 top-[20%] -translate-x-1/2 h-[55%] w-[22rem] rounded-full"
          style={{
            background:
              "radial-gradient(ellipse at center top, rgba(212,175,55,0.45), rgba(124,58,237,0.25) 40%, transparent 70%)",
            filter: "blur(20px)",
          }}
        />
      )}
    </div>
  );
}
