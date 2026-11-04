import { Revelar } from "@/components/ui/revelar";
import { stack } from "@/data/perfil";
import { Encabezado } from "./encabezado";

export function Stack() {
  return (
    <section id="stack" className="px-4 py-28 md:px-8">
      <div className="mx-auto max-w-6xl">
        <Encabezado numero="03" titulo="Stack" bajada="Las herramientas que uso todos los días." />
        <dl className="border-t border-border">
          {stack.map(({ grupo, items }, i) => (
            <Revelar
              key={grupo}
              retraso={i * 0.06}
              className="grid gap-4 border-b border-border py-6 md:grid-cols-[14rem_1fr] md:gap-8"
            >
              <dt className="font-mono text-xs text-muted md:pt-1.5">
                <span className="text-foreground">{String(i + 1).padStart(2, "0")}</span> {grupo.toLowerCase()}
              </dt>
              <dd className="flex flex-wrap gap-2">
                {items.map((item) => (
                  <span
                    key={item}
                    className="border border-border px-2.5 py-1 font-mono text-xs text-foreground/85 transition-colors duration-200 hover:border-foreground hover:bg-foreground hover:text-background"
                  >
                    {item}
                  </span>
                ))}
              </dd>
            </Revelar>
          ))}
        </dl>
      </div>
    </section>
  );
}
