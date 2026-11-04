/*
 * Todo el contenido del portafolio vive acá. Las secciones sólo lo dibujan:
 * para agregar un proyecto o actualizar un número, se toca este archivo.
 * Fuente: C:\ReposGit\CV\experiencia.md (números al 22/08/2026).
 */

export const perfil = {
  nombre: "Facundo Basualdo",
  nombreCompleto: "Facundo Fabián Basualdo Álvarez",
  rol: "Desarrollador full-stack",
  roles: ["full-stack", "de producto", "de IA aplicada", "de tiempo real"],
  ubicacion: "Resistencia, Chaco, Argentina",
  resumen:
    "Estudio Ingeniería en Sistemas en la UTN FRRE y construyo productos que están en producción: una plataforma académica en Google Play y web, y una plataforma open source de minijuegos con aportes de la comunidad.",
  disponibilidad: "Disponible para trabajo remoto o presencial en Resistencia · UTC-3",
  email: "facundo@basualdo.dev",
  github: "https://github.com/Facu-Basualdo",
  linkedin: "https://www.linkedin.com/in/facu-basualdo/",
  cv: "/cv-facundo-basualdo.pdf",
};

export const cifras = [
  { valor: "~230k", etiqueta: "líneas en miFACU" },
  { valor: "67", etiqueta: "juegos en Juegachos" },
  { valor: "8", etiqueta: "colaboradores open source" },
  { valor: "3", etiqueta: "plataformas en producción" },
];

export type Enlace = { etiqueta: string; href: string };

export type Proyecto = {
  id: string;
  nombre: string;
  bajada: string;
  descripcion: string;
  destacados: string[];
  stack: string[];
  rol: string;
  periodo: string;
  enlaces: Enlace[];
  /** Ancho en la grilla de escritorio: un tercio (por defecto), la mitad o toda la fila. */
  ancho?: "medio" | "completo";
};

export const proyectos: Proyecto[] = [
  {
    id: "mifacu",
    nombre: "miFACU",
    bajada: "Plataforma académica en iOS, Android y web",
    descripcion:
      "Gestor académico para universitarios: materias, correlativas, horarios, finales, apuntes e IA de estudio, con panel de administración y modelo freemium.",
    destacados: [
      "Monorepo de 4 plataformas: API Node/Express, web Next.js 16, React Native y app iOS nativa en SwiftUI.",
      "Arquitectura de IA con cadenas de fallback entre Gemini, Claude, DeepSeek y OpenAI según costo, latencia o calidad.",
      "Faro IA: pipeline de PDFs a grafo de conocimiento sobre una cola en PostgreSQL con FOR UPDATE SKIP LOCKED.",
      "Corregí una escalada de privilegios en producción migrando la identidad a JWT verificado contra JWKS.",
    ],
    stack: ["Next.js", "React Native", "SwiftUI", "Node.js", "PostgreSQL", "Redis", "Vercel AI SDK"],
    rol: "Cofundador · full-stack, junto a un socio",
    periodo: "2026 – hoy",
    enlaces: [
      { etiqueta: "mifacu.com.ar", href: "https://mifacu.com.ar" },
      { etiqueta: "App Store", href: "https://apps.apple.com/app/id6758393223" },
      { etiqueta: "Google Play", href: "https://play.google.com/store/apps/details?id=com.plaidlabs.mifacu" },
    ],
    ancho: "medio",
  },
  {
    id: "juegachos",
    nombre: "Juegachos",
    bajada: "67 minijuegos web, open source",
    descripcion:
      "Colección de minijuegos jugables en el navegador con ranking global, salas multijugador de hasta 8 personas y aportes de la comunidad vía Pull Request.",
    destacados: [
      "Arquitectura de plugins auto-descubiertos con import.meta.glob: sumar un juego no toca código compartido.",
      "Salas host-autoritativas sobre Supabase Realtime con migración automática de host.",
      "Servidor Node + socket.io como árbitro, agregado tras medir el límite de ~100 msg/s por canal.",
      "17 juegos 3D con Three.js y física Rapier.",
    ],
    stack: ["TypeScript", "Three.js", "Supabase", "socket.io", "Vite", "Playwright"],
    rol: "Creador y maintainer",
    periodo: "2026 – hoy",
    enlaces: [
      { etiqueta: "juegachos.com", href: "https://www.juegachos.com/" },
      { etiqueta: "Código", href: "https://github.com/Facu-Basualdo/Juegachos" },
    ],
    ancho: "medio",
  },
  {
    id: "arco",
    nombre: "Arco",
    bajada: "Software de gestión de obras",
    descripcion:
      "Proyectos, actividades con avance ponderado, planos con observaciones, presupuestos, certificados e informes. Toda la seguridad está en Row Level Security, sin backend intermediario.",
    destacados: [
      "Módulo de planos y documentos con carpetas, versiones y visor PDF.",
      "Importación de presupuestos y certificados desde Excel.",
      "Avance de obra ponderado por peso de tareas y rubros.",
    ],
    stack: ["Next.js", "Supabase", "HeroUI", "RLS", "exceljs"],
    rol: "Full-stack · equipo de 4",
    periodo: "May – Ago 2026",
    enlaces: [{ etiqueta: "arcosoftware.com.ar", href: "https://www.arcosoftware.com.ar/" }],
  },
  {
    id: "vitrina",
    nombre: "Vitrina",
    bajada: "Tienda online con catálogo genérico",
    descripcion:
      "Sirve igual para ropa que para electrónica: etiquetas agrupadas, filtros facetados, variantes con stock propio y pedidos por WhatsApp con el total calculado en la base.",
    destacados: [
      "Promociones, combos y cupones evaluados en PostgreSQL, sin acumularse.",
      "Panel de administración completo y SEO con datos estructurados.",
      "Punto de venta de escritorio en Python + PySide6 sobre la misma base.",
    ],
    stack: ["Next.js", "HeroUI", "Supabase", "TipTap", "Python"],
    rol: "Proyecto propio",
    periodo: "2026",
    enlaces: [
      { etiqueta: "vitrina.basualdo.dev", href: "https://vitrina.basualdo.dev" },
      { etiqueta: "Código", href: "https://github.com/Facu-Basualdo/CatalogoTienda" },
    ],
  },
  {
    id: "gestor-de-estudios",
    nombre: "Gestor de Estudios",
    bajada: "Tutor de estudio con IA",
    descripcion:
      "Vault de Obsidian que arma, conduce y registra sesiones de estudio con Claude Code como tutor, más una web de flashcards y cuestionarios generados desde las notas.",
    destacados: [
      "Priorización por peso × dominio × urgencia.",
      "Recuperación activa y repetición espaciada.",
    ],
    stack: ["Next.js", "Claude Code", "Gemini", "Obsidian"],
    rol: "Proyecto propio",
    periodo: "2026",
    enlaces: [
      { etiqueta: "tutor.basualdo.dev", href: "https://tutor.basualdo.dev" },
      { etiqueta: "Código", href: "https://github.com/Facu-Basualdo/GestorDeEstudios" },
    ],
  },
  {
    id: "mods-minecraft",
    nombre: "Mods de Minecraft",
    bajada: "Cuatro mods de Fabric que se juegan juntos",
    descripcion:
      "Bloodmoon & Bosses sube el nivel de los mobs, Hero's Forge te deja comprar estadísticas con experiencia, Mythic Loot suelta equipo con rareza y Soul Link comparte inventario y hambre entre jugadores.",
    destacados: [],
    stack: ["Java", "Fabric", "Minecraft 26.3"],
    ancho: "completo",
    rol: "Proyecto propio",
    periodo: "2026",
    enlaces: [
      { etiqueta: "Soul Link", href: "https://github.com/Facu-Basualdo/SoulLink" },
      { etiqueta: "Hero's Forge", href: "https://github.com/Facu-Basualdo/HerosForge" },
      { etiqueta: "Mythic Loot", href: "https://github.com/Facu-Basualdo/MythicLoot" },
      { etiqueta: "Bloodmoon", href: "https://github.com/Facu-Basualdo/BloodmoonAndBosses" },
    ],
  },
];

export type Experiencia = {
  periodo: string;
  puesto: string;
  lugar: string;
  puntos: string[];
};

export const experiencia: Experiencia[] = [
  {
    periodo: "Jul 2026",
    puesto: "Creador y maintainer",
    lugar: "Juegachos · open source · jul 2026 – hoy",
    puntos: [
      "314 de 425 commits y revisión de los aportes de 8 colaboradores.",
      "Guía de contribución y documentación por juego para que cualquiera pueda sumar el suyo.",
    ],
  },
  {
    periodo: "May 2026",
    puesto: "Desarrollador full-stack",
    lugar: "Arco · equipo de 4 · may – ago 2026",
    puntos: [
      "Aplicación de gestión de obras con ~52.000 líneas y 84 migraciones SQL, con seguridad íntegramente en RLS.",
      "Reduje el tiempo de carga del detalle de proyecto paralelizando queries y agregando prefetch.",
    ],
  },
  {
    periodo: "Ene 2026",
    puesto: "Cofundador y desarrollador full-stack",
    lugar: "miFACU · remoto · ene 2026 – hoy",
    puntos: [
      "Plataforma publicada en Google Play y web: 642 de los 1.458 commits, junto a un socio.",
      "Diseñé la arquitectura de IA, con salidas estructuradas validadas por schema y reparación de JSON sin volver a llamar al modelo.",
      "Eliminé el throttling de analytics con un semáforo de concurrencia, backoff con jitter y caché en Redis.",
    ],
  },
  {
    periodo: "2024",
    puesto: "Soporte IT y asistencia técnica",
    lugar: "Freelance · Resistencia · 2024 – hoy",
    puntos: [
      "Diagnóstico y resolución de incidencias de hardware y software, presencial y remoto.",
      "Capacitación de usuarios sin formación técnica.",
    ],
  },
  {
    periodo: "2022",
    puesto: "Ingeniería en Sistemas de Información",
    lugar: "UTN · Facultad Regional Resistencia · 2022 – hoy",
    puntos: ["Tercer año en curso."],
  },
];

export const stack = [
  {
    grupo: "Frontend",
    items: ["React 19", "Next.js 16", "React Native + Expo", "Tailwind CSS v4", "HeroUI", "TanStack Query"],
  },
  {
    grupo: "Backend y datos",
    items: ["Node.js", "Express", "PostgreSQL", "Supabase", "Redis", "TypeORM", "Zod", "Docker"],
  },
  {
    grupo: "IA y LLMs",
    items: ["Vercel AI SDK", "Gemini", "Claude", "DeepSeek", "OpenAI", "RAG", "Salidas estructuradas"],
  },
  {
    grupo: "Tiempo real y gráficos",
    items: ["Three.js", "Rapier", "Canvas 2D", "socket.io", "Supabase Realtime"],
  },
  {
    grupo: "Herramientas",
    items: ["Git y GitHub", "Vercel", "Railway", "PostHog", "RevenueCat", "Playwright"],
  },
];
