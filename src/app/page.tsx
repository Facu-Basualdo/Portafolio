import { Contacto } from "@/components/secciones/contacto";
import { Experiencia } from "@/components/secciones/experiencia";
import { Hero } from "@/components/secciones/hero";
import { Navegacion } from "@/components/secciones/navegacion";
import { Proyectos } from "@/components/secciones/proyectos";
import { Stack } from "@/components/secciones/stack";
import { perfil } from "@/data/perfil";

export default function Inicio() {
  return (
    <>
      <main className="flex-1">
        <Hero />
        <Proyectos />
        <Experiencia />
        <Stack />
        <Contacto />
      </main>
      <footer className="px-4 pt-8 pb-28 md:px-8">
        <div className="mx-auto flex max-w-6xl flex-wrap justify-between gap-2 border-t border-border pt-6 font-mono text-xs text-muted">
          <span>© {perfil.nombre}</span>
          <span>Next.js · HeroUI · Aceternity UI</span>
        </div>
      </footer>
      <Navegacion />
    </>
  );
}
