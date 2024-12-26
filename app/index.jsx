import {
  View,
  Text,
  Platform,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import {
  Bars3CenterLeftIcon,
  MagnifyingGlassIcon,
} from "react-native-heroicons/outline";
import { styles } from "../assets/theme";
import TrendingMovies from "../components/trendingMovies";
import Loading from "../components/Loading";
import {fetchTrendingMovies,fetchUpComingMovies,fetchTopRateMovies} from "../api/moviebd";
import MovieList from "../components/MovieList";
import { useNavigation } from "@react-navigation/native";
const ios = Platform.OS == "ios";
export default function HomeScreen() {
  const [trending, setTrending] = useState([]);
  const [upComing, setUpComing] = useState([]);
  const [topRate, setTopRate] = useState([]);
  const [loading, Setloading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    getTrendingMovies();
    getUpComingMovies();
    getTopRateMovies();
  }, []);

  const getTrendingMovies = async () => {
    const data = await fetchTrendingMovies();
    // console.log("get : ", data);
    if(data && data.results) setTrending(data.results)
    Setloading(false)
  };
  const getUpComingMovies = async () => {
    const data = await fetchUpComingMovies();
    // console.log("up coming : ", data);
    if(data && data.results) setUpComing(data.results)
    // Setloading(false)
  };
  const getTopRateMovies = async () => {
    const data = await fetchTopRateMovies();
    // console.log("top rated : ", data);
    if(data && data.results) setTopRate(data.results)
    // Setloading(false)
  };

  return (
    <SafeAreaView className="flex-1 bg-neutral-800">
      <SafeAreaView className={ios ? "mb-0" : "mb-3"}>
        <StatusBar style="light" />
        <View className="flex-row justify-between items-center mx-4">
          <Bars3CenterLeftIcon size="30" strokeWidth={2} color="white" />
          <Text className="text-white text-3xl font-bold">
            <Text style={styles.text}>M</Text>ovies
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Search")}>
            <MagnifyingGlassIcon size="30" strokeWidth={2} color="white" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      {loading ? (
        <Loading />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 10 }}
        >
          {trending.length >0 &&  <TrendingMovies data={trending} />}
          <MovieList title="Upcoming" data={upComing} />
          <MovieList title="Top Rated" data={topRate} />
        </ScrollView>
      )}
    </SafeAreaView>
  );
}
