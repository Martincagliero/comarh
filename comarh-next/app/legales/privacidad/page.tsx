import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Privacidad",
  robots: { index: false },
};

export default function PrivacidadPage() {
  return (
    <article className="mx-auto w-full max-w-3xl px-[clamp(1.25rem,5vw,5rem)] pb-24 pt-40">
      <h1 className="text-[clamp(1.8rem,4vw,3rem)]">Política de Privacidad</h1>
      <p className="mt-4 text-sm text-navy/50">Última actualización: 2025</p>

      <div className="mt-8 flex flex-col gap-5 text-navy/80 [&_h2]:mt-6 [&_h2]:text-xl [&_h2]:text-navy">
        <p>
          En COMARH S.A.S. valoramos la privacidad de las personas que se ponen en
          contacto con nosotros. Este documento describe cómo tratamos los datos
          que nos proporcionás. (Reemplazar por el texto legal definitivo revisado
          por un profesional.)
        </p>
        <h2>Datos que recopilamos</h2>
        <p>
          Cuando completás el formulario de contacto, recopilamos tu nombre,
          apellido, correo electrónico y el contenido de tu mensaje, con el único
          fin de responder tu consulta.
        </p>
        <h2>Uso de la información</h2>
        <p>
          Utilizamos tus datos exclusivamente para gestionar tu consulta y
          eventualmente enviarte información relacionada con tu proyecto. No
          compartimos tu información con terceros sin tu consentimiento.
        </p>
        <h2>Tus derechos</h2>
        <p>
          Podés solicitar el acceso, la rectificación o la eliminación de tus
          datos escribiendo a contacto@consultoracomarh.com.
        </p>
      </div>
    </article>
  );
}
