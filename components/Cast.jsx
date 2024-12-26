import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import React from "react";
// import { useNavigation } from "@react-navigation/native";

export default function Cast({ cast, navigation }) {
  let personName = "Keanu Reevs";
  let CharacterName = "John Wick";
//   const navigation = useNavigation();
  return (
    <View className="my-6">
      <Text className="text-white text-lg mx-4 mb-5">Top Cast</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        {cast &&
          cast.map((person, index) => {
            return (
              <TouchableOpacity onPress={()=> navigation.navigate('Person',{ person: person })} key={index} className="mr-4 items-center">
                <View className="overflow-hidden rounded-full h-20 w-20 items-center border-neutral-500">
                  <Image
                    className="rounded-2xl h-24 w-20"
                    source={require("../assets/poster/avt.jpg")}
                  />
                </View>
                <Text className="text-white text-xs mt-1">
                  {CharacterName.length > 10
                    ? CharacterName.slice(0, 10) + "..."
                    : CharacterName}
                </Text>
                <Text className="text-neutral-400 text-xs mt-1">
                  {personName.length > 10
                    ? CharacterName.slice(0, 10) + "..."
                    : Person}
                </Text>
              </TouchableOpacity>
            );
          })}
      </ScrollView>
    </View>
  );
}
