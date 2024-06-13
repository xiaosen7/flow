"use client";

import { createHydrationComponent } from "@/shared";

export const MarkdownEditor = createHydrationComponent({
  clientSide: () =>
    import("./client-only/editor").then((x) => x.MarkdownEditor),
  serverSide: () =>
    import("./server-only/editor").then((x) => x.MarkdownEditor),
});
