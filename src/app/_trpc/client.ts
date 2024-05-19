import { AppRouter } from "@/server/api";
import { createTRPCReact } from "@trpc/react-query";

const api = createTRPCReact<AppRouter>({});

export default api;