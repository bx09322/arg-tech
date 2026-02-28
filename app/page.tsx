'use client'

import { Header } from '@/components/header'
import { Hero } from '@/components/hero'
import { ProductGrid } from '@/components/product-grid'
import { OffersSection } from '@/components/offers-section'
import { Footer } from '@/components/footer'
import { CartDrawer } from '@/components/cart-drawer'

export default function HomePage() {
  return (
    <>
      <Header />
      <CartDrawer />
      <main>
        <Hero />
        <ProductGrid />
        <OffersSection />
      </main>
      <Footer />
    </>
  )
}
