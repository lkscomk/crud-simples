
# CRUD SIMPLES COM NODE.js

## Use como exemplo para inicar a construção da sua API



O sistema é simples e faz apenas a inserção de usuário na banco de dados, a consulta de todos os usuários ou a consulta de um único usuário, a alteração e o exclusão de um registro.



- Use para iniciar seus projetos.

- Construar sua própria API

- ✨É quase mágica✨



## Instalação



Confira as dependências no arquivo package.json



Primeiro crie o clone do repositório em sua máquina, depois instale as dependências.



```sh

git clone https://github.com/lkscomk/crud-simples.git

npm i ou yarn

```



Por último crie um aquivo .env com as seguintes informações.



```sh

//.env

APP_KEY=secreta

APP_PORT=5000



//configurações do banco de dados mysql

DB_CLIENT=mysql

DB_USERNAME=name_user

DB_PASSWORD=your_password

DB_DATABASE=name_database

```



## Coloque para rodar!



```sh

npm run serve ou yarn serve

```

## obs

 Tenha o mysql instalado em sua máquina.

## Documentação API
Rotas
```tsx
// Login
GET <http://localhost:5000/login>

// Listagem
GET <http://localhost:5000/usuario>

// Visualizar
GET <http://localhost:5000/usuario/:id>

// Inserir
POST <http://localhost:5000/usuario>

// Editar
PUT <http://localhost:5000/usuario/:id>

// Deletar
DELETE <http://localhost:5000/usuario/:id>
```

## Estrutura Banco de dados

Usuário | Tipo de dado
--------- | ------
id | Inteiro, Auto Incremento (Chave primaria)
nome | Literal(100)
senha | Literal(20)
email | Literal(70)
ativo | Booleano(1) // 1-ativo, 2-desativado

## SQL
```
CREATE TABLE `usuario` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `senha` varchar(20) DEFAULT NULL,
  `email` varchar(70) NOT NULL,
  `ativo` varchar(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3
```
