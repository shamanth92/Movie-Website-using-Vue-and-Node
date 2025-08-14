import { APIKEY } from "../../../apiKey";

export default {
  //   async registerNewUser(context, payload) {
  //     console.log(payload);
  //     const requestOptions = {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({
  //         username: payload.username,
  //         password: payload.password,
  //         email: payload.email,
  //       }),
  //     };
  //     console.log(requestOptions);
  //     await fetch(
  //       `http://localhost:5000/api/movies/registerNewUser`,
  //       requestOptions
  //     );
  //   },
  // storeLoginInfo(context, payload) {
  //   context.commit("setLoginInfo", payload);
  // },
  async loadPopularMovies(context, payload) {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${APIKEY}&language=en-US&page=${payload}`
    );
    if (!response.ok) {
      console.log("ok");
    }

    const responseData = await response.json();
    console.log("response: ", responseData);

    context.commit("setPopularMovies", responseData);
  },
  async loadNowPlaying(context) {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=${APIKEY}&language=en-US&page=1`
    );
    if (!response.ok) {
      console.log("ok");
    }

    const responseData = await response.json();
    console.log("response: ", responseData);

    context.commit("setNowPlaying", responseData);
  },
  async loadVideos(context, payload) {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${payload}/videos?api_key=${APIKEY}`
    );
    if (!response.ok) {
      console.log("ok");
    }

    const responseData = await response.json();
    console.log("response: ", responseData);

    context.commit("setVideos", responseData);
  },
  async loadMovieDetails(context, payload) {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${payload}?api_key=${APIKEY}&language=en-US`
    );
    if (!response.ok) {
      console.log("ok");
    }

    const responseData = await response.json();
    console.log("response: ", responseData);

    context.commit("setMovieDetails", responseData);
  },
  async loadMovieCredits(context, payload) {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${payload}/credits?api_key=${APIKEY}&language=en-US`
    );
    if (!response.ok) {
      console.log("ok");
    }

    const responseData = await response.json();
    console.log("response: ", responseData);

    context.commit("setMovieCredits", responseData);
  },
  async loadTopRatedMovies(context, payload) {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=${APIKEY}&language=en-US&page=${payload}`
    );
    if (!response.ok) {
      console.log("ok");
    }

    const responseData = await response.json();
    console.log("response: ", responseData);

    context.commit("setTopRatedMovies", responseData);
  },
  async loadUpcomingMovies(context, payload) {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=${APIKEY}&language=en-US&page=${payload}`
    );
    if (!response.ok) {
      console.log("ok");
    }

    const responseData = await response.json();
    console.log("response: ", responseData);

    context.commit("setUpcomingMovies", responseData);
  },
  async addToLikedMovies(context, payload) {
    console.log(payload);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        movieId: payload.id,
        title: payload.title,
        poster: payload.poster_path,
        rating: payload.vote_average,
        username: payload.username,
      }),
    };
    console.log(requestOptions);
    await fetch(`http://localhost:5000/api/movies/likedMovies`, requestOptions);
  },
  async getLikedMovies(context, payload) {
    console.log(payload);
    const response = await fetch(
      `http://localhost:5000/api/movies/likedMovies?username=${payload.username}`
    );
    const responseData = await response.json();
    console.log(responseData);
    context.commit("setLikedMovies", responseData);
  },
  async addToWatchlistMovies(context, payload) {
    console.log(payload);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        movieId: payload.id,
        title: payload.title,
        poster: payload.poster_path,
        rating: payload.vote_average,
        username: payload.username,
      }),
    };
    console.log(requestOptions);
    await fetch(
      `http://localhost:5000/api/movies/watchlistMovies`,
      requestOptions
    );
    // context.commit('setWatchlistMovies', payload)
  },
  async getWatchlistMovies(context, payload) {
    const response = await fetch(
      `http://localhost:5000/api/movies/watchlistMovies?username=${payload.username}`
    );
    const responseData = await response.json();
    console.log(responseData);
    context.commit("setWatchlistMovies", responseData);
  },
  async addToLikedTv(context, payload) {
    console.log(payload);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        tvId: payload.id,
        title: payload.name,
        poster: payload.poster_path,
        rating: payload.vote_average,
        username: payload.username,
      }),
    };
    console.log(requestOptions);
    await fetch(`http://localhost:5000/api/movies/likedTv`, requestOptions);
  },
  async getLikedTv(context, payload) {
    const response = await fetch(
      `http://localhost:5000/api/movies/likedTv?username=${payload.username}`
    );
    const responseData = await response.json();
    console.log(responseData);
    context.commit("setLikedTv", responseData);
  },
  async addToWatchlistTv(context, payload) {
    console.log(payload);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        tvId: payload.id,
        title: payload.name,
        poster: payload.poster_path,
        rating: payload.vote_average,
        username: payload.username,
      }),
    };
    console.log(requestOptions);
    await fetch(`http://localhost:5000/api/movies/watchlistTv`, requestOptions);
  },
  async getWatchlistTv(context, payload) {
    const response = await fetch(
      `http://localhost:5000/api/movies/watchlistTv?username=${payload.username}`
    );
    const responseData = await response.json();
    console.log(responseData);
    context.commit("setWatchlistTv", responseData);
  },
  async searchMovies(context, payload) {
    console.log(payload);
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${APIKEY}&language=en-US&query=${payload}&page=1&include_adult=false`
    );
    if (!response.ok) {
      console.log("ok");
    }

    const responseData = await response.json();
    console.log("response: ", responseData);
    context.commit("setSearchedMovies", responseData);
  },
  async movieVideos(context, payload) {
    console.log(payload);
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${payload}/videos?api_key=${APIKEY}&language=en-US`
    );
    if (!response.ok) {
      console.log("ok");
    }

    const responseData = await response.json();
    console.log("response: ", responseData);
    context.commit("setMovieVideos", responseData);
  },
  async userReviews(context, payload) {
    console.log(payload);
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${payload}/reviews?api_key=${APIKEY}&language=en-US&page=1`
    );
    if (!response.ok) {
      console.log("ok");
    }

    const responseData = await response.json();
    console.log("response: ", responseData);
    context.commit("setUserReviews", responseData);
  },
};
