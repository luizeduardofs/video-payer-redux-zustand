import { useStore } from "@/zustand-store";
import { ChevronDown } from "lucide-react";
import { Collapsible } from "radix-ui";
import { Lesson } from "./Lesson";

interface ModuleProps {
  moduleIndex: number;
  title: string;
  amountOfLessons: number;
}

export function Module({ moduleIndex, title, amountOfLessons }: ModuleProps) {
  const { lessons, currentModuleIndex, currentLessonIndex, play } = useStore(
    (store) => {
      return {
        lessons: store.course?.modules[moduleIndex].lessons,
        currentModuleIndex: store.currentModuleIndex,
        currentLessonIndex: store.currentLessonIndex,
        play: store.play,
      };
    }
  );

  return (
    <Collapsible.Root className="group" defaultOpen={moduleIndex === 0}>
      <Collapsible.Trigger className="flex w-full items-center gap-3 bg-zinc-800 p-4">
        <div className=" flex h-10 w-10 rounded-full items-center justify-center bg-zinc-950 text-xs">
          {moduleIndex + 1}
        </div>
        <div className="flex flex-col gap-1 text-left">
          <strong>{title}</strong>
          <span className="text-xs text-zinc-400">{amountOfLessons} aulas</span>
        </div>

        <ChevronDown className="w-5 h-5 ml-auto text-zinc-400 group-data-[state=open]:rotate-180 transition-transform" />
      </Collapsible.Trigger>
      <Collapsible.Content>
        <nav className="relative flex flex-col gap-4 p-6">
          {lessons &&
            lessons.map((item, lessonIndex) => {
              const isCurrent =
                currentModuleIndex === moduleIndex &&
                currentLessonIndex === lessonIndex;
              return (
                <Lesson
                  key={item.id}
                  title={item.title}
                  duration={item.duration}
                  isCurrent={isCurrent}
                  onPlay={() => play([moduleIndex, lessonIndex])}
                />
              );
            })}
        </nav>
      </Collapsible.Content>
    </Collapsible.Root>
  );
}
