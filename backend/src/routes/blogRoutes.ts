import { Hono } from "hono";
import { verify } from "hono/jwt";
import { getPrisma } from "../utils";
import { createBlogInput, CreateBlogInput, updateBlogInput, UpdateBlogInput } from "@harshwardhanet7007/blogsy-types";

export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    },
    Variables: {
        userId: string
    }
}>();

type jwtPayload = {
    id: string,
    username: string,
    name: string,
}

// paginated route
blogRouter.get("/bulk", async (c) => {
    const pageNumber: string = c.req.query("page") || "1";
    const prisma = getPrisma(c.env.DATABASE_URL);
    try {
        const blogs = await prisma.post.findMany({
            where: {},
            select: {
                id: true,
                title: true,
                content: true,
                author: {
                    select: {
                        username: true,
                        name: true,
                    }
                }
            },
            take: 5,
            skip: (parseInt(pageNumber) - 1) * 5
        })

        prisma.$disconnect();
        return c.json({
            success: true,
            page: pageNumber,
            data: blogs
        })
    } catch (e) {
        c.status(500);
        return c.json({
            success: false,
            message: `Something went wrong`
        })
    }
})

// Authentication Middleware for below routes
blogRouter.use("/*", async (c, next) => {
    const authHeader = c.req.header("authorization") || "";
    try {
        // @ts-ignore
        const user: jwtPayload = await verify(authHeader, c.env.JWT_SECRET);
        if (user) {
            c.set("userId", user.id);
            await next();
        } else {
            c.status(403);
            return c.json({
                message: "You are not logged in"
            })
        }
    } catch (e) {
        c.status(403);
        return c.json({
            message: "You are not logged in"
        })
    }
});

blogRouter.post("/", async (c) => {
    const body: CreateBlogInput = await c.req.json();
    const isValidBody = createBlogInput.safeParse(body);
    if (!isValidBody.success) {
        return c.json({
            success: false,
            errors: isValidBody.error.issues
        })
    }
    const prisma = getPrisma(c.env.DATABASE_URL);
    try {
        const blogId = await prisma.post.create({
            data: {
                title: body.title,
                content: body.content,
                published: true,
                updatedAt: new Date(),
                authorId: c.get("userId")
            },
            select: {
                id: true
            }
        })
        prisma.$disconnect();
        return c.json({
            success: true,
            message: `Blog created with id: ${blogId.id}`
        })
    } catch (e) {
        c.status(411);
        return c.json({
            success: false,
            message: "Something went wrong, Input might be incorrect."
        })
    }
})

blogRouter.put("/", async (c) => {
    const prisma = getPrisma(c.env.DATABASE_URL);
    const body: UpdateBlogInput = await c.req.json();
    const isValidBody = updateBlogInput.safeParse(body);
    if (!isValidBody.success) {
        return c.json({
            success: false,
            errors: isValidBody.error.issues
        })
    }
    try {
        const blog = await prisma.post.update({
            where: {
                id: body.id
            },
            data: {
                title: body.title,
                content: body.content,
                updatedAt: new Date(),
            }
        })

        prisma.$disconnect();
        return c.json({
            success: true,
            message: `Blog updated`
        })
    } catch (e) {
        c.status(411);
        return c.json({
            success: false,
            message: "Something went wrong, Input might be incorrect."
        })
    }
})

blogRouter.get("/:id", async (c) => {
    const blogId: string = c.req.param("id");
    const prisma = getPrisma(c.env.DATABASE_URL);
    try {
        const blog = await prisma.post.findUnique({
            where: {
                id: blogId
            },
            select: {
                id: true,
                title: true,
                content: true,
                published: true,
                createdAt: true,
                updatedAt: true,
                author: {
                    select: {
                        id: true,
                        username: true,
                        name: true,
                    }
                }
            }
        })
        prisma.$disconnect();
        return c.json({
            success: true,
            data: blog
        })
    } catch (e) {
        c.status(404);
        return c.json({
            success: false,
            message: `Blog with id ${blogId} doesn't exists`
        })
    }
})