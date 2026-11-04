import { buttonVariants } from "@heroui/styles";
import { IconArrowDown, IconBrandGithub, IconBrandLinkedin, IconFileDownload } from "@tabler/icons-react";
import { CampoPixeles } from "@/components/ui/campo-pixeles";
import { Contador } from "@/components/ui/contador";
import { Revelar } from "@/components/ui/revelar";
import { TextoDecodificado } from "@/components/ui/texto-decodificado";
import { TextoPixel } from "@/components/ui/texto-pixel";
import { cifras, perfil } from "@/data/perfil";

export function Hero() {
  return (
    <section
      id="inicio"
      className="relative flex min-h-svh items-center overflow-hidden px-4 pt-28 pb-16 md:px-8"
    >
      {/* Grilla de píxeles que reacciona al cursor y se desvanece hacia los bordes. */}
      <CampoPixeles className="[mask-image:radial-gradient(ellipse_80%_70%_at_70%_40%,black_10%,transparent_75%)]" />

      <div className="relative z-10 mx-auto w-full max-w-6xl">
        <Revelar>
          <p className="mb-8 inline-flex items-center gap-2 border border-border bg-background px-3 py-1.5 font-mono text-xs text-muted">
            <span className="relative flex size-1.5">
              <span className="absolute inline-flex size-full animate-ping bg-foreground opacity-60 motion-reduce:animate-none" />
              <span className="relative inline-flex size-1.5 bg-foreground" />
            </span>
            {perfil.ubicacion}
          </p>
        </Revelar>

        <h1 className="text-6xl leading-[0.95] tracking-tight text-balance text-foreground sm:text-7xl md:text-[8.5rem]">
          <TextoPixel texto={perfil.nombre} vivo retraso={0.15} />
        </h1>

        <Revelar retraso={0.6}>
          <p className="mt-6 font-mono text-lg text-muted md:text-2xl">
            <span className="text-foreground">&gt;</span> desarrollador{" "}
            <TextoDecodificado palabras={perfil.roles} className="text-foreground" />
            <span aria-hidden className="cursor-bloque text-foreground" />
          </p>
        </Revelar>

        <Revelar retraso={0.75}>
          <p className="mt-8 max-w-2xl text-sm leading-relaxed text-pretty text-muted md:text-base">
            {perfil.resumen}
          </p>
        </Revelar>

        <Revelar retraso={0.9}>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <a href="#proyectos" className={`group ${buttonVariants({ variant: "primary", size: "lg" })}`}>
              Ver proyectos
              <IconArrowDown className="size-4 transition-transform group-hover:translate-y-0.5" />
            </a>
            <a href={perfil.cv} download className={buttonVariants({ variant: "outline", size: "lg" })}>
              <IconFileDownload className="size-4" />
              Descargar CV
            </a>
            <a
              href={perfil.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className={buttonVariants({ variant: "ghost", size: "lg", isIconOnly: true })}
            >
              <IconBrandGithub className="size-5" />
            </a>
            <a
              href={perfil.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className={buttonVariants({ variant: "ghost", size: "lg", isIconOnly: true })}
            >
              <IconBrandLinkedin className="size-5" />
            </a>
          </div>
        </Revelar>

        <dl className="mt-20 grid max-w-4xl grid-cols-2 border-t border-border sm:grid-cols-4">
          {cifras.map((cifra, i) => (
            <Revelar key={cifra.etiqueta} retraso={1 + i * 0.08} className="border-b border-border py-5 pr-4 sm:border-b-0">
              <dt className="sr-only">{cifra.etiqueta}</dt>
              <dd className="font-pixel text-3xl text-foreground md:text-4xl">
                <Contador valor={cifra.valor} />
              </dd>
              <dd className="mt-1 font-mono text-xs text-muted">{cifra.etiqueta}</dd>
            </Revelar>
          ))}
        </dl>
      </div>
    </section>
  );
}
