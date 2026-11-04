import { Timeline } from "@/components/ui/timeline";
import { experiencia } from "@/data/perfil";
import { Revelar } from "@/components/ui/revelar";
import { Encabezado } from "./encabezado";

export function Experiencia() {
  const datos = experiencia.map((item) => ({
    title: item.periodo,
    content: (
      <Revelar className="border-l border-border pl-6 md:pl-8">
        <h3 className="font-pixel text-2xl tracking-tight text-foreground md:text-3xl">{item.puesto}</h3>
        <p className="mt-2 font-mono text-xs text-muted">{item.lugar}</p>
        <ul className="mt-5 space-y-2 text-sm leading-relaxed text-foreground/80">
          {item.puntos.map((punto) => (
            <li key={punto} className="flex gap-3">
              <span aria-hidden className="text-muted">—</span>
              <span className="text-pretty">{punto}</span>
            </li>
          ))}
        </ul>
      </Revelar>
    ),
  }));

  return (
    <section id="experiencia" className="px-4 py-28 md:px-8">
      <div className="mx-auto max-w-6xl">
        <Encabezado
          numero="02"
          titulo="Experiencia"
          bajada="Dónde trabajé, qué construí y con quién."
        />
      </div>
      <Timeline data={datos} />
    </section>
  );
}
