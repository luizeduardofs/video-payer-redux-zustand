"use client";

import { Header } from "@/components/Header";
import { Module } from "@/components/Module";
import { Video } from "@/components/Video";
import { useCurrentLesson, useStore } from "@/zustand-store";
import { MessageCircle } from "lucide-react";
import { useEffect } from "react";

export default function Page() {
  const { currentLesson } = useCurrentLesson();

  const { course, load } = useStore((store) => {
    return {
      course: store.course,
      load: store.load,
    };
  });

  useEffect(() => {
    if (currentLesson) document.title = `Assistindo: ${currentLesson.title}`;
  }, [currentLesson]);

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="h-screen bg-zinc-950 text-zinc-50 flex justify-center items-center">
      <div className="flex w-[1100px] flex-col gap-6">
        <div className="flex items-center justify-between">
          <Header />
          <button className="flex items-center gap-2 rounded bg-violet-500 px-3 py-2 text-sm font-medium text-white hover:bg-violet-600">
            <MessageCircle className="w-4 h-4" />
            Deixar feedBack
          </button>
        </div>
        <main className="relative flex overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900 shadow pr-80">
          <div className="flex-1">
            <Video />
          </div>
          <aside className="w-80 absolute top-0 bottom-0 right-0 divide-y-2 divide-zinc-900 border-l border-zinc-800 bg-zinc-900 overflow-y-scroll scrollbar-thin scrollbar-track-zinc-950 scrollbar-thumb-slate-800">
            {course?.modules &&
              course?.modules.map((item, index) => (
                <Module
                  key={item.id}
                  moduleIndex={index}
                  title={item.title}
                  amountOfLessons={item.lessons.length}
                />
              ))}
          </aside>
        </main>
      </div>
    </div>
  );
}
