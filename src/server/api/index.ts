import todoRouter from "./routers/todo";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  todos: todoRouter
});

export type AppRouter = typeof appRouter;
