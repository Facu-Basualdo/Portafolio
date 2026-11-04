import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconBriefcase,
  IconCode,
  IconFileCv,
  IconHome,
  IconMail,
  IconStack2,
} from "@tabler/icons-react";
import { FloatingDock } from "@/components/ui/floating-dock";
import { perfil } from "@/data/perfil";

const clase = "size-full text-muted transition-colors group-hover/icono:text-foreground";

const items = [
  { title: "Inicio", icon: <IconHome className={clase} />, href: "#inicio" },
  { title: "Proyectos", icon: <IconCode className={clase} />, href: "#proyectos" },
  { title: "Experiencia", icon: <IconBriefcase className={clase} />, href: "#experiencia" },
  { title: "Stack", icon: <IconStack2 className={clase} />, href: "#stack" },
  { title: "Contacto", icon: <IconMail className={clase} />, href: "#contacto" },
  { title: "GitHub", icon: <IconBrandGithub className={clase} />, href: perfil.github },
  { title: "LinkedIn", icon: <IconBrandLinkedin className={clase} />, href: perfil.linkedin },
  { title: "CV", icon: <IconFileCv className={clase} />, href: perfil.cv },
];

export function Navegacion() {
  return (
    <nav aria-label="Secciones" className="fixed inset-x-0 bottom-4 z-50 flex justify-end px-4 md:justify-center">
      <FloatingDock items={items} />
    </nav>
  );
}
