"use server"

import { revalidatePath } from "next/cache"
import { createServerSupabaseClient } from "./supabase"
import type { Seguradora, Veiculo, VeiculoFormData } from "./types"

// Função para buscar todas as seguradoras
export async function getSeguradoras(): Promise<Seguradora[]> {
  const supabase = createServerSupabaseClient()

  const { data, error } = await supabase.from("seguradoras").select("*").order("nome")

  if (error) {
    console.error("Erro ao buscar seguradoras:", error)
    throw new Error("Falha ao buscar seguradoras")
  }

  return data || []
}

// Função para buscar todos os veículos
export async function getVeiculos(): Promise<Veiculo[]> {
  const supabase = createServerSupabaseClient()

  const { data, error } = await supabase
    .from("veiculos")
    .select(`
      *,
      seguradora:seguradora_id(id, nome)
    `)
    .order("data_hora", { ascending: false })

  if (error) {
    console.error("Erro ao buscar veículos:", error)
    throw new Error("Falha ao buscar veículos")
  }

  // Garantir que os dados são serializáveis
  return JSON.parse(JSON.stringify(data || []))
}

// Função para buscar veículos de hoje
export async function getVeiculosHoje(): Promise<Veiculo[]> {
  const supabase = createServerSupabaseClient()

  // Obter a data de hoje no formato ISO
  const hoje = new Date()
  hoje.setHours(0, 0, 0, 0)
  const hojeISO = hoje.toISOString()

  const amanha = new Date(hoje)
  amanha.setDate(amanha.getDate() + 1)
  const amanhaISO = amanha.toISOString()

  const { data, error } = await supabase
    .from("veiculos")
    .select(`
      *,
      seguradora:seguradora_id(id, nome)
    `)
    .gte("data_hora", hojeISO)
    .lt("data_hora", amanhaISO)
    .order("data_hora", { ascending: false })

  if (error) {
    console.error("Erro ao buscar veículos de hoje:", error)
    throw new Error("Falha ao buscar veículos de hoje")
  }

  // Garantir que os dados são serializáveis
  return JSON.parse(JSON.stringify(data || []))
}

// Função para buscar um veículo pelo ID
export async function getVeiculoById(id: string): Promise<Veiculo | null> {
  if (!id) {
    console.error("ID do veículo não fornecido")
    return null
  }

  console.log(`Buscando veículo com ID: ${id}`)

  const supabase = createServerSupabaseClient()

  try {
    // Usar .maybeSingle() em vez de .single() para evitar erros quando nenhum resultado é encontrado
    const { data, error } = await supabase
      .from("veiculos")
      .select(`
        *,
        seguradora:seguradora_id(id, nome)
      `)
      .eq("id", id)
      .maybeSingle()

    if (error) {
      console.error(`Erro ao buscar veículo com ID ${id}:`, error)
      return null
    }

    if (!data) {
      console.log(`Nenhum veículo encontrado com ID: ${id}`)
      return null
    }

    console.log(`Veículo encontrado:`, data)
    // Garantir que os dados são serializáveis
    return JSON.parse(JSON.stringify(data))
  } catch (error) {
    console.error(`Erro ao buscar veículo com ID ${id}:`, error)
    return null
  }
}

// Função para criar um novo veículo
export async function createVeiculo(
  veiculoData: VeiculoFormData,
): Promise<{ success: boolean; message: string; id?: string }> {
  const supabase = createServerSupabaseClient()

  const { data, error } = await supabase.from("veiculos").insert([veiculoData]).select()

  if (error) {
    console.error("Erro ao criar veículo:", error)
    return {
      success: false,
      message: `Falha ao criar veículo: ${error.message}`,
    }
  }

  revalidatePath("/")

  return {
    success: true,
    message: "Veículo registrado com sucesso",
    id: data[0].id,
  }
}

// Função para atualizar um veículo
export async function updateVeiculo(
  id: string,
  veiculoData: VeiculoFormData,
): Promise<{ success: boolean; message: string }> {
  const supabase = createServerSupabaseClient()

  const { error } = await supabase.from("veiculos").update(veiculoData).eq("id", id)

  if (error) {
    console.error(`Erro ao atualizar veículo com ID ${id}:`, error)
    return {
      success: false,
      message: `Falha ao atualizar veículo: ${error.message}`,
    }
  }

  revalidatePath("/")
  revalidatePath(`/veiculos/${id}`)

  return {
    success: true,
    message: "Veículo atualizado com sucesso",
  }
}

// Função para excluir um veículo
export async function deleteVeiculo(id: string): Promise<{ success: boolean; message: string }> {
  const supabase = createServerSupabaseClient()

  const { error } = await supabase.from("veiculos").delete().eq("id", id)

  if (error) {
    console.error(`Erro ao excluir veículo com ID ${id}:`, error)
    return {
      success: false,
      message: `Falha ao excluir veículo: ${error.message}`,
    }
  }

  revalidatePath("/")

  return {
    success: true,
    message: "Veículo removido com sucesso",
  }
}

// Função para buscar veículos por placa
export async function searchVeiculosByPlaca(placa: string): Promise<Veiculo[]> {
  if (!placa) {
    return []
  }

  const supabase = createServerSupabaseClient()

  // Buscar veículos que contenham o termo de busca na placa (case insensitive)
  const { data, error } = await supabase
    .from("veiculos")
    .select(`
      *,
      seguradora:seguradora_id(id, nome)
    `)
    .ilike("placa", `%${placa}%`)
    .order("data_hora", { ascending: false })

  if (error) {
    console.error("Erro ao buscar veículos por placa:", error)
    return []
  }

  // Garantir que os dados são serializáveis
  return JSON.parse(JSON.stringify(data || []))
}

// Função para obter estatísticas
export async function getEstatisticas() {
  const supabase = createServerSupabaseClient()

  // Obter todos os veículos
  const { data: veiculos, error: veiculosError } = await supabase.from("veiculos").select(`
      *,
      seguradora:seguradora_id(id, nome)
    `)

  if (veiculosError) {
    console.error("Erro ao buscar veículos para estatísticas:", veiculosError)
    throw new Error("Falha ao buscar estatísticas")
  }

  // Obter veículos de hoje
  const hoje = new Date()
  hoje.setHours(0, 0, 0, 0)
  const hojeISO = hoje.toISOString()

  const amanha = new Date(hoje)
  amanha.setDate(amanha.getDate() + 1)
  const amanhaISO = amanha.toISOString()

  const veiculosHoje = veiculos.filter((v) => {
    const dataVeiculo = new Date(v.data_hora)
    return dataVeiculo >= hoje && dataVeiculo < amanha
  })

  // Contar por seguradora
  const seguradoras = {
    unidas: veiculos.filter((v) => v.seguradora?.nome === "unidas").length,
    movida: veiculos.filter((v) => v.seguradora?.nome === "movida").length,
    localiza: veiculos.filter((v) => v.seguradora?.nome === "localiza").length,
    lm: veiculos.filter((v) => v.seguradora?.nome === "lm").length,
    ticketLog: veiculos.filter((v) => v.seguradora?.nome === "ticket-log").length,
    particular: veiculos.filter((v) => v.seguradora?.nome === "particular").length,
  }

  // Calcular média de KM
  const veiculosComKm = veiculos.filter((v) => v.km)
  let mediaKm = 0

  if (veiculosComKm.length > 0) {
    const somaKm = veiculosComKm.reduce((acc, v) => acc + Number(v.km), 0)
    mediaKm = Math.round(somaKm / veiculosComKm.length)
  }

  return {
    total: veiculos.length,
    hoje: veiculosHoje.length,
    seguradoras,
    mediaKm,
  }
}
