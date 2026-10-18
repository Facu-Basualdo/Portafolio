import { buttonVariants } from "@heroui/styles";
import { IconBrandGithub, IconBrandLinkedin, IconMail } from "@tabler/icons-react";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { perfil } from "@/data/perfil";
import { Encabezado } from "./encabezado";

export function Contacto() {
  return (
    <section id="contacto" className="px-4 py-24 md:px-8">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl border border-border bg-surface/40 px-6 py-16 md:px-16 md:py-24">
        <div
          aria-hidden
          className="resplandor-marca pointer-events-none absolute inset-0"
        />
        <BackgroundBeams />
        <div className="relative z-10">
          <Encabezado
            numero="04"
            titulo="Contacto"
            bajada={`¿Tenés un proyecto o una búsqueda abierta? Escribime y te respondo. ${perfil.disponibilidad}.`}
          />
          <a
            href={`mailto:${perfil.email}`}
            className="block w-fit font-mono text-xl break-all text-foreground underline decoration-accent decoration-2 underline-offset-8 hover:text-accent md:text-3xl"
          >
            {perfil.email}
          </a>
          <div className="mt-10 flex flex-wrap gap-3">
            <a href={`mailto:${perfil.email}`} className={buttonVariants({ variant: "primary", size: "lg" })}>
              <IconMail className="size-4" />
              Enviar un email
            </a>
            <a
              href={perfil.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonVariants({ variant: "outline", size: "lg" })}
            >
              <IconBrandLinkedin className="size-4" />
              LinkedIn
            </a>
            <a
              href={perfil.github}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonVariants({ variant: "outline", size: "lg" })}
            >
              <IconBrandGithub className="size-4" />
              GitHub
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
