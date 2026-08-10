
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import netlify from "@netlify/vite-plugin-tanstack-start";

export default defineConfig({
  plugins: [
    tanstackStart({
      server: {
        entry: "src/server.tsx",
      },
    }),
    netlify(),
    react(),
    tailwindcss(),
    tsconfigPaths(),
  ],
  ssr: {
    noExternal: ["tw-animate-css"],
  },
  build: {
    minify: true,
    sourcemap: true,
  },
});

