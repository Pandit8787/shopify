export default function AuroraBackdrop() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-20 overflow-hidden"
    >
      <div className="absolute inset-0 dark:bg-luxe-bg bg-gradient-to-b from-white via-ink-50 to-white" />
      <div className="absolute inset-0 bg-aurora-gradient animate-auroraShift opacity-80 dark:opacity-100 mix-blend-screen dark:mix-blend-soft-light" />
      <div
        className="absolute -top-40 -left-40 h-[55rem] w-[55rem] rounded-full opacity-40 dark:opacity-50 animate-auroraShift"
        style={{
          background:
            "radial-gradient(circle at 30% 30%, rgba(124,58,237,0.45), transparent 60%)",
        }}
      />
      <div
        className="absolute -bottom-40 -right-40 h-[60rem] w-[60rem] rounded-full opacity-30 dark:opacity-40 animate-auroraShift"
        style={{
          animationDelay: "-8s",
          background:
            "radial-gradient(circle at 70% 50%, rgba(236,72,153,0.4), transparent 60%)",
        }}
      />
      <div
        className="absolute top-1/3 right-1/3 h-[40rem] w-[40rem] rounded-full opacity-30 dark:opacity-30 animate-auroraShift"
        style={{
          animationDelay: "-4s",
          background:
            "radial-gradient(circle at 50% 50%, rgba(30,64,175,0.35), transparent 60%)",
        }}
      />
    </div>
  );
}
