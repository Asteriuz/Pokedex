import { Link, Stack, useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";

import { Text, View, StyleSheet, Image, Pressable } from "react-native";
import { Image as ExpoImage } from "expo-image";
import pokemons from "../../data/pokemons.json";
import getColorByType from "@utils/getColorByType";
import BaseStats from "@components/details/BaseStats";
import About from "@components/details/About";
import capitalize from "@utils/capitalize";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Page() {
  const { id } = useLocalSearchParams();
  const pokemon = pokemons[Number(id) - 1];

  return (
    <SafeAreaView>
      <StatusBar backgroundColor={getColorByType(pokemon.type1)} />
      <View
        className={`h-screen w-screen bg-type-${pokemon.type1} flex flex-col justify-between p-2`}
      >
        <View
          className="flex flex-row justify-center items-center gap-4"
          style={{ paddingHorizontal: 20, paddingVertical: 10 }}
        >
          <Link href="/" asChild>
            <Pressable>
              <Image
                source={require("@assets/icons/back.png")}
                className="w-8 h-8"
              />
            </Pressable>
          </Link>
          <Text
            className="font-poppins_bold flex-grow text-headline text-white"
            style={{ includeFontPadding: false }}
          >
            {pokemon.name}
          </Text>
          <Text
            className="font-poppins_bold text-subtitle-2 text-white"
            style={{ includeFontPadding: false }}
          >
            #{Number(id) < 10 ? `00${id}` : Number(id) < 100 ? `0${id}` : id}
          </Text>
        </View>
        <View
          className="absolute right-0 "
          style={{ zIndex: 1, top: 16, right: 16, width: 208, height: 208 }}
        >
          <Image source={require("@assets/icons/bgPokeball.png")} />
        </View>
        {Number(id) != 1 && (
          <Link
            replace
            href={`/details/${Number(id) - 1}`}
            className="absolute left-0 "
            style={{
              zIndex: 2,
              left: 32,
              top: 192,
              width: 32,
              height: 32,
            }}
            asChild
          >
            <Pressable>
              <Image
                source={require("@assets/icons/previous.png")}
                className="w-8 h-8"
              />
            </Pressable>
          </Link>
        )}
        {Number(id) != pokemons.length && (
          <Link
            replace
            href={`/details/${Number(id) + 1}`}
            className="absolute right-0 "
            style={{ zIndex: 2, right: 32, top: 192, width: 32, height: 32 }}
            asChild
          >
            <Pressable>
              <Image
                source={require("@assets/icons/next.png")}
                className="w-8 h-8"
              />
            </Pressable>
          </Link>
        )}
        <View
          className="bg-white rounded-3xl h-[72%] flex gap-4 items-center overflow-visible"
          style={styles.elevation}
        >
          <ExpoImage
            source={{
              uri: pokemon.image,
            }}
            style={{ width: 240, height: 240, marginTop: -176 }}
          />
          <View className="flex flex-row -mt-4 items-center gap-4">
            <View className={`bg-type-${pokemon.type1} rounded-3xl px-3 py-1`}>
              <Text
                className="font-poppins_bold text-white text-subtitle-3"
                style={{ includeFontPadding: false }}
              >
                {capitalize(pokemon.type1)}
              </Text>
            </View>
            {pokemon.type2 && (
              <View
                className={`bg-type-${pokemon.type2} rounded-3xl px-3 py-1`}
              >
                <Text
                  className="font-poppins_bold text-white text-subtitle-3"
                  style={{ includeFontPadding: false }}
                >
                  {capitalize(pokemon.type2)}
                </Text>
              </View>
            )}
          </View>
          <About {...pokemon} />
          <BaseStats {...pokemon} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  elevation: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3.84,
    elevation: 6,
    zIndex: 2,
  },
});
