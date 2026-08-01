import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import AnimatedText from "@/components/ui/AnimatedText";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import Counter from "@/components/ui/Counter";
import CtaFullbleed from "@/components/sections/CtaFullbleed";

export const metadata: Metadata = {
  title: "Servicios",
  description:
    "Diseño, desarrollo de proyectos, asistencia técnica y consultoría ambiental y de recursos hídricos.",
};

const services = [
  {
    n: "01",
    title: "Asesoramiento Técnico a Cooperativas y Comunas",
    text: "Dirección y Representación Técnica frente a organismos de control: ENRESS / MOP.",
    image: "/img/servicios/asesoramiento-tecnico.png",
    imagePosition: "top",
  },
  {
    n: "02",
    title: "Registro / Homologación de Perforaciones",
    text: "Según Resolución N° 395/07.",
    image: "/img/servicios/registro-homologacion.jpeg",
  },
  {
    n: "03",
    title: "Registro de Profesionales",
    text: "Para Estudios, Proyectos y Conducción de Obras Hídricas.",
    image:
      "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=900&q=70",
  },
];

const stats = [
  { value: 60, prefix: "+", label: "Proyectos realizados" },
  { value: 24, prefix: "", label: "Clientes acompañados" },
  { value: new Date().getFullYear() - 2017, prefix: "", label: "Años de experiencia", note: "Desde 2017" },
  { value: 50, prefix: "+", label: "Colaboradores", note: "Personas que nos acompañan" },
];

const equipmentPlants = [
  {
    n: "01",
    title: "Plantas Potabilizadoras Compactas fabricadas en PRFV",
    provision: "Provisión, Montaje y Puesta en Marcha.",
    advantages: ["Diseño Compacto y Modular", "Eficiencia Tratamiento", "Operación Automatizada"],
  },
  {
    n: "02",
    title: "Plantas Tratamiento Aguas Residuales Compactas fabricadas en PRFV",
    provision: "Provisión, Montaje y Puesta en Marcha.",
    advantages: [
      "Diseño Compacto y Modular",
      "Eficiencia Tratamiento",
      "Bajo Costo Mantenimiento",
      "Operación Automatizada",
      "Condiciones Vuelco: según normativa",
      "Rango Tratamiento: 50 Hab – 1.000 Hab.",
    ],
  },
];

export default function ServiciosPage() {
  return (
    <>
      <section className="px-[clamp(1.25rem,5vw,5rem)] pb-16 pt-40">
        <div className="mx-auto w-full max-w-[1440px]">
          <Link
            href="/"
            data-cursor="hover"
            className="mb-6 inline-flex items-center gap-2 text-sm text-navy/60 transition-colors hover:text-navy"
          >
            ← Volver al inicio
          </Link>
          <RevealOnScroll>
            <p className="eyebrow">Servicios</p>
          </RevealOnScroll>
          <AnimatedText as="h1" className="display mt-4 max-w-none sm:whitespace-nowrap">
            Servicios que realizamos.
          </AnimatedText>
        </div>
      </section>

      <section className="px-[clamp(1.25rem,5vw,5rem)]">
        <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-[clamp(3rem,8vw,7rem)] py-8">
          {services.map((s, i) => (
            <div
              key={s.n}
              className={`grid items-center gap-[clamp(2rem,5vw,5rem)] md:grid-cols-2 ${
                i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""
              }`}
            >
              <RevealOnScroll>
                <div className="relative aspect-[4/3] overflow-hidden rounded">
                  <Image
                    src={s.image}
                    alt={s.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                    style={{ objectPosition: s.imagePosition ?? "center" }}
                  />
                </div>
              </RevealOnScroll>
              <div>
                <span className="text-[0.8rem] font-semibold tracking-[0.1em] text-green-dark">
                  {s.n}
                </span>
                <AnimatedText as="h2" className="mt-3 text-[clamp(1.6rem,3vw,2.4rem)]">
                  {s.title}
                </AnimatedText>
                <RevealOnScroll delay={0.1}>
                  <p className="mt-4 max-w-[46ch] text-[clamp(1.05rem,1.5vw,1.3rem)] text-navy/70">
                    {s.text}
                  </p>
                </RevealOnScroll>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="px-[clamp(1.25rem,5vw,5rem)] py-[clamp(4rem,8vw,7rem)]">
        <div className="mx-auto w-full max-w-[1440px] border-t border-line pt-12">
          <RevealOnScroll>
            <p className="eyebrow">Provisión de Equipos</p>
          </RevealOnScroll>
          <AnimatedText as="h2" className="h2-fluid mt-3 max-w-[38ch]">
            Provisión de equipos de Tratamiento de Agua y Efluentes.
          </AnimatedText>
          <RevealOnScroll delay={0.1}>
            <p className="mt-4 max-w-[60ch] text-[clamp(1.05rem,1.5vw,1.3rem)] text-navy/70">
              Somos proveedores de equipos de Tratamiento de Agua y Efluentes,
              respetando y cumplimentando el marco normativo para cada caso.
            </p>
          </RevealOnScroll>

          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
            {equipmentPlants.map((p) => (
              <RevealOnScroll key={p.n} delay={0.1}>
                <div className="flex h-full flex-col rounded border border-navy/10 bg-white p-6 sm:p-8">
                  <span className="text-[0.8rem] font-semibold tracking-[0.1em] text-green-dark">
                    {p.n}
                  </span>
                  <h3 className="mt-3 text-[clamp(1.3rem,2.2vw,1.7rem)]">{p.title}</h3>
                  <p className="mt-3 text-navy/70">{p.provision}</p>
                  <p className="mt-6 text-[0.78rem] font-semibold uppercase tracking-[0.08em] text-navy/50">
                    Ventajas
                  </p>
                  <ul className="mt-3 flex flex-col gap-2">
                    {p.advantages.map((a) => (
                      <li key={a} className="flex items-start gap-2 text-navy/80">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-green-dark" />
                        {a}
                      </li>
                    ))}
                  </ul>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      <section className="px-[clamp(1.25rem,5vw,5rem)] py-[clamp(4rem,8vw,7rem)]">
        <div className="mx-auto grid w-full max-w-[1440px] grid-cols-2 gap-8 border-t border-line pt-12 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label}>
              <Counter
                value={s.value}
                prefix={s.prefix}
                className="block text-[clamp(2.4rem,5vw,4rem)] font-semibold text-navy"
              />
              <p className="mt-2 text-sm text-navy/60">{s.label}</p>
              {s.note && <p className="text-xs text-navy/40">{s.note}</p>}
            </div>
          ))}
        </div>
      </section>

      <CtaFullbleed title="Contanos tu proyecto y armamos la propuesta técnica." />
    </>
  );
}
