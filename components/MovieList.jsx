import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
  Dimensions,
} from "react-native";
import React from "react";
import { styles } from "../assets/theme";
import { ScrollView } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
var { width, height } = Dimensions.get("window");
export default function MovieList({ title, data, hideSeeALl }) {
  let movieName = " Ant-man ";
  const navigation = useNavigation();
  return (
    <View className=" mb-8 space-y-8">
      <View className="mx-4 flex-row mb-4 justify-between items-center">
        <Text className="text-white text-xl">{title}</Text>
        {hideSeeALl==false && (
          <TouchableOpacity>
            <Text style={styles.text} className="text-lg">
              See All
            </Text>
          </TouchableOpacity>
        )}
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 15,
        }}
      >
        {data.map((item, index) => {
          return (
            <TouchableWithoutFeedback
              key={index}
              onPress={() => {
                // console.log('press')
                navigation.navigate("Movie", { movie: item });
              }}
            >
              <View className="space-y-1 mr-4">
                <Image
                  source={require("../assets/poster/avt.jpg")}
                  className="rounded-3xl"
                  style={{ width: width * 0.33, height: height * 0.22 }}
                />
                <Text className="text-white ml-1">
                  {movieName.length > 14
                    ? movieName.slice(0, 14) + "..."
                    : movieName}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          );
        })}
      </ScrollView>
    </View>
  );
}
