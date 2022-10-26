# Car Shop

Este projeto teve o objetivo de desenvolver um CRUD para uma concessionária utilizando as seguintes tecnologias:
  - Mongoose
  - Nodejs
  - Docker
  - Express
  - Typescript
  - Mocha, chai e Sinon (98% de cobertura de testes unitários)

Para executar localmente, clone o repositório e execute os seguintes comandos:

```
$ docker-compose up -d
$ docker exec -it car_shop bash
$ npm start
```
Para executar os testes execute os seguintes comandos:

```
$ npm run test:coverage
```

### Metodos de Cars

|Methodo|Rota|Descrição|
| ------ | ------ | ----- |
|get|/cars|Retorna todos os carros cadastrados|
|get|/cars/id|Retorna um carro cadastrado com base no id informado|
|post|/cars|Cadastra um novo carro|
|delete|/user/id|Apaga o carro com base no id|

Formato de requisição para o POST e PUT:
```
{
"model": "Ferrari Maranello",
"year": 1963,
"color": "red",
"buyValue": 3500000,
"seatsQty": 1,
"doorsQty": 2
}
```

### Metodos de Motorcycles

|Methodo|Rota|Descrição|
| ------ | ------ | ----- |
|get|/motorcycles|Retorna todos as motos cadastrados|
|get|/motorcycles/id|Retorna uma moto cadastrado com base no id informado|
|post|/motorcycles|Cadastra uma nova moto|
|delete|/motorcycles/id|Apaga a moto com base no id|

Formato de requisição para o POST e PUT:
```
{
"model": "Honda CG Titan 125",
"year": 1963,
"color": "red",
"buyValue": 3500,
"category": "Street",
"engineCapacity": 125
}
```


