import { z } from "zod";

export const CreatePostSchema=z.object({
    title:z.string(),
    price:z.string(),
    address:z.string(),
    city:z.string(),
    bedroom:z.string(),
    bathroom:z.string(),
    latitude:z.string(),
    longitude:z.string(),
    school:z.string(),
    size:z.string(),
    type:z.string(),
    property:z.string(),
    utilities:z.string(),
    pet:z.string(),
    income:z.string(),
    restaurant:z.string(),
    bus:z.string()
})