import type { TitleTracking, TitleTrackingStatus } from "@/types/title";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Star, Trash2 } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

function TitleTrackingForm({
  tracker,
  onSave,
  onDelete,
}: {
  tracker: TitleTracking | null;
  onSave: (status: TitleTrackingStatus, rating: number) => void;
  onDelete: () => void;
}) {
  const [status, setStatus] = useState<TitleTrackingStatus>(
    tracker?.tracked ? tracker.status : "plan_to_watch",
  );
  const [rating, setRating] = useState(
    tracker?.tracked && tracker.rating ? [tracker.rating] : [8],
  );

  const showRating = status !== "plan_to_watch";

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <Label>وضعیت</Label>

        <div className="grid grid-cols-3 gap-2">
          <button
            type="button"
            onClick={() => setStatus("plan_to_watch")}
            className={cn(
              "rounded-lg border px-3 py-2 text-sm transition-colors",
              status === "plan_to_watch"
                ? "border-primary bg-primary text-primary-foreground"
                : "bg-background hover:bg-accent",
            )}
          >
            شاید ببینم
          </button>

          <button
            type="button"
            onClick={() => setStatus("dropped")}
            className={cn(
              "rounded-lg border px-3 py-2 text-sm transition-colors",
              status === "dropped"
                ? "border-primary bg-primary text-primary-foreground"
                : "bg-background hover:bg-accent",
            )}
          >
            رها شده
          </button>

          <button
            type="button"
            onClick={() => setStatus("completed")}
            className={cn(
              "rounded-lg border px-3 py-2 text-sm transition-colors",
              status === "completed"
                ? "border-primary bg-primary text-primary-foreground"
                : "bg-background hover:bg-accent",
            )}
          >
            تماشا شده
          </button>
        </div>
      </div>

      {showRating && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label>امتیاز</Label>

            <div
              className="flex items-center gap-1 text-sm font-medium"
              dir="ltr"
            >
              <Star className="size-4 fill-current" />
              {rating[0].toFixed(1)}
            </div>
          </div>

          <Slider
            value={rating}
            onValueChange={setRating}
            min={1}
            max={10}
            step={0.5}
          />
        </div>
      )}

      <div className="mt-4 flex gap-2">
        <Button className="flex-1" onClick={() => onSave(status, rating[0])}>
          ذخیره
        </Button>

        {tracker && (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" size="icon">
                <Trash2 className="size-4" />
              </Button>
            </AlertDialogTrigger>

            <AlertDialogContent dir="rtl">
              <AlertDialogHeader>
                <AlertDialogTitle>حذف کنیم؟</AlertDialogTitle>

                <AlertDialogDescription>
                  این عملیات قابل بازگشت نیست.
                </AlertDialogDescription>
              </AlertDialogHeader>

              <AlertDialogFooter>
                <AlertDialogCancel>انصراف</AlertDialogCancel>

                <AlertDialogAction variant={"destructive"} onClick={onDelete}>
                  بله، حذف کن
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </div>
    </div>
  );
}

export { TitleTrackingForm };
