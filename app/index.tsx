import {
  Text,
  View,
  Image,
  TextInput,
  FlatList,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import "../global.css";
import Card from "../components/Card";
import { useFonts } from "expo-font";
import { Poppins_400Regular } from "@expo-google-fonts/poppins";
import { Poppins_700Bold } from "@expo-google-fonts/poppins";
import { Poppins_100Thin } from "@expo-google-fonts/poppins";
import { useCallback, useEffect, useState } from "react";
import pokemons from "../data/pokemons.json";
import {
  MenuProvider,
  Menu,
  MenuTrigger,
  MenuOptions,
  MenuOption,
  renderers,
} from "react-native-popup-menu";

const { Popover } = renderers;

export default function Page() {
  const [cards, setCards] = useState<JSX.Element[]>([]);
  const [search, setSearch] = useState<string>("");
  const [orderBy, setOrderBy] = useState<string>("Number");

  // ** Código para api que troquei por cache para não sobrecarregar a api **
  // API call to get the pokemons
  // const getPokemons = async (initialNumber: number, finalNumber: number) => {
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

  useEffect(() => {
    if (search === "") {
      setCards([]);
      getPokemons(orderBy);
    } else {
      filterPokemons(search, orderBy);
    }
  }, [search, orderBy]);

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
      (pokemon: any) => {
        return (
          <Card
            key={pokemon.id}
            id={pokemon.id}
            name={pokemon.name}
            image={pokemon.image}
          />
        );
      }
    );
    setCards(cardsNoFiltered);
  };

  const filterPokemons = (search: string, sortBy: string) => {
    const filteredPokemons = pokemons.filter((pokemon: any) =>
      pokemon.name.toLowerCase().includes(search.toLowerCase())
    );

    const cardsFiltered = sortPokemons(filteredPokemons, sortBy).map(
      (pokemon: any) => {
        return (
          <Card
            key={pokemon.id}
            id={pokemon.id}
            name={pokemon.name}
            image={pokemon.image}
          />
        );
      }
    );

    setCards(cardsFiltered);
  };

  const renderItem = useCallback(({ item }: { item: any }) => {
    return (
      <View key={item} className="flex-1/3">
        {item}
      </View>
    );
  }, []);

  const keyExtractor = useCallback((item: any, index: number) => {
    return index.toString();
  }, []);

  const getItemLayout = useCallback((data: any, index: number) => {
    return {
      length: 200,
      offset: 200 * index,
      index,
    };
  }, []);

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
            <Menu
              renderer={Popover}
              rendererProps={{
                placement: "bottom",
                anchorStyle: { backgroundColor: "transparent" },
              }}
            >
              {/* view to dim background */}
              <View />
              <MenuTrigger
                style={styles.container}
                customStyles={{
                  TriggerTouchableComponent: TouchableWithoutFeedback,
                }}
              >
                {/* <Image
                  source={require("@assets/icons/tag.png")}
                  className="h-6 w-6"
                /> */}
                {orderBy === "Number" ? (
                  <Image
                    source={require("@assets/icons/tag.png")}
                    className="h-6 w-6"
                  />
                ) : (
                  <Image
                    source={require("@assets/icons/filter.png")}
                    className="h-6 w-6"
                  />
                )}
              </MenuTrigger>
              <MenuOptions
                customStyles={{
                  optionsContainer: {
                    backgroundColor: "#DC0A2D",
                    padding: 4,
                    borderRadius: 8,
                    // remove offset
                    marginLeft: -20,
                  },
                  optionText: {
                    color: "white",
                    fontSize: 16,
                    fontFamily: "Poppins_400Regular",
                  },
                }}
              >
                {/* modal to dim background */}
                <Text className="font-poppins_bold text-white text-lg px-4 py-4">
                  Sort by:
                </Text>
                <View className="flex flex-col items-start gap-2 px-6 py-3 bg-white rounded-lg">
                  <MenuOption
                    onSelect={() => setOrderBy("Number")}
                    customStyles={{ optionText: { color: "black" } }}
                  >
                    <View className="font-poppins flex flex-row gap-2 items-center justify-center">
                      {orderBy === "Number" ? (
                        <Image
                          source={require("@assets/icons/radio_button_checked.png")}
                          className="h-6 w-6"
                        />
                      ) : (
                        <Image
                          source={require("@assets/icons/radio_button_unchecked.png")}
                          className="h-6 w-6"
                        />
                      )}
                      <Text>Number</Text>
                    </View>
                  </MenuOption>
                  <MenuOption
                    onSelect={() => setOrderBy("Name")}
                    customStyles={{ optionText: { color: "black" } }}
                  >
                    <View className="font-poppins flex flex-row gap-2 items-center justify-center">
                      {orderBy === "Name" ? (
                        <Image
                          source={require("@assets/icons/radio_button_checked.png")}
                          className="h-6 w-6"
                        />
                      ) : (
                        <Image
                          source={require("@assets/icons/radio_button_unchecked.png")}
                          className="h-6 w-6"
                        />
                      )}
                      <Text>Name</Text>
                    </View>
                  </MenuOption>
                </View>
              </MenuOptions>
            </Menu>
          </View>
        </View>
        <View className="bg-white rounded-3xl overflow-hidden h-[84.8%] ">
          <FlatList
            className="pt-4"
            data={cards}
            renderItem={renderItem}
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
