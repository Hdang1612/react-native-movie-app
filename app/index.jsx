import {
  View,
  Text,
  Platform,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import {
  Bars3CenterLeftIcon,
  MagnifyingGlassIcon,
} from "react-native-heroicons/outline";
import { styles } from "../assets/theme";
import TrendingMovies from "../components/trendingMovies";
import Loading from "../components/Loading";
import MovieList from "../components/MovieList";
import { useNavigation } from "@react-navigation/native";
const ios = Platform.OS == "ios";
export default function HomeScreen() {
  const [trending, setTrending] = useState([1, 2, 3]);
  const [upComing, setUpComing] = useState([1, 2, 3]);
  const [topRate, setTopRate] = useState([1, 2, 3]);
  const [loading, Setloading] = useState(false);
  const navigation = useNavigation();
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
          <TrendingMovies data={trending} />
          <MovieList title="Upcoming" data={upComing} />
          <MovieList title="Top Rated" data={topRate} />
        </ScrollView>
      )}
    </SafeAreaView>
  );
}
