import appCss from "./app.css?inline";
import { hydrateRoot } from "react-dom/client";
import { RouterProvider } from "@tanstack/react-router";
import { getRouter } from "./router";

if (typeof document !== "undefined") {
  const style = document.createElement("style");
  style.textContent = appCss;
  document.head.appendChild(style);
}

const router = getRouter();

hydrateRoot(document, <RouterProvider router={router} />);