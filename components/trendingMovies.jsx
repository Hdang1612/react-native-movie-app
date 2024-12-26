import {
  View,
  Text,
  TouchableWithoutFeedback,
  Image,
  Dimensions,
} from "react-native";
// import Carousel from 'react-native-snap-carousel';
import React from "react";
import Carousel from "react-native-reanimated-carousel";
import { useNavigation } from "@react-navigation/native";

var { width, height } = Dimensions.get("window");

export default function TrendingMovies({ data }) {
    const navigation=useNavigation()
    const handleClick = (item)=> {
      navigation.navigate("Movie", { movie: item })
    }
  return (
    <View className="mb-9">
      <Text className="text-white text-xl mx-4 mb-5">Trending</Text>
      <Carousel
        data={data}
        renderItem={({ item }) => <MovieCard item={item} handleClick={handleClick} />}
        width={width} // Chiều rộng của carousel
        height={height*0.4} // Chiều cao của từng item
        style={{ display: "flex", alignItems: "center" }}
        mode="parallax" 
        loop 
        scrollAnimationDuration={1000} 
        pagingEnabled={true} 
        // autoPlay={true} 
        // autoPlayInterval={3000} 
      />
      
    </View>
  );
}

const MovieCard = ({ item,handleClick }) => {
  return (
    <TouchableWithoutFeedback onPress={() => handleClick(item)}>
      <Image
        source={require("../assets/poster/1.jpg")}
        style={{ width: width + 0.6, height: height*0.4 }}
        className="rounded-3xl"
      />
    </TouchableWithoutFeedback>
  );
};
