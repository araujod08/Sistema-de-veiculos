"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { PlusCircle, Car, Calendar, Phone } from "lucide-react"
import { VeiculosList } from "@/components/veiculos-list"
import { SearchBar } from "@/components/search-bar"
import type { Veiculo } from "@/lib/types"

interface HomeClientProps {
  veiculos: Veiculo[]
  veiculosHoje: number
  seguradoras: number
  particulares: number
}

export function HomeClient({ veiculos, veiculosHoje, seguradoras, particulares }: HomeClientProps) {
  return (
    <div className="container mx-auto py-6 px-4 sm:py-10 sm:px-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Oficina Mecânica</h1>
          <p className="text-muted-foreground">Sistema de Gerenciamento de Veículos</p>
        </div>
        <div className="flex flex-wrap gap-2 w-full sm:w-auto">
          <Link href="/dashboard" className="w-full sm:w-auto">
            <Button variant="outline" className="w-full sm:w-auto">
              Dashboard
            </Button>
          </Link>
          <Link href="/registrar" className="w-full sm:w-auto">
            <Button className="w-full sm:w-auto">
              <PlusCircle className="mr-2 h-4 w-4" />
              Registrar Veículo
            </Button>
          </Link>
        </div>
      </div>

      <div className="mb-6">
        <SearchBar />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Veículos Hoje</CardTitle>
            <CardDescription>Veículos que entraram hoje</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Car className="h-6 w-6 sm:h-8 sm:w-8 text-primary mr-2" />
              <span className="text-xl sm:text-2xl font-bold">{veiculosHoje}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Seguradoras</CardTitle>
            <CardDescription>Veículos por seguradora</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Calendar className="h-6 w-6 sm:h-8 sm:w-8 text-primary mr-2" />
              <span className="text-xl sm:text-2xl font-bold">{seguradoras}</span>
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
              <span className="text-xl sm:text-2xl font-bold">{particulares}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 sm:mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Veículos Registrados</CardTitle>
            <CardDescription>Lista de todos os veículos na oficina</CardDescription>
          </CardHeader>
          <CardContent>
            <VeiculosList veiculos={veiculos} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
