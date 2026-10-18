import { buttonVariants } from "@heroui/styles";
import { IconArrowDown, IconBrandGithub, IconBrandLinkedin, IconFileDownload } from "@tabler/icons-react";
import { FlipWords } from "@/components/ui/flip-words";
import { Spotlight } from "@/components/ui/spotlight-new";
import { cifras, perfil } from "@/data/perfil";

export function Hero() {
  return (
    <section
      id="inicio"
      className="relative flex min-h-svh items-center overflow-hidden px-4 pt-24 pb-16 md:px-8"
    >
      {/* Grilla de fondo que se desvanece hacia los bordes. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:56px_56px] opacity-40 [mask-image:radial-gradient(ellipse_at_top,black_20%,transparent_70%)]"
      />
      {/* Resplandor azul desde abajo, como el de la landing de miFACU. */}
      <div
        aria-hidden
        className="resplandor-marca pointer-events-none absolute inset-0"
      />
      <Spotlight
        gradientFirst="radial-gradient(68.54% 68.72% at 55.02% 31.46%, hsla(217, 100%, 80%, .1) 0, hsla(221, 83%, 53%, .04) 50%, hsla(221, 83%, 45%, 0) 80%)"
        gradientSecond="radial-gradient(50% 50% at 50% 50%, hsla(217, 100%, 80%, .08) 0, hsla(221, 83%, 53%, .03) 80%, transparent 100%)"
        gradientThird="radial-gradient(50% 50% at 50% 50%, hsla(217, 100%, 80%, .06) 0, hsla(221, 83%, 45%, .02) 80%, transparent 100%)"
      />

      <div className="relative z-10 mx-auto w-full max-w-6xl">
        <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-3 py-1 font-mono text-xs text-muted backdrop-blur">
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-60 motion-reduce:animate-none" />
            <span className="relative inline-flex size-2 rounded-full bg-accent" />
          </span>
          {perfil.ubicacion}
        </p>

        <h1 className="text-5xl font-semibold tracking-tight text-balance sm:text-6xl md:text-8xl">
          {perfil.nombre}
        </h1>

        {/* div y no p: FlipWords renderiza un div adentro. */}
        <div className="mt-4 text-2xl text-muted md:text-4xl">
          Desarrollador
          <FlipWords words={perfil.roles} className="font-medium text-accent dark:text-accent" />
        </div>

        <p className="mt-8 max-w-2xl text-lg text-pretty text-muted md:text-xl">{perfil.resumen}</p>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <a href="#proyectos" className={buttonVariants({ variant: "primary", size: "lg" })}>
            Ver proyectos
            <IconArrowDown className="size-4" />
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

        <dl className="mt-16 grid max-w-3xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-4">
          {cifras.map((cifra) => (
            <div key={cifra.etiqueta} className="bg-background/90 px-5 py-4">
              <dt className="sr-only">{cifra.etiqueta}</dt>
              <dd className="font-mono text-2xl font-semibold text-foreground">{cifra.valor}</dd>
              <dd className="mt-1 text-sm text-muted">{cifra.etiqueta}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
