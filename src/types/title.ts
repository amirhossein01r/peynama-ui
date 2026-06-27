type TitleTrackingStatus = "plan_to_watch" | "completed" | "dropped";
type TitleTracking =
  | {
      tracked: false;
    }
  | {
      tracked: true;
      status: TitleTrackingStatus;
      rating: number | null;
    };

export type { TitleTracking, TitleTrackingStatus };
