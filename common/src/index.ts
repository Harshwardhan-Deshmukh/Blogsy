import zod from "zod";

export const signupInput = zod.object({
    username: zod.string().email(),
    password: zod.string().min(6),
    name: zod.string().optional()
})

export type SignupInput = zod.infer<typeof signupInput>

export const signinInput = zod.object({
    username: zod.string().email(),
    password: zod.string().min(6),
})

export type SigninInput = zod.infer<typeof signinInput>

export const createBlogInput = zod.object({
    title: zod.string(),
    content: zod.string(),
})

export type CreateBlogInput = zod.infer<typeof createBlogInput>

export const updateBlogInput = zod.object({
    id: zod.string(),
    title: zod.string(),
    content: zod.string()
})

export type UpdateBlogInput = zod.infer<typeof updateBlogInput>