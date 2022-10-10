![Tests](https://github.com/oliveiraviniciuss/eng-gruposbf-backend-nodejs/actions/workflows/tests.yaml/badge.svg)
![Deploy Prod](https://github.com/oliveiraviniciuss/eng-gruposbf-backend-nodejs/actions/workflows/deploy-prod.yaml/badge.svg)

# Desafio de backend do Grupo SBF

![image](https://user-images.githubusercontent.com/42152790/194925174-5f5f2805-baaf-41c0-a6b6-6fed38267e48.png)

O desafio consiste em converter um valor em BRL enviado pelo usuário para um valor válido definido previamente. Os valores válidos são **EUR**,**USD** e **INR**.

O projeto basicamente consulta uma api externa para buscar os valores das cotações em tempo real e salva no cache em memória por 5 minutos.

# Como utilizar o projeto?

## Podemos utilizar de 3 formas diferentes:

### - Local: rodar os comandos
- make docker/build
- make docker/run
#### Como rodar os testes?
 - make test
 - make itest


### - Diretamente pela [URL](https://conversor-api.herokuapp.com/) de produção:

### - Diretamente pela [URL](https://conversor-api.herokuapp.com/api-docs/) do Swagger

## Como utilizar as rotas?
### Temos 3 rotas válidas:
- '/'
  - `curl --location --request GET 'http://localhost:3001/'`
- '/conversion'
  - `curl --location --request GET 'http://localhost:3001/conversion?price=10&currencies=USD'`
    - Importante ressaltar: preco é do tipo number e currencies é uma string e pode ter valores separados por virgula.
      - Exemplos válidos: 
        - `?price=10&currencies=USD'`
        - `?price=10.5&currencies=USD,INR,BRL,EUR'`
        - `?price=10.5&currencies=USD,$,teste,123'`
- '/healthcheck'
  - `curl --location --request GET 'http://localhost:3001/healthcheck'`
  
  
## Como fazer deploy da aplicação?

- Automaticamente a aplicação roda o lint, testes unitários e testes de integração quando o código chega na master. Podemos ver esse processo [aqui](https://github.com/oliveiraviniciuss/eng-gruposbf-backend-nodejs/actions/workflows/tests.yaml).
- Para fazer o deploy no heroku, basta executar manualmente o passo de deploy [aqui](https://github.com/oliveiraviniciuss/eng-gruposbf-backend-nodejs/actions/workflows/deploy-prod.yaml).





