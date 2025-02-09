import { api } from "@/lib/axios";
import { create } from "zustand";

interface Course {
  id: number;
  modules: Array<{
    id: number;
    title: string;
    lessons: Array<{
      id: string;
      title: string;
      duration: string;
    }>;
  }>;
}

interface PlayerState {
  course: Course | null;
  currentModuleIndex: number;
  currentLessonIndex: number;
  isLoading: boolean;

  load: () => Promise<void>;
  play: (modelAndLessonIndex: [number, number]) => void;
  next: () => void;
}

export const useStore = create<PlayerState>((set, get) => {
  return {
    course: null,
    currentModuleIndex: 0,
    currentLessonIndex: 0,
    isLoading: true,

    load: async () => {
      set({ isLoading: true });

      const response = await api.get("/couses/1");

      set({
        course: response.data,
        isLoading: false,
      });
    },

    play: (modelAndLessonIndex: [number, number]) => {
      const [modelIndex, lessonIndex] = modelAndLessonIndex;

      set({
        currentModuleIndex: modelIndex,
        currentLessonIndex: lessonIndex,
      });
    },

    next: () => {
      const { currentModuleIndex, currentLessonIndex, course } = get();

      const nextLessonIndex = currentLessonIndex + 1;
      const nextLesson =
        course?.modules[currentModuleIndex].lessons[nextLessonIndex];

      if (nextLesson) {
        set({ currentLessonIndex: nextLessonIndex });
      } else {
        const nextModuleIndex = currentModuleIndex + 1;
        const nextModule = course?.modules[nextModuleIndex];

        if (nextModule) {
          set({
            currentModuleIndex: nextModuleIndex,
            currentLessonIndex: 0,
          });
        }
      }
    },
  };
});

export const useCurrentLesson = () => {
  return useStore((state) => ({
    currentModele: state.course?.modules[state.currentModuleIndex] ?? null,
    currentLesson:
      state.course?.modules[state.currentModuleIndex]?.lessons[
        state.currentLessonIndex
      ] ?? null,
  }));
};

// export const useCurrentLesson = () => {
//   return useStore((store) => {
//     const { currentModuleIndex, currentLessonIndex } = store;

//     const currentModele = store.course?.modules[currentModuleIndex];
//     const currentLesson = currentModele?.lessons[currentLessonIndex];

//     return { currentModele, currentLesson };
//   });
// };
