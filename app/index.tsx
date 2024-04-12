import {
  Text,
  View,
  Image,
  TextInput,
  FlatList,
  StyleSheet,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import "../global.css";
import { useFonts } from "expo-font";
import { Poppins_400Regular } from "@expo-google-fonts/poppins";
import { Poppins_700Bold } from "@expo-google-fonts/poppins";
import { Poppins_100Thin } from "@expo-google-fonts/poppins";
import { useCallback, useEffect, useRef, useState } from "react";
import pokemons from "../data/pokemons.json";
import { MenuProvider } from "react-native-popup-menu";
import ListItem from "@components/home/ListItem";
import SortMenuComponent from "@components/home/SortMenuComponent";

export default function Page() {
  const [cards, setCards] = useState<CardProps[]>([]);
  const [search, setSearch] = useState<string>("");
  const [orderBy, setOrderBy] = useState<string>("Number");

  useEffect(() => {
    if (search === "") {
      getPokemons(orderBy);
    } else {
      filterPokemons(search, orderBy);
    }
  }, [search, orderBy]);

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

  const sortPokemons = (pokemons: any[], orderBy: string) => {
    return pokemons.sort((a, b) => {
      if (orderBy === "Number") {
        return a.id - b.id;
      } else {
        return a.name.localeCompare(b.name);
      }
    });
  };

  const getPokemons = (orderBy: string) => {
    const cardsNoFiltered = sortPokemons(pokemons, orderBy).map(
      (pokemon: CardProps) => {
        return {
          id: pokemon.id,
          name: pokemon.name,
          image: pokemon.image,
        };
      }
    );
    setCards(cardsNoFiltered);
  };

  const filterPokemons = (search: string, sortBy: string) => {
    const filteredPokemons = pokemons.filter((pokemon: CardProps) =>
      pokemon.name.toLowerCase().includes(search.toLowerCase())
    );

    const cardsFiltered = sortPokemons(filteredPokemons, sortBy).map(
      (pokemon: any) => {
        return {
          id: pokemon.id,
          name: pokemon.name,
          image: pokemon.image,
        };
      }
    );

    setCards(cardsFiltered);
  };

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
      <View className="bg-primary  flex h-screen flex-col w-screen p-2">
        <View className="flex flex-col gap-y-5 h-36 rounded-3xl p-2 px-5">
          <View className="flex flex-row items-center gap-4">
            <Image source={require("@assets/icons/pokeball.png")} />
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
        <View className="bg-white rounded-3xl overflow-hidden h-[84.8%] ">
          <FlatList
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
            // windowSize={100}
            renderItem={renderItem}
          ></FlatList>
        </View>
      </View>
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
