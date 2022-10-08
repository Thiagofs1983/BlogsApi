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

### Para rodar o back-end:

```
npm start
```

### Realizando Requisições:

Para realizar as requisições, você pode usar a extensão [Thunder Client](https://www.thunderclient.com/) do VSCode ou pode usar os clientes HTTP [Postman](https://www.postman.com/) ou [Insomnia](https://insomnia.rest/).

#### ENDPOINTS

<details>
  <summary><strong> Login </strong></summary></br>
  
  - Para realizar o login utilize o método e URL abaixo:

| Método | Funcionalidade | URL |
|---|---|---|
| `POST` | Realiza o login do usuário | http://localhost:3000/login |

  Utilize também o seguinte json na aba `Body` da requisição:
  ```
  {
   "email": "lewishamilton@gmail.com",
   "password": "123456"
}
```
Caso haja sucesso, a requisição irá retornar um TOKEN, que será usado para fazer as requisições seguintes. Na aba `Headers` insira a chave `Authorization` e o valor do token que foi gerado ao fazer o login.

</details>

<details>
  <summary><strong> Usuários </strong></summary></br>
  
  - Abaixo os seguintes endpoints para as rotas `user`:

| Método | Funcionalidade | URL |
|---|---|---|
| `POST` | Adiciona um novo usuario a tabela no banco de dados | http://localhost:3000/user |

Para inserir um novo usuário, insira também na aba `Body` o seguinte json:
```
{
  "displayName": "Brett Wiltshire",
  "email": "brett@email.com",
  "password": "123456",
  "image": "http://4.bp.blogspot.com/_YA50adQ-7vQ/S1gfR_6ufpI/AAAAAAAAAAk/1ErJGgRWZDg/S45/brett.png"
}
```
*Obs.: É necessário que haja um TOKEN válido na chave `Authorization` da aba `Headers` e que os valores das chaves `displayName`, `email`, `password` e `image` sejam válidos. Caso contrário, a requisição retornará um erro indicativo.*

| Método | Funcionalidade | URL |
|---|---|---|
| `GET` | Exibe todos usuários do banco de dados | http://localhost:3000/user |
| `GET` | Exibe o usuário correspondente ao id passado na URL | http://localhost:3000/user/1 |

*Obs.: É necessário que haja um TOKEN válido na chave `Authorization` da aba `Headers` e que o id do usuário seja válido. Caso contrário, a requisição retornará um erro indicativo.*

| Método | Funcionalidade | URL |
|---|---|---|
| `DELETE` | Apaga o usuário logado do banco de dados | http://localhost:3000/user/me |

*Obs.: É necessário que haja um TOKEN válido na chave `Authorization` da aba `Headers`*

</details>

<details>
  <summary><strong> Categorias </strong></summary></br>
  
  - Abaixo os seguintes endpoints para as rotas `categories`

| Método | Funcionalidade | URL |
|---|---|---|
| `GET` | Exibe todas as categerias do banco de dados | http://localhost:3000/categories |
| `POST` | Adiciona uma nova categoria a tabela no banco de dados | http://localhost:3000/categories |

Para adicionar uma nova categoria, insira também na aba `Body` o seguinte json:
```
{
  "name": "Typescript"
}
```
*Obs.: É necessário que haja um TOKEN válido na chave `Authorization` da aba `Headers` e que o valor da chave `name` seja válido. Caso contrário, a requisição retornará um erro indicativo.*

</details>

<details>
  <summary><strong> Blog Posts </strong></summary></br>
  
  - Abaixo os seguintes endpoints para as rotas `post`

| Método | Funcionalidade | URL |
|---|---|---|
| `GET` | Exibe todos os blogs posts, usuário dono dele e as categorias | http://localhost:3000/post |
| `GET` | Exibe o blog post, usuário dono dele e categoria correspondente ao id passado na URL | http://localhost:3000/post/1 |
| `GET` | Exibe o blog post, usuário dono dele e categoria que tenha em seu ttulo ou conteúdo a query params passado na URL | http://localhost:3000/post/search?q=vamos |

*Obs.: É necessário que haja um TOKEN válido na chave `Authorization` da aba `Headers` e que o id do blog post seja válido. Caso contrário, a requisição retornará um erro indicativo.*

| Método | Funcionalidade | URL |
|---|---|---|
| `POST` | Adiciona um novo blog post e o vincula às categorias no banco de dados | http://localhost:3000/post |

Para inserir um novo blog post, insira também na aba `Body` o seguinte json:

```
{
  "title": "Latest updates, August 1st",
  "content": "The whole text for the blog post goes here in this key",
  "categoryIds": [1, 2]
}
```
*Obs.: É necessário que haja um TOKEN válido na chave `Authorization` da aba `Headers` e que os valores das chaves `title`, `content` e `categoryIds` sejam válidos. Caso contrário, a requisição retornará um erro indicativo.*

| Método | Funcionalidade | URL |
|---|---|---|
| `PUT` | Altera um post do banco de dados, se ele existir | http://localhost:3000/post/1 |

Para editar um blog post, insira também na aba `Body` o seguinte json:

```
{
  "title": "Latest updates, August 1st",
  "content": "The whole text for the blog post goes here in this key"
}
```
*Obs.: É necessário que haja um TOKEN válido na chave `Authorization` da aba `Headers` e que os valores das chaves `title` e `content` e o id informado na URL sejam válidos. Caso contrário, a requisição retornará um erro indicativo.*

| Método | Funcionalidade | URL |
|---|---|---|
| `DELETE` | Apaga um blog post baseado no id do banco de dados se ele existir | http://localhost:3000/post/1 |

*Obs.: É necessário que haja um TOKEN válido na chave `Authorization` da aba `Headers`, que o `ìd` seja válido e que o blog post seja do usuário que está logado. Caso contrário, a requisição retornará um erro indicativo.*

</details>

[<img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="linkedin" height='30'>](https://www.linkedin.com/in/fsthiago/)
