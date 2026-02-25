/* eslint-disable react-hooks/purity */
import { useMutation, useQuery } from "convex/react"
import { api } from "../../../../convex/_generated/api"
import { Id } from "../../../../convex/_generated/dataModel";

export const useTrace = (traceId: Id<"traces">) =>{
    return useQuery(api.trace.getById, {id: traceId});

}

export const useTraces = () => {
    return useQuery(api.trace.get);
}

export const useTraceLimits = (lim: number) =>{
    return useQuery(api.trace.getQuery, {lim});
}

export const useCreateTrace = () =>{
    return useMutation(api.trace.create).withOptimisticUpdate((localStore, args)=>{
        const existingTraces = localStore.getQuery(api.trace.getQuery, {lim: 10});
        if (existingTraces!= undefined){
            const now = Date.now();
            const newTrace = {
                _id: crypto.randomUUID() as Id<"traces">,
                _creationTime: now,
                name: args.name,
                ownerId: "anonymous",
                updatedAt: now,
                importStatus: "Success",
                exportStatus: "Not Exported"
            } as const;
            localStore.setQuery(api.trace.getQuery, {lim: 10}, [
                newTrace,
                ...existingTraces,
            ]);
        }
    });
}

export const useRenameTrace = (traceId: Id<"traces">) =>{
    return useMutation(api.trace.rename).withOptimisticUpdate((localStore, args)=>{
        const existingTrace = localStore.getQuery(api.trace.getById, {id: traceId});
        if (existingTrace != undefined && existingTrace !== null){
            localStore.setQuery(api.trace.getById, {id: traceId}, {
                ...existingTrace,
                name: args.newName,
                updatedAt: Date.now()
        })
        const existingTraces = localStore.getQuery(api.trace.getQuery, {lim: 10});
        if (existingTraces !== undefined){
            localStore.setQuery(api.trace.getQuery, {lim: 10}, existingTraces.map(trace=>{
                return trace._id === args.traceId?
                {...trace, name: args.newName, updatedAt: Date.now()}: trace
            }))
        }
    }
    });
}