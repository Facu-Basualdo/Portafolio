import { IconArrowUpRight, IconLock } from "@tabler/icons-react";
import { Revelar } from "@/components/ui/revelar";
import { TarjetaFoco } from "@/components/ui/tarjeta-foco";
import { cn } from "@/lib/utils";
import { proyectos, type Proyecto } from "@/data/perfil";
import { Encabezado } from "./encabezado";

const anchos: Record<NonNullable<Proyecto["ancho"]> | "tercio", string> = {
  tercio: "lg:col-span-2",
  medio: "md:col-span-2 lg:col-span-3",
  completo: "md:col-span-2 lg:col-span-6",
};

// En tablet hay dos columnas: si los proyectos de un tercio son impares, el
// último ocupa toda la fila para que no quede una celda vacía.
const tercios = proyectos.filter((proyecto) => !proyecto.ancho);
const ultimoTercio = tercios.length % 2 === 1 ? tercios.at(-1)?.id : undefined;

export function Proyectos() {
  return (
    <section id="proyectos" className="px-4 py-28 md:px-8">
      <div className="mx-auto max-w-6xl">
        <Encabezado
          numero="01"
          titulo="Proyectos"
          bajada="Productos en producción, proyectos open source y experimentos. Los números salen de cada repositorio."
        />
        {/* gap-px sobre fondo de borde: líneas de 1px entre celdas, sin bordes dobles. */}
        <ul className="grid grid-cols-1 gap-px border border-border bg-border md:grid-cols-2 lg:grid-cols-6">
          {proyectos.map((proyecto, i) => (
            <TarjetaProyecto key={proyecto.id} proyecto={proyecto} indice={i} />
          ))}
        </ul>
      </div>
    </section>
  );
}

function TarjetaProyecto({ proyecto, indice }: { proyecto: Proyecto; indice: number }) {
  const ancho = proyecto.ancho ?? "tercio";

  return (
    <li className={cn("list-none bg-background", anchos[ancho], proyecto.id === ultimoTercio && "md:col-span-2")}>
      <Revelar retraso={(indice % 3) * 0.08} className="h-full">
        <TarjetaFoco className="flex h-full flex-col gap-6 p-6 md:p-8">
          <div className="flex items-start justify-between gap-4 font-mono text-xs text-muted">
            <span>{String(indice + 1).padStart(2, "0")}</span>
            <span>{proyecto.periodo}</span>
          </div>

          <div>
            <h3 className="font-pixel text-3xl tracking-tight text-foreground md:text-4xl">
              {proyecto.nombre}
            </h3>
            <p className="mt-2 text-sm text-foreground/80">{proyecto.bajada}</p>
          </div>

          <p className="text-sm leading-relaxed text-pretty text-muted">{proyecto.descripcion}</p>

          {proyecto.destacados.length > 0 && (
            <ul className="space-y-2 text-sm leading-relaxed text-foreground/85">
              {proyecto.destacados.map((destacado) => (
                <li key={destacado} className="flex gap-3">
                  <span aria-hidden className="text-muted">—</span>
                  <span className="text-pretty">{destacado}</span>
                </li>
              ))}
            </ul>
          )}

          <ul className="mt-auto flex flex-wrap gap-1.5 pt-2" aria-label="Tecnologías">
            {proyecto.stack.map((tecnologia) => (
              <li
                key={tecnologia}
                className="border border-border px-2 py-0.5 font-mono text-[11px] text-muted transition-colors group-hover/foco:border-foreground/20 group-hover/foco:text-foreground/80"
              >
                {tecnologia}
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-t border-border pt-4 text-xs">
            <span className="text-muted">{proyecto.rol}</span>
            {proyecto.enlaces.length > 0 ? (
              <div className="flex flex-wrap gap-x-4 gap-y-1">
                {proyecto.enlaces.map((enlace) => (
                  <a
                    key={enlace.href}
                    href={enlace.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/enlace subrayado inline-flex items-center gap-0.5 text-foreground"
                  >
                    {enlace.etiqueta}
                    <IconArrowUpRight className="size-3.5 transition-transform duration-300 group-hover/enlace:translate-x-0.5 group-hover/enlace:-translate-y-0.5" />
                  </a>
                ))}
              </div>
            ) : (
              <span className="inline-flex items-center gap-1 text-muted">
                <IconLock className="size-3.5" />
                Repositorio privado
              </span>
            )}
          </div>
        </TarjetaFoco>
      </Revelar>
    </li>
  );
}
