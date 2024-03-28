import { ActivityIndicator, FlatList, Text, TextInput, View } from 'react-native';
import {styles} from './styles';
import {MagnifyingGlass} from 'phosphor-react-native';
import { useEffect, useState } from 'react';
import { Api } from '../../../services/api';
import { CardMovies } from '../../../components/Card-movies';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

interface Movie{
    id: number;
    title: string;
    poster_path: string;
    overview: string;
}

export function Search(){

    const [discoveryMovies, setDiscoveryMovies] = useState<Movie[]>([]);
    const [searchResult, setSearchResult] = useState<Movie[]>([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [noResult, setNoResult] = useState(false);
    const [search, setSearch] = useState('');

    const loadMoreData = async () =>{
        setLoading(true);
        const response = await Api.get('/movie/popular',{
            params:{
                page,
            }
        });
        setDiscoveryMovies([...discoveryMovies, ...response.data.results]);
        setPage(page+1);
        setLoading(false);
    }

    const searchMovie = async (query:string) =>{
        setLoading(true);
        const response = await Api.get('/search/movie',{
            params:{
                query,
            }
        });

        if(response.data.results.length === 0){
            setNoResult(true);
        } else{
            setSearchResult(response.data.results);
        }
        setLoading(false);
    }

    const handleSearch = (text:string) =>{
        setSearch(text);
        if(text.length > 2){
            searchMovie(text);
        } else{
            setSearchResult([]);
        }
    }

    const navigation = useNavigation(); 

    const renderMovieItem = ({ item }: { item: Movie }) => (
        <CardMovies data={item} onPress={() => navigation.navigate("Details", {movieId: item.id})} />
    )

    const movieData = search.length > 2 ? searchResult : discoveryMovies;
    
    useEffect(() => {
        loadMoreData();
    }, []);

    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>CINEFLIZ</Text>
                <View style={styles.containerInput}>
                    <TextInput style={styles.input} placeholder='Buscar' placeholderTextColor={'#fff'} value={search} onChangeText={handleSearch} />
                    <MagnifyingGlass color='#fff' size={25} weight='light'/>
                </View>
            </View>

            <View>
                <FlatList
                    data={movieData}
                    numColumns={3}
                    renderItem={renderMovieItem}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                        padding:35, paddingBottom:100
                    }}
                    onEndReached={() => loadMoreData()}
                    onEndReachedThreshold={0.5}
                />
                {loading && <ActivityIndicator size={50} color={'#0296e5'}/>}
            </View>
        </View>
    )
}