# Integrantes - RM :

- Augusto Barcelos Barros - 98078
- Gabriel Souza de Queiroz - 98570
- Gabriela Zanotto Rodrigues - 551629
- Lucas Pinheiro de Melo - 97707
- Mel Maia Rodrigues - 98266

## Preview do Projeto (Folder Preview)

<picture>
    <source srcset="./preview/Home.jpg" width="375" height="833" alt="Home" style="width:auto;">
    <img src="./preview/Home.jpg" alt="Home" style="width:auto;">
</picture>
<picture>
    <source srcset="./preview/DetalhesMewtwo.jpg" width="375" height="833" alt="Details" style="width:auto;">
    <img src="./preview/Details.jpg" alt="Details" style="width:auto;">
</picture>

<br/>

[Veja o Vídeo](./preview/Video.mp4)

## Como rodar o projeto

### Pré-requisitos

- [Node.js](https://nodejs.org/en/)
- [Yarn](https://yarnpkg.com/) | [NPM](https://www.npmjs.com/)
- [Expo](https://expo.dev/)
- [Git](https://git-scm.com/)

### Rodando o projeto

1. Clone o repositório

```bash
git clone https://github.com/Asteriuz/Pokedex
```

2. Acesse a pasta do projeto

```bash
cd PokeDex
```

3. Instale as dependências

```bash
yarn install
```

ou

```bash
npm install
```

4. Rode o projeto

```bash
expo start
```

5. Acesse o projeto

Acesse o projeto através do aplicativo Expo Go, disponível na [Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent) ou [App Store](https://apps.apple.com/br/app/expo-go/id982107779).

6. Escaneie o QR Code

Escaneie o QR Code gerado no terminal ou no navegador.

7. Pronto!

## Protótipo de referência

[Figma do Design](https://www.figma.com/community/file/979132880663340794)

> Créditos pelo protótipo [Ricardo Schiniegoski](https://www.figma.com/@ricardohs)

## Descrição do projeto

O projeto consiste em uma aplicação mobile que simula uma Pokedex, onde o usuário pode visualizar informações sobre os Pokémons, como nome, tipo, habilidades, entre outras. A aplicação consomiu a API [PokeAPI](https://pokeapi.co/), que fornece informações sobre os Pokémons, porém está salva em um banco de dados local, para que o usuário possa acessar as informações mesmo sem conexão com a internet.

## Funcionalidades

- [x] Pokemon Aleatório ao clicar na logo (pokebola) no canto superior esquerdo
- [x] Listagem de Pokémons
- [x] Visualização de detalhes de um Pokémon
- [x] Busca de Pokémons
- [ ] Ordenar por nome ou id (TODO: Problemas de otimização ao ordenar)
