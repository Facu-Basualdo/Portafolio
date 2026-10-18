import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, Chip } from "@heroui/react";
import { IconArrowUpRight, IconLock } from "@tabler/icons-react";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { cn } from "@/lib/utils";
import { proyectos, type Proyecto } from "@/data/perfil";
import { Encabezado } from "./encabezado";

const anchos: Record<NonNullable<Proyecto["ancho"]> | "tercio", string> = {
  tercio: "lg:col-span-2",
  medio: "lg:col-span-3",
  completo: "lg:col-span-6",
};

export function Proyectos() {
  return (
    <section id="proyectos" className="px-4 py-24 md:px-8">
      <div className="mx-auto max-w-6xl">
        <Encabezado
          numero="01"
          titulo="Proyectos"
          bajada="Productos en producción, proyectos open source y experimentos. Los números salen de cada repositorio."
        />
        <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-6">
          {proyectos.map((proyecto) => (
            <TarjetaProyecto key={proyecto.id} proyecto={proyecto} />
          ))}
        </ul>
      </div>
    </section>
  );
}

function TarjetaProyecto({ proyecto }: { proyecto: Proyecto }) {
  const ancho = proyecto.ancho ?? "tercio";

  return (
    <li className={cn("relative list-none rounded-3xl border border-border p-1.5", anchos[ancho], ancho !== "tercio" && "md:col-span-2")}>
      <GlowingEffect spread={40} glow disabled={false} proximity={64} inactiveZone={0.01} borderWidth={2} />
      {/* La tarjeta es de HeroUI; el brillo de Aceternity va en el borde exterior. */}
      <Card className="relative h-full gap-5 rounded-[1.25rem] border border-border p-6">

        <CardHeader className="gap-1">
          <div className="flex items-start justify-between gap-4">
            <CardTitle className="text-2xl font-semibold tracking-tight">{proyecto.nombre}</CardTitle>
            <span className="shrink-0 font-mono text-xs text-muted">{proyecto.periodo}</span>
          </div>
          <CardDescription className="text-base text-accent">{proyecto.bajada}</CardDescription>
        </CardHeader>

        <CardContent className="flex flex-1 flex-col gap-4">
          <p className="text-pretty text-muted">{proyecto.descripcion}</p>
          {proyecto.destacados.length > 0 && (
            <ul className="space-y-2 text-sm text-foreground/85">
              {proyecto.destacados.map((destacado) => (
                <li key={destacado} className="flex gap-2">
                  <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" />
                  <span className="text-pretty">{destacado}</span>
                </li>
              ))}
            </ul>
          )}
          <ul className="mt-auto flex flex-wrap gap-1.5 pt-2" aria-label="Tecnologías">
            {proyecto.stack.map((tecnologia) => (
              <li key={tecnologia}>
                <Chip size="sm" variant="soft">
                  {tecnologia}
                </Chip>
              </li>
            ))}
          </ul>
        </CardContent>

        <CardFooter className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-t border-border pt-4">
          <span className="text-sm text-muted">{proyecto.rol}</span>
          {proyecto.enlaces.length > 0 ? (
            <div className="flex flex-wrap gap-x-4 gap-y-1">
              {proyecto.enlaces.map((enlace) => (
                <a
                  key={enlace.href}
                  href={enlace.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-0.5 text-sm font-medium text-foreground hover:text-accent"
                >
                  {enlace.etiqueta}
                  <IconArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              ))}
            </div>
          ) : (
            <span className="inline-flex items-center gap-1 text-sm text-muted">
              <IconLock className="size-4" />
              Repositorio privado
            </span>
          )}
        </CardFooter>
      </Card>
    </li>
  );
}
