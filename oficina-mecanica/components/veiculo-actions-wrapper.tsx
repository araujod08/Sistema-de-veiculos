"use client"

import { VeiculoActions } from "./veiculo-actions"
import type { Veiculo } from "@/lib/types"

interface VeiculoActionsWrapperProps {
  veiculo: Veiculo
}

export function VeiculoActionsWrapper({ veiculo }: VeiculoActionsWrapperProps) {
  return <VeiculoActions veiculo={veiculo} />
}
