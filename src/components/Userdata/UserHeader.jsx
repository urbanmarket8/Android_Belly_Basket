import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

export default function UserHeader() {
  const { firstName, lastName, email, username } = useSelector((state) => state.user);

  return (
    <View className="flex justify-start items-center flex-row ml-2">
      <View style={styles.container}>
        <Image
          source={{ uri: "https://i.postimg.cc/D0BvgPWG/download.webp" }}
          style={styles.avatar}
          resizeMode="cover"
        />
      </View>
      <View className="flex ml-5">
        <Text className="text-[#4C5058] font-bold text-[23px]">
          {capitalizeFirstLetter(firstName)} {capitalizeFirstLetter(lastName)}
        </Text>
        <Text className="text-[#4C5058] font-medium text-[15px]">
          {email}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 100,
    height: 100,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    backgroundColor: "#FFC6AE",
  },
  avatar: {
    width: 90,
    height: 90,
  },
});
