import Image from "next/image";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import { whatsappLink } from "@/lib/data/grundfos";

const solarProducts = [
  {
    name: "Bombas sumergibles SQFlex",
    detail: "Soluciones para abastecimiento de agua mediante energía solar",
    image: "/img/grundfos/bombeo-solar/productos/sqflex.png",
  },
  {
    name: "Motor MGFlex",
    detail: "Motor de imanes permanentes de alta eficiencia",
    image: "/img/grundfos/bombeo-solar/productos/mgflex.png",
  },
  {
    name: "Inversores solares RSI",
    detail: "Control y alimentación flexible para sistemas de bombeo",
    image: "/img/grundfos/bombeo-solar/productos/rsi.png",
  },
  {
    name: "PowerAdapt",
    detail: "Gabinete para integración y control del sistema",
    image: "/img/grundfos/bombeo-solar/productos/poweradapt.png",
  },
];

export default function SolarPumping() {
  return (
    <section className="overflow-hidden bg-[#f4f1ea] px-[clamp(1.25rem,5vw,5rem)] py-[clamp(4rem,8vw,7rem)]">
      <div className="mx-auto w-full max-w-[1440px]">
        <div className="grid items-end gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div>
            <RevealOnScroll>
              <p className="eyebrow">Soluciones energéticas</p>
              <h2 className="display mt-4 max-w-[11ch]">Bombeo solar</h2>
            </RevealOnScroll>
            <RevealOnScroll delay={0.08}>
              <p className="mt-6 max-w-[54ch] text-[clamp(1.05rem,1.5vw,1.3rem)] leading-relaxed text-navy/75">
                Diseñamos y proveemos sistemas de bombeo alimentados por energía solar
                para llevar agua donde se necesita, incluso en sitios aislados o con un
                suministro eléctrico inestable.
              </p>
            </RevealOnScroll>
          </div>

          <RevealOnScroll delay={0.12}>
            <div className="grid gap-3 sm:grid-cols-[1.35fr_0.65fr]">
              <div className="relative aspect-[676/494] overflow-hidden rounded-lg bg-[#efe7d5]">
                <Image
                  src="/img/grundfos/bombeo-solar/sistema-integral.png"
                  alt="Sistema integral de bombeo de agua alimentado por energía solar"
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 65vw, 40vw"
                  className="object-cover"
                />
              </div>
              <div className="relative min-h-56 overflow-hidden rounded-lg bg-[#F9EEDA] sm:min-h-0">
                <Image
                  src="/img/grundfos/bombeo-solar/equipos-soluciones.png"
                  alt="Bombas, paneles solares, controladores e inversores para soluciones de bombeo solar"
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 35vw, 20vw"
                  className="object-contain p-3"
                />
              </div>
            </div>
          </RevealOnScroll>
        </div>

        <div className="mt-12 border-t border-navy/15 pt-10">
          <RevealOnScroll>
            <div className="mb-6 flex items-end justify-between gap-6">
              <div>
                <p className="eyebrow">Gama de productos</p>
                <h3 className="mt-2 font-serif text-[clamp(1.6rem,2.5vw,2.4rem)] leading-tight text-navy">
                  Componentes del sistema
                </h3>
              </div>
              <p className="hidden max-w-[38ch] text-sm leading-relaxed text-navy/60 md:block">
                Equipos configurables según la fuente energética, el caudal y la
                altura requeridos por cada proyecto.
              </p>
            </div>
          </RevealOnScroll>

          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            {solarProducts.map((product, index) => (
              <RevealOnScroll key={product.name} delay={Math.min(index * 0.04, 0.12)}>
                <article className="flex h-full flex-col overflow-hidden rounded-lg border border-navy/10 bg-white/70">
                  <div className="relative aspect-square bg-[#F9EEDA]">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="(max-width: 1024px) 50vw, 25vw"
                      className="object-contain"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-3 sm:p-5">
                    <h4 className="text-sm font-medium leading-snug text-navy sm:text-base">
                      {product.name}
                    </h4>
                    <p className="mt-2 text-xs leading-relaxed text-navy/60 sm:text-sm">
                      {product.detail}
                    </p>
                    <a
                      href={whatsappLink(product.name)}
                      target="_blank"
                      rel="noopener"
                      data-cursor="hover"
                      className="group mt-5 inline-flex w-fit items-center gap-1.5 text-xs font-medium uppercase text-green-dark"
                    >
                      Consultar
                      <span className="transition-transform group-hover:translate-x-1">→</span>
                    </a>
                  </div>
                </article>
              </RevealOnScroll>
            ))}
          </div>
        </div>

        <div className="mt-12 border-t border-navy/15 pt-10">
          <RevealOnScroll delay={0.1}>
            <div className="flex max-w-[58rem] flex-col gap-8">
              <div>
                <h3 className="font-serif text-[clamp(1.6rem,2.5vw,2.5rem)] leading-tight text-navy">
                  Una solución flexible, renovable y preparada para operar 24/7
                </h3>
                <p className="mt-4 leading-relaxed text-navy/70">
                  Configuramos cada sistema con bombas sumergibles o de superficie,
                  motores e inversores Grundfos. La combinación energética permite
                  complementar la generación solar cuando la aplicación lo requiere.
                </p>
              </div>
              <a
                href={whatsappLink("una solución integral de bombeo solar")}
                target="_blank"
                rel="noopener"
                data-cursor="hover"
                className="group inline-flex w-fit items-center gap-2 rounded-full bg-navy px-6 py-3 text-sm font-medium text-white transition-colors duration-300 hover:bg-green-dark"
              >
                Consultar por bombeo solar
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </a>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}