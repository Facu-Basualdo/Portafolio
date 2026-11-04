import { Reloj } from "@/components/ui/reloj";
import { perfil } from "@/data/perfil";

const ciudad = perfil.ubicacion.split(",")[0];

export function Barra() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 bg-gradient-to-b from-background via-background/80 to-transparent px-4 pt-4 pb-8 md:px-8">
      <div className="mx-auto flex max-w-6xl items-center justify-between font-mono text-xs text-muted">
        <a href="#inicio" className="group flex items-center gap-2 text-foreground">
          <span className="font-pixel text-base leading-none">FB</span>
          <span className="hidden text-muted transition-colors group-hover:text-foreground sm:inline">
            {perfil.nombre.toLowerCase()}
          </span>
        </a>
        <div className="flex items-center gap-2">
          <span>{ciudad.toLowerCase()}</span>
          <Reloj className="text-foreground" />
        </div>
      </div>
    </header>
  );
}
