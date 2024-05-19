import { initTRPC } from "@trpc/server";  
import db from "../db";

export const createTRPCContext = async (opts: { headers: Headers }) => {
  return {
    ...opts,
    db
  };
};

const trpcServer = initTRPC.context<typeof createTRPCContext>().create({});

export const createTRPCRouter = trpcServer.router;
export const publicProcedure = trpcServer.procedure;