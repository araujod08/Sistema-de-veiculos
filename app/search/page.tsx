import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { searchVeiculosByPlaca } from "@/lib/actions"
import { VeiculosListWrapper } from "@/components/veiculos-list-wrapper"
import { SearchBar } from "@/components/search-bar"

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const placa = typeof searchParams.placa === "string" ? searchParams.placa : ""
  const veiculos = await searchVeiculosByPlaca(placa)

  // Serializar os dados para garantir que sejam passados corretamente
  const serializedVeiculos = JSON.parse(JSON.stringify(veiculos))

  return (
    <div className="container mx-auto py-6 px-4 sm:py-10 sm:px-6">
      <div className="flex items-center mb-6 sm:mb-8">
        <Link href="/">
          <Button variant="outline" size="icon" className="mr-4">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-xl sm:text-3xl font-bold">Resultados da Pesquisa</h1>
      </div>

      <div className="mb-6">
        <SearchBar />
        <p className="mt-2 text-muted-foreground">
          {veiculos.length} {veiculos.length === 1 ? "resultado" : "resultados"} para "{placa}"
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Veículos Encontrados</CardTitle>
          <CardDescription>Veículos que correspondem à sua pesquisa</CardDescription>
        </CardHeader>
        <CardContent>
          <VeiculosListWrapper veiculos={serializedVeiculos} />
        </CardContent>
      </Card>
    </div>
  )
}
