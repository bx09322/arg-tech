'use client'

import { offers } from '@/lib/products'
import { ProductCard } from './product-card'
import { Flame } from 'lucide-react'

export function OffersSection() {
  return (
    <section id="ofertas" className="bg-card py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mb-12 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-2">
            <Flame className="h-4 w-4 text-accent" />
            <span className="font-serif text-xs font-bold tracking-wider text-accent">
              OFERTAS LIMITADAS
            </span>
          </div>
          <h2 className="mb-4 font-serif text-3xl font-bold tracking-wider text-foreground md:text-4xl text-balance">
            DESCUENTOS <span className="text-accent">IMPERDIBLES</span>
          </h2>
          <p className="mx-auto max-w-xl text-muted-foreground">
            Aprovecha nuestros descuentos exclusivos. Stock limitado, no te los pierdas.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {offers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}
