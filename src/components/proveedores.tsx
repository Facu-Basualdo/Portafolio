"use client";
import { MotionConfig } from "motion/react";

// Con "reducir movimiento" activado, motion salta directo al estado final.
export function Proveedores({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
