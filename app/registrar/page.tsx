import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { getSeguradoras } from "@/lib/actions"
import { RegistrarVeiculoForm } from "@/components/registrar-veiculo-form"

export default async function RegistrarVeiculo() {
  const seguradoras = await getSeguradoras()

  return (
    <div className="container mx-auto py-6 px-4 sm:py-10 sm:px-6">
      <div className="flex items-center mb-6 sm:mb-8">
        <Link href="/">
          <Button variant="outline" size="icon" className="mr-4">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-xl sm:text-3xl font-bold">Registrar Novo Veículo</h1>
      </div>

      <RegistrarVeiculoForm seguradoras={seguradoras} />
    </div>
  )
}
