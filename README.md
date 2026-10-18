# Portafolio — basualdo.dev

Portafolio personal de Facundo Basualdo. Next.js 16 (App Router, todo estático),
Tailwind CSS v4, componentes de [HeroUI v3](https://heroui.com) y de
[Aceternity UI](https://ui.aceternity.com).

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # verifica que todo prerenderice
```

## Dónde está cada cosa

| Ruta | Qué tiene |
|---|---|
| `src/data/perfil.ts` | **Todo el contenido**: datos personales, proyectos, experiencia y stack. Para actualizar el sitio casi siempre alcanza con tocar este archivo. |
| `src/components/secciones/` | Una sección por archivo (hero, proyectos, experiencia, stack, contacto, navegación). |
| `src/components/ui/` | Componentes de Aceternity copiados de su registry y adaptados (colores del tema, sin `Math.random()` en el render, accesibilidad). |
| `src/app/globals.css` | Tema oscuro: sobrescribe las variables de `@heroui/styles`. El acento es `#00FFA3`. |
| `public/cv-facundo-basualdo.pdf` | CV que se descarga desde el sitio. |

Para sumar otro componente de Aceternity, se baja el JSON de
`https://ui.aceternity.com/registry/<nombre>.json` y se copia `files[].content` a
`src/components/ui/`. Los de HeroUI se importan de `@heroui/react`; desde un Server
Component hay que usar los exports con nombre (`CardHeader`, no `Card.Header`).

## Deploy (Vercel + Cloudflare DNS)

1. Subir el repo a GitHub e importarlo en [vercel.com/new](https://vercel.com/new). No
   hace falta configurar nada: Vercel detecta Next.js.
2. En el proyecto de Vercel → **Settings → Domains**, agregar `basualdo.dev` y
   `www.basualdo.dev` (con redirección de `www` al dominio raíz).
3. En Cloudflare → **DNS** de `basualdo.dev`, crear los registros que muestra Vercel
   (normalmente `A @` y `CNAME www → cname.vercel-dns.com`) con el proxy **apagado**
   (nube gris), para que Vercel pueda emitir el certificado SSL.

Cada push a `main` despliega solo.
