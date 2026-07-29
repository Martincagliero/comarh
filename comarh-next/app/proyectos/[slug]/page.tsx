import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects, getProject } from "@/lib/data/projects";
import ProjectDetail from "@/components/sections/ProjectDetail";
import CtaFullbleed from "@/components/sections/CtaFullbleed";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Proyecto no encontrado" };
  return {
    title: project.title,
    description: project.description,
    openGraph: { images: [project.cover] },
  };
}

export default async function ProyectoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <>
      <ProjectDetail project={project} />
      <CtaFullbleed title="¿Tenés un desafío similar? Trabajemos juntos." />
    </>
  );
}
