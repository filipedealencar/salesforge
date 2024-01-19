# SalesForge - Luis Filipe J Alencar

O SalesForge é um sistema de gerenciamento de vendas construída com Node.js e PostgreSQL. A API permite aos usuários recuperar dados de vendas com opções de paginação e filtros, além de inserir novos registros de vendas.

## Desenvolvedor

O Projeto foi 100% desenvolvido por Luis Filipe Joaquim de Alencar, um experiente desenvolvedor com 3 anos de atuação na área. Luis Filipe já trabalhou em projetos robustos e profissionais.

## Pré-requisitos

- **PostgreSQL.**
- **Node.js**
- **Express**
- **React Loading Skeleton:**

## Endpoints

- **GET /**
- Recupera dados de vendas com paginação e filtros opcionais.

- **page:** (opcional): Número da página para paginação (padrão é 1).
- **pageSize:** (opcional): Número de itens por página (padrão é 10).
- **idBandeiraCartao:** (opcional): ID da bandeira do cartão para filtrar.
- **idAdquirente:** (opcional): ID do adquirente para filtrar.
- **dataVenda (opcional)**: Data da venda para filtrar (formato: "AAAA-MM-DD").

- **Exemplo:**

```bash

    curl http://localhost:8888?page=1&pageSize=10&idBandeiraCartao=1&idAdquirente=2&dataVenda=2022-01-19

```

- **POST /**
- Insere um novo registro de venda..

- **Corpo da Requisição:**

```bash
{
  "valor": 100.50,
  "numero_cartao": "1234567890123456",
  "id_adquirente": 1,
  "numero_parcelas": 1,
  "id_bandeira_cartao": 1,
  "data_venda": "2022-01-19"
}

```

- **Exemplo:**

```bash

 curl -X POST -H "Content-Type: application/json" -d '{"valor": 100.50, "numero_cartao": "1234567890123456", "id_adquirente": 1, "numero_parcelas": 1, "id_bandeira_cartao": 1, "data_venda": "2022-01-19"}' http://localhost:8080

```

## Banco de Dados

A API utiliza o PostgreSQL como banco de dados. Certifique-se de ter um servidor PostgreSQL em execução e configure os detalhes de conexão no arquivo .env.

## Como Executar o Projeto

1. **Clone o repositório::**

   ```bash
    https://github.com/filipedealencar/salesforge-services.git
   ```

2. **Entre no repositório do projeto**

```bash
 cd salesforge-services
```

3. **Instale as dependências:**

```bash
 npm install
```

4. **Inicie a aplicação:**

   ```bash
    npm run dev
   ```

Agora você pode acessar o projeto em http://localhost:8080.

## Contribuições

Contribuições são bem-vindas! Se você encontrar problemas, bugs ou melhorias potenciais, sinta-se à vontade para abrir uma issue ou enviar um pull request.
