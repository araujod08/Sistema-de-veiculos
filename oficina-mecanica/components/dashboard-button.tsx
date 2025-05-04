"use client"

import { Button } from "@/components/ui/button"
import { BarChart2 } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function DashboardButton() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    // Carregar veículos do localStorage
    const veiculos = JSON.parse(localStorage.getItem("veiculos") || "[]")
    setCount(veiculos.length)

    // Atualizar contadores na página inicial
    const veiculosHoje = veiculos.filter((v) => {
      const dataVeiculo = new Date(v.dataHora.split(" ")[0].split("/").reverse().join("-"))
      const dataHoje = new Date()
      return dataVeiculo.toLocaleDateString() === dataHoje.toLocaleDateString()
    })

    const seguradoras = veiculos.filter((v) => v.seguradora && v.seguradora !== "particular").length

    const particulares = veiculos.filter((v) => v.seguradora === "particular").length

    // Atualizar elementos na página
    const veiculosHojeEl = document.getElementById("veiculos-hoje")
    const seguradorasEl = document.getElementById("seguradoras")
    const particularesEl = document.getElementById("particulares")

    if (veiculosHojeEl) veiculosHojeEl.textContent = veiculosHoje.length.toString()
    if (seguradorasEl) seguradorasEl.textContent = seguradoras.toString()
    if (particularesEl) particularesEl.textContent = particulares.toString()

    // Atualizar a função que preenche a tabela de veículos para incluir o campo de KM
    // Atualizar tabela de veículos
    const tabelaVeiculos = document.getElementById("tabela-veiculos")
    if (tabelaVeiculos) {
      if (veiculos.length === 0) {
        tabelaVeiculos.innerHTML = `
          <tr class="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
            <td colspan="7" class="p-4 text-center text-muted-foreground">
              Nenhum veículo registrado
            </td>
          </tr>
        `
      } else {
        tabelaVeiculos.innerHTML = veiculos
          .map(
            (v) => `
      <tr class="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
        <td class="p-4 align-middle">${v.placa}</td>
        <td class="p-4 align-middle">${v.km ? `${v.km} km` : "N/A"}</td>
        <td class="p-4 align-middle">${v.dataHora}</td>
        <td class="p-4 align-middle capitalize">${v.seguradora || "Não informado"}</td>
        <td class="p-4 align-middle">${v.servico.substring(0, 30)}${v.servico.length > 30 ? "..." : ""}</td>
        <td class="p-4 align-middle">${v.telefone}</td>
        <td class="p-4 align-middle">
          <a href="/veiculos/${v.id}" class="text-primary hover:underline">Ver detalhes</a>
        </td>
      </tr>
    `,
          )
          .join("")
      }
    }
  }, [])

  return (
    <Link href="/dashboard">
      <Button variant="outline" className="relative">
        <BarChart2 className="h-4 w-4 mr-2" />
        Dashboard
        {count > 0 && (
          <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {count}
          </span>
        )}
      </Button>
    </Link>
  )
}
