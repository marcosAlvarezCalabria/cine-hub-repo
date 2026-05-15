const { z } = require("zod");

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: z.coerce.number().int().positive().default(3000),
  MONGODB_URI: z.string().min(1, "MONGODB_URI is required"),
  JWT_SECRET: z.string().min(32, "JWT_SECRET must be at least 32 characters long"),
  CORS_ORIGIN: z.string().min(1, "CORS_ORIGIN is required"),
  GOOGLE_MAPS_API_KEY: z.string().optional(),
  TMDB_API_KEY: z.string().optional(),
  TMDB_BEARER_TOKEN: z.string().optional(),
  VITE_GOOGLE_API_KEY: z.string().optional(),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error("Invalid environment configuration", parsedEnv.error.flatten().fieldErrors);
  process.exit(1);
}

const env = parsedEnv.data;

module.exports = {
  env,
  allowedOrigins: env.CORS_ORIGIN.split(",").map((origin) => origin.trim()).filter(Boolean),
  isProduction: env.NODE_ENV === "production",
};
