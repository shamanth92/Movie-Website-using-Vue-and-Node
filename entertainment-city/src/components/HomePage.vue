<template>
  <div>
    <div
      v-if="
        nowPlaying.length === 0 ||
        popularMovies.length === 0 ||
        popularTv.length === 0 ||
        celebs.length === 0
      "
      style="
        height: 95vh;
        display: flex;
        justify-content: center;
        align-items: center;
      "
    >
      <div class="spinner">
        <a-spin size="large" />
        <h2>Loading Content...</h2>
      </div>
    </div>

    <div
      v-if="
        popularMovies.length > 0 &&
        nowPlaying.length > 0 &&
        popularTv.length > 0 &&
        celebs.length > 0
      "
    >
      <div class="margin">
        <popular-movies
          :path="imagePath"
          :movies="popularMovies"
        ></popular-movies>
      </div>
      <div class="margin-50"><h2>Now Playing</h2></div>
      <home-content
        :path="imagePath"
        :content="nowPlaying"
        type="title"
        img="poster_path"
        filter="Movie"
      ></home-content>
      <div class="margin-50"><h2>Popular TV</h2></div>
      <home-content
        :path="imagePath"
        :content="popularTv"
        type="original_name"
        img="poster_path"
        filter="Tv"
      ></home-content>
      <div class="margin-50"><h2>Popular Celebs</h2></div>
      <home-content
        :path="imagePath"
        :content="celebs"
        type="name"
        img="profile_path"
        filter="Celeb"
      ></home-content>
      <div
        style="
          color: white;
          display: flex;
          align-items: center;
          flex-direction: column;
          padding: 20px;
        "
      >
        <b>Data and Image Source: </b>
        <img
          src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg"
          width="100"
          height="100"
        />
      </div>
    </div>
  </div>
</template>

<script>
import PopularMovies from "./Movies/PopularMovies.vue";
import HomeContent from "./Shared/HomeContent.vue";

export default {
  components: {
    PopularMovies,
    HomeContent,
  },
  data() {
    return {
      popularMovies: [],
      nowPlaying: [],
      popularTv: [],
      celebs: [],
      imagePath: "https://image.tmdb.org/t/p/w500",
    };
  },
  created() {
    this.loadContent();
  },
  methods: {
    async loadContent() {
      await this.$store.dispatch("movies/loadPopularMovies", 1);
      await this.$store.dispatch("movies/loadNowPlaying");
      await this.$store.dispatch("tv/loadPopularTv", 1);
      await this.$store.dispatch("celebs/loadCelebs", 1);
      this.popularMovies = await this.$store.getters["movies/popularMovies"];
      this.nowPlaying = await this.$store.getters["movies/nowPlaying"];
      this.popularTv = await this.$store.getters["tv/popularTv"];
      this.celebs = await this.$store.getters["celebs/celebs"];
      console.log(this.celebs);
    },
  },
};
</script>

<style scoped>
.margin {
  margin-top: 20px;
  color: white;
}
.margin-50 {
  margin-top: 50px;
  color: white;
  margin-left: 35px;
  margin-bottom: 25px;
}
h2 {
  color: white;
}
.spinner {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100px;
}
</style>

