"use client";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/*
 * Texto en Geist Pixel que aparece letra por letra al entrar en pantalla. La
 * entrada sólo anima opacity y transform, que resuelve el compositor; la forma
 * del píxel (eje ELSH) cambia al pasar el mouse por una letra (ver .letra-pixel
 * en globals.css) y, con `vivo`, de vez en cuando en una letra al azar.
 */
export function TextoPixel({
  texto,
  className,
  vivo = false,
  retraso = 0,
}: {
  texto: string;
  className?: string;
  vivo?: boolean;
  /** Segundos antes de empezar a armarse. */
  retraso?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [estado, setEstado] = useState<"espera" | "visible">("espera");

  useEffect(() => {
    const elemento = ref.current;
    if (!elemento) return;
    const observador = new IntersectionObserver(
      ([entrada]) => {
        if (entrada.isIntersecting) {
          setEstado("visible");
          observador.disconnect();
        }
      },
      { rootMargin: "0px 0px -5% 0px" },
    );
    observador.observe(elemento);
    return () => observador.disconnect();
  }, []);

  useEffect(() => {
    if (!vivo || estado !== "visible") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const letras = ref.current?.querySelectorAll<HTMLSpanElement>(".letra-pixel");
    if (!letras?.length) return;

    const intervalo = window.setInterval(() => {
      const letra = letras[Math.floor(Math.random() * letras.length)];
      letra.style.setProperty("--elsh", String(25 + Math.round(Math.random() * 75)));
      window.setTimeout(() => letra.style.removeProperty("--elsh"), 500);
    }, 900);
    return () => window.clearInterval(intervalo);
  }, [vivo, estado]);

  // Índice global de cada letra, para escalonar la animación en todo el texto.
  const palabras = texto.split(" ");
  const inicios = palabras.map((_, p) =>
    palabras.slice(0, p).reduce((total, palabra) => total + palabra.length, 0),
  );

  // Escalonado entre letras: 40 ms, pero un texto largo no tarda más de ~350 ms
  // en empezar su última letra.
  const paso = Math.min(40, 350 / Math.max(texto.length, 1));

  return (
    <span
      ref={ref}
      data-estado={estado}
      className={cn("texto-pixel font-pixel", className)}
      style={{ "--paso": `${paso}ms` } as React.CSSProperties}
    >
      <span className="sr-only">{texto}</span>
      <span aria-hidden>
        {palabras.map((palabra, p) => (
          // Cada palabra no se corta entre líneas; el espacio sí.
          <span key={p}>
            {p > 0 && " "}
            <span className="inline-block whitespace-nowrap">
              {palabra.split("").map((letra, l) => (
                <span
                  key={l}
                  className="letra-pixel"
                  style={{ "--i": inicios[p] + l, "--retraso": `${retraso}s` } as React.CSSProperties}
                >
                  {letra}
                </span>
              ))}
            </span>
          </span>
        ))}
      </span>
    </span>
  );
}
