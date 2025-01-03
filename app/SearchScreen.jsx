import {
  View,
  Text,
  Dimensions,
  Platform,
  TextInput,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
  Image,
} from "react-native";
import React, { useCallback, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { XMarkIcon } from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";
import Loading from "../components/Loading";
import {debounce} from 'lodash';
import { image185, searchMovies } from "@/api/moviebd";
var { width, height } = Dimensions.get("window");
const ios = Platform.OS == "ios";
let movieName = "Aquaman";
export default function SearchScreen() {
  const navigation = useNavigation();
  const [results, setResults] = useState([1, 2, 3, 4]);
  const [loading, Setloading] = useState(false);
  const handleSearch = value => {
    if (value && value.length>2) {
        Setloading(true)
        searchMovies({
            query: value,
            include_adult:'false',
            language:'en-US',
            page:'1'
        }).then(data=>{
            Setloading(false)
            if(data && data.results) setResults(data.results)
        })
    }
    else {
        Setloading(false);
        setResults([])
    }
  }

  const handleTextDebounce = useCallback(debounce(handleSearch,400),[])
  return (
    <SafeAreaView className="bg-neutral-800 flex-1">
      <View className="mx-4 mb-3 flex-row justify-between items-center border border-neutral-500 rounded-full">
        <TextInput
        onChangeText={handleTextDebounce}
          placeholder="Search Movie2"
          placeholderTextColor={"lightgray"}
          className="pb-1 pl-6 flex-1 text-base font-semibold text-white tracking-wider"
        />
        <TouchableOpacity
          onPress={() => navigation.navigate("Home")}
          className="rounded-full p-3 m-1 bg-neutral-500"
        >
          <XMarkIcon size="25" color="white" />
        </TouchableOpacity>
      </View>

      {loading ? (
        <Loading />
      ) : results.length > 0 ? (
        <ScrollView
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 15 }}
          className=" space-y-3"
        >
          <Text className="text-white font-semibold ml-1 mb-3">
            Results ({results.length})
          </Text>
          <View className="flex-row justify-between flex-wrap">
            {results.map((item, index) => {
              return (
                <TouchableWithoutFeedback
                  key={index}
                  onPress={() => navigation.push("Movie", {movie:item})}
                >
                  <View className="space-y-2 mb-4">
                    <Image
                    source={{uri:image185(item?.poster_path)}}
                      className="rounded-3xl"
                      style={{ width: width * 0.44, height: height * 0.3 }}
                    />
                    <Text className="text-neutral-300 ml-1">
                      {item?.title?.length > 22
                        ? item?.title?.slice(0, 22) + "..."
                        : item?.title}
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
              );
            })}
          </View>
        </ScrollView>
      ) : (
        <View className="flex-row justify-center">
          <Image
            source={require("../assets/poster/2.jpg")}
            className="h-96 w-96"
          />
        </View>
      )}
    </SafeAreaView>
  );
}
