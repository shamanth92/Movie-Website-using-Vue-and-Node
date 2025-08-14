<template>
  <a-auto-complete
    :options="options"
    style="width: 500px; color: black"
    :placeholder="type === 'movie' ? 'Search Movies' : 'Search TV Shows'"
    @search="getSearchedMovies"
    @select="navigateToMovie"
  >
    <template #option="item">
      <div style="display: flex">
        <div>
          <img
            :src="item.poster !== null ? imagePath + item.poster : noImage"
            alt="Movies"
            width="60"
            height="75"
          />
        </div>
        <div style="margin-left: 20px">
          <b>{{ item.value }}</b>
          <p>({{ item.year }})</p>
        </div>
      </div>
    </template>
  </a-auto-complete>
</template>


<script>
import _ from "lodash";
import { APIKEY } from '../../apiKey';

export default {
  data() {
    return {
      options: [],
      allMovieResults: [],
      allTvResults: [],
      imagePath: "https://image.tmdb.org/t/p/w500",
      noImage: 'https://www.ncenet.com/wp-content/uploads/2020/04/No-image-found.jpg'
    };
  },
  props: ["type"],
  methods: {
    getSearchedMovies: _.debounce(async function (query) {
      this.options = [];
      if (query.length >= 3) {
        if (this.type === "movie") {
          await this.$store.dispatch("movies/searchMovies", query);
          this.allMovieResults = await this.$store.getters[
            "movies/searchedMovies"
          ];
          this.allMovieResults.forEach((movie) => {
            this.options.push({
              value: movie.original_title,
              year: movie.release_date,
              poster: movie.poster_path,
            });
          });
          console.log(this.options);
        } else {
          fetch(
            `https://api.themoviedb.org/3/search/tv?api_key=${APIKEY}&language=en-US&page=1&query=${query}&include_adult=false`,
            {
              headers: { "Content-type": "application/json" },
            }
          )
            .then((res) => res.json())
            .then((response) => {
              console.log(response.results);
              this.allTvResults = response.results;
              this.allTvResults.forEach((movie) => {
                this.options.push({ value: movie.original_name, year: movie.first_air_date, poster: movie.poster_path });
              });
            })
            .catch((error) => {
              console.log("Looks like there was a problem: \n", error);
            });
        }
      }
    }, 500),
    async navigateToMovie(movieTitle) {
      const selectedMovie = this.allMovieResults.filter(
        (movie) => movie.original_title === movieTitle
      );
      console.log(selectedMovie);
      if (this.type === "movie") {
        await this.$store.dispatch(
          "movies/loadMovieDetails",
          selectedMovie[0].id
        );
        await this.$store.dispatch(
          "movies/loadMovieCredits",
          selectedMovie[0].id
        );
        this.$router.replace(`/movies/${selectedMovie[0].id}`);
      } else {
        const selectedTv = this.allTvResults.filter(
          (movie) => movie.original_name === movieTitle
        );
        console.log(selectedTv);
        await this.$store.dispatch("tv/loadTvDetails", selectedTv[0].id);
        await this.$store.dispatch("tv/loadTvCredits", selectedTv[0].id);
        this.$router.replace(`/tv/${selectedTv[0].id}`);
      }
    },
  },
};
</script>

