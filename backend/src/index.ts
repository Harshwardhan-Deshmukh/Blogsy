import { Hono } from "hono";
import { cors } from "hono/cors";
import { userRouter } from "./routes/userRoutes"
import { blogRouter } from "./routes/blogRoutes";

const app = new Hono();

// Middlewares - CORS
app.use("/api/v1/*", cors());

// Application Routes
app.route("/api/v1/user", userRouter)
app.route("/api/v1/blog", blogRouter)

// Health Check
app.get("/api/v1/health", async (c) => {
  return c.text("Hello There!");
});

// Middleware - send route not found other routes which user requests
app.use("/*", async (c, next) => {
  c.status(404);
  return c.json({
    success: false,
    message: "Invalid Route"
  });
})

export default app;
