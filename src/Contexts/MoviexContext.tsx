import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useCallback, useEffect, useState } from "react";

type Movie = {
    id: number;
    title: string;
    poster_path: string;
    runtime: string;
    release_date: string;
    vote_average: number;
};

type MovieContextData = {
    favoriteMovie: number[];
    allFavoriteMovie: Movie[];
    addFavoritesMovies: (movieId: number) => void
    removeFavoritesMovies: (movieId: number) => void
};

export const MovieContext = createContext<MovieContextData>(
    {
        favoriteMovie: [],
        allFavoriteMovie: [],
        addFavoritesMovies: () => {},
        removeFavoritesMovies: () => {}
    });

type MovieProviderProps = {
    children: React.ReactNode;
}

export function MovieProvider ({children}: MovieProviderProps){
    const [favoriteMovie, setFavoriteMovie] = useState<number []>([]);
    const [allFavoriteMovie, setAllFavoriteMovie] = useState<Movie []>([]);

    useEffect(() => {
        async function loadingFavoriteMovies(){
            const favoriteMovie = await AsyncStorage.getItem('favoriteMovies');
    
            if(favoriteMovie){
                setFavoriteMovie(JSON.parse(favoriteMovie));
            }
        }
        loadingFavoriteMovies();
    }, [])

    const addFavoritesMovies = useCallback(async (movieId: number) => {
        if(!favoriteMovie.includes(movieId)){
            const newFavoriteMovie = [...favoriteMovie, movieId];
            setFavoriteMovie(newFavoriteMovie);
            await AsyncStorage.setItem('@favoriteMovies', JSON.stringify(newFavoriteMovie));
        }
    },[favoriteMovie]);

    const removeFavoritesMovies = useCallback(async (movieId: number) => {
        const newFavoriteMovie = favoriteMovie.filter(id => id !== movieId);
        setFavoriteMovie(newFavoriteMovie);
        await AsyncStorage.setItem('@favoriteMovies', JSON.stringify(newFavoriteMovie));
    },[favoriteMovie]);

    const contextData: MovieContextData ={
        favoriteMovie,
        allFavoriteMovie,
        addFavoritesMovies,
        removeFavoritesMovies
    };

    return(
        <MovieContext.Provider value={contextData}>
            {children}
        </MovieContext.Provider>
    )
}