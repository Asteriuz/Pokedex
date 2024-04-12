import { Link } from "expo-router";
import React, { memo } from "react";
import { View, Text, Image, Pressable } from "react-native";
// import styles
import { StyleSheet } from "react-native";

function Card(props: { id: number; name: string; image: string }) {
  return (
    <Link
      style={styles.elevation}
      className="shadow-2xl bg-white rounded-2xl flex items-center h-32 aspect-square justify-center flex-grow"
      href={
        {
          pathname: "/details/[id]",
          params: { id: props.id },
        } as any
      }
      asChild
    >
      <Pressable>
        <Text
          className="text-body1 self-end text-medium pr-4 font-poppins"
          style={{ includeFontPadding: false }}
        >
          {`#${props.id.toString().padStart(3, "0")}`}
        </Text>
        <Image source={{ uri: props.image }} className="w-20 h-20" />
        <Text
          className="text-body2 text-dark font-poppins"
          style={{ includeFontPadding: false }}
        >
          {props.name.charAt(0).toUpperCase() + props.name.slice(1)}
        </Text>
        <View className="absolute bottom-0 w-full h-16 bg-background rounded-2xl rounded-t- z-[-1]"></View>
      </Pressable>
    </Link>
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
  },
});

export default memo(Card);
