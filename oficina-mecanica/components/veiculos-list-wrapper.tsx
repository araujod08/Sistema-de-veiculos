"use client"

import { VeiculosList } from "./veiculos-list"
import type { Veiculo } from "@/lib/types"

interface VeiculosListWrapperProps {
  veiculos: Veiculo[]
}

export function VeiculosListWrapper({ veiculos }: VeiculosListWrapperProps) {
  return <VeiculosList veiculos={veiculos} />
}
