"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface CartItem {
  id: string
  name: string
  color: string
  size: string
  price: number
  quantity: number
}

interface CartSummary {
  subtotal: number
  shipping: number
  discount: number
  total: number
}

function ShoppingCart({ items, updateQuantity, removeItem }: {
  items: CartItem[]
  updateQuantity: (id: string, quantity: number) => void
  removeItem: (id: string) => void
}) {
  const [discountCode, setDiscountCode] = useState("")
  const [zipCode, setZipCode] = useState("")

  const handleDiscountSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Implement discount logic here
    console.log("Applying discount:", discountCode)
  }

  const handleShippingCalculation = (e: React.FormEvent) => {
    e.preventDefault()
    // Implement shipping calculation logic here
    console.log("Calculating shipping for:", zipCode)
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>MEU CARRINHO</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {items.map(item => (
            <div key={item.id} className="flex items-center space-x-4">
              <div className="w-20 h-20 bg-gray-200 rounded" />
              <div className="flex-1">
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-sm text-gray-500">Cor: {item.color}</p>
                <p className="text-sm text-gray-500">Tamanho: {item.size}</p>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                >
                  -
                </Button>
                <span>{item.quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                >
                  +
                </Button>
              </div>
              <div className="text-right">
                <p className="font-semibold">R$ {(item.price * item.quantity).toFixed(2)}</p>
                <Button
                  variant="link"
                  className="text-sm text-red-500"
                  onClick={() => removeItem(item.id)}
                >
                  Remover item
                </Button>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 space-y-4">
          <form onSubmit={handleDiscountSubmit} className="flex space-x-2">
            <Input
              placeholder="Insira seu código"
              value={discountCode}
              onChange={(e) => setDiscountCode(e.target.value)}
            />
            <Button type="submit">OK</Button>
          </form>
          <form onSubmit={handleShippingCalculation} className="flex space-x-2">
            <Input
              placeholder="Insira seu CEP"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
            />
            <Button type="submit">OK</Button>
          </form>
        </div>
      </CardContent>
    </Card>
  )
}

function OrderSummary({ summary, onContinue }: {
  summary: CartSummary
  onContinue: () => void
}) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>RESUMO</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between">
          <span>Subtotal:</span>
          <span>R$ {summary.subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Frete:</span>
          <span>R$ {summary.shipping.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Desconto:</span>
          <span>R$ {summary.discount.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-lg font-bold">
          <span>Total</span>
          <span className="text-pink-500">R$ {summary.total.toFixed(2)}</span>
        </div>
        <p className="text-sm text-gray-500 text-center">
          ou 10x de R$ {(summary.total / 10).toFixed(2)} sem juros
        </p>
        <Button className="w-full bg-yellow-500 hover:bg-yellow-600" onClick={onContinue}>
          Continuar
        </Button>
      </CardContent>
    </Card>
  )
}

export function ShoppingCartPageComponent() {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: "1",
      name: "Tênis Nike Revolution 6 Next Nature Masculino",
      color: "Vermelho / Branco",
      size: "42",
      price: 219.00,
      quantity: 1
    }
  ])

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return
    setCartItems(items =>
      items.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    )
  }

  const removeItem = (id: string) => {
    setCartItems(items => items.filter(item => item.id !== id))
  }

  const calculateSummary = (): CartSummary => {
    const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
    const shipping = 0 // Assume free shipping for this example
    const discount = 30 // Hardcoded discount for this example
    const total = subtotal + shipping - discount
    return { subtotal, shipping, discount, total }
  }

  const handleContinue = () => {
    console.log("Continuing to checkout")
    // Implement checkout logic here
  }

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ShoppingCart
          items={cartItems}
          updateQuantity={updateQuantity}
          removeItem={removeItem}
        />
        <OrderSummary
          summary={calculateSummary()}
          onContinue={handleContinue}
        />
      </div>
    </div>
  )
}