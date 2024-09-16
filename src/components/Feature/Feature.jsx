import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { getProducts } from "../../api1/ProductsAPI";
import ProductCard from "../Product/ProductCard";
export default function Feature({}) {
  const [shops, setShops] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const result = await getProducts();
        setShops(result);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProducts();
  }, []);

  const navigation = useNavigation();
  return (
    <View className="space-y-4">
      {shops &&
        shops.map((shopItem) => {
          return (
            <View key={shopItem.shopId} className="space-y-2">
              <View className="flex justify-between flex-row items-center">
                <Text className="text-xl font-semibold">
                  {shopItem.shopName}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("AllFeatureProduct", {
                      products: shopItem,
                      title: shopItem.shopName,
                    });
                  }}
                >
                  <Text className="text-[#539645] font-semibold">See All</Text>
                </TouchableOpacity>
              </View>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                className="flex flex-row space-x-4"
              >
                {shopItem.products &&
                  shopItem.products.map((productItem) => {
                    return (
                      <View key={productItem._id}>
                        <ProductCard productItem={productItem} />
                      </View>
                    );
                  })}
              </ScrollView>
            </View>
          );
        })}
    </View>
  );
}