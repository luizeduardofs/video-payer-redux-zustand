import { useAppDispatch, useAppSelector } from "@/store";
import { next, useCurrentLesson } from "@/store/slices/player";
import { Loader } from "lucide-react";
import Player from "react-player";

export function Video() {
  const dispatch = useAppDispatch();

  const { currentLesson } = useCurrentLesson();
  const isCourseLoading = useAppSelector((state) => state.player.isLoading);

  const handlePlayNext = () => dispatch(next());

  return (
    <div className="w-full bg-zinc-950 aspect-video">
      {isCourseLoading ? (
        <div className="flex h-screen items-center justify-center">
          <Loader className="w-6 h-6 text-zinc-400 animate-spin" />
        </div>
      ) : (
        <Player
          width="100%"
          height="100%"
          controls
          onEnded={handlePlayNext}
          playing
          url={`https://www.youtube.com/watch?v=${currentLesson?.id}`}
        />
      )}
    </div>
  );
}
