import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "The Last Colony",
    short_name: "Last Colony",
    description: "Archivo interactivo sobre una civilización más antigua que la humanidad.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#020407",
    theme_color: "#020407",
    orientation: "portrait",
    icons: [
      {
        src: "/icons/icon.svg",
        sizes: "512x512",
        type: "image/svg+xml",
        purpose: "any",
      },
      {
        src: "/icons/icon.svg",
        sizes: "512x512",
        type: "image/svg+xml",
        purpose: "maskable",
      },
    ],
  };
}
