import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Car, Calendar, Phone, FileBarChart } from "lucide-react"
import Link from "next/link"
import { getEstatisticas } from "@/lib/actions"

export default async function Dashboard() {
  const estatisticas = await getEstatisticas()

  return (
    <div className="container mx-auto py-6 px-4 sm:py-10 sm:px-6">
      <div className="flex items-center mb-6 sm:mb-8">
        <Link href="/">
          <Button variant="outline" size="icon" className="mr-4">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-xl sm:text-3xl font-bold">Dashboard</h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Total de Veículos</CardTitle>
            <CardDescription>Todos os veículos registrados</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Car className="h-6 w-6 sm:h-8 sm:w-8 text-primary mr-2" />
              <span className="text-xl sm:text-2xl font-bold">{estatisticas.total}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Veículos Hoje</CardTitle>
            <CardDescription>Veículos que entraram hoje</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Calendar className="h-6 w-6 sm:h-8 sm:w-8 text-primary mr-2" />
              <span className="text-xl sm:text-2xl font-bold">{estatisticas.hoje}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Seguradoras</CardTitle>
            <CardDescription>Veículos de seguradoras</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <FileBarChart className="h-6 w-6 sm:h-8 sm:w-8 text-primary mr-2" />
              <span className="text-xl sm:text-2xl font-bold">
                {estatisticas.seguradoras.unidas +
                  estatisticas.seguradoras.movida +
                  estatisticas.seguradoras.localiza +
                  estatisticas.seguradoras.lm +
                  estatisticas.seguradoras.ticketLog}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Particulares</CardTitle>
            <CardDescription>Veículos particulares</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Phone className="h-6 w-6 sm:h-8 sm:w-8 text-primary mr-2" />
              <span className="text-xl sm:text-2xl font-bold">{estatisticas.seguradoras.particular}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Quilometragem</CardTitle>
            <CardDescription>Média de KM dos veículos</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Car className="h-6 w-6 sm:h-8 sm:w-8 text-primary mr-2" />
              <span className="text-xl sm:text-2xl font-bold">
                {estatisticas.mediaKm ? `${estatisticas.mediaKm.toLocaleString()} km` : "N/A"}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Distribuição por Seguradora</CardTitle>
            <CardDescription>Quantidade de veículos por seguradora</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Unidas</span>
                  <span className="font-medium">{estatisticas.seguradoras.unidas}</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full"
                    style={{
                      width: `${estatisticas.total ? (estatisticas.seguradoras.unidas / estatisticas.total) * 100 : 0}%`,
                    }}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Movida</span>
                  <span className="font-medium">{estatisticas.seguradoras.movida}</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full"
                    style={{
                      width: `${estatisticas.total ? (estatisticas.seguradoras.movida / estatisticas.total) * 100 : 0}%`,
                    }}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Localiza</span>
                  <span className="font-medium">{estatisticas.seguradoras.localiza}</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full"
                    style={{
                      width: `${estatisticas.total ? (estatisticas.seguradoras.localiza / estatisticas.total) * 100 : 0}%`,
                    }}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>LM</span>
                  <span className="font-medium">{estatisticas.seguradoras.lm}</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full"
                    style={{
                      width: `${estatisticas.total ? (estatisticas.seguradoras.lm / estatisticas.total) * 100 : 0}%`,
                    }}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Ticket-log</span>
                  <span className="font-medium">{estatisticas.seguradoras.ticketLog}</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full"
                    style={{
                      width: `${estatisticas.total ? (estatisticas.seguradoras.ticketLog / estatisticas.total) * 100 : 0}%`,
                    }}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Particular</span>
                  <span className="font-medium">{estatisticas.seguradoras.particular}</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full"
                    style={{
                      width: `${estatisticas.total ? (estatisticas.seguradoras.particular / estatisticas.total) * 100 : 0}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Estatísticas Gerais</CardTitle>
            <CardDescription>Informações sobre os veículos na oficina</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Car className="h-5 w-5 mr-2 text-muted-foreground" />
                  <span>Total de Veículos</span>
                </div>
                <span className="font-medium">{estatisticas.total}</span>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-muted-foreground" />
                  <span>Veículos Hoje</span>
                </div>
                <span className="font-medium">{estatisticas.hoje}</span>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <FileBarChart className="h-5 w-5 mr-2 text-muted-foreground" />
                  <span>Seguradoras</span>
                </div>
                <span className="font-medium">
                  {estatisticas.seguradoras.unidas +
                    estatisticas.seguradoras.movida +
                    estatisticas.seguradoras.localiza +
                    estatisticas.seguradoras.lm +
                    estatisticas.seguradoras.ticketLog}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Phone className="h-5 w-5 mr-2 text-muted-foreground" />
                  <span>Particulares</span>
                </div>
                <span className="font-medium">{estatisticas.seguradoras.particular}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
