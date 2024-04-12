import getColorByType from "@utils/getColorByType";
import { Text, View } from "react-native";
import { Bar } from "react-native-progress";

export default function BaseStats(pokemons: any) {
  function calcPercentage(value: number, max: number) {
    return (value / max) * 100;
  }

  return (
    <>
      <Text
        className={`font-poppins_bold text-subtitle-1 mb-1 text-type-${pokemons.type1}`}
        style={{ includeFontPadding: false }}
      >
        Base Stats
      </Text>
      <View className="flex flex-row w-full px-6 gap-4">
        <View className="flex flex-col" style={{ gap: 4 }}>
          {["HP", "ATK", "DEF", "SATK", "SDEF", "SPD"].map((stat, index) => (
            <Text
              key={index}
              className={`font-poppins_bold text-subtitle-2 text-type-${pokemons.type1}`}
              style={{ includeFontPadding: false, textAlign: "right" }}
            >
              {stat}
            </Text>
          ))}
        </View>
        <View className="h-full bg-light" style={{ width: 2.5 }}></View>
        {/* map dict stats of pokemon */}
        <View className="flex flex-col" style={{ gap: 4 }}>
          {[
            pokemons.stats.hp,
            pokemons.stats.attack,
            pokemons.stats.defense,
            pokemons.stats.specialAttack,
            pokemons.stats.specialDefense,
            pokemons.stats.speed,
          ].map((stat, index) => (
            <View className="flex flex-row justify-center items-center gap-4" key={index}>
              <Text
                key={index}
                className="font-poppins text-subtitle-2 text-dark"
                style={{ includeFontPadding: false, textAlign: "left" }}
              >
                {stat < 10 ? `00${stat}` : stat < 100 ? `0${stat}` : stat}
              </Text>
              <Bar
                progress={calcPercentage(stat, 255) / 100}
                color={getColorByType(pokemons.type1)}
                unfilledColor={`${getColorByType(pokemons.type1)}33`}
                borderWidth={0}
                width={216}
              />
            </View>
          ))}
        </View>
      </View>
    </>
  );
}
