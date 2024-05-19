'use client';

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { httpBatchLink } from "@trpc/react-query";
import { PropsWithChildren, useState } from "react";
import api from "./client";

function getBaseUrl(): string {
  if (typeof window !== "undefined") return window.location.origin;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return `http://localhost:${process.env.PORT ?? 3000}`;
}

const TRPCProvier = ({ children }: PropsWithChildren) => {
  const queryClient = new QueryClient();
  const [trpcClient] = useState(() =>
    api.createClient({
      links: [
        httpBatchLink({
          url: getBaseUrl() + "/api/trpc"
        }),
      ],
    })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <api.Provider client={trpcClient} queryClient={queryClient}>{children}</api.Provider>
    </QueryClientProvider>
  )  
}

export default TRPCProvier;