"use client";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

const SIGNOS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&*+=/<>_";
const DURACION = 700; // ms que tarda cada palabra en "decodificarse".

/*
 * Rota entre palabras como una terminal que decodifica: los caracteres se
 * resuelven de izquierda a derecha sobre un ruido de signos. Escribe directo en
 * el nodo de texto para no re-renderizar con React en cada cuadro. Los lectores
 * de pantalla leen la lista completa, no la animación.
 */
export function TextoDecodificado({
  palabras,
  intervalo = 2800,
  className,
}: {
  palabras: string[];
  intervalo?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const elemento = ref.current;
    if (!elemento) return;
    const quieto = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let indice = 0;
    let cuadro = 0;

    const decodificar = (destino: string) => {
      const inicio = performance.now();
      const paso = (ahora: number) => {
        const avance = Math.min((ahora - inicio) / DURACION, 1);
        const resueltos = Math.floor(avance * destino.length);
        let salida = destino.slice(0, resueltos);
        for (let i = resueltos; i < destino.length; i++) {
          salida += destino[i] === " " ? " " : SIGNOS[Math.floor(Math.random() * SIGNOS.length)];
        }
        elemento.textContent = salida;
        if (avance < 1) cuadro = requestAnimationFrame(paso);
      };
      cuadro = requestAnimationFrame(paso);
    };

    const temporizador = window.setInterval(() => {
      indice = (indice + 1) % palabras.length;
      const destino = palabras[indice];
      if (quieto) elemento.textContent = destino;
      else decodificar(destino);
    }, intervalo);

    return () => {
      window.clearInterval(temporizador);
      cancelAnimationFrame(cuadro);
    };
  }, [palabras, intervalo]);

  return (
    <span className={cn("whitespace-nowrap", className)}>
      <span className="sr-only">{palabras.join(", ")}</span>
      <span ref={ref} aria-hidden>
        {palabras[0]}
      </span>
    </span>
  );
}
