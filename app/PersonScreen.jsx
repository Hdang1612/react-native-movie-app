import {
  View,
  Text,
  Dimensions,
  Platform,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { HeartIcon } from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";
import { styles } from "@/assets/theme";
import { SafeAreaView } from "react-native-safe-area-context";
import Loading from "../components/Loading";
import MovieList from "@/components/MovieList";
import { fetchPersonDetail, fetchPersonMovie, image342 } from "@/api/moviebd";

var { width, height } = Dimensions.get("window");
const ios = Platform.OS == "ios";
const verticalMargin = ios ? "" : "my-3";
export default function PersonScreen({ route }) {
  const { person } = route.params;
  const navigation = useNavigation();
  const [isFavorite, setIsFavorite] = useState(false);
  const [personMovies, setPersionMovies] = useState([]);
  const [personDetail, setPersonDetail] = useState({});
  const [loading, Setloading] = useState(false);

  useEffect(() => {
    Setloading(true);
    getPersonDetail(person.id);
    getPersonMovies(person.id)
  }, [person]);

  const getPersonDetail = async (id) => {
    const data = await fetchPersonDetail(id);
    if (data) setPersonDetail(data);
    Setloading(false);
  };
  const getPersonMovies = async (id) => {
    const data = await fetchPersonMovie(id);
    if (data && data.cast) setPersionMovies(data.cast);
    Setloading(false);
  };

  return (
    <ScrollView
      className="flex-1 bg-neutral-900"
      contentContainerStyle={{ paddingBottom: 20 }}
    >
      <SafeAreaView
        className={` px-4 z-20 w-full flex-row justify-between items-center ${verticalMargin}`}
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
          <HeartIcon size="35" color={isFavorite ? "red" : "white"} />
        </TouchableOpacity>
      </SafeAreaView>

      {loading ? (
        <Loading />
      ) : (
        <View>
          <View
            className="flex-row justify-center"
            style={{
              shadowColor: "gray",
              shadowRadius: 40,
              shadowOffset: { width: 0, height: 5 },
              shadowOpacity: 1,
            }}
          >
            <View className="flex justify-center items-center rounded-full overflow-hidden h-72 w-72 border-2 border-neutral-500">
              <Image
                source={{ uri: image342(personDetail?.profile_path) }}
                style={{ height: height * 0.42, width: width * 0.74 }}
              />
            </View>
          </View>
          <View className="mt-6">
            <Text className="text-3xl text-white font-bold text-center">
              {personDetail?.name}
            </Text>
            <Text className="text-base text-neutral-500 text-center">
              {personDetail?.place_of_birth}
            </Text>
          </View>
          <View className="mx-3 p-4 mt-6 flex-row justify-between items-center bg-neutral-700 rounded-full">
            <View className="border-r-2 border-r-neutral-400 px-2 items-center">
              <Text className="text-white font-semibold">Gender</Text>
              <Text className="text-neutral-300 text-sm">{personDetail?.gender ==1?"Female":"Male"}</Text>
            </View>
            <View className="border-r-2 border-r-neutral-400 px-2 items-center">
              <Text className="text-white font-semibold">Birthday</Text>
              <Text className="text-neutral-300 text-sm">{personDetail?.birthday}</Text>
            </View>
            <View className="border-r-2 border-r-neutral-400 px-2 items-center">
              <Text className="text-white font-semibold">Known for</Text>
              <Text className="text-neutral-300 text-sm">{personDetail?.known_for_department}</Text>
            </View>
            <View className=" px-2 items-center">
              <Text className="text-white font-semibold">Popularity</Text>
              <Text className="text-neutral-300 text-sm">{personDetail?.popularity?.toFixed(2)}%</Text>
            </View>
          </View>
          <View className="my-6 mx-4 space-y-2 ">
            <Text className="text-white text-xl mb-2">Biography</Text>
            <Text className="text-neutral-400 tracking-wide">
              {
                personDetail?.biography || 'N/A'
              }
            </Text>
          </View>
          <MovieList title={"Movies"} data={personMovies} />
        </View>
      )}
    </ScrollView>
  );
}
