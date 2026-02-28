'use client'

import Image from 'next/image'
import { ShoppingCart } from 'lucide-react'
import { useCart } from '@/context/cart-context'
import { formatPrice } from '@/lib/products'
import type { Product } from '@/lib/types'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart()

  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-all hover:border-primary/40 hover:glow-cyan">
      <div className="relative aspect-[3/2] overflow-hidden bg-secondary">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        {product.isOffer && product.discount && (
          <span className="absolute top-3 left-3 rounded-md bg-accent px-2.5 py-1 font-serif text-xs font-bold tracking-wider text-accent-foreground">
            -{product.discount}%
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4">
        <span className="mb-1 text-xs font-medium tracking-wider text-primary">
          {product.category.toUpperCase()}
        </span>
        <h3 className="mb-2 font-serif text-sm font-bold tracking-wide text-foreground lg:text-base">
          {product.name}
        </h3>
        <p className="mb-4 line-clamp-2 flex-1 text-sm leading-relaxed text-muted-foreground">
          {product.description}
        </p>

        <div className="flex items-end justify-between">
          <div>
            {product.originalPrice && (
              <span className="block text-xs text-muted-foreground line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
            <span className="font-serif text-lg font-bold text-primary">
              {formatPrice(product.price)}
            </span>
          </div>
          <button
            onClick={() => addItem(product)}
            className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-xs font-bold text-primary-foreground transition-all hover:brightness-110"
            aria-label={`Agregar ${product.name} al carrito`}
          >
            <ShoppingCart className="h-4 w-4" />
            <span className="hidden sm:inline">AGREGAR</span>
          </button>
        </div>
      </div>
    </article>
  )
}
