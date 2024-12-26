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
// import fetchTrendingMovies from "../api/moviebd";
import Loading from "../components/Loading";
import Cast from "../components/Cast";
import MovieList from "@/components/MovieList";
import {
  fetchMovieCredit,
  fetchMovieDetail,
  fetchMovieSimilar,
  image500,
} from "@/api/moviebd";
var { width, height } = Dimensions.get("window");
const ios = Platform.OS == "ios";
const topMargin = ios ? "mt-0" : "mt-3";
let movieName = " Ant-man ";
export default function MovieScreen({ route }) {
  const { movie } = route.params;
  const { params: item } = useRoute();
  const [isFavorite, setIsFavorite] = useState(false);
  const [cast, setCast] = useState([]);
  const [similarMovie, SetSimilarMovie] = useState([]);
  const navigation = useNavigation();
  const [loading, Setloading] = useState(false);
  const [movieDetail, setMovieDetail] = useState({});
  useEffect(() => {
    Setloading(true);
    getMovieDetail(movie.id);
    getMovieCredits(movie.id);
    getSimilarMovie(movie.id);
  }, [item]);

  const getMovieDetail = async (id) => {
    const data = await fetchMovieDetail(id);
    if (data) setMovieDetail(data);
    Setloading(false);
  };
  const getMovieCredits = async (id) => {
    const data = await fetchMovieCredit(id);
    if (data && data.cast) setCast(data.cast);
  };

  const getSimilarMovie = async (id) => {
    const data = await fetchMovieSimilar(id);
    if (data && data.results) SetSimilarMovie(data.results);
  };

  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 20 }}
      className="flex-1 bg-neutral-900"
    >
      <View className="w-full">
        <SafeAreaView
          className={`bg-transparent absolute px-4 z-20 w-full flex-row justify-between items-center ${topMargin}`}
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
            <View style={{ position: "relative" }}>
              <Image
                // source={require("../assets/poster/avt2.jpg")}
                source={{ uri: image500(movieDetail?.poster_path) }}
                style={{ width, height: height * 0.6 }}
              />
              <LinearGradient
                colors={[
                  "transparent",
                  "rgba(23,23,23,0.8)",
                  "rgba(23,23,23,1)",
                ]}
                style={{
                  width,
                  height: height * 0.4,
                  position: "absolute",
                  bottom: 0,
                }}
                start={{ x: 0.5, y: 0 }}
                end={{ x: 0.5, y: 1 }}
              />
            </View>
          </>
        )}
        <View style={{ marginTop: -(height * 0.09) }} className="space-y-3">
          <Text className="text-white text-center text-3xl font-bold tracking-wider mb-2">
            {movieDetail.title}
          </Text>
          {movieDetail?.id ? (
            <Text className="text-neutral-400 font-semibold text-base text-center mb-2">
              {movieDetail?.status} - {movieDetail?.release_date?.split("-")[0]}{" "}
              - {movieDetail.runtime} min
            </Text>
          ) : null}

          <View className="flex-row justify-center mx-4 spacex-2 mb-2">
            {movieDetail?.genres?.map((genre, index) => {
              let showDot = index + 1 != movieDetail.genres.length;
              return (
                <Text
                  key={index}
                  className="text-neutral-400 font-semibold text base text-center"
                >
                  {genre?.name} {showDot ? "-" : null}
                </Text>
              );
            })}
          </View>

          <Text className="text-neutral-400 mx-2 tracking-wide">
            {movieDetail?.overview}
          </Text>
        </View>
      </View>

      <Cast navigation={navigation} cast={cast} />

      <MovieList title="Similar Movies" hideSeeAll={true} data={similarMovie} />
    </ScrollView>
  );
}
