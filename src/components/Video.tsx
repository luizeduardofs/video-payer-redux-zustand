import { nextVideo, useCurrentLesson } from "@/store/slices/player";
import Player from "react-player";
import { useDispatch } from "react-redux";

export function Video() {
  const dispatch = useDispatch();

  const { currentLesson } = useCurrentLesson();

  function handlePlayNext() {
    dispatch(nextVideo());
  }

  return (
    <div className="w-full bg-zinc-950 aspect-video">
      <Player
        width="100%"
        height="100%"
        controls
        onEnded={handlePlayNext}
        playing
        url={`https://www.youtube.com/watch?v=${currentLesson.id}`}
      />
    </div>
  );
}
