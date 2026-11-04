"use client";
import { motion } from "motion/react";

/** Aparece con un fundido desde abajo la primera vez que entra en pantalla. */
export function Revelar({
  children,
  className,
  retraso = 0,
}: {
  children: React.ReactNode;
  className?: string;
  /** Segundos de espera, para escalonar elementos vecinos. */
  retraso?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -5% 0px" }}
      transition={{ duration: 0.5, delay: retraso, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/** Línea horizontal que se dibuja de izquierda a derecha. */
export function LineaRevelada({ className }: { className?: string }) {
  return (
    <motion.div
      aria-hidden
      className={className}
      style={{ transformOrigin: "left" }}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    />
  );
}
