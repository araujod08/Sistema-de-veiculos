import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { getVeiculoById, getSeguradoras } from "@/lib/actions"
import { EditarVeiculoForm } from "@/components/editar-veiculo-form"
import { notFound } from "next/navigation"

export default async function EditarVeiculo({ params }: { params: { id: string } }) {
  // Buscar dados em paralelo
  const [veiculo, seguradoras] = await Promise.all([getVeiculoById(params.id), getSeguradoras()])

  if (!veiculo) {
    notFound()
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex items-center mb-8">
        <Link href="/">
          <Button variant="outline" size="icon" className="mr-4">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">Editar Veículo</h1>
      </div>

      <EditarVeiculoForm veiculo={veiculo} seguradoras={seguradoras} />
    </div>
  )
}
