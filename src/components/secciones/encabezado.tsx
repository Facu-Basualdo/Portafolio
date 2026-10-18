export function Encabezado({
  numero,
  titulo,
  bajada,
}: {
  numero: string;
  titulo: string;
  bajada?: string;
}) {
  return (
    <header className="mb-10 max-w-2xl">
      <p className="mb-3 font-mono text-sm text-accent">
        {numero} <span className="text-muted">/ {titulo.toLowerCase()}</span>
      </p>
      <h2 className="text-3xl font-semibold tracking-tight text-balance md:text-5xl">
        {titulo}
      </h2>
      {bajada && <p className="mt-4 text-lg text-pretty text-muted">{bajada}</p>}
    </header>
  );
}
