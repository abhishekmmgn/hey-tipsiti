import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

config({
  path: ".env.local",
});

// export default defineConfig({
//   schema: "src/db/schema.ts",
//   out: "src/lib/drizzle",
//   dialect: "postgresql",
//   dbCredentials: {
//     url: process.env.POSTGRES_URL!,
//   },
// });

export default defineConfig({
  out: './drizzle',
  schema: './src/db/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.POSTGRES_URL!,
  },
});

