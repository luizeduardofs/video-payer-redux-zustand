import { useCurrentLesson, useStore } from "@/zustand-store";
import { Loader } from "lucide-react";
import Player from "react-player";

export function Video() {
  const { currentLesson } = useCurrentLesson();

  const { next, isLoading } = useStore((store) => {
    return {
      next: store.next,
      isLoading: store.isLoading,
    };
  });

  const handlePlayNext = () => next();

  return (
    <div className="w-full bg-zinc-950 aspect-video">
      {isLoading ? (
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
