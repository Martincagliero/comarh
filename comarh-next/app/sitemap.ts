import type { MetadataRoute } from "next";
import { projects } from "@/lib/data/projects";

const baseUrl = "https://www.comarh.com.ar";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${baseUrl}/nosotros`, changeFrequency: "yearly", priority: 0.6 },
    { url: `${baseUrl}/servicios`, changeFrequency: "yearly", priority: 0.8 },
    { url: `${baseUrl}/proyectos`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/grundfos`, changeFrequency: "yearly", priority: 0.6 },
    { url: `${baseUrl}/legales/privacidad`, changeFrequency: "yearly", priority: 0.1 },
    { url: `${baseUrl}/legales/terminos`, changeFrequency: "yearly", priority: 0.1 },
  ];

  const projectRoutes: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${baseUrl}/proyectos/${project.slug}`,
    changeFrequency: "yearly",
    priority: 0.5,
  }));

  return [...staticRoutes, ...projectRoutes];
}
