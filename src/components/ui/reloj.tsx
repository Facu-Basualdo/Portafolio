"use client";
import { useSyncExternalStore } from "react";

const formato = new Intl.DateTimeFormat("es-AR", {
  timeZone: "America/Argentina/Cordoba",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false,
});

const suscribir = (avisar: () => void) => {
  const intervalo = window.setInterval(avisar, 1000);
  return () => window.clearInterval(intervalo);
};

/** Hora local de Resistencia (UTC-3), segundo a segundo. */
export function Reloj({ className }: { className?: string }) {
  const hora = useSyncExternalStore(
    suscribir,
    () => formato.format(new Date()),
    () => "--:--:--",
  );

  return (
    <time className={className}>
      <span className="tabular-nums">{hora}</span>
    </time>
  );
}
