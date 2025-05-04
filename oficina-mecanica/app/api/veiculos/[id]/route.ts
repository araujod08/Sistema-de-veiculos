import { createServerSupabaseClient } from "@/lib/supabase"
import { type NextRequest, NextResponse } from "next/server"
import { revalidatePath } from "next/cache"

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }): Promise<NextResponse> {
  const id = params.id

  try {
    const supabase = createServerSupabaseClient()
    const { error } = await supabase.from("veiculos").delete().eq("id", id)

    if (error) {
      console.error(`Erro ao excluir veículo com ID ${id}:`, error)
      return NextResponse.json(
        { success: false, message: `Falha ao excluir veículo: ${error.message}` },
        { status: 500 },
      )
    }

    // Revalidar o cache
    revalidatePath("/")

    return NextResponse.json({ success: true, message: "Veículo removido com sucesso" })
  } catch (error) {
    console.error("Erro ao processar a solicitação:", error)
    return NextResponse.json({ success: false, message: "Erro interno do servidor" }, { status: 500 })
  }
}
