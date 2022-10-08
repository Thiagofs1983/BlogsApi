# Projeto Blogs Api

# Contexto
 Aplicação em Node.js usando o pacote sequelize para fazer um CRUD de posts para um Blog. A aplicação faz a relação entre tabelas e foi desenvolvida como RESTful. 

## Técnologias usadas

Back-end:
> Desenvolvido usando: NodeJS, Sequelize, ExpressJS, ES6, MYSQL, Joi, JWT


## Instalando Dependências

> Backend
```bash
git clone git@github.com:Thiagofs1983/BlogsApi.git
cd BlogsApi 
npm install
``` 

## Executando aplicação

Para rodar a aplicação você vai precisar ter o [Docker](https://docs.docker.com/engine/install/ubuntu/) instalado usando os comandos no terminal:
```bash
docker-compose up -d --build
docker exec -it blogs_api bash
npm install
```

* Para rodar o back-end:

```
npm start
```

* Realizando Requisições:

Para realizar as requisições, você pode usar a extensão [Thunder Client](https://www.thunderclient.com/) do VSCode ou pode usar os clientes HTTP [Postman](https://www.postman.com/) ou [Insomnia](https://insomnia.rest/).
