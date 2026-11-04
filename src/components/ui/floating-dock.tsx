"use client";
/**
 * Note: Use position fixed according to your needs
 * Desktop navbar is better positioned at the bottom
 * Mobile navbar is better positioned at bottom right.
 **/

import { cn } from "@/lib/utils";
import { IconLayoutNavbarCollapse } from "@tabler/icons-react";
import {
  AnimatePresence,
  MotionValue,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";

import { useEffect, useMemo, useRef, useState } from "react";

// Los links a otros sitios abren en otra pestaña; las anclas de la página no.
const externo = (href: string) =>
  href.startsWith("http")
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};

export const FloatingDock = ({
  items,
  desktopClassName,
  mobileClassName,
}: {
  items: { title: string; icon: React.ReactNode; href: string }[];
  desktopClassName?: string;
  mobileClassName?: string;
}) => {
  return (
    <>
      <FloatingDockDesktop items={items} className={desktopClassName} />
      <FloatingDockMobile items={items} className={mobileClassName} />
    </>
  );
};

const FloatingDockMobile = ({
  items,
  className,
}: {
  items: { title: string; icon: React.ReactNode; href: string }[];
  className?: string;
}) => {
  const [open, setOpen] = useState(false);
  return (
    <div className={cn("relative block md:hidden", className)}>
      <AnimatePresence>
        {open && (
          <motion.div
            layoutId="nav"
            className="absolute inset-x-0 bottom-full mb-2 flex flex-col gap-2"
          >
            {items.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 10 }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: 10,
                  transition: {
                    delay: idx * 0.05,
                  },
                }}
                transition={{ delay: (items.length - 1 - idx) * 0.05 }}
              >
                <a
                  href={item.href}
                  key={item.title}
                  aria-label={item.title}
                  onClick={() => setOpen(false)}
                  {...externo(item.href)}
                  className="flex h-10 w-10 items-center justify-center border border-border bg-background"
                >
                  <div className="h-4 w-4">{item.icon}</div>
                </a>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      <button
        onClick={() => setOpen(!open)}
        aria-label={open ? "Cerrar navegación" : "Abrir navegación"}
        aria-expanded={open}
        className="flex h-12 w-12 items-center justify-center border border-border bg-background"
      >
        <IconLayoutNavbarCollapse className="h-5 w-5 text-muted" />
      </button>
    </div>
  );
};

// Medidas del dock desktop, en px. Van por style para que el cálculo de
// posiciones de abajo use exactamente los mismos números que el layout.
const BASE = 40; // Lado de un ícono en reposo.
const MAXIMO = 80; // Lado del ícono bajo el cursor.
const ALCANCE = 150; // Distancia a la que un ícono deja de agrandarse.
const GAP = 12;
const PADDING = 12;
const BORDE = 1;

// Rápido y casi sin rebote: el tamaño alcanza al cursor en ~30 ms.
const resorte = { mass: 0.1, stiffness: 300, damping: 12 };

type Dock = {
  /** Centro horizontal actual del ícono `indice`. */
  centroDe: (indice: number) => number;
  /** Anota el resorte de un ícono; devuelve la función que lo quita. */
  registrar: (indice: number, lado: MotionValue<number>) => () => void;
};

const FloatingDockDesktop = ({
  items,
  className,
}: {
  items: { title: string; icon: React.ReactNode; href: string }[];
  className?: string;
}) => {
  const mouseX = useMotionValue(Infinity);
  const ref = useRef<HTMLDivElement>(null);
  const lados = useRef<MotionValue<number>[]>([]);
  const centro = useRef(Infinity);

  // El centro se mide al montar y al cambiar el tamaño de la ventana.
  useEffect(() => {
    const medir = () => {
      const rect = ref.current?.getBoundingClientRect();
      centro.current = rect && rect.width > 0 ? rect.left + rect.width / 2 : Infinity;
    };
    medir();
    window.addEventListener("resize", medir);
    return () => window.removeEventListener("resize", medir);
  }, []);

  /*
   * Centro actual de un ícono, calculado con los tamaños que tienen los
   * resortes en este momento. Es lo mismo que medir con getBoundingClientRect,
   * pero sin leer el DOM: leerlo mientras los íconos cambian de tamaño forzaba
   * un recálculo de layout por ícono y por cuadro. Medir sólo la posición en
   * reposo tampoco sirve: el dock se re-centra al crecer y la magnificación
   * quedaba atrasada respecto del cursor.
   */
  const dock = useMemo<Dock>(
    () => ({
      centroDe: (indice) => {
        if (!Number.isFinite(centro.current)) return Infinity;
        const tamanos = items.map((_, i) => lados.current[i]?.get() ?? BASE);
        const total = tamanos.reduce((suma, lado) => suma + lado, 0);
        const ancho = total + GAP * (tamanos.length - 1) + 2 * (PADDING + BORDE);
        let x = centro.current - ancho / 2 + PADDING + BORDE;
        for (let i = 0; i < indice; i++) x += tamanos[i] + GAP;
        return x + tamanos[indice] / 2;
      },
      registrar: (indice, lado) => {
        lados.current[indice] = lado;
        return () => {
          delete lados.current[indice];
        };
      },
    }),
    [items],
  );

  return (
    <motion.div
      ref={ref}
      onMouseMove={(e) => mouseX.set(e.clientX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      style={{ gap: GAP, paddingInline: PADDING, borderWidth: BORDE }}
      // contain: layout aísla el recálculo de tamaños al dock.
      className={cn(
        "mx-auto hidden h-16 items-end border-border bg-background pb-3 [contain:layout] md:flex",
        className,
      )}
    >
      {items.map((item, indice) => (
        <IconContainer key={item.title} mouseX={mouseX} dock={dock} indice={indice} {...item} />
      ))}
    </motion.div>
  );
};

function IconContainer({
  mouseX,
  dock,
  indice,
  title,
  icon,
  href,
}: {
  mouseX: MotionValue<number>;
  dock: Dock;
  indice: number;
  title: string;
  icon: React.ReactNode;
  href: string;
}) {
  // Sin mouse encima (x = Infinity) o sin medir todavía, el ícono está "lejos".
  const distancia = useTransform(mouseX, (x) => {
    const centro = dock.centroDe(indice);
    if (!Number.isFinite(x) || !Number.isFinite(centro)) return ALCANCE;
    return x - centro;
  });
  // Un solo resorte para el lado del cuadrado; el ícono escala con transform,
  // que no toca el layout.
  const lado = useSpring(useTransform(distancia, [-ALCANCE, 0, ALCANCE], [BASE, MAXIMO, BASE]), resorte);
  const escala = useTransform(lado, (l) => l / BASE);

  useEffect(() => dock.registrar(indice, lado), [dock, indice, lado]);

  const [hovered, setHovered] = useState(false);

  return (
    <a href={href} aria-label={title} className="group/icono" {...externo(href)}>
      <motion.div
        style={{ width: lado, height: lado }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="relative flex aspect-square items-center justify-center border border-border bg-surface transition-colors group-hover/icono:border-foreground/40"
      >
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, y: 6, x: "-50%" }}
              animate={{ opacity: 1, y: 0, x: "-50%" }}
              exit={{ opacity: 0, y: 2, x: "-50%" }}
              transition={{ duration: 0.15 }}
              className="absolute -top-8 left-1/2 w-fit border border-border bg-background px-2 py-0.5 font-mono text-[11px] whitespace-pre text-foreground"
            >
              {title}
            </motion.div>
          )}
        </AnimatePresence>
        <motion.div style={{ scale: escala }} className="flex size-5 items-center justify-center">
          {icon}
        </motion.div>
      </motion.div>
    </a>
  );
}
