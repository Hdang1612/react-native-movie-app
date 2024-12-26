import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Platform,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { HeartIcon } from "react-native-heroicons/solid";
import { styles, theme } from "@/assets/theme";
import { useNavigation } from "expo-router";
import { useRoute } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import Loading from "../components/Loading";
import Cast from "../components/Cast";
import MovieList from "@/components/MovieList";
var { width, height } = Dimensions.get("window");
const ios = Platform.OS == "ios";
const topMargin = ios ? "mt-0" : "mt-3";
let movieName = " Ant-man ";
export default function MovieScreen({ route }) {
  const { movie } = route.params;
  const { params: item } = useRoute();
  const [isFavorite, setIsFavorite] = useState(false);
  const [cast, setCast] = useState([1, 2, 3, 4, 5]);
  const [similarMovie, SetSimilarMovie] = useState([1, 2, 3, 4, 5]);
  const navigation = useNavigation();
  const [loading, Setloading] = useState(false);

  useEffect(() => {}, [item]);
  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 20 }}
      className="flex-1 bg-neutral-800"
    >
      <View className="w-full">
        <SafeAreaView
          className={`bg-transparent relative px-4 z-20 w-full flex-row justify-between items-center ${topMargin}`}
        >
          <TouchableOpacity
            onPress={() => {
              console.log("Going back");
              navigation.goBack();
            }}
            style={styles.background}
            className="rounded-xl p-1"
          >
            <ChevronLeftIcon size="28" strokeWidth={2.5} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              console.log("press");
              setIsFavorite(!isFavorite);
            }}
          >
            <HeartIcon
              size="35"
              color={isFavorite ? theme.background : "white"}
            />
          </TouchableOpacity>
        </SafeAreaView>

        {loading ? (
          <Loading />
        ) : (
          <>
            <View>
              <Image
                source={require("../assets/poster/avt2.jpg")}
                style={{ width, height: height * 0.55 }}
              />
              <LinearGradient
                colors={[
                  "transparent",
                  "rgba(23,23,23,0.8",
                  "rgba(23,23,23,1)",
                ]}
                style={{ width, height: height * 0.1 }}
                start={{ x: 0.5, y: 0 }}
                end={{ x: 0.5, y: 1 }}
                className="absolute bottom-0"
              />
            </View>
            <View style={{ marginTop: -(height * 0.09) }} className="space-y-3">
              <Text className="text-white text-center text-3xl font-bold tracking-wider">
                {movieName}
              </Text>
              <Text className="text-neutral-400 font-semibold text-base text-center">
                Release - 2020 - 170 min
              </Text>
              <View className="flex-row justify-center mx-4 spacex-2">
                <Text className="text-neutral-400 font-semibold text base text-center">
                  Action -
                </Text>
                <Text className="text-neutral-400 font-semibold text base text-center">
                  Thrill -
                </Text>
                <Text className="text-neutral-400 font-semibold text base text-center">
                  Comedy
                </Text>
              </View>
              <Text className="text-neutral-400 mx-4 tracking-wide">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quas
                animi nesciunt, neque tempora libero laudantium maiores ad sint
                quam nostrum commodi ipsa ipsam explicabo esse sapiente in
                dolorem vero. Incidunt nesciunt deleniti at. Fugiat
                exercitationem unde error, tempore ab vitae.
              </Text>
            </View>
          </>
        )}
      </View>

      <Cast navigation={navigation} cast={cast} />

      <MovieList title="Similar Movies" hideSeeAll={true} data={similarMovie} />
    </ScrollView>
  );
}
