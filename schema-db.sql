

CREATE SCHEMA IF NOT EXISTS public;

CREATE TABLE IF NOT EXISTS public.vendas (
  id_venda SERIAL PRIMARY KEY,
  valor NUMERIC NOT NULL CHECK (valor > 0),
  numero_cartao VARCHAR(16) NOT NULL,
  id_adquirente INTEGER NOT NULL,
  numero_parcelas INTEGER NOT NULL,
  id_bandeira_cartao INTEGER NOT NULL,
  data_venda DATE NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_id_bandeira_cartao ON public.vendas (id_bandeira_cartao);
CREATE INDEX IF NOT EXISTS idx_id_adquirente ON public.vendas (id_adquirente);
CREATE INDEX IF NOT EXISTS idx_data_venda ON public.vendas (data_venda);
