import { Hono } from "hono";
import { getPrisma, hashPassword, verifyPassword } from "../utils";
import { sign } from "hono/jwt";
import { SigninInput, SignupInput, signinInput, signupInput } from "@harshwardhanet7007/blogsy-types";


// Environment Variables that will be used within the context
export const userRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    }
}>();

userRouter.post("/signup", async (c) => {
  const body: SignupInput = await c.req.json();
  // you need to initialize prisma again and again in every route (connection to database)
  // you dont have access to environment variable outside routes where context is available (in serverless)
  const isValidBody = signupInput.safeParse(body);
  if (!isValidBody.success) {
    return c.json({
      success: false,
      errors: isValidBody.error.issues
    })
  }
  const prisma = getPrisma(c.env.DATABASE_URL);
  const hash = await hashPassword(body.password);

  try {
    // prisma query should be added in try catch block (to avoid application failures)
    const response = await prisma.user.create({
      data: {
        username: body.username,
        password: hash,
        name: body.name ? body.name : undefined,
      },
      select: {
        id: true,
        username: true,
        name: true,
      },
    });
    await prisma.$disconnect(); // close the connection
    
    const token = await sign({
      ...response,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 60 * 60, // expires after 1 hour
    }, c.env.JWT_SECRET);

    return c.json({
      success: true,
      jwt: token,
    });

  } catch (e) {
    c.status(411);
    return c.json({
      success: false,
      message: "Username already exists"
    })
  }
});

userRouter.post("/signin", async (c) => {
  const body: SigninInput = await c.req.json();
  const prisma = getPrisma(c.env.DATABASE_URL);
  const isValidBody = signinInput.safeParse(body);
  if (!isValidBody.success) {
    return c.json({
      success: false,
      errors: isValidBody.error.issues
    })
  }
  // check if user exists
  const response = await prisma.user.findUnique({
    where: {
      username: body.username,
    }
  });
  await prisma.$disconnect();

  if (!response) {
    c.status(404);
    return c.json({
      success: false,
      message: "User not found",
    });
  } else {
    const isValidPassword = await verifyPassword(response.password, body.password);

    if (isValidPassword) {
      const token = await sign({
        id: response.id,
        username: response.username,
        name: response.name,
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + 60 * 60,
      }, c.env.JWT_SECRET);

      return c.json({
        success: true,
        jwt: token,
      });
    } else {
      c.status(403);
      return c.json({
        success: false,
        message: "Invalid password"
      });
    }
  }
});
