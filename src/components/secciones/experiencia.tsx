import { Timeline } from "@/components/ui/timeline";
import { experiencia } from "@/data/perfil";
import { Encabezado } from "./encabezado";

export function Experiencia() {
  const datos = experiencia.map((item) => ({
    title: item.periodo,
    content: (
      <div className="rounded-2xl border border-border bg-surface p-6">
        <h3 className="text-xl font-semibold tracking-tight">{item.puesto}</h3>
        <p className="mt-1 text-sm text-accent">{item.lugar}</p>
        <ul className="mt-4 space-y-2 text-muted">
          {item.puntos.map((punto) => (
            <li key={punto} className="flex gap-2">
              <span aria-hidden className="mt-2.5 size-1 shrink-0 rounded-full bg-muted" />
              <span className="text-pretty">{punto}</span>
            </li>
          ))}
        </ul>
      </div>
    ),
  }));

  return (
    <section id="experiencia" className="px-4 py-24 md:px-8">
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
