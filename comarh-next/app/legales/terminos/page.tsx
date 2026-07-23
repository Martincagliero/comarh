import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Términos y Condiciones",
  robots: { index: false },
};

export default function TerminosPage() {
  return (
    <article className="mx-auto w-full max-w-3xl px-[clamp(1.25rem,5vw,5rem)] pb-24 pt-40">
      <h1 className="text-[clamp(1.8rem,4vw,3rem)]">Términos y Condiciones</h1>
      <p className="mt-4 text-sm text-navy/50">Última actualización: 2025</p>

      <div className="mt-8 flex flex-col gap-5 text-navy/80 [&_h2]:mt-6 [&_h2]:text-xl [&_h2]:text-navy">
        <p>
          El acceso y uso de este sitio web implica la aceptación de los
          presentes términos y condiciones. (Reemplazar por el texto legal
          definitivo revisado por un profesional.)
        </p>
        <h2>Uso del sitio</h2>
        <p>
          El contenido de este sitio tiene fines informativos sobre los servicios
          de COMARH S.A. La información no constituye asesoramiento técnico ni
          legal vinculante hasta la firma de un contrato de servicios.
        </p>
        <h2>Propiedad intelectual</h2>
        <p>
          Los textos, imágenes, logotipos y demás contenidos son propiedad de
          COMARH S.A. o de sus respectivos titulares y no pueden reproducirse sin
          autorización.
        </p>
        <h2>Contacto</h2>
        <p>
          Ante cualquier duda sobre estos términos, escribinos a
          contacto@consultoracomarh.com.
        </p>
      </div>
    </article>
  );
}
