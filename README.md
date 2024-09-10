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

### Features Futuras

- **Gerenciamento de Contas de Administrador**: Funcionalidades adicionais para administradores, como visualização e gestão de usuários.
- **Busca Avançada de Produtos**: Implementação de filtros e busca avançada para produtos.
- **Integração de Pagamento**: Adição de funcionalidade para processar pagamentos.
- **Melhorias na Segurança**: Implementação de medidas adicionais de segurança, como rate limiting e proteção contra CSRF.
- **Notificações e Email**: Implementação de notificações por email para confirmações de pedidos e atualizações.

## Uso

- **Rotas de Produtos**
  - `GET /api/products`: Lista todos os produtos com paginação.
  - `POST /api/admin/products`: Cria um novo produto.
  - `PUT /api/admin/products/:id`: Atualiza um produto existente.
  - `DELETE /api/admin/products/:id`: Remove um produto.

- **Rotas de Pedidos**
  - `GET /api/admin/orders`: Lista todos os pedidos com paginação.
  - `GET /api/admin/orders`: Lista os pedidos de um usuário específico.
  - `POST /api/orders`: Cria um novo pedido.

- **Autenticação ADM**
  - `POST /api/admin/register`: Registra um novo Admin.
  - `POST /api/register`: Registra um novo Usuário.
  - `POST /api/admin/login`: Realiza o login e retorna um token JWT.
  - `POST /api/login`: Realiza o login e retorna um token JWT.

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
