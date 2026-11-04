"use client";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

const PASO = 22; // Separación de la grilla, en px.
const RADIO = 170; // Alcance del cursor, en px.
const ALCANCE = Math.ceil(RADIO / PASO); // Radio del cursor, en celdas.
const BASE = 0.09; // Opacidad de un punto apagado.

/*
 * Grilla de píxeles en canvas. Los puntos cercanos al cursor se encienden y se
 * apagan de a poco, dejando una estela; algunos titilan solos.
 *
 * Para que sea liviano:
 * - La grilla apagada se dibuja una sola vez en un canvas aparte y cada cuadro
 *   sólo la copia (un drawImage) y pinta encima los puntos encendidos.
 * - Por cuadro se recorren sólo las celdas alrededor del cursor y las que
 *   todavía brillan, no toda la grilla.
 * - Sin puntos encendidos ni cursor encima, el bucle se detiene.
 * - La posición del canvas se mide al cambiar de tamaño, no en cada
 *   movimiento del mouse, así no fuerza recálculos de layout.
 */
export function CampoPixeles({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const quieto = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fondo = document.createElement("canvas");
    const ctxFondo = fondo.getContext("2d");
    if (!ctxFondo) return;

    let columnas = 0;
    let filas = 0;
    let desfaseX = 0;
    let desfaseY = 0;
    let ancho = 0;
    let alto = 0;
    let brillo = new Float32Array(0);
    const activos = new Set<number>();
    // Posición del canvas relativa al documento; con scrollY alcanza para
    // ubicar el cursor sin volver a medir.
    const origen = { x: 0, y: 0 };
    const puntero = { x: -9999, y: -9999, dentro: false };
    let cuadro = 0;
    let visible = false;

    const medir = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      origen.x = rect.left + window.scrollX;
      origen.y = rect.top + window.scrollY;
      ancho = rect.width;
      alto = rect.height;
      for (const lienzo of [canvas, fondo]) {
        lienzo.width = Math.round(ancho * dpr);
        lienzo.height = Math.round(alto * dpr);
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctxFondo.setTransform(dpr, 0, 0, dpr, 0, 0);
      columnas = Math.ceil(ancho / PASO) + 1;
      filas = Math.ceil(alto / PASO) + 1;
      desfaseX = (ancho % PASO) / 2;
      desfaseY = (alto % PASO) / 2;
      brillo = new Float32Array(columnas * filas);
      activos.clear();

      ctxFondo.clearRect(0, 0, ancho, alto);
      ctxFondo.fillStyle = `rgba(255,255,255,${BASE})`;
      for (let f = 0; f < filas; f++) {
        for (let c = 0; c < columnas; c++) {
          ctxFondo.fillRect(desfaseX + c * PASO - 0.75, desfaseY + f * PASO - 0.75, 1.5, 1.5);
        }
      }
      pintar();
    };

    const pintar = () => {
      ctx.clearRect(0, 0, ancho, alto);
      ctx.drawImage(fondo, 0, 0, ancho, alto);
      ctx.fillStyle = "#fff";
      for (const i of activos) {
        const b = brillo[i];
        const x = desfaseX + (i % columnas) * PASO;
        const y = desfaseY + Math.floor(i / columnas) * PASO;
        const lado = 1.5 + b * 3;
        ctx.globalAlpha = BASE + b * 0.75;
        ctx.fillRect(x - lado / 2, y - lado / 2, lado, lado);
      }
      ctx.globalAlpha = 1;
    };

    const actualizar = () => {
      // Celdas alrededor del cursor: se encienden hacia su objetivo.
      if (puntero.dentro) {
        const cc = Math.round((puntero.x - desfaseX) / PASO);
        const fc = Math.round((puntero.y - desfaseY) / PASO);
        for (let f = Math.max(0, fc - ALCANCE); f <= Math.min(filas - 1, fc + ALCANCE); f++) {
          for (let c = Math.max(0, cc - ALCANCE); c <= Math.min(columnas - 1, cc + ALCANCE); c++) {
            const d = Math.hypot(desfaseX + c * PASO - puntero.x, desfaseY + f * PASO - puntero.y);
            if (d >= RADIO) continue;
            const i = f * columnas + c;
            const objetivo = (1 - d / RADIO) ** 2;
            if (objetivo > brillo[i]) {
              brillo[i] += (objetivo - brillo[i]) * 0.35;
              activos.add(i);
            }
          }
        }
      }
      // Todo lo encendido se apaga despacio: así queda la estela.
      for (const i of activos) {
        brillo[i] *= 0.95;
        if (brillo[i] < 0.01) {
          brillo[i] = 0;
          activos.delete(i);
        }
      }
    };

    const bucle = () => {
      actualizar();
      pintar();
      cuadro = visible && (activos.size > 0 || puntero.dentro) ? requestAnimationFrame(bucle) : 0;
    };

    const despertar = () => {
      if (visible && !cuadro) cuadro = requestAnimationFrame(bucle);
    };

    const alMover = (e: PointerEvent) => {
      puntero.x = e.clientX + window.scrollX - origen.x;
      puntero.y = e.clientY + window.scrollY - origen.y;
      puntero.dentro =
        puntero.x > -RADIO && puntero.x < ancho + RADIO && puntero.y > -RADIO && puntero.y < alto + RADIO;
      if (puntero.dentro) despertar();
    };
    const alSalir = () => {
      puntero.dentro = false;
    };

    const redimension = new ResizeObserver(medir);
    redimension.observe(canvas);
    // Si algo arriba cambia de alto (fuentes, imágenes), el canvas se mueve.
    redimension.observe(document.body);

    if (quieto) return () => redimension.disconnect();

    const enPantalla = new IntersectionObserver(([entrada]) => {
      visible = entrada.isIntersecting;
      despertar();
    });
    enPantalla.observe(canvas);

    // Un punto al azar titila cada tanto.
    const titileo = window.setInterval(() => {
      if (!visible || !brillo.length) return;
      const i = Math.floor(Math.random() * brillo.length);
      brillo[i] = 0.6;
      activos.add(i);
      despertar();
    }, 140);

    window.addEventListener("pointermove", alMover, { passive: true });
    document.documentElement.addEventListener("pointerleave", alSalir);

    return () => {
      cancelAnimationFrame(cuadro);
      window.clearInterval(titileo);
      redimension.disconnect();
      enPantalla.disconnect();
      window.removeEventListener("pointermove", alMover);
      document.documentElement.removeEventListener("pointerleave", alSalir);
    };
  }, []);

  return <canvas ref={ref} aria-hidden className={cn("pointer-events-none absolute inset-0 size-full", className)} />;
}
