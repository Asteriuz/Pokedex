// save data from poke api to json file

const fs = require("fs");
const { promisify } = require("util");
const writeFile = promisify(fs.writeFile);

//   var endpoints = [];
//   for (let i = initialNumber; i <= finalNumber; i++) {
//     endpoints.push(`https://pokeapi.co/api/v2/pokemon/${i}`);
//   }
//   const promises = endpoints.map((endpoint) => fetch(endpoint));
//   const responses = await Promise.all(promises);
//   const data = await Promise.all(
//     responses.map((response) => response.json())
//   );
//   const cardsNoFiltered = data.map((pokemon: any) => {
//     return (
//       <Card
//         key={pokemon.id}
//         id={pokemon.id}
//         name={pokemon.name}
//         image={pokemon.sprites.other["official-artwork"].front_default}
//       />
//     );
//   });
//   setCards([...cards, ...cardsNoFiltered]);
// };

const saveData = async (initialNumber, finalNumber) => {
  var endpoints = [];
  for (let i = initialNumber; i <= finalNumber; i++) {
    endpoints.push(`https://pokeapi.co/api/v2/pokemon/${i}`);
  }
  const promises = endpoints.map((endpoint) => fetch(endpoint));
  const responses = await Promise.all(promises);
  const data = await Promise.all(
    responses.map(async (response) => {
      const pokemon = await response.json();
      pokemon.name = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
      console.log(`Saving ${pokemon.name}`);
      return {
        id: pokemon.id,
        name: pokemon.name,
        image: pokemon.sprites.other["official-artwork"].front_default,
      };
    })
  );
  await writeFile("./data/pokemons.json", JSON.stringify(data, null, 2), {
    flag: "a",
  });
};

saveData(1001, 1025);
