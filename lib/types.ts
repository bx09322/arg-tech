export interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  category: string
  image: string
  description: string
  isOffer?: boolean
  discount?: number
}

export interface CartItem {
  product: Product
  quantity: number
}

export interface CheckoutFormData {
  nombre: string
  apellido: string
  dni: string
  email: string
  telefono: string
  provincia: string
  ciudad: string
  direccion: string
  codigoPostal: string
  metodoPago: string
  cuotas?: number
}
