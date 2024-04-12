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
      pokemon.name =
        pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
      console.log(`Saving ${pokemon.name}`);
      // get flavor text using species url
      const speciesResponse = await fetch(pokemon.species.url);
      const species = await speciesResponse.json();
      let flavorText = species.flavor_text_entries.find(
        (entry) =>
          entry.language.name === "en" && entry.version.name === "firered"
      );
      if (!flavorText) {
        flavorText = species.flavor_text_entries.find(
          (entry) => entry.language.name === "en"
        );
      }
      flavorText.flavor_text = flavorText.flavor_text.replace(/\n/g, " ");
      flavorText.flavor_text = flavorText.flavor_text.replace(
        /POKéMON/g,
        "Pokémon"
      );
      pokemon.flavor_text = flavorText.flavor_text;
      return {
        id: pokemon.id,
        name: pokemon.name,
        image: pokemon.sprites.other["official-artwork"].front_default,
        type1: pokemon.types[0].type.name,
        type2: pokemon.types[1] ? pokemon.types[1].type.name : null,
        weight: pokemon.weight,
        height: pokemon.height,
        abilities: pokemon.abilities.map((ability) => ability.ability.name),
        stats: {
          hp: pokemon.stats[0].base_stat,
          attack: pokemon.stats[1].base_stat,
          defense: pokemon.stats[2].base_stat,
          specialAttack: pokemon.stats[3].base_stat,
          specialDefense: pokemon.stats[4].base_stat,
          speed: pokemon.stats[5].base_stat,
        },
        flavor_text: pokemon.flavor_text,
      };
    })
  );
  await writeFile("./data/pokemons.json", JSON.stringify(data, null, 2), {
    flag: "a",
  });
};

saveData(801, 1025);
