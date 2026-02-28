import { ChevronDown } from 'lucide-react'

export function Hero() {
  return (
    <section
      id="inicio"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,212,255,0.08)_0%,transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(0,255,136,0.05)_0%,transparent_50%)]" />

      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'linear-gradient(rgba(0,212,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.3) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
      }} />

      <div className="relative z-10 mx-auto max-w-5xl px-4 text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-4 py-2">
          <span className="h-2 w-2 animate-pulse rounded-full bg-accent" />
          <span className="text-sm font-medium text-muted-foreground">
            Envios a todo el pais
          </span>
        </div>

        <h1 className="mb-6 font-serif text-4xl leading-tight font-bold tracking-wider text-foreground md:text-6xl lg:text-7xl text-balance">
          LA MEJOR{' '}
          <span className="text-primary glow-cyan-text">TECNOLOGIA GAMING</span>{' '}
          DE ARGENTINA
        </h1>

        <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
          Encontra laptops, perifericos, consolas y componentes de PC al mejor
          precio del mercado. Todo lo que necesitas para ganar.
        </p>

        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <a
            href="#productos"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-8 py-3.5 font-serif text-sm font-bold tracking-wider text-primary-foreground transition-all hover:glow-cyan hover:brightness-110"
          >
            VER PRODUCTOS
          </a>
          <a
            href="#ofertas"
            className="inline-flex items-center gap-2 rounded-lg border border-accent bg-transparent px-8 py-3.5 font-serif text-sm font-bold tracking-wider text-accent transition-all hover:bg-accent hover:text-accent-foreground hover:glow-green"
          >
            VER OFERTAS
          </a>
        </div>
      </div>

      <a
        href="#productos"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-muted-foreground transition-colors hover:text-primary"
        aria-label="Ir a productos"
      >
        <ChevronDown className="h-8 w-8" />
      </a>
    </section>
  )
}
