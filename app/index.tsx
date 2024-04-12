import {
  Text,
  View,
  Image,
  TextInput,
  FlatList,
  StyleSheet,
  Pressable,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import "../global.css";
import { useFonts } from "expo-font";
import { Poppins_400Regular } from "@expo-google-fonts/poppins";
import { Poppins_700Bold } from "@expo-google-fonts/poppins";
import { Poppins_100Thin } from "@expo-google-fonts/poppins";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import pokemons from "../data/pokemons.json";
import { MenuProvider } from "react-native-popup-menu";
import ListItem from "@components/home/ListItem";
import SortMenuComponent from "@components/home/SortMenuComponent";
import { Link, Stack, useNavigation } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
  const [cards, setCards] = useState<CardProps[]>([]);
  const [search, setSearch] = useState<string>("");
  const [orderBy, setOrderBy] = useState<string>("Number");
  const [randomId, setRandomId] = useState<number>(1);

  useEffect(() => {
    setRandomId(Math.floor(Math.random() * 898) + 1);
  }, []);

  const keyExtractor = useCallback((item: CardProps) => {
    return item.id.toString();
  }, []);

  const getItemLayout = useCallback((_: any, index: number) => {
    return {
      length: 112,
      offset: 112 * index + 14 + 16 * index,
      index,
    };
  }, []);

  const renderItem = useCallback(({ item }: { item: CardProps }) => {
    return <ListItem item={item} />;
  }, []);

  const flatListRef = useRef<FlatList>(null);

  const allPokemons = useMemo(() => {
    return pokemons.map((pokemon) => ({
      id: pokemon.id,
      name: pokemon.name,
      image: pokemon.image,
    }));
  }, []);

  useEffect(() => {
    if (search === "") {
      setCards(allPokemons);
    } else {
      const filteredPokemons = filterPokemons(search);
      setCards(filteredPokemons);
    }
  }, [search]);

  const getPokemons = useMemo(() => {
    return () => {
      const cards = pokemons.map((pokemon) => ({
        id: pokemon.id,
        name: pokemon.name,
        image: pokemon.image,
      }));
      return cards;
    };
  }, []);

  const filterPokemons = useMemo(() => {
    return (searchTerm: string) => {
      const filtered = pokemons.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      return filtered.map((pokemon) => ({
        id: pokemon.id,
        name: pokemon.name,
        image: pokemon.image,
      }));
    };
  }, [pokemons]);

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold,
    Poppins_100Thin,
  });

  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }

  return (
    <MenuProvider
      customStyles={{
        backdrop: styles.backdrop,
      }}
    >
      <StatusBar style="light" backgroundColor="#DC0A2D" />
      <SafeAreaView>
        <Stack.Screen
          options={{
            headerShown: false,
          }}
        />
        <View className="bg-primary  flex h-screen flex-col w-screen p-2">
          <View className="flex flex-col gap-y-5 h-36 rounded-3xl p-2 px-5">
            <View className="flex flex-row items-center gap-4">
              <Link href={`/details/${randomId}`} asChild>
                <Pressable
                  onPress={() =>
                    setRandomId(Math.floor(Math.random() * 898) + 1)
                  }
                >
                  <Image source={require("@assets/icons/pokeball.png")} />
                </Pressable>
              </Link>
              <Text
                className="text-white text-headline font-poppins_bold"
                style={{ includeFontPadding: false }}
              >
                Pokédex
              </Text>
            </View>
            <View className="flex flex-row">
              <View className="flex flex-grow flex-row items-center gap-2 bg-white rounded-3xl p-2">
                <Image
                  className="ml-3 h-6 w-6"
                  source={require("@assets/icons/search.png")}
                />
                <TextInput
                  placeholder="Search"
                  className="flex-grow font-poppins"
                  placeholderTextColor={"#666666"}
                  style={{ includeFontPadding: false }}
                  onChangeText={(text) => setSearch(text)}
                />
              </View>
              <SortMenuComponent
                orderBy={orderBy}
                setOrderBy={setOrderBy}
                flatListRef={flatListRef}
              />
            </View>
          </View>
          <View
            className="bg-white rounded-3xl overflow-hidden h-[84.8%] "
            style={{ flex: 1 }}
          >
            <FlatList
              contentInsetAdjustmentBehavior="automatic"
              ref={flatListRef}
              className="pt-4"
              data={cards}
              keyExtractor={keyExtractor}
              numColumns={3}
              contentContainerStyle={{
                gap: 16,
                padding: 8,
              }}
              showsVerticalScrollIndicator={false}
              columnWrapperStyle={{ gap: 12 }}
              ListFooterComponent={<View className="h-4"></View>}
              initialNumToRender={18}
              getItemLayout={getItemLayout}
              windowSize={21}
              maxToRenderPerBatch={18}
              updateCellsBatchingPeriod={20}
              renderItem={renderItem}
            ></FlatList>
          </View>
        </View>
      </SafeAreaView>
    </MenuProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    width: 40,
    height: 40,
    borderRadius: 20,
    marginLeft: 16,
    color: "#DC0A2D",
  },
  backdrop: {
    backgroundColor: "black",
    opacity: 0.3,
  },
});
