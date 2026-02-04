-- Script de configuração do banco de dados para Sistema de Veículos
-- Este script cria as tabelas necessárias e configura as políticas de segurança

-- Tabela de seguradoras
CREATE TABLE IF NOT EXISTS seguradoras (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(100) NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Inserir seguradoras padrão
INSERT INTO seguradoras (nome) VALUES 
  ('unidas'),
  ('movida'),
  ('localiza'),
  ('lm'),
  ('ticket-log'),
  ('particular')
ON CONFLICT (nome) DO NOTHING;

-- Tabela de veículos
CREATE TABLE IF NOT EXISTS veiculos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  placa VARCHAR(10) NOT NULL,
  km INTEGER NOT NULL,
  seguradora_id INTEGER REFERENCES seguradoras(id),
  servico TEXT NOT NULL,
  telefone VARCHAR(20) NOT NULL,
  nome_cliente VARCHAR(255),
  data_hora TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Criar índices para melhor performance
CREATE INDEX IF NOT EXISTS idx_veiculos_placa ON veiculos(placa);
CREATE INDEX IF NOT EXISTS idx_veiculos_data_hora ON veiculos(data_hora);
CREATE INDEX IF NOT EXISTS idx_veiculos_seguradora_id ON veiculos(seguradora_id);

-- Habilitar Row Level Security (RLS)
ALTER TABLE seguradoras ENABLE ROW LEVEL SECURITY;
ALTER TABLE veiculos ENABLE ROW LEVEL SECURITY;

-- Políticas de segurança para seguradoras (leitura pública)
DROP POLICY IF EXISTS "Permitir leitura pública de seguradoras" ON seguradoras;
CREATE POLICY "Permitir leitura pública de seguradoras" ON seguradoras
  FOR SELECT USING (true);

-- Políticas de segurança para veículos (leitura e escrita pública para esta aplicação simples)
DROP POLICY IF EXISTS "Permitir leitura pública de veículos" ON veiculos;
CREATE POLICY "Permitir leitura pública de veículos" ON veiculos
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Permitir inserção de veículos" ON veiculos;
CREATE POLICY "Permitir inserção de veículos" ON veiculos
  FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Permitir atualização de veículos" ON veiculos;
CREATE POLICY "Permitir atualização de veículos" ON veiculos
  FOR UPDATE USING (true);

DROP POLICY IF EXISTS "Permitir exclusão de veículos" ON veiculos;
CREATE POLICY "Permitir exclusão de veículos" ON veiculos
  FOR DELETE USING (true);

-- Função para atualizar o timestamp de updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para atualizar updated_at automaticamente
DROP TRIGGER IF EXISTS update_veiculos_updated_at ON veiculos;
CREATE TRIGGER update_veiculos_updated_at
  BEFORE UPDATE ON veiculos
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
