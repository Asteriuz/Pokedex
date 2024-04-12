import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  FlatList,
} from "react-native";
import {
  Menu,
  MenuTrigger,
  MenuOptions,
  MenuOption,
  renderers,
} from "react-native-popup-menu";

type SortMenuProps = {
  orderBy: string;
  setOrderBy: React.Dispatch<React.SetStateAction<string>>;
  flatListRef: React.MutableRefObject<FlatList | null>;
};

const { Popover } = renderers;

const SortMenuComponent: React.FC<SortMenuProps> = ({
  orderBy,
  setOrderBy,
  flatListRef,
}) => {
  return (
    <Menu
      renderer={Popover}
      rendererProps={{
        placement: "bottom",
        anchorStyle: { backgroundColor: "transparent" },
      }}
    >
      <View />
      <MenuTrigger
        style={styles.container}
        customStyles={{
          TriggerTouchableComponent: TouchableWithoutFeedback,
        }}
      >
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
            marginLeft: -20,
          },
          optionText: {
            color: "white",
            fontSize: 16,
            fontFamily: "Poppins_400Regular",
          },
        }}
      >
        <Text className="font-poppins_bold text-white text-lg px-4 py-4">
          Sort by:
        </Text>
        <View className="flex flex-col items-start gap-2 px-6 py-3 bg-white rounded-lg">
          <MenuOption
            onSelect={() => {
              setOrderBy("Number");
              flatListRef.current?.scrollToOffset({
                animated: true,
                offset: 0,
              });
            }}
            customStyles={{
              optionText: { color: "black" },
              OptionTouchableComponent: TouchableWithoutFeedback,
            }}
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
            onSelect={() => {
              setOrderBy("Name");
              flatListRef.current?.scrollToOffset({
                animated: true,
                offset: 0,
              });
            }}
            customStyles={{
              optionText: { color: "black" },
              OptionTouchableComponent: TouchableWithoutFeedback,
            }}
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
  );
};

export default SortMenuComponent;

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
});
