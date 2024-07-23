import { z } from "zod";

export const SearchSchema = z.object({
    city: z.string().optional(),
    minPrice: z.string().optional(),
    maxPrice: z.string().optional(),
})


export const SearchQuerySchema = z.object({
    city: z.string().optional(),
    minPrice: z.number().optional(),
    maxPrice: z.number().optional(),
    type:z.string().optional(),
    property:z.string().optional(),
})



export const SearchQueryListSchema = z.object({
    city: z.string().optional(),
    minPrice: z.string().optional(),
    maxPrice: z.string().optional(),
    type:z.string().optional(),
    property:z.string().optional(),
})
