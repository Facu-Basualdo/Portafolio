"use client";
import { animate, useInView } from "motion/react";
import { useEffect, useRef } from "react";

/*
 * Cuenta desde cero hasta el número de `valor` cuando entra en pantalla,
 * respetando lo que tenga alrededor: "~230k" anima el 230 y deja "~" y "k".
 */
export function Contador({ valor, className }: { valor: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const enVista = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const [, prefijo = "", numero = "0", sufijo = ""] = valor.match(/^(\D*)(\d+)(.*)$/) ?? [];
  const destino = Number(numero);

  useEffect(() => {
    const elemento = ref.current;
    if (!enVista || !elemento) return;
    const animacion = animate(0, destino, {
      duration: 1.6,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (n) => {
        elemento.textContent = `${prefijo}${Math.round(n)}${sufijo}`;
      },
    });
    return () => animacion.stop();
  }, [enVista, destino, prefijo, sufijo]);

  return (
    <span className={className}>
      <span className="sr-only">{valor}</span>
      <span ref={ref} aria-hidden className="tabular-nums">
        {`${prefijo}0${sufijo}`}
      </span>
    </span>
  );
}
