import { useRouter } from "@tanstack/react-router";

function NotFoundComponent() {
  const router = useRouter();

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground px-4 gap-0"
      dir="rtl"
    >
      {/* Film strip top */}
      <div className="flex gap-1.5 mb-12 opacity-10">
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="w-6 h-4 rounded-sm bg-foreground" />
        ))}
      </div>

      {/* 404 watermark */}
      <div className="text-[10rem] font-extrabold leading-none tracking-tighter text-foreground opacity-5 select-none -mb-6">
        404
      </div>

      {/* Heading */}
      <h1 className="text-2xl font-semibold mb-2">پیدا نشد</h1>

      {/* Sub */}
      <p className="text-sm text-muted-foreground text-center max-w-xs leading-relaxed mb-8">
        این صفحه وجود ندارد یا جابه‌جا شده است.
      </p>

      {/* Buttons */}
      <div className="flex gap-3 flex-wrap justify-center">
        <button
          onClick={() => router.history.back()}
          className="px-5 py-2 rounded-lg border border-border bg-transparent text-foreground text-sm font-medium cursor-pointer hover:bg-muted transition-colors"
        >
          بازگشت
        </button>
        <button
          onClick={() => router.navigate({ to: "/" })}
          className="px-5 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium cursor-pointer hover:opacity-90 transition-opacity"
        >
          صفحه اصلی
        </button>
      </div>

      {/* Film strip bottom */}
      <div className="flex gap-1.5 mt-12 opacity-10">
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="w-6 h-4 rounded-sm bg-foreground" />
        ))}
      </div>
    </div>
  );
}

export { NotFoundComponent };
