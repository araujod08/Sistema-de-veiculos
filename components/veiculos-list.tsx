"use client"

import Link from "next/link"
import type { Veiculo } from "@/lib/types"
import { formatarData } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"

interface VeiculosListProps {
  veiculos: Veiculo[]
}

export function VeiculosList({ veiculos }: VeiculosListProps) {
  if (veiculos.length === 0) {
    return <div className="text-center py-8 text-muted-foreground">Nenhum veículo registrado</div>
  }

  return (
    <>
      {/* Visualização para dispositivos móveis */}
      <div className="md:hidden space-y-4">
        {veiculos.map((veiculo) => (
          <Card key={veiculo.id} className="overflow-hidden">
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold">{veiculo.placa}</h3>
                <span className="text-sm text-muted-foreground">{formatarData(veiculo.data_hora)}</span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                <div>
                  <p className="text-muted-foreground">Quilometragem</p>
                  <p>{veiculo.km ? `${veiculo.km} km` : "N/A"}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Seguradora</p>
                  <p className="capitalize">{veiculo.seguradora?.nome || "Não informado"}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Cliente</p>
                  <p>{veiculo.nome_cliente || "Não informado"}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Telefone</p>
                  <p>{veiculo.telefone}</p>
                </div>
              </div>

              <div className="mb-3">
                <p className="text-muted-foreground text-sm">Serviço</p>
                <p className="text-sm">
                  {veiculo.servico.length > 100 ? `${veiculo.servico.substring(0, 100)}...` : veiculo.servico}
                </p>
              </div>

              <Link href={`/veiculos/${veiculo.id}`} className="text-primary hover:underline text-sm block text-center">
                Ver detalhes
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Visualização para tablets e desktops */}
      <div className="hidden md:block rounded-md border">
        <div className="relative w-full overflow-auto">
          <table className="w-full caption-bottom text-sm">
            <thead className="[&_tr]:border-b">
              <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                <th className="h-12 px-4 text-left align-middle font-medium">Placa</th>
                <th className="h-12 px-4 text-left align-middle font-medium">KM</th>
                <th className="h-12 px-4 text-left align-middle font-medium">Data/Hora</th>
                <th className="h-12 px-4 text-left align-middle font-medium">Seguradora</th>
                <th className="h-12 px-4 text-left align-middle font-medium">Cliente</th>
                <th className="h-12 px-4 text-left align-middle font-medium">Serviço</th>
                <th className="h-12 px-4 text-left align-middle font-medium">Telefone</th>
                <th className="h-12 px-4 text-left align-middle font-medium">Ações</th>
              </tr>
            </thead>
            <tbody className="[&_tr:last-child]:border-0">
              {veiculos.map((veiculo) => {
                // Verificar se o ID do veículo é válido
                if (!veiculo.id) {
                  console.error("Veículo sem ID:", veiculo)
                  return null
                }

                return (
                  <tr
                    key={veiculo.id}
                    className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                  >
                    <td className="p-4 align-middle">{veiculo.placa}</td>
                    <td className="p-4 align-middle">{veiculo.km ? `${veiculo.km} km` : "N/A"}</td>
                    <td className="p-4 align-middle">{formatarData(veiculo.data_hora)}</td>
                    <td className="p-4 align-middle capitalize">{veiculo.seguradora?.nome || "Não informado"}</td>
                    <td className="p-4 align-middle">{veiculo.nome_cliente || "Não informado"}</td>
                    <td className="p-4 align-middle">
                      {veiculo.servico.substring(0, 30)}
                      {veiculo.servico.length > 30 ? "..." : ""}
                    </td>
                    <td className="p-4 align-middle">{veiculo.telefone}</td>
                    <td className="p-4 align-middle">
                      <Link href={`/veiculos/${veiculo.id}`} className="text-primary hover:underline" prefetch={false}>
                        Ver detalhes
                      </Link>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
