import { Hono } from "hono";
import { getPrisma, hashPassword, verifyPassword, } from "./utils";
import { sign, verify } from "hono/jwt";
import { cors } from "hono/cors";

type Bindings = {
  DATABASE_URL: string;
  JWT_SECRET: string;
};

type Variables = {
  userId: string
}

interface SignUpBody {
  email: string;
  name?: string;
  password: string;
}

const app = new Hono<{ Bindings: Bindings, Variables: Variables }>();

app.use("/api/v1/*", cors());

app.get("/api/v1/health", async (c) => {
  return c.text("Hello There!");
});

app.post("/api/v1/signup", async (c) => {
  const body: SignUpBody = await c.req.json();
  // you need to initialize prisma again and again in every route (connection to database)
  // you dont have access to environment variable outside routes (in serverless)
  const prisma = getPrisma(c.env.DATABASE_URL);
  const hash = await hashPassword(body.password);

  try {
    const response = await prisma.user.create({
      data: {
        email: body.email,
        password: hash,
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
  } catch (e) {
    c.status(411);
    return c.json({
      success: false,
      message: "Username already exists"
    })
  }
});

type SignInBody = Pick<SignUpBody, "email" | "password">;

app.post("/api/v1/signin", async (c) => {
  const body: SignInBody = await c.req.json();
  const prisma = getPrisma(c.env.DATABASE_URL);

  // check if user exists
  const response = await prisma.user.findUnique({
    where: {
      email: body.email,
    }
  });

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
        email: response.email,
        name: response.name,
      }, c.env.JWT_SECRET);

      return c.json({
        success: true,
        jwt: token,
      });
    } else {
      return c.json({
        success: false,
        message: "Invalid password"
      });
    }
  }
});

// Authentication Middleware
app.use('/api/v1/blog/*', async (c, next) => {
  // get the header
  // verify the header
  // if header is correct, we can proceed
  // if not, we return user a 403 status

  const token = c.req.header("Authorization") || "";
  try {
    const payload = await verify(token, c.env.JWT_SECRET); // throws an error
    return c.json({
      message: "worked"
    })
  } catch (e) {
    c.status(401);
    return c.json({
      message: "unauthorized"
    })
  }
})

export default app;
