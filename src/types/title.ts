interface TitleItem {
  id: number | string;
  type: "movie" | "tv_show";
  title: string;
  poster_url: string;
}

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

export type { TitleItem, TitleTracking, TitleTrackingStatus };
