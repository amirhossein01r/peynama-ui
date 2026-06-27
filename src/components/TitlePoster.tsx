import type { Movie } from "@/types/movie";
import type { Dispatch, ReactNode, SetStateAction } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Edit2, Plus } from "lucide-react";

function TitlePoster({
  title,
  children,
  hasData,
  open,
  setOpen,
}: {
  title: Movie;
  children: ReactNode;
  hasData: boolean;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const overlayBtn =
    "w-8 h-8 rounded-full flex items-center justify-center bg-black/50 backdrop-blur-sm border border-white/15 text-white hover:bg-black/70 transition-colors";

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <div className="relative w-fit shrink-0 overflow-hidden rounded-3xl border border-white/10 mx-auto">
        <img src={title.poster_url} className="w-90 aspect-2/3 block" />

        <div className="absolute top-3 left-3 right-3 flex justify-end">
          {/* top-right: + or edit */}
          <button
            aria-label={hasData ? "Edit tracker" : "Add to tracker"}
            onClick={() => setOpen(true)}
            className={overlayBtn}
          >
            {hasData ? (
              <Edit2 className="w-4 h-4" />
            ) : (
              <Plus className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      <DialogContent className="sm:max-w-md" dir="rtl">
        <DialogTitle>{title.title}</DialogTitle>
        <DialogHeader>
          <DialogDescription>
            وضعیت دیدنت رو انتخاب کن و امتیاز بده
          </DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}

export { TitlePoster };
