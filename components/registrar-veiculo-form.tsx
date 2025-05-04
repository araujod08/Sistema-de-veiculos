"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Save } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { createVeiculo } from "@/lib/actions"
import type { Seguradora } from "@/lib/types"

interface RegistrarVeiculoFormProps {
  seguradoras: Seguradora[]
}

export function RegistrarVeiculoForm({ seguradoras }: RegistrarVeiculoFormProps) {
  const router = useRouter()
  const { toast } = useToast()

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [veiculo, setVeiculo] = useState({
    placa: "",
    km: "",
    seguradora_id: "",
    servico: "",
    telefone: "",
    nome_cliente: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setVeiculo((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (value) => {
    setVeiculo((prev) => ({ ...prev, seguradora_id: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validação básica
    if (!veiculo.placa || !veiculo.servico || !veiculo.telefone) {
      toast({
        title: "Erro",
        description: "Preencha todos os campos obrigatórios",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      // Preparar dados para envio
      const veiculoData = {
        placa: veiculo.placa,
        km: veiculo.km ? Number.parseInt(veiculo.km) : null,
        seguradora_id: veiculo.seguradora_id ? Number.parseInt(veiculo.seguradora_id) : null,
        servico: veiculo.servico,
        telefone: veiculo.telefone,
        nome_cliente: veiculo.nome_cliente || null,
      }

      const result = await createVeiculo(veiculoData)

      if (result.success) {
        toast({
          title: "Sucesso",
          description: result.message,
        })

        // Redirecionar para a página inicial
        router.push("/")
        router.refresh()
      } else {
        toast({
          title: "Erro",
          description: result.message,
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Erro ao registrar veículo:", error)
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao registrar o veículo",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle>Informações do Veículo</CardTitle>
          <CardDescription>Preencha os dados do veículo que está entrando na oficina</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="placa">Placa do Veículo *</Label>
            <Input
              id="placa"
              name="placa"
              placeholder="ABC1234"
              value={veiculo.placa}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="km">Quilometragem (KM)</Label>
            <Input id="km" name="km" type="number" placeholder="Ex: 45000" value={veiculo.km} onChange={handleChange} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="seguradora">Seguradora</Label>
            <Select onValueChange={handleSelectChange} value={veiculo.seguradora_id}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione a seguradora" />
              </SelectTrigger>
              <SelectContent>
                {seguradoras.map((seguradora) => (
                  <SelectItem key={seguradora.id} value={seguradora.id.toString()}>
                    {seguradora.nome.charAt(0).toUpperCase() + seguradora.nome.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="servico">Serviço a ser realizado *</Label>
            <Textarea
              id="servico"
              name="servico"
              placeholder="Descreva o serviço a ser realizado"
              value={veiculo.servico}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="telefone">Telefone do Cliente *</Label>
            <Input
              id="telefone"
              name="telefone"
              placeholder="(00) 00000-0000"
              value={veiculo.telefone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="nome_cliente">Nome do Cliente</Label>
            <Input
              id="nome_cliente"
              name="nome_cliente"
              placeholder="Nome do cliente (opcional)"
              value={veiculo.nome_cliente}
              onChange={handleChange}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            <Save className="mr-2 h-4 w-4" />
            {isSubmitting ? "Registrando..." : "Registrar Veículo"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
