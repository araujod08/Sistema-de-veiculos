import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, AlertCircle } from "lucide-react"
import Link from "next/link"
import { getVeiculoById } from "@/lib/actions"
import { formatarData } from "@/lib/utils"
import { VeiculoActionsWrapper } from "@/components/veiculo-actions-wrapper"

export default async function DetalhesVeiculo({ params }: { params: { id: string } }) {
  console.log("Parâmetros recebidos:", params)

  if (!params.id) {
    return <VeiculoNaoEncontrado mensagem="ID do veículo não fornecido" />
  }

  try {
    const veiculo = await getVeiculoById(params.id)

    if (!veiculo) {
      return <VeiculoNaoEncontrado mensagem={`Veículo com ID ${params.id} não encontrado`} />
    }

    // Serializar os dados para garantir que sejam passados corretamente
    const serializedVeiculo = JSON.parse(JSON.stringify(veiculo))

    return (
      <div className="container mx-auto py-6 px-4 sm:py-10 sm:px-6">
        <div className="flex items-center mb-6 sm:mb-8">
          <Link href="/">
            <Button variant="outline" size="icon" className="mr-4">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-xl sm:text-3xl font-bold">Detalhes do Veículo</h1>
        </div>

        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Veículo: {veiculo.placa}</CardTitle>
            <CardDescription>Registrado em: {formatarData(veiculo.data_hora)}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <h3 className="font-medium text-sm text-muted-foreground">Placa</h3>
                <p className="text-lg">{veiculo.placa}</p>
              </div>
              <div>
                <h3 className="font-medium text-sm text-muted-foreground">Data/Hora de Entrada</h3>
                <p className="text-lg">{formatarData(veiculo.data_hora)}</p>
              </div>
              <div>
                <h3 className="font-medium text-sm text-muted-foreground">Quilometragem</h3>
                <p className="text-lg">{veiculo.km ? `${veiculo.km} km` : "Não informado"}</p>
              </div>
              <div>
                <h3 className="font-medium text-sm text-muted-foreground">Seguradora</h3>
                <p className="text-lg capitalize">{veiculo.seguradora?.nome || "Não informado"}</p>
              </div>
              <div>
                <h3 className="font-medium text-sm text-muted-foreground">Telefone</h3>
                <p className="text-lg">{veiculo.telefone}</p>
              </div>
              <div>
                <h3 className="font-medium text-sm text-muted-foreground">Nome do Cliente</h3>
                <p className="text-lg">{veiculo.nome_cliente || "Não informado"}</p>
              </div>
            </div>

            <div>
              <h3 className="font-medium text-sm text-muted-foreground">Serviço</h3>
              <p className="text-lg mt-1">{veiculo.servico}</p>
            </div>

            <VeiculoActionsWrapper veiculo={serializedVeiculo} />
          </CardContent>
        </Card>
      </div>
    )
  } catch (error) {
    console.error("Erro ao carregar detalhes do veículo:", error)
    return <VeiculoNaoEncontrado mensagem="Erro ao carregar detalhes do veículo" />
  }
}

function VeiculoNaoEncontrado({ mensagem }: { mensagem: string }) {
  return (
    <div className="container mx-auto py-6 px-4 sm:py-10 sm:px-6">
      <div className="flex items-center mb-6 sm:mb-8">
        <Link href="/">
          <Button variant="outline" size="icon" className="mr-4">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-xl sm:text-3xl font-bold">Veículo não encontrado</h1>
      </div>

      <Card className="max-w-2xl mx-auto">
        <CardContent className="flex flex-col items-center justify-center py-10">
          <AlertCircle className="h-12 w-12 sm:h-16 sm:w-16 text-destructive mb-4" />
          <h2 className="text-lg sm:text-xl font-semibold mb-2 text-center">Veículo não encontrado</h2>
          <p className="text-muted-foreground text-center mb-6">{mensagem}</p>
          <Link href="/">
            <Button>Voltar para a página inicial</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}
