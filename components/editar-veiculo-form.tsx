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
import { updateVeiculo } from "@/lib/actions"
import type { Seguradora, Veiculo } from "@/lib/types"

interface EditarVeiculoFormProps {
  veiculo: Veiculo
  seguradoras: Seguradora[]
}

export function EditarVeiculoForm({ veiculo, seguradoras }: EditarVeiculoFormProps) {
  const router = useRouter()
  const { toast } = useToast()

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    placa: veiculo.placa,
    km: veiculo.km?.toString() || "",
    seguradora_id: veiculo.seguradora_id?.toString() || "",
    servico: veiculo.servico,
    telefone: veiculo.telefone,
    nome_cliente: veiculo.nome_cliente || "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (value) => {
    setFormData((prev) => ({ ...prev, seguradora_id: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validação básica
    if (!formData.placa || !formData.servico || !formData.telefone) {
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
        placa: formData.placa,
        km: formData.km ? Number.parseInt(formData.km) : null,
        seguradora_id: formData.seguradora_id ? Number.parseInt(formData.seguradora_id) : null,
        servico: formData.servico,
        telefone: formData.telefone,
        nome_cliente: formData.nome_cliente || null,
      }

      const result = await updateVeiculo(veiculo.id, veiculoData)

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
      console.error("Erro ao atualizar veículo:", error)
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao atualizar o veículo",
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
          <CardDescription>Edite os dados do veículo</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="placa">Placa do Veículo *</Label>
            <Input
              id="placa"
              name="placa"
              placeholder="ABC1234"
              value={formData.placa}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="km">Quilometragem (KM)</Label>
            <Input
              id="km"
              name="km"
              type="number"
              placeholder="Ex: 45000"
              value={formData.km}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="seguradora">Seguradora</Label>
            <Select onValueChange={handleSelectChange} value={formData.seguradora_id}>
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
              value={formData.servico}
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
              value={formData.telefone}
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
              value={formData.nome_cliente}
              onChange={handleChange}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            <Save className="mr-2 h-4 w-4" />
            {isSubmitting ? "Salvando..." : "Salvar Alterações"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
