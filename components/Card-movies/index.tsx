import { Image, Pressable } from "react-native";
import {styles} from './styles';

interface Movie{
    id: number;
    poster_path: string;
}

interface props{
    data: Movie;
    onPress?: () => void
}

export function CardMovies({data, ...rest}:props){
    return(
        <Pressable {...rest} style={styles.cardMovie}>
            <Image source={{uri: `https:/image.tmdb.org/t/p/w500${data.poster_path}`}}
            style={styles.cardImage} />
        </Pressable>
    )
}