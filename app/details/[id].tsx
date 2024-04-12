import { useLocalSearchParams } from "expo-router";

import { Text, View, StyleSheet } from "react-native";

export default function Page() {
  const { id } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <Text style={{ color: "#fff" }}>Details Page {id}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // full screen and window
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
});
