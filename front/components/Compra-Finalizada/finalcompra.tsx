import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Loader2 } from "lucide-react"
import Image from "next/image"



const submitToServer = async (data: any) => {
  
  await new Promise(resolve => setTimeout(resolve, 2000))
  
  
  if (Math.random() > 0.5) {
    return { success: true, message: "Pedido realizado com sucesso!" }
  } else {
    throw new Error("Erro ao processar o pedido. Por favor, tente novamente.")
  }
}

export default function CheckoutPage() {
  const [formData, setFormData] = useState({
    nome: "",
    cpf: "",
    email: "",
    celular: "",
    endereco: "",
    bairro: "",
    cidade: "",
    cep: "",
    complemento: ""
  })

  const [orderSummary, setOrderSummary] = useState({
    productName: "Tênis Nike Revolution 6 Next Nature Masculino",
    size: "42",
    color: "Preto",
    price: 279.00
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitResult, setSubmitResult] = useState<{ success: boolean; message: string } | null>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitResult(null)

    try {
      const result = await submitToServer({ ...formData, ...orderSummary })
      setSubmitResult({ success: true, message: result.message })
    } catch (error) {
      setSubmitResult({ success: false, message: (error as Error).message })
    } finally {
      setIsSubmitting(false)
    }
  }
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Finalizar Compra</h1>
      {submitResult && (
        <Alert className={submitResult.success ? "bg-green-100" : "bg-red-100"}>
          <AlertTitle>{submitResult.success ? "Sucesso!" : "Erro"}</AlertTitle>
          <AlertDescription>{submitResult.message}</AlertDescription>
        </Alert>
      )}
      <div className="flex flex-col md:flex-row gap-8 mt-4">
        <div className="w-full md:w-2/3">
          <form onSubmit={handleSubmit} className="space-y-6">
            <section>
              <h2 className="text-lg font-semibold mb-4">Informações Pessoais</h2>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="nome">Nome Completo</Label>
                  <Input
                    id="nome"
                    name="nome"
                    value={formData.nome}
                    onChange={handleInputChange}
                    placeholder="Digite seu nome completo"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="cpf">CPF</Label>
                  <Input
                    id="cpf"
                    name="cpf"
                    value={formData.cpf}
                    onChange={handleInputChange}
                    placeholder="Digite seu CPF"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email">E-mail</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Digite seu e-mail"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="celular">Celular</Label>
                  <Input
                    id="celular"
                    name="celular"
                    value={formData.celular}
                    onChange={handleInputChange}
                    placeholder="Digite seu celular"
                    required
                  />
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-4">Informações de Entrega</h2>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="endereco">Endereço</Label>
                  <Input
                    id="endereco"
                    name="endereco"
                    value={formData.endereco}
                    onChange={handleInputChange}
                    placeholder="Digite seu endereço"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="bairro">Bairro</Label>
                  <Input
                    id="bairro"
                    name="bairro"
                    value={formData.bairro}
                    onChange={handleInputChange}
                    placeholder="Digite seu bairro"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="cidade">Cidade</Label>
                  <Input
                    id="cidade"
                    name="cidade"
                    value={formData.cidade}
                    onChange={handleInputChange}
                    placeholder="Digite sua cidade"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="cep">CEP</Label>
                  <Input
                    id="cep"
                    name="cep"
                    value={formData.cep}
                    onChange={handleInputChange}
                    placeholder="Digite seu CEP"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="complemento">Complemento</Label>
                  <Input
                    id="complemento"
                    name="complemento"
                    value={formData.complemento}
                    onChange={handleInputChange}
                    placeholder="Digite o complemento"
                  />
                </div>
              </div>
            </section>

            <Button type="submit" className="w-full bg-primary text-primary-foreground" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processando
                </>
              ) : (
                "Finalizar Pagamento"
              )}
            </Button>
          </form>
        </div>

        <div className="w-full md:w-1/3">
          <div className="bg-gray-100 p-6 rounded-lg">
            <h2 className="text-lg font-semibold mb-4">RESUMO</h2>
            <div className="flex items-center space-x-4 mb-4">
              <Image
                src="/placeholder.svg"
                alt="Product"
                width={80}
                height={80}
                className="rounded-md"
              />
              <div>
                <h3 className="font-semibold">{orderSummary.productName}</h3>
                <p className="text-sm text-gray-600">Tamanho: {orderSummary.size}</p>
                <p className="text-sm text-gray-600">Cor: {orderSummary.color}</p>
              </div>
            </div>
            <div className="border-t pt-4">
              <div className="flex justify-between mb-2">
                <span>Subtotal</span>
                <span>R$ {orderSummary.price.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span>R$ {orderSummary.price.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
