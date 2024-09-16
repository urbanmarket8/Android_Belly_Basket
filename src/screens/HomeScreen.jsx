import React from "react";
import { ScrollView } from "react-native";
import BestSeller from "../components/BestSeller/BestSeller";
import Brand from "../components/Brand/Brand";
import BrandFocus from "../components/BrandInFocus/BrandFocus";
import Category from "../components/Category/Category";
import Feature from "../components/Feature/Feature";
import Header from "../components/Header/Header";
import ImageCarousal from "../components/ImageCarousal/ImageCarousal";
import ShopByStore from "../components/ShopByStore.js/ShopByStore";

export default function HomeScreen({ navigation }) {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      className="py-2 px-3 bg-white mt-10"
    >
      <Header />
      <BestSeller />
      <ImageCarousal />
      <Category />
      <BrandFocus />
      <Feature />
      <ShopByStore />
      <Brand />
      
    </ScrollView>
  );
}
