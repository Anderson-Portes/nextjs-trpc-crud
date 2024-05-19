import { todos } from "@/db/schema";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { z } from 'zod'
import { desc, eq } from "drizzle-orm";

const todoRouter = createTRPCRouter({
  all: publicProcedure.query(({ ctx }) => {
    return ctx.db
      .select()
      .from(todos)
      .orderBy(desc(todos.createdAt));
  }),

  create: publicProcedure
    .input(z.string())
    .mutation(({ ctx, input }) => {
      return ctx.db.insert(todos).values({ title: input }).returning();
    }),

  delete: publicProcedure
    .input(z.string())
    .mutation(({ ctx, input }) => {
      return ctx.db
        .delete(todos)
        .where(eq(todos.id, input));
    }),
  
  update: publicProcedure
    .input(z.object({
      id: z.string(),
      done: z.boolean()
    }))
    .mutation(({ ctx, input }) => {
      return ctx.db
        .update(todos)
        .set({ done: input.done })
        .where(eq(todos.id, input.id)).returning();
    }),
});

export default todoRouter;