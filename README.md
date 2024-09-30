# API para Ecommerce

## Descrição do Projeto

Esta é uma API em desenvolvimento para um ecommerce. A API suporta funcionalidades básicas para um ecommerce, incluindo contas para administradores e usuários, gerenciamento de pedidos (`orders`) e produtos (`products`). O projeto está em desenvolvimento contínuo, com novas funcionalidades e melhorias planejadas para o futuro.

## Tecnologias Usadas

- **Node.js**: Ambiente de execução para JavaScript no servidor.
- **Express**: Framework para construir a API.
- **TypeScript**: Superset do JavaScript que adiciona tipagem estática.
- **Prisma**: ORM para interagir com o banco de dados.
- **PostgreSQL**: Banco de dados para desenvolvimento.
- **Zod**: Biblioteca para validação de esquemas de dados.
- **bcryptjs**: Biblioteca para hash e verificação de senhas.
- **jsonwebtoken (JWT)**: Para autenticação e criação de tokens.

## TODO List

### Features Prontas

- **Autenticação de Usuário**: Registro e login de usuários com JWT.
- **Gerenciamento de Produtos**: CRUD para produtos (criação, leitura, atualização e exclusão).
- **Gerenciamento de Pedidos**: Criação de pedidos e listagem dos pedidos do usuário.
- **Rota para Administradores**: Rota para obter todos os pedidos.
- **Paginação**: Suporte a paginação nas rotas de listagem de pedidos e produtos.
- **Validação de Dados**: Validação de dados de entrada usando Zod.
- **Busca Avançada de Produtos**: Implementação de filtros e busca avançada para produtos.
- **Gerenciamento de Contas de Administrador**: Funcionalidades adicionais para administradores, como visualização e gestão de usuários.

### Features Futuras

- **Integração de Pagamento**: Adição de funcionalidade para processar pagamentos.
- **Melhorias na Segurança**: Implementação de medidas adicionais de segurança, como rate limiting e proteção contra CSRF.
- **Notificações e Email**: Implementação de notificações por email para confirmações de pedidos e atualizações.

## Índice de Rotas

- [Rotas de Usuários](#rotas-de-usuários)
- [Rotas de Produtos](#rotas-de-produtos)
- [Rotas de Pedidos](#rotas-de-pedidos)
- [Rotas de Categorias](#rotas-de-categorias)
- [Autenticação](#autenticação)

## Rotas de Produtos
1. **`GET /api/admin/users`**: Esta rota lista todos os usuários e seus pedidos, com suporte a paginação. Os parâmetros de query aceitos são:
   -   `page`: Número da página para paginação (padrão é `1`).
   -   `limit`: Número máximo de itens por página (padrão é `10`).


## Rotas de Produtos

1. **`GET /api/products`**: Esta rota lista todos os produtos da API. A resposta é paginada e permite o uso de filtros opcionais. Os parâmetros de query aceitos são:

   -   `page`: Número da página para paginação (padrão é `1`).
   -   `limit`: Número máximo de itens por página (padrão é `10`).
   -   `name`: Filtra produtos que contenham um determinado nome.
   -   `minPrice`: Filtra produtos com preço maior ou igual ao valor especificado.
   -   `maxPrice`: Filtra produtos com preço menor ou igual ao valor especificado.
   -   `category`: Filtra produtos por uma categoria específica.
   -   `hasDiscount`: Filtra produtos que possuem desconto, aceitando valores `true` ou `false`.

2. **`POST /api/admin/products`**: Utilizada para criar um novo produto. A requisição deve conter um corpo JSON com os seguintes campos:

   -   `name`: Nome do produto.
   -   `price`: Preço do produto.
   -   `description`: Descrição do produto.
   -   `discountPercentage`: Percentual de desconto aplicado ao produto.
   -   `quantity`: Quantidade disponível em estoque.
   -   `imageUrl`: URL da imagem do produto.
   -   `categories`: Um array de nomes de categorias às quais o produto pertence.

3. **`PUT /api/admin/products/:id`**: Atualiza um produto existente. O parâmetro `id` na URL refere-se ao ID do produto a ser atualizado. O corpo da requisição deve ser um JSON contendo os campos que deseja atualizar, como `name`, `price`, `description`, `discountPercentage`, `quantity`, `imageUrl` e `categories`.

4. **`DELETE /api/admin/products/:id`**: Remove um produto específico. O parâmetro `id` na URL indica o ID do produto que será removido.

## Rotas de Pedidos

1. **`GET /api/admin/orders`**: Esta rota lista todos os pedidos existentes, com suporte a paginação. Os parâmetros de query aceitos são:

   -   `page`: Número da página para paginação (padrão é `1`).
   -   `limit`: Número máximo de itens por página (padrão é `10`).

2. **`GET /api/orders`**: Retorna uma lista de pedidos do usuário logado, com suporte a paginação. Os parâmetros de query aceitos são:

   -   `page`: Número da página para paginação (padrão é `1`).
   -   `limit`: Número máximo de itens por página (padrão é `10`). 
   
3. **`POST /api/orders`**: Cria um novo pedido. O corpo da requisição deve ser um JSON contendo:

   -   `userId`: ID do usuário que está fazendo o pedido.
   -   `items`: Um array de objetos contendo `productId` (ID do produto) e `quantity` (quantidade desse produtudo para compra).

## Rotas de Categorias

1. **`GET /api/categories`**: Lista todas as categorias existentes.

2. **`DELETE /api/admin/categories/:id`**: Remove uma categoria específica. O parâmetro `id` na URL indica o ID da categoria que será removida.

3. **`POST /api/admin/categories`**: Cria uma nova categoria. O corpo da requisição deve ser um JSON com o campo `name`, que representa o nome da nova categoria.

## Autenticação

1. **`POST /api/admin/register`**: Registra um novo administrador na plataforma. A requisição deve conter um JSON com os seguintes campos:

   -   `email`: Email do administrador.
   -   `password`: Senha do administrador.
   -   `name`: Nome do administrador.

2. **`POST /api/register`**: Registra um novo usuário. O corpo da requisição deve conter um JSON com os seguintes campos:

   -   `email`: Email do usuário.
   -   `password`: Senha do usuário.
   -   `name`: Nome do usuário.

3. **`POST /api/admin/login`**: Realiza o login de um administrador e retorna um token JWT. A requisição deve incluir um JSON com `email` e `password`.

4. **`POST /api/login`**: Realiza o login de um usuário comum e retorna um token JWT. A requisição deve incluir um JSON com `email` e `password`.

## Instalando

Obs.: É necessário antes de instalar este projeto, ter instalado e rodando os bancos de dados: 
* PostgreSQL

Para instalá-lo em sua máquina faça os comandos a seguir:

``` bash
  git clone https://github.com/phladev/ecommerce-api.git
  npm install
  npm start
```

#### Atenção

É necessário ter as seguintes variáveis de ambiente: 
  - DATABASE_URL: Url do banco de dados
  - JWT_SECRET: JWT secret
  - PORT(Opcional): porta para rodar a aplicação

## Contribuições

Contribuições são bem-vindas! Se você tiver sugestões, correções ou melhorias, sinta-se à vontade para abrir uma issue ou enviar um pull request.

## Licença

Este projeto é licenciado sob a [MIT License](LICENSE).
