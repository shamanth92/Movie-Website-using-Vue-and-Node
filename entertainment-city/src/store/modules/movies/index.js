import mutations from './mutations.js'
import actions from './actions.js'
import getters from './getters.js'

export default {
    namespaced: true,
    state() {
        return {
            popularMovies: [],
            nowPlaying: [],
            videos: [],
            movieDetails: [],
            movieCredits: [],
            topRatedMovies: [],
            upcomingMovies: [], 
            likedMovies: [],
            watchlistMovies: [],
            likedTv: [],
            watchlistTv: [],
            searchedMovies: [],
            movieVideos: [],
            movieReviews: []
        }
    },
    mutations,
    actions,
    getters
}