import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Image from "next/image"

export default function CheckoutPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Finalizar Compra</h1>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-2/3">
          <form className="space-y-6">
            <section>
              <h2 className="text-lg font-semibold mb-4">Informações Pessoais</h2>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="nome">Nome Completo</Label>
                  <Input id="nome" placeholder="Digite seu nome completo" />
                </div>
                <div>
                  <Label htmlFor="cpf">CPF</Label>
                  <Input id="cpf" placeholder="Digite seu CPF" />
                </div>
                <div>
                  <Label htmlFor="email">E-mail</Label>
                  <Input id="email" type="email" placeholder="Digite seu e-mail" />
                </div>
                <div>
                  <Label htmlFor="celular">Celular</Label>
                  <Input id="celular" placeholder="Digite seu celular" />
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-4">Informações de Entrega</h2>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="endereco">Endereço</Label>
                  <Input id="endereco" placeholder="Digite seu endereço" />
                </div>
                <div>
                  <Label htmlFor="bairro">Bairro</Label>
                  <Input id="bairro" placeholder="Digite seu bairro" />
                </div>
                <div>
                  <Label htmlFor="cidade">Cidade</Label>
                  <Input id="cidade" placeholder="Digite sua cidade" />
                </div>
                <div>
                  <Label htmlFor="cep">CEP</Label>
                  <Input id="cep" placeholder="Digite seu CEP" />
                </div>
                <div>
                  <Label htmlFor="complemento">Complemento</Label>
                  <Input id="complemento" placeholder="Digite o complemento" />
                </div>
              </div>
            </section>

            <div className="h-6"></div>

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
                <h3 className="font-semibold">Tênis Nike Revolution 6 Next Nature Masculino</h3>
                <p className="text-sm text-gray-600">Tamanho: 42</p>
                <p className="text-sm text-gray-600">Cor: Preto</p>
              </div>
            </div>
            <div className="border-t pt-4">
              <div className="flex justify-between mb-2">
                <span>Subtotal</span>
                <span>R$ 279,00</span>
              </div>
              <div className="flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span>R$ 279,00</span>
              </div>
            </div>
          </div>
          <Button className="w-full mt-4 bg-yellow-500 hover:bg-yellow-600 text-black">
            Finalizar Pagamento
          </Button>
        </div>
      </div>
    </div>
  )
}