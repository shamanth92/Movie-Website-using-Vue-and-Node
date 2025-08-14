<template>
  <div class="searchAndSwitch">
    <a-radio-group v-model:value="movieOption" button-style="solid">
      <a-radio-button value="Popular" style="width: 150px"
        >Popular</a-radio-button
      >
      <a-radio-button value="Top Rated" style="width: 150px"
        >Top Rated</a-radio-button
      >
      <a-radio-button value="Upcoming" style="width: 150px"
        >Upcoming</a-radio-button
      >
    </a-radio-group>
    <div class="searchInput">
      <search-component type="movie"></search-component>
    </div>
  </div>

  <div class="movieContainer" v-if="movieOption === 'Popular'">
    <div
      v-for="(movie, index) of popularMovies"
      :key="movie.title"
      class="movieContent"
    >
      <div class="content" @click="openMovie(movie.id)">
        <a-card
          hoverable
          style="
            width: 165px;
            border-radius: 20px;
            border: 0px;
            background: none;
          "
        >
          <template #cover>
            <img
              :src="imagePath + movie.poster_path"
              alt="Movies"
              height="225"
              class="imageContent"
              @mouseover="showOptions(index)"
              @mouseleave="hideOptions"
              v-bind:style="{
                opacity: hovered && index === hoveredIndex ? '0.3' : '1',
                cursor: 'pointer',
              }"
            />
          </template>
        </a-card>
        <div class="title">{{ movie.title }}</div>
      </div>
    </div>
  </div>
  <button-container
    v-if="movieOption === 'Popular'"
    title="Load More"
    @click="loadMoreMovies('popular')"
  ></button-container>

  <div class="movieContainer" v-if="movieOption === 'Top Rated'">
    <div
      v-for="(movie, index) of topRatedMovies"
      :key="movie.title"
      class="movieContent"
    >
      <div class="content" @click="openMovie(movie.id)">
        <a-card
          hoverable
          style="
            width: 165px;
            border-radius: 20px;
            border: 0px;
            background: none;
          "
        >
          <template #cover>
            <img
              :src="imagePath + movie.poster_path"
              alt="Movies"
              height="225"
              class="imageContent"
              @mouseover="showOptions(index)"
              @mouseleave="hideOptions"
              v-bind:style="{
                opacity: hovered && index === hoveredIndex ? '0.3' : '1',
                cursor: 'pointer',
              }"
            />
          </template>
        </a-card>
        <div class="title">{{ movie.title }}</div>
      </div>
    </div>
  </div>
  <button-container
    v-if="movieOption === 'Top Rated'"
    title="Load More"
    @click="loadMoreMovies('topRated')"
  ></button-container>

  <div class="movieContainer" v-if="movieOption === 'Upcoming'">
    <div
      v-for="(movie, index) of upcomingMovies"
      :key="movie.title"
      class="movieContent"
    >
      <div class="content" @click="openMovie(movie.id)">
        <a-card
          hoverable
          style="
            width: 165px;
            border-radius: 20px;
            border: 0px;
            background: none;
          "
        >
          <template #cover>
            <img
              :src="imagePath + movie.poster_path"
              alt="Movies"
              height="225"
              class="imageContent"
              @mouseover="showOptions(index)"
              @mouseleave="hideOptions"
              v-bind:style="{
                opacity: hovered && index === hoveredIndex ? '0.3' : '1',
                cursor: 'pointer',
              }"
            />
          </template>
        </a-card>
        <div class="title">{{ movie.title }}</div>
      </div>
    </div>
  </div>
  <button-container
    v-if="movieOption === 'Upcoming'"
    title="Load More"
    @click="loadMoreMovies('upcoming')"
  ></button-container>
</template>

<script>
import { ref } from "vue";
import SearchComponent from "../Shared/SearchComponent.vue";

export default {
  components: {
    SearchComponent,
  },
  data() {
    return {
      popular: true,
      topRated: false,
      upcoming: false,
      popularMovies: [],
      topRatedMovies: [],
      upcomingMovies: [],
      loadPopular: [],
      loadTopRated: [],
      loadUpcoming: [],
      popularNumber: 1,
      topRatedNumber: 1,
      upcomingNumber: 1,
      imagePath: "https://image.tmdb.org/t/p/w500",
      hovered: false,
      hoveredIndex: -1,
      activeKey: ref("1"),
      movieOption: ref("Popular"),
    };
  },
  async created() {
    this.popularMovies = this.$store.getters["movies/popularMovies"];
    await this.$store.dispatch(
      "movies/loadTopRatedMovies",
      this.topRatedNumber
    );
    this.topRatedMovies = await this.$store.getters["movies/topRatedMovies"];
    await this.$store.dispatch(
      "movies/loadUpcomingMovies",
      this.upcomingNumber
    );
    this.upcomingMovies = await this.$store.getters["movies/upcomingMovies"];
    console.log(this.movieOption);
    console.log(this.topRatedMovies);
  },
  methods: {
    setPopular() {
      this.popular = true;
      this.topRated = false;
      this.upcoming = false;
      console.log(this.popularMovies);
    },
    setTopRated() {
      this.popular = false;
      this.topRated = true;
      this.upcoming = false;
    },
    setUpcoming() {
      this.popular = false;
      this.topRated = false;
      this.upcoming = true;
    },
    showOptions(i) {
      this.hovered = true;
      this.hoveredIndex = i;
    },
    hideOptions() {
      this.hovered = false;
    },
    async loadMoreMovies(tab) {
      if (tab === "popular") {
        this.popularNumber = this.popularNumber + 1;
        await this.$store.dispatch(
          "movies/loadPopularMovies",
          this.popularNumber
        );
        this.loadPopular = await this.$store.getters["movies/popularMovies"];
        this.loadPopular.forEach((movie) => {
          this.popularMovies.push(movie);
        });
      } else if (tab === "topRated") {
        this.topRatedNumber = this.topRatedNumber + 1;
        await this.$store.dispatch(
          "movies/loadTopRatedMovies",
          this.topRatedNumber
        );
        this.loadTopRated = await this.$store.getters["movies/topRatedMovies"];
        this.loadTopRated.forEach((movie) => {
          this.topRatedMovies.push(movie);
        });
      } else if (tab === "upcoming") {
        this.upcomingNumber = this.upcomingNumber + 1;
        await this.$store.dispatch(
          "movies/loadUpcomingMovies",
          this.upcomingNumber
        );
        this.loadUpcoming = await this.$store.getters["movies/upcomingMovies"];
        this.loadUpcoming.forEach((movie) => {
          this.upcomingMovies.push(movie);
        });
      }
    },
    async openMovie(id) {
      await this.$store.dispatch("movies/loadMovieDetails", id);
      await this.$store.dispatch("movies/loadMovieCredits", id);
      await this.$store.dispatch("movies/movieVideos", id);
      await this.$store.dispatch("movies/userReviews", id);
      this.$router.replace(`/movies/${id}`);
    },
  },
};
</script>

<style scoped>
div {
  color: white;
}
.tabContainer {
  display: flex;
  justify-content: space-between;
  width: 35%;
}
.content {
  /* width: 225px; */
  border-radius: 25px;
  /* box-shadow: 0px 0px 2px 2px white; */
}
.imageContent {
  /* border-top-left-radius: 15px;
  border-top-right-radius: 15px; */
  width: 165px;
}
.title {
  color: white;
  justify-content: center;
  display: flex;
  width: 165px;
  margin-top: 21px;
}
.movieContent {
  padding: 20px;
}
.movieContainer {
  display: flex;
  flex-wrap: wrap;
  padding: 25px;
}
/* .searchInput {
  display: flex;
  justify-content: center;
  padding: 50px;
} */
.searchAndSwitch {
  padding: 20px;
  display: flex;
  justify-content: space-between;
}
</style>
