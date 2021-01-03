## Instalação Local

Após clonar o repositório em seu computador, basta seguir as instruções a seguir:

1. `npm install` para instalar as dependências do projeto.

2. Copiar o arquivo .env.example nomeando-a como .env, para que seja possível ser lido as variaveis de ambiente. O arquivo .env.example é um arquivo de exemplo com as configurações locais da API, as de produção estão no servidor.

3. Rode o comando `docker-compose up -d` (caso esteja no linux use o `sudo`)

4. `npm run dev` para executar a API localmente

## Migrations (Sequelize)

Comando para criar uma nova migration:

- `npx sequelize migration:create --name=nome-migration`

Comando para executar a migration após configurada:

- `npx sequelize db:migrate`

## URI

https://api-example

## Deploy

## Referências

- [Guia de Referências para configurar Sequelize](https://blog.rocketseat.com.br/nodejs-express-sequelize/)
- [Modelo de estrutura com Sequelize e migrations](https://github.com/bezkoder/nodejs-express-sequelize-mysql)
- [Doc Oficial Sequelize para queries](https://sequelize.org/master/manual/model-querying-basics.html)
- [Doc Oficial Sequelize para DataTypes](https://sequelize.org/v5/manual/data-types.html)
