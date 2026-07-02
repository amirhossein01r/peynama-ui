import { useState, useRef, useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Search, X, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useDebounce } from "@/hooks/useDebounce";
import api from "@/lib/api";
import { toAbsoluteUrl } from "@/lib/urls";
import type { TitleItem } from "@/types/title";

function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<TitleItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const debouncedQuery = useDebounce(query, 300);

  // fetch results
  useEffect(() => {
    if (!debouncedQuery.trim()) {
      setResults([]);
      setOpen(false);
      return;
    }

    setLoading(true);
    api
      .get<TitleItem[]>(
        `/api/v1/search?q=${encodeURIComponent(debouncedQuery)}`,
      )
      .then((res) => {
        setResults(res.data);
        setOpen(true);
      })
      .catch(() => setResults([]))
      .finally(() => setLoading(false));
  }, [debouncedQuery]);

  // close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // close on Esc
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        inputRef.current?.blur();
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  const handleSelect = (item: TitleItem) => {
    setQuery("");
    setOpen(false);
    const type = item.type === "movie" ? "movies" : "tv-shows";
    navigate({ to: `/${type}/${item.id}` });
  };

  const handleClear = () => {
    setQuery("");
    setResults([]);
    setOpen(false);
    inputRef.current?.focus();
  };

  return (
    <div ref={containerRef} className="relative w-full max-w-xs" dir="rtl">
      {/* Input */}
      <div className="relative flex items-center">
        <Search
          size={15}
          className="absolute right-3 text-muted-foreground pointer-events-none"
        />
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="جستجو..."
          className={cn(
            "w-full rounded-md border border-border bg-muted/50 py-2 pr-9 pl-8",
            "text-sm text-foreground placeholder:text-muted-foreground",
            "focus:outline-none focus:ring-1 focus:ring-ring transition-colors",
          )}
        />
        {/* loading / clear */}
        <div className="absolute left-3">
          {loading ? (
            <Loader2 size={14} className="animate-spin text-muted-foreground" />
          ) : query ? (
            <button onClick={handleClear}>
              <X
                size={14}
                className="text-muted-foreground hover:text-foreground transition-colors"
              />
            </button>
          ) : null}
        </div>
      </div>

      {/* Dropdown */}
      {open && (
        <div className="absolute top-full mt-1 w-full rounded-md border border-border bg-popover shadow-lg z-50 overflow-hidden">
          {results.length === 0 ? (
            <p className="px-4 py-3 text-sm text-muted-foreground text-center">
              نتیجه‌ای یافت نشد
            </p>
          ) : (
            <ul>
              {results.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => handleSelect(item)}
                    className="flex items-center gap-3 w-full px-3 py-2 hover:bg-muted transition-colors text-right"
                  >
                    <img
                      src={toAbsoluteUrl(item.poster_url)}
                      alt={item.title}
                      className="w-8 h-12 rounded object-cover shrink-0"
                    />
                    <div className="flex flex-col min-w-0">
                      <span className="text-sm font-medium text-foreground truncate">
                        {item.title}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {item.type === "movie" ? "فیلم" : "سریال"}
                      </span>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

export { SearchBar };
