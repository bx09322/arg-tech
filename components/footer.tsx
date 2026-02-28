import { Zap, Mail, Phone, MapPin } from 'lucide-react'

const footerLinks = {
  Productos: [
    { label: 'Laptops Gaming', href: '#productos' },
    { label: 'Perifericos', href: '#productos' },
    { label: 'Consolas', href: '#productos' },
    { label: 'Componentes PC', href: '#productos' },
  ],
  Empresa: [
    { label: 'Sobre nosotros', href: '#' },
    { label: 'Preguntas frecuentes', href: '#' },
    { label: 'Politica de devolucion', href: '#' },
    { label: 'Terminos y condiciones', href: '#' },
  ],
}

export function Footer() {
  return (
    <footer id="contacto" className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <div className="mb-4 flex items-center gap-2">
              <Zap className="h-6 w-6 text-primary" />
              <span className="font-serif text-lg font-bold tracking-wider text-foreground">
                VORTEX<span className="text-primary"> GAMING</span>
              </span>
            </div>
            <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
              Tu tienda gamer de confianza en Argentina. Los mejores productos
              gaming al mejor precio, con envio a todo el pais.
            </p>
            <div className="flex flex-col gap-3 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                info@vortexgaming.com.ar
              </span>
              <span className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" />
                +54 11 1234-5678
              </span>
              <span className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                Buenos Aires, Argentina
              </span>
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="mb-4 font-serif text-sm font-bold tracking-wider text-foreground">
                {title.toUpperCase()}
              </h3>
              <ul className="flex flex-col gap-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-primary"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h3 className="mb-4 font-serif text-sm font-bold tracking-wider text-foreground">
              METODOS DE PAGO
            </h3>
            <ul className="flex flex-col gap-3 text-sm text-muted-foreground">
              <li>Transferencia Bancaria</li>
              <li>Tarjeta de Credito (hasta 12 cuotas)</li>
              <li>Tarjeta de Debito (5% OFF)</li>
              <li>Mercado Pago</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            {'2024 VORTEX GAMING. Todos los derechos reservados. Buenos Aires, Argentina.'}
          </p>
        </div>
      </div>
    </footer>
  )
}
