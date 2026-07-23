import Hero from "@/components/sections/Hero";
import Intro from "@/components/sections/Intro";
import ProjectsCarousel from "@/components/sections/ProjectsCarousel";
import Methodology from "@/components/sections/Methodology";
import PartnersMarquee from "@/components/sections/PartnersMarquee";
import CtaFullbleed from "@/components/sections/CtaFullbleed";

export default function Home() {
  return (
    <>
      <Hero />
      <Intro />
      <ProjectsCarousel />
      <Methodology />
      <PartnersMarquee />
      <CtaFullbleed />
    </>
  );
}
