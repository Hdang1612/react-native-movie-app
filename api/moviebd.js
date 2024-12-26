import axios from "axios";
import { apiKey } from "../constants/env"; 

const baseUrl = `https://api.themoviedb.org/3`
const trendingMoviesEndpoint = `${baseUrl}/trending/movie/day?api_key=${apiKey}`
const upComingMoviesEndpoint = `${baseUrl}/movie/upcoming?api_key=${apiKey}`
const topRateMoviesEndpoint = `${baseUrl}/movie/top_rated?api_key=${apiKey}`

const movieDetailEndpoint = id => `${baseUrl}/movie/${id}?api_key=${apiKey}`
const movieCreditEndpoint = id => `${baseUrl}/movie/${id}/credits?api_key=${apiKey}`
const movieSimilarEndpoint = id => `${baseUrl}/movie/${id}/similar?api_key=${apiKey}`

const searchMovieEndpoint = `${baseUrl}/search/movie?api_key=${apiKey}`

const personDetailEndpoint = id => `${baseUrl}/person/${id}?api_key=${apiKey}`
const personMovieEndpoin = id => `${baseUrl}/person/${id}/movie_credits?api_key=${apiKey}`

export const image500= path => path? `https://image.tmdb.org/t/p/w500${path}`:null;
export const image342= path => path? `https://image.tmdb.org/t/p/w342${path}`:null;
export const image185= path => path? `https://image.tmdb.org/t/p/w185${path}`:null;

// export const 
const apiCall = async (url,params) => {
    const option ={
        method: 'GET',
        url: url,
        params : params? params : {}
    }
    try {
        const res=  await axios.request(option)
        return res.data
    } catch (error) {
        console.log('error:',error)
        return {}
    }
}

export const fetchTrendingMovies = () => {
    return apiCall(trendingMoviesEndpoint)
}
export const fetchUpComingMovies = () => {
    return apiCall(upComingMoviesEndpoint)
}
export const fetchTopRateMovies = () => {
    return apiCall(topRateMoviesEndpoint)
}

export const fetchMovieDetail = id => {
    return apiCall(movieDetailEndpoint(id))
}
export const fetchMovieCredit = id => {
    return apiCall(movieCreditEndpoint(id))
}
export const fetchMovieSimilar = id => {
    return apiCall(movieSimilarEndpoint(id))
}
export const fetchPersonDetail = id => {
    return apiCall(personDetailEndpoint(id))
}
export const fetchPersonMovie = id => {
    return apiCall(personMovieEndpoin(id))
}
export const searchMovies = params => {
    return apiCall(searchMovieEndpoint,params)
}