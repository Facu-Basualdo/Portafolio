"use client";
import { useRef } from "react";
import { cn } from "@/lib/utils";

const DIAMETRO = 840;

/*
 * Contenedor con un foco de luz tenue que sigue al cursor. El foco es un
 * círculo que se mueve con transform (lo resuelve el compositor, sin layout
 * ni repintar el contenido), y el rect de la tarjeta se mide al entrar con el
 * mouse, no en cada movimiento.
 */
export function TarjetaFoco({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const foco = useRef<HTMLDivElement>(null);
  const caja = useRef({ left: 0, top: 0, scrollY: 0 });

  const mover = (e: React.PointerEvent) => {
    // Si se hizo scroll desde que se midió, la tarjeta se corrió eso mismo.
    const top = caja.current.top - (window.scrollY - caja.current.scrollY);
    const x = e.clientX - caja.current.left - DIAMETRO / 2;
    const y = e.clientY - top - DIAMETRO / 2;
    foco.current?.style.setProperty("transform", `translate3d(${x}px, ${y}px, 0)`);
  };

  return (
    <div
      ref={ref}
      onPointerEnter={(e) => {
        const rect = ref.current?.getBoundingClientRect();
        if (rect) caja.current = { left: rect.left, top: rect.top, scrollY: window.scrollY };
        mover(e);
      }}
      onPointerMove={mover}
      className={cn("group/foco relative isolate overflow-hidden", className)}
    >
      <div
        ref={foco}
        aria-hidden
        className="pointer-events-none absolute top-0 left-0 -z-10 opacity-0 transition-opacity duration-500 will-change-transform group-hover/foco:opacity-100"
        style={{
          width: DIAMETRO,
          height: DIAMETRO,
          background: "radial-gradient(circle closest-side, rgb(255 255 255 / 0.07), transparent)",
        }}
      />
      {children}
    </div>
  );
}
