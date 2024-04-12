import { Image, Text, View } from "react-native";
import capitalize from "@utils/capitalize";

export default function About(pokemons: any) {
  return (
    <>
      <Text
        className={`font-poppins_bold text-subtitle-1 mt-2 mb-1 text-type-${pokemons.type1}`}
        style={{ includeFontPadding: false }}
      >
        About
      </Text>
      <View className="flex flex-row items-center justify-center gap-4 w-full px-20">
        <View className="flex flex-col items-center w-[88px] ">
          <View className="flex-grow  flex-row flex justify-center items-center gap-2">
            <Image
              source={require("@assets/icons/weight.png")}
              style={{ resizeMode: "contain" }}
            />
            <Text
              style={{ includeFontPadding: false }}
              className="font-poppins text-dark"
            >
              {pokemons.weight / 10} kg
            </Text>
          </View>
          <Text className="font-poppins text-body2 text-medium">Weight</Text>
        </View>
        <View className="h-20 bg-light w-0.5"></View>
        <View className="flex flex-col items-center w-[88px]">
          <View className="flex-grow flex-row flex justify-center gap-2 items-center">
            <Image source={require("@assets/icons/ruler.png")} />
            <Text
              style={{ includeFontPadding: false }}
              className="font-poppins text-dark"
            >
              {pokemons.height / 10} m
            </Text>
          </View>
          <Text className="font-poppins text-body2  text-medium">Height</Text>
        </View>
        <View className="h-20 bg-light w-0.5"></View>
        <View className="flex flex-col items-center w-[88px] ">
          <View className="flex-grow flex justify-center">
            <Text className="font-poppins text-body2 text-dark">
              {capitalize(pokemons.abilities[1])}
            </Text>
            <Text className="font-poppins text-body2 text-dark">
              {capitalize(pokemons.abilities[0])}
            </Text>
          </View>
          <Text className="font-poppins text-body2 text-medium">Abilities</Text>
        </View>
      </View>
      <Text
        className="font-poppins text-md px-6 text-dark"
        style={{
          includeFontPadding: false,
          textAlign: "justify",
          lineHeight: 24,
          marginVertical: 20,
        }}
      >
        {pokemons.flavor_text}
      </Text>
    </>
  );
}
