'use client'

import { useState } from 'react'
import { products, categories, type Category } from '@/lib/products'
import { ProductCard } from './product-card'

export function ProductGrid() {
  const [activeCategory, setActiveCategory] = useState<Category>('Todos')

  const filtered =
    activeCategory === 'Todos'
      ? products
      : products.filter((p) => p.category === activeCategory)

  return (
    <section id="productos" className="bg-background py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="mb-4 font-serif text-3xl font-bold tracking-wider text-foreground md:text-4xl text-balance">
            NUESTROS <span className="text-primary">PRODUCTOS</span>
          </h2>
          <p className="mx-auto max-w-xl text-muted-foreground">
            Explora nuestra seleccion de hardware y accesorios gaming de las
            mejores marcas del mundo.
          </p>
        </div>

        <div className="mb-10 flex flex-wrap items-center justify-center gap-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`rounded-lg px-5 py-2.5 font-serif text-xs font-bold tracking-wider transition-all ${
                activeCategory === cat
                  ? 'bg-primary text-primary-foreground glow-cyan'
                  : 'border border-border bg-secondary text-muted-foreground hover:border-primary/40 hover:text-primary'
              }`}
            >
              {cat.toUpperCase()}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}
