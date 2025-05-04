export interface Seguradora {
  id: number
  nome: string
  created_at?: string
}

export interface Veiculo {
  id: string
  placa: string
  km: number
  seguradora_id: number | null
  servico: string
  telefone: string
  nome_cliente?: string
  data_hora: string
  created_at?: string
  updated_at?: string
  seguradora?: Seguradora
}

export interface VeiculoFormData {
  placa: string
  km: number
  seguradora_id: number | null
  servico: string
  telefone: string
  nome_cliente?: string
}
