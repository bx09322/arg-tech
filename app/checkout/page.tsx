'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import {
  ArrowLeft,
  Building2,
  CreditCard,
  Landmark,
  Wallet,
  CheckCircle2,
  Zap,
  Loader2,
} from 'lucide-react'
import { useCart } from '@/context/cart-context'
import { formatPrice, provinces } from '@/lib/products'

const paymentMethods = [
  {
    id: 'transferencia',
    label: 'Transferencia Bancaria',
    icon: Building2,
  },
  {
    id: 'credito',
    label: 'Tarjeta de Credito',
    icon: CreditCard,
  },
  {
    id: 'debito',
    label: 'Tarjeta de Debito',
    icon: Landmark,
  },
  {
    id: 'mercadopago',
    label: 'Mercado Pago',
    icon: Wallet,
  },
]

const cuotasOptions = [1, 3, 6, 12]

function generateOrderNumber() {
  return `VG-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`
}

export default function CheckoutPage() {
  const router = useRouter()
  const { items, totalPrice, clearCart } = useCart()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [orderConfirmed, setOrderConfirmed] = useState(false)
  const [orderNumber, setOrderNumber] = useState('')
  const [selectedPayment, setSelectedPayment] = useState('')
  const [cuotas, setCuotas] = useState(1)
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    dni: '',
    email: '',
    telefono: '',
    provincia: '',
    ciudad: '',
    direccion: '',
    codigoPostal: '',
  })

  const debitoDiscount = selectedPayment === 'debito' ? totalPrice * 0.05 : 0
  const finalTotal = totalPrice - debitoDiscount
  const cuotaValue = selectedPayment === 'credito' && cuotas > 1 ? finalTotal / cuotas : 0

  function handleInputChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function getPaymentLabel() {
    switch (selectedPayment) {
      case 'transferencia':
        return 'Transferencia Bancaria'
      case 'credito':
        return cuotas > 1
          ? `Tarjeta de Credito - ${cuotas} cuotas sin interes de ${formatPrice(cuotaValue)}`
          : 'Tarjeta de Credito - 1 pago'
      case 'debito':
        return `Tarjeta de Debito (5% OFF aplicado: -${formatPrice(debitoDiscount)})`
      case 'mercadopago':
        return 'Mercado Pago'
      default:
        return ''
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!selectedPayment || items.length === 0) return

    setIsSubmitting(true)
    const order = generateOrderNumber()
    setOrderNumber(order)

    const fecha = new Date().toLocaleString('es-AR', {
      timeZone: 'America/Argentina/Buenos_Aires',
    })

    const productosHTML = items
      .map(
        (item) =>
          `- ${item.product.name} x${item.quantity} = ${formatPrice(item.product.price * item.quantity)}`
      )
      .join('\n')

    const message = `<b>NUEVO PEDIDO - VORTEX GAMING</b>

<b>Orden:</b> ${order}
<b>Fecha:</b> ${fecha}

<b>DATOS DEL COMPRADOR</b>
Nombre: ${formData.nombre} ${formData.apellido}
DNI: ${formData.dni}
Email: ${formData.email}
Telefono: ${formData.telefono}
Provincia: ${formData.provincia}
Ciudad: ${formData.ciudad}
Direccion: ${formData.direccion}
Codigo Postal: ${formData.codigoPostal}

<b>PRODUCTOS</b>
${productosHTML}

<b>TOTAL: ${formatPrice(finalTotal)}</b>
<b>Metodo de pago:</b> ${getPaymentLabel()}`

    try {
      const token = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN
      const chatId = process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID

      if (token && chatId) {
        await fetch(
          `https://api.telegram.org/bot${token}/sendMessage`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              chat_id: chatId,
              text: message,
              parse_mode: 'HTML',
            }),
          }
        )
      }
    } catch (error) {
      console.error('Error enviando a Telegram:', error)
    }

    clearCart()
    setOrderConfirmed(true)
    setIsSubmitting(false)
  }

  if (orderConfirmed) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background px-4">
        <div className="w-full max-w-md text-center">
          <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full border-2 border-accent bg-accent/10">
            <CheckCircle2 className="h-10 w-10 text-accent" />
          </div>
          <h1 className="mb-2 font-serif text-2xl font-bold tracking-wider text-foreground">
            PEDIDO CONFIRMADO
          </h1>
          <p className="mb-6 text-muted-foreground">
            Tu pedido fue recibido con exito. Te contactaremos a la brevedad.
          </p>
          <div className="mb-8 rounded-xl border border-border bg-card p-6">
            <span className="text-sm text-muted-foreground">
              Numero de orden
            </span>
            <p className="mt-1 font-serif text-xl font-bold tracking-wider text-primary">
              {orderNumber}
            </p>
          </div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-8 py-3.5 font-serif text-sm font-bold tracking-wider text-primary-foreground transition-all hover:glow-cyan hover:brightness-110"
          >
            VOLVER AL INICIO
          </Link>
        </div>
      </main>
    )
  }

  if (items.length === 0 && !orderConfirmed) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background px-4">
        <div className="w-full max-w-md text-center">
          <h1 className="mb-4 font-serif text-2xl font-bold tracking-wider text-foreground">
            CARRITO VACIO
          </h1>
          <p className="mb-8 text-muted-foreground">
            No tenes productos en tu carrito. Agrega algunos antes de continuar.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-8 py-3.5 font-serif text-sm font-bold tracking-wider text-primary-foreground transition-all hover:glow-cyan hover:brightness-110"
          >
            IR A LA TIENDA
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background pb-16 pt-8">
      <div className="mx-auto max-w-6xl px-4 lg:px-8">
        <div className="mb-8 flex items-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft className="h-5 w-5" />
            Volver
          </Link>
          <div className="flex items-center gap-2">
            <Zap className="h-6 w-6 text-primary" />
            <span className="font-serif text-lg font-bold tracking-wider text-foreground">
              CHECKOUT
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Formulario */}
            <div className="lg:col-span-2 flex flex-col gap-8">
              {/* Datos personales */}
              <section className="rounded-xl border border-border bg-card p-6">
                <h2 className="mb-6 font-serif text-lg font-bold tracking-wider text-foreground">
                  DATOS PERSONALES
                </h2>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="nombre"
                      className="text-sm font-medium text-muted-foreground"
                    >
                      Nombre
                    </label>
                    <input
                      id="nombre"
                      name="nombre"
                      type="text"
                      required
                      value={formData.nombre}
                      onChange={handleInputChange}
                      className="rounded-lg border border-border bg-input px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-primary"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="apellido"
                      className="text-sm font-medium text-muted-foreground"
                    >
                      Apellido
                    </label>
                    <input
                      id="apellido"
                      name="apellido"
                      type="text"
                      required
                      value={formData.apellido}
                      onChange={handleInputChange}
                      className="rounded-lg border border-border bg-input px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-primary"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="dni"
                      className="text-sm font-medium text-muted-foreground"
                    >
                      DNI
                    </label>
                    <input
                      id="dni"
                      name="dni"
                      type="text"
                      required
                      value={formData.dni}
                      onChange={handleInputChange}
                      className="rounded-lg border border-border bg-input px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-primary"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="email"
                      className="text-sm font-medium text-muted-foreground"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="rounded-lg border border-border bg-input px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-primary"
                    />
                  </div>
                  <div className="flex flex-col gap-2 sm:col-span-2">
                    <label
                      htmlFor="telefono"
                      className="text-sm font-medium text-muted-foreground"
                    >
                      Telefono
                    </label>
                    <input
                      id="telefono"
                      name="telefono"
                      type="tel"
                      required
                      value={formData.telefono}
                      onChange={handleInputChange}
                      className="rounded-lg border border-border bg-input px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-primary"
                    />
                  </div>
                </div>
              </section>

              {/* Direccion de envio */}
              <section className="rounded-xl border border-border bg-card p-6">
                <h2 className="mb-6 font-serif text-lg font-bold tracking-wider text-foreground">
                  DIRECCION DE ENVIO
                </h2>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="provincia"
                      className="text-sm font-medium text-muted-foreground"
                    >
                      Provincia
                    </label>
                    <select
                      id="provincia"
                      name="provincia"
                      required
                      value={formData.provincia}
                      onChange={handleInputChange}
                      className="rounded-lg border border-border bg-input px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-primary"
                    >
                      <option value="">Seleccionar provincia</option>
                      {provinces.map((p) => (
                        <option key={p} value={p}>
                          {p}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="ciudad"
                      className="text-sm font-medium text-muted-foreground"
                    >
                      Ciudad
                    </label>
                    <input
                      id="ciudad"
                      name="ciudad"
                      type="text"
                      required
                      value={formData.ciudad}
                      onChange={handleInputChange}
                      className="rounded-lg border border-border bg-input px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-primary"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="direccion"
                      className="text-sm font-medium text-muted-foreground"
                    >
                      Direccion
                    </label>
                    <input
                      id="direccion"
                      name="direccion"
                      type="text"
                      required
                      value={formData.direccion}
                      onChange={handleInputChange}
                      className="rounded-lg border border-border bg-input px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-primary"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="codigoPostal"
                      className="text-sm font-medium text-muted-foreground"
                    >
                      Codigo Postal
                    </label>
                    <input
                      id="codigoPostal"
                      name="codigoPostal"
                      type="text"
                      required
                      value={formData.codigoPostal}
                      onChange={handleInputChange}
                      className="rounded-lg border border-border bg-input px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-primary"
                    />
                  </div>
                </div>
              </section>

              {/* Metodo de pago */}
              <section className="rounded-xl border border-border bg-card p-6">
                <h2 className="mb-6 font-serif text-lg font-bold tracking-wider text-foreground">
                  METODO DE PAGO
                </h2>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {paymentMethods.map((method) => {
                    const Icon = method.icon
                    return (
                      <button
                        key={method.id}
                        type="button"
                        onClick={() => {
                          setSelectedPayment(method.id)
                          if (method.id !== 'credito') setCuotas(1)
                        }}
                        className={`flex items-center gap-3 rounded-lg border p-4 text-left transition-all ${
                          selectedPayment === method.id
                            ? 'border-primary bg-primary/5 glow-cyan'
                            : 'border-border bg-secondary hover:border-primary/40'
                        }`}
                      >
                        <Icon
                          className={`h-5 w-5 ${
                            selectedPayment === method.id
                              ? 'text-primary'
                              : 'text-muted-foreground'
                          }`}
                        />
                        <span
                          className={`text-sm font-bold ${
                            selectedPayment === method.id
                              ? 'text-foreground'
                              : 'text-muted-foreground'
                          }`}
                        >
                          {method.label}
                        </span>
                      </button>
                    )
                  })}
                </div>

                {/* Detalles segun metodo */}
                {selectedPayment === 'transferencia' && (
                  <div className="mt-6 rounded-lg border border-border bg-secondary p-4">
                    <h3 className="mb-3 text-sm font-bold text-foreground">
                      Datos para transferencia
                    </h3>
                    <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                      <p>
                        <span className="text-foreground">CBU:</span>{' '}
                        0000003100010000000001
                      </p>
                      <p>
                        <span className="text-foreground">Alias:</span>{' '}
                        VORTEX.GAMING.AR
                      </p>
                      <p>
                        <span className="text-foreground">Titular:</span>{' '}
                        Vortex Gaming SRL
                      </p>
                    </div>
                  </div>
                )}

                {selectedPayment === 'credito' && (
                  <div className="mt-6">
                    <h3 className="mb-3 text-sm font-bold text-foreground">
                      Selecciona las cuotas
                    </h3>
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                      {cuotasOptions.map((c) => (
                        <button
                          key={c}
                          type="button"
                          onClick={() => setCuotas(c)}
                          className={`flex flex-col items-center rounded-lg border p-3 transition-all ${
                            cuotas === c
                              ? 'border-primary bg-primary/5'
                              : 'border-border bg-secondary hover:border-primary/40'
                          }`}
                        >
                          <span
                            className={`font-serif text-lg font-bold ${
                              cuotas === c
                                ? 'text-primary'
                                : 'text-muted-foreground'
                            }`}
                          >
                            {c}x
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {c === 1
                              ? formatPrice(finalTotal)
                              : `${formatPrice(finalTotal / c)}/cuota`}
                          </span>
                          <span className="mt-1 text-xs text-accent">
                            Sin interes
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {selectedPayment === 'debito' && (
                  <div className="mt-6 rounded-lg border border-accent/30 bg-accent/5 p-4">
                    <p className="text-sm text-accent font-bold">
                      5% de descuento aplicado por pago con debito
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Ahorro: {formatPrice(debitoDiscount)}
                    </p>
                  </div>
                )}

                {selectedPayment === 'mercadopago' && (
                  <div className="mt-6 rounded-lg border border-border bg-secondary p-4">
                    <p className="text-sm text-muted-foreground">
                      Seras redirigido a Mercado Pago para completar el pago de
                      forma segura.
                    </p>
                  </div>
                )}
              </section>
            </div>

            {/* Resumen del pedido */}
            <div className="lg:col-span-1">
              <div className="sticky top-8 rounded-xl border border-border bg-card p-6">
                <h2 className="mb-6 font-serif text-lg font-bold tracking-wider text-foreground">
                  RESUMEN
                </h2>

                <div className="mb-6 flex flex-col gap-4">
                  {items.map((item) => (
                    <div key={item.product.id} className="flex gap-3">
                      <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-md bg-secondary">
                        <Image
                          src={item.product.image}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                          sizes="56px"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-bold text-foreground line-clamp-1">
                          {item.product.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {item.quantity}x {formatPrice(item.product.price)}
                        </p>
                      </div>
                      <span className="text-sm font-bold text-foreground">
                        {formatPrice(item.product.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col gap-3 border-t border-border pt-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="text-foreground">
                      {formatPrice(totalPrice)}
                    </span>
                  </div>
                  {selectedPayment === 'debito' && (
                    <div className="flex justify-between text-sm">
                      <span className="text-accent">Descuento debito (5%)</span>
                      <span className="text-accent">
                        -{formatPrice(debitoDiscount)}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Envio</span>
                    <span className="text-accent">Gratis</span>
                  </div>
                  <div className="flex justify-between border-t border-border pt-3">
                    <span className="font-serif font-bold text-foreground">
                      TOTAL
                    </span>
                    <span className="font-serif text-xl font-bold text-primary">
                      {formatPrice(finalTotal)}
                    </span>
                  </div>
                  {selectedPayment === 'credito' && cuotas > 1 && (
                    <p className="text-right text-xs text-muted-foreground">
                      {cuotas} cuotas sin interes de{' '}
                      {formatPrice(finalTotal / cuotas)}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={!selectedPayment || isSubmitting}
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-3.5 font-serif text-sm font-bold tracking-wider text-primary-foreground transition-all hover:glow-cyan hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      PROCESANDO...
                    </>
                  ) : (
                    'CONFIRMAR PEDIDO'
                  )}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </main>
  )
}
