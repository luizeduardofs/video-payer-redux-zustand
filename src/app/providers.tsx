"use client";

import { store } from "@/store";
import { ReactNode } from "react";
import { Provider as ReduxProvider } from "react-redux";

export function Providers({ children }: { children: ReactNode }) {
  return <ReduxProvider store={store}>{children}</ReduxProvider>;
}
