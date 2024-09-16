import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
// import Icon from "react-native-vector-icons/FontAwesome";
import Icon from "react-native-vector-icons/Entypo";
import SearchBar from "./SearchBar";
export default function Header() {
  const navigation = useNavigation();
  return (
    <View className="w-[100%]">
      <View className="w-full flex flex-row justify-between items-center">
        <View className="flex flex-col space-y-1 mb-2">
          <Text className="text-xl font-semibold text-[#575555]">Delivery in Sometimes</Text>
          <Text className="text-[#575555]">Your address will show here</Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("UserScreen", {});
          }}
        >
          <Text>
            <Icon name="user" size={22} color="#575555" />
          </Text>
        </TouchableOpacity>
      </View>
      <SearchBar />
    </View>
  );
}
