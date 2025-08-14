import { APIKEY } from '../../../apiKey';

export default {
    async loadPopularTv(context, payload) {
        const response = await fetch(`https://api.themoviedb.org/3/tv/popular?api_key=${APIKEY}&language=en-US&page=${payload}`)
        if (!response.ok) {
            console.log('ok')
        }

        const responseData = await response.json()
        console.log('response: ', responseData)

        context.commit('setPopularTv', responseData)
    },
    async loadTvDetails(context, payload) {
        const response = await fetch(`https://api.themoviedb.org/3/tv/${payload}?api_key=${APIKEY}&language=en-US`)
        if (!response.ok) {
            console.log('ok')
        }

        const responseData = await response.json()
        console.log('response: ', responseData)

        context.commit('setTvDetails', responseData)
    },
    async loadTvCredits(context, payload) {
        const response = await fetch(`https://api.themoviedb.org/3/tv/${payload}/credits?api_key=${APIKEY}&language=en-US`)
        if (!response.ok) {
            console.log('ok')
        }

        const responseData = await response.json()
        console.log('response: ', responseData)

        context.commit('setTvCredits', responseData)
    },
    async loadTopRatedTv(context, payload) {
        const response = await fetch(`https://api.themoviedb.org/3/tv/top_rated?api_key=${APIKEY}&language=en-US&page=${payload}`)
        if (!response.ok) {
            console.log('ok')
        }

        const responseData = await response.json()
        console.log('response: ', responseData)

        context.commit('setTopRatedTv', responseData)
    },
    async loadOnTv(context) {
        const response = await fetch(`https://api.themoviedb.org/3/tv/on_the_air?api_key=${APIKEY}&language=en-US&page=1`)
        if (!response.ok) {
            console.log('ok')
        }

        const responseData = await response.json()
        console.log('response: ', responseData)

        context.commit('setOnTv', responseData)
    },
    async loadAiringToday(context, payload) {
        const response = await fetch(`https://api.themoviedb.org/3/tv/airing_today?api_key=${APIKEY}&language=en-US&page=${payload}`)
        if (!response.ok) {
            console.log('ok')
        }

        const responseData = await response.json()
        console.log('response: ', responseData)

        context.commit('setAiringToday', responseData)
    },
    async loadTvVideos(context, payload) {
        const response = await fetch(`https://api.themoviedb.org/3/tv/${payload}/videos?api_key=${APIKEY}&language=en-US`)
        if (!response.ok) {
            console.log('ok')
        }

        const responseData = await response.json()
        console.log('response: ', responseData)

        context.commit('setTvVideos', responseData)
    },
    async loadTvEpisodesAndSeasons(context, payload) {
        const response = await fetch(`https://api.themoviedb.org/3/tv/${payload.id}/season/${payload.num}?api_key=${APIKEY}&language=en-US`)
        if (!response.ok) {
            console.log('ok')
        }

        const responseData = await response.json()
        console.log('response: ', responseData)

        context.commit('setTvEpisodesAndSeasons', responseData)
    },
}