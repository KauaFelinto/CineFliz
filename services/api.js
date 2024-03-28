import axios from 'axios';

export const Api = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    params: {
        api_key: '93f19f0c87ca5770f121eb4de4c8ddff',
        language: 'pt-BR'
    }
})