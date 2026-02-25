import { v } from "convex/values"
import { mutation, query } from "./_generated/server"
import { verifyIdent } from "./auth"


export const create = mutation({
  args: {
    name: v.string()
  },
  handler: async (ctx, args) =>{
    const ident = await verifyIdent(ctx);
    await ctx.db.insert("traces", {
      name: args.name,
      ownerId: ident.subject,
      importStatus: "Success",
      exportStatus: "Not Exported",
      updatedAt: Date.now()
    })
  }
})

export const getQuery = query({
  args: {
    lim: v.number()
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    console.log(identity);
    if (!identity) throw new Error("Unauthenticated!");

    return await ctx.db
    .query("traces")
    .withIndex("by_owner", (q)=>q.eq("ownerId", identity.subject))
    .take(args.lim)
  },
});

export const get = query({
  args: {
  },
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    console.log(identity);
    if (!identity) throw new Error("Unauthenticated!");

    return await ctx.db
    .query("traces")
    .withIndex("by_owner", (q)=>q.eq("ownerId", identity.subject))
    .collect;
  },
});

export const getById = query({
  args: {
    id: v.id("traces")
  },
  handler: async (ctx, args) => {
    const identity = await verifyIdent(ctx);
    const trace = await ctx.db.get("traces", args.id);
    if (!trace) throw new Error("Trace not found!");
    if (trace.ownerId !== identity.subject){
      throw new Error("Unauthorized access to this project trace!");
    }
    return trace;
  },
});

export const rename = mutation({
  args:{
    traceId: v.id("traces"),
    newName: v.string()
  },
  handler: async (ctx, args) => {
    const identity = await verifyIdent(ctx);
    const trace = await ctx.db.get("traces", args.traceId);
    if (!trace) throw new Error("Trace not found!");
    if (trace.ownerId !== identity.subject){
      throw new Error("Unauthorized access to this project trace!");
    }
    await ctx.db.patch(args.traceId, {name: args.newName, updatedAt: Date.now()});
  }
})