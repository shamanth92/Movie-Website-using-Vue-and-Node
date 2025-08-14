export default {
    popularTv(state) {
        return state.popularTv
    },
    tvDetails(state) {
        console.log(state.movieDetails)
        return state.tvDetails
    },
    tvCredits(state) {
        console.log(state.movieCredits)
        return state.tvCredits
    },
    topRatedTv(state) {
        console.log(state.topRatedTv)
        return state.topRatedTv
    },
    onTv(state) {
        console.log(state.onTv)
        return state.onTv
    },
    airingToday(state) {
        console.log(state.airingToday)
        return state.airingToday
    },
    tvVideos(state) {
        console.log(state.tvVideos)
        return state.tvVideos
    },
    tvEpisodesAndSeasons(state) {
        console.log(state.tvEpisodesAndSeasons)
        return state.tvEpisodesAndSeasons
    }
}