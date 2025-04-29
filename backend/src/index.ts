import { Hono } from "hono";
import { getPrisma } from "./utils";
import { decode, sign, verify } from "hono/jwt";
import { cors } from "hono/cors";

type Bindings = {
  DATABASE_URL: string;
  JWT_SECRET: string;
};

interface SignUpBody {
  email: string;
  name?: string;
  password: string;
}

const app = new Hono<{
  Bindings: Bindings;
}>();

app.use("/api/v1/*", cors());

app.get("/api/v1/health", async (c) => {
  return c.text("Hello There!");
});

app.post("/api/v1/signup", async (c) => {
  const body: SignUpBody = await c.req.json();
  // you need to initialize prisma again and again in every route (connection to database)
  // you dont have access to environment variable outside routes (in serverless)
  const prisma = getPrisma(c.env.DATABASE_URL);

  const response = await prisma.user.create({
    data: {
      email: body.email,
      password: body.password,
      name: body.name ? body.name : undefined,
    },
    select: {
      id: true,
      email: true,
      name: true,
    },
  });

  const token = await sign(response, c.env.JWT_SECRET);
  let success = false;
  if (token) success = true;

  return c.json({
    success,
    jwt: token,
  });
});

type SignInBody = Pick<SignUpBody, "email" | "password">;

app.post("/api/v1/signin", async (c) => {
  const body: SignInBody = await c.req.json();
  const prisma = getPrisma(c.env.DATABASE_URL);

  const response = await prisma.user.findUnique({
    where: {
      email: body.email,
      password: body.password,
    },
    select: {
      id: true,
      email: true,
      name: true,
    },
  });

  if (!response) {
    c.status(404);
    return c.json({
      success: false,
      message: "User not found",
    });
  }

  const token = await sign(response, c.env.JWT_SECRET);
  let success = false;
  if (token) success = true;

  return c.json({
    success,
    jwt: token,
  });
});

app.use("/api/v1/blog/*", async (c, next) => {
  const header = c.req.header("Authorization") || "";
  const token = header.split(" ")[1];
  const response = await verify(token, c.env.JWT_SECRET);
  if (!response.id) {
    c.status(403);
    return c.json({ error: "unauthorized" });
  }
  await next();
});

export default app;
