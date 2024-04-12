import React from "react";
import { Link } from "expo-router";
import { View, Text, Pressable } from "react-native";
import { Image } from "expo-image";
import { StyleSheet } from "react-native";
import capitalize from "@utils/capitalize";

type ListItemProps = {
  item: CardProps;
};

const ListItem: React.FC<ListItemProps> = React.memo(({ item }) => {
  return (
    <View key={item.id} className="flex-1/3">
      <Link
        style={styles.elevation}
        className="shadow-2xl bg-white rounded-2xl flex items-center h-32 aspect-square justify-center flex-grow"
        href={
          {
            pathname: "/details/[id]",
            params: { id: item.id },
          } as any
        }
        asChild
      >
        <Pressable>
          <Text
            className="text-body1 self-end text-medium pr-4 font-poppins"
            style={{ includeFontPadding: false }}
          >
            {`#${item.id.toString().padStart(3, "0")}`}
          </Text>
          <Image
            source={{ uri: item.image }}
            style={{ width: 80, height: 80 }}
            cachePolicy="memory-disk"
          />
          <Text
            className="text-body2 text-dark font-poppins"
            style={{ includeFontPadding: false }}
          >
            {capitalize(item.name)}
          </Text>
          <View className="absolute bottom-0 w-full h-16 bg-background rounded-2xl rounded-t- z-[-1]"></View>
        </Pressable>
      </Link>
    </View>
  );
});

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
  },
});

export default ListItem;
