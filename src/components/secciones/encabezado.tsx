import { LineaRevelada, Revelar } from "@/components/ui/revelar";
import { TextoPixel } from "@/components/ui/texto-pixel";

export function Encabezado({
  numero,
  titulo,
  bajada,
}: {
  numero: string;
  titulo: string;
  bajada?: string;
}) {
  return (
    <header className="mb-12">
      <div className="mb-8 flex items-center gap-4 font-mono text-xs text-muted">
        <span className="text-foreground">{numero}</span>
        <LineaRevelada className="h-px flex-1 bg-border" />
        <span>/ {titulo.toLowerCase()}</span>
      </div>
      <h2 className="text-4xl tracking-tight text-foreground md:text-6xl">
        <TextoPixel texto={titulo} />
      </h2>
      {bajada && (
        <Revelar retraso={0.1}>
          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-pretty text-muted md:text-base">{bajada}</p>
        </Revelar>
      )}
    </header>
  );
}
