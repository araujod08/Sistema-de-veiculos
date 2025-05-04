"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Trash, Edit } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"
import type { Veiculo } from "@/lib/types"

interface VeiculoActionsProps {
  veiculo: Veiculo
}

export function VeiculoActions({ veiculo }: VeiculoActionsProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    if (!confirm("Tem certeza que deseja remover este veículo?")) {
      return
    }

    setIsDeleting(true)

    try {
      // Usar fetch com método DELETE para chamar a API Route
      const response = await fetch(`/api/veiculos/${veiculo.id}`, {
        method: "DELETE",
      })

      const result = await response.json()

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
      console.error("Erro ao excluir veículo:", error)
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao excluir o veículo",
        variant: "destructive",
      })
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <div className="flex justify-between mt-4">
      <Button variant="outline" onClick={handleDelete} disabled={isDeleting}>
        <Trash className="mr-2 h-4 w-4" />
        {isDeleting ? "Removendo..." : "Remover"}
      </Button>
      <Link href={`/editar/${veiculo.id}`}>
        <Button>
          <Edit className="mr-2 h-4 w-4" />
          Editar
        </Button>
      </Link>
    </div>
  )
}
