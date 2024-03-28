import { ActivityIndicator, Image, Share, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { Api } from '../../../services/api';
import axios from 'axios';
import { BookmarkSimple, CalendarBlank, CaretLeft, Clock, Play, Screencast, ShareFat, Star } from 'phosphor-react-native';

type MovieDetails ={
    id: number;
    title: string;
    overview: string;
    poster_path: string;
    backdrop_path: string;
    runtime: string;
    release_date: string;
    vote_average: number;   
}

type RouteProps ={
    movieId: number;
}

export function Details (){

    const [movieDetails, setMovieDetails] = useState<MovieDetails | null>(null);
    const [loading, setLoading] = useState(false);
    const route = useRoute();
    const { movieId } = route.params as RouteProps; 

    useEffect(() =>{
        const fetchMovieDetails = async () =>{
            try {
                setLoading(true);
                const response = await Api.get(`/movie/${movieId}`);
                setMovieDetails(response.data);
                setLoading(false);
            } catch (error) {
                console.log(error);
                setLoading(false)
            }
        };
        fetchMovieDetails();
    }, [movieId])

    function getYear(data: string){
        const ano = new Date(data).getFullYear();
        return ano;
    }

    const navigation = useNavigation();

    return(
        <View style={styles.container}>

            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <CaretLeft color='#fff' size={25} weight='thin'/>
                </TouchableOpacity>
                <Text style={styles.headerText}>Detalhes</Text>
                <TouchableOpacity>
                    <BookmarkSimple color='#fff' size={25} weight='thin' />
                </TouchableOpacity>
            </View>

            {loading && <ActivityIndicator size={25} color='red' />}
            {!loading && <>
                <View>
                <Image source={{uri: `https://image.tmdb.org/t/p/w500${movieDetails?.backdrop_path}`}}
                style={styles.detailsImage} />

                <Image source={{uri: `https://image.tmdb.org/t/p/w500${movieDetails?.poster_path}`}}
                style={styles.detailsPosterImage} />

                <Text style={styles.titleMovie}>{movieDetails?.title}</Text>
                <View style={styles.description}>
                    <View style={styles.descriptionGroup}>
                        <CalendarBlank color='#fff' size={25} weight='thin' />
                        <Text style={styles.descriptionText}>
                            {getYear(movieDetails?.release_date)}
                        </Text>
                    </View>
                    <View style={styles.descriptionGroup}>
                        <Clock color='#fff' size={25} weight='thin' />
                        <Text style={styles.descriptionText}>
                            {`${movieDetails?.runtime} minutos`}
                        </Text>
                    </View>

                    <View style={styles.descriptionGroup}>
                        <Star color={
                            movieDetails?.vote_average.toFixed(2) >= '7' ? '#ff8700' : '#fff'
                        } 
                        size={25} 
                        weight={
                            movieDetails?.vote_average.toFixed(2) >= '7' ? "duotone" : "thin"
                        } />
                        <Text style={[
                            movieDetails?.vote_average.toFixed(2) >= '7' ? styles.descriptionText1 : styles.descriptionText
                        ]}>
                            {movieDetails?.vote_average.toFixed(1)}
                        </Text>
                    </View>
                </View>

            </View>
            <View style={styles.about}>
                <Text style={styles.aboutText}>Sinopse:</Text>
                <Text style={styles.aboutText}>{movieDetails?.overview}</Text>
            </View>

            <View style={styles.playMovie}>
                <TouchableOpacity style={styles.playBtn}>
                    <Text style={{color:'#fff'}}>Assistir</Text>
                    <Play color='#fff' size={25} weight='thin' />
                </TouchableOpacity>
                <TouchableOpacity style={styles.playBtn}>
                    <Text style={{color:'#fff'}}>ScreenCast </Text>
                    <Screencast color='#fff' size={25} weight='thin' />
                </TouchableOpacity>
                <TouchableOpacity style={styles.playBtn}>
                    <Text style={{color:'#fff'}}>Compartilhar </Text>
                    <ShareFat color='#fff' size={25} weight='thin' />
                </TouchableOpacity>
            </View>
            </>}

        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#171717'
    },
    header:{
        paddingTop:40,
        height:100,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-around'
    },
    headerText:{
        color:'#fff',
        fontWeight:'700',
        fontSize:18
    },
    detailsImage:{
        position:'absolute',
        width:'100%',
        height:210
    },
    detailsPosterImage:{
        width:100,
        height:160,
        borderRadius:16,
        left:29,
        right:251,
        top:140
    },
    titleMovie:{
        position:'absolute',
        height:50,
        left:140,
        right:32,
        top:240,
        color:'#fff',
        fontSize:18,
        lineHeight:27,
        fontWeight:'700'
    },
    description:{
        width:'100%',
        alignItems:'center',
        flexDirection:'row',
        justifyContent:'center',
        marginTop:170
    },
    descriptionGroup:{
        flexDirection:'row',
        alignItems:'center',
        gap:2
    },
    descriptionText:{
        marginRight:10,
        color:'#fff'
    },
    descriptionText1:{
        marginRight:10,
        color:'#ff8700'
    },
    about:{
        padding:20
    },
    aboutText:{
        color:'#fff',
        textAlign:'justify'
    },
    playMovie:{
        marginTop:15,
        left:80
    },
    playBtn:{
        width:250,
        height:40,
        backgroundColor:'#9e1c1c',
        borderRadius:15,
        alignItems:'center',
        flexDirection:'row',
        padding:10,
        justifyContent:'center',
        marginTop:10
    }
});