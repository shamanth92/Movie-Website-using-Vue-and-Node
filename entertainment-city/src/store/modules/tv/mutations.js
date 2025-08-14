export default {
    setPopularTv(state, payload) {
        console.log('payload: ', payload)
        state.popularTv = payload.results
    },
    setTvDetails(state, payload) {
        console.log('payload: ', payload)
        state.tvDetails = payload
    },
    setTvCredits(state, payload) {
        state.tvCredits = payload
    },
    setTopRatedTv(state, payload) {
        state.topRatedTv = payload.results
    },
    setOnTv(state, payload) {
        state.onTv = payload.results
    },
    setAiringToday(state, payload) {
        state.airingToday = payload.results
    },
    setTvVideos(state, payload) {
        state.tvVideos = payload.results
    },
    setTvEpisodesAndSeasons(state, payload) {
        state.tvEpisodesAndSeasons = payload.episodes
    }
}