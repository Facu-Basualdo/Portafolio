import { buttonVariants } from "@heroui/styles";
import { IconArrowUpRight, IconBrandGithub, IconBrandLinkedin } from "@tabler/icons-react";
import { CampoPixeles } from "@/components/ui/campo-pixeles";
import { Revelar } from "@/components/ui/revelar";
import { TextoPixel } from "@/components/ui/texto-pixel";
import { perfil } from "@/data/perfil";
import { Encabezado } from "./encabezado";

export function Contacto() {
  return (
    <section id="contacto" className="relative overflow-hidden px-4 py-28 md:px-8">
      <CampoPixeles className="opacity-60 [mask-image:radial-gradient(ellipse_70%_60%_at_80%_80%,black_5%,transparent_70%)]" />
      <div className="relative z-10 mx-auto max-w-6xl">
        <Encabezado
          numero="04"
          titulo="Contacto"
          bajada={`¿Tenés un proyecto o una búsqueda abierta? Escribime y te respondo. ${perfil.disponibilidad}.`}
        />
        <a
          href={`mailto:${perfil.email}`}
          className="group inline-flex max-w-full items-center gap-3 text-2xl text-foreground sm:text-4xl md:text-5xl lg:text-6xl"
        >
          <TextoPixel texto={perfil.email} />
          <IconArrowUpRight className="size-8 shrink-0 text-muted transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-foreground md:size-12" />
        </a>
        <Revelar retraso={0.15}>
          <div className="mt-12 flex flex-wrap gap-3">
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
        </Revelar>
      </div>
    </section>
  );
}
