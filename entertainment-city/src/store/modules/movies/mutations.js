export default {
    setPopularMovies(state, payload) {
        console.log('payload: ', payload)
        state.popularMovies = payload.results
    },
    setNowPlaying(state, payload) {
        console.log('payload: ', payload)
        state.nowPlaying = payload.results
    },
    setVideos(state, payload) {
        console.log('payload: ', payload)
        state.videos = payload.results
    },
    setMovieDetails(state, payload) {
        console.log('payload: ', payload)
        state.movieDetails = payload
    },
    setMovieCredits(state, payload) {
        state.movieCredits = payload
    },
    setTopRatedMovies(state, payload) {
        state.topRatedMovies = payload.results
    },
    setUpcomingMovies(state, payload) {
        state.upcomingMovies = payload.results
    },
    setLikedMovies(state, payload) {
        payload.forEach(movie => {
            if (state.likedMovies.filter((m) => m.movieId === movie.movieId).length === 0) {
                state.likedMovies.push(movie);
            }
        });
    },
    setWatchlistMovies(state, payload) {
        payload.forEach(movie => {
            if (state.watchlistMovies.filter((m) => m.movieId === movie.movieId).length === 0) {
                state.watchlistMovies.push(movie);
            }
        });
    },
    setLikedTv(state, payload) {
        payload.forEach(tv => {
            if (state.likedTv.filter((m) => m.tvId === tv.tvId).length === 0) {
                state.likedTv.push(tv);
            }
        });
    },
    setWatchlistTv(state, payload) {
        payload.forEach(tv => {
            if (state.watchlistTv.filter((m) => m.tvId === tv.tvId).length === 0) {
                state.watchlistTv.push(tv);
            }
        });
    },
    setSearchedMovies(state, payload) {
        console.log('payload: ', payload)
        state.searchedMovies = payload.results
    },
    setMovieVideos(state, payload) {
        console.log('payload: ', payload)
        state.movieVideos = payload.results
    },
    setUserReviews(state, payload) {
        console.log('payload: ', payload)
        state.movieReviews = payload.results
    }
}