<template>
  <div>
    <Carousel :settings="settings" :wrap-around="true" :autoplay="5000">
      <Slide v-for="movie in movies" :key="movie.title">
        <div class="popular">
          <div class="popularContainer">
            <img
              class="bc-image"
              :src="path + movie.backdrop_path"
              alt="Movies"
              width="200"
              height="275"
            />
            <div class="image">
              <img
                :src="path + movie.poster_path"
                alt="Movies"
                width="200"
                height="275"
                class="imageContent"
              />
              <p style="width: 200px; margin-top: 15px">{{ movie.title }}</p>
            </div>
            <div>
              <div class="desc">
                <p>{{ movie.overview }}</p>
              </div>
              <div class="buttonContainer">
                <button-container
                  title="View More"
                  @click="openMovie(movie)"
                ></button-container>
                <button-container
                  title="Play Trailer"
                  @click="playTrailer(movie.id)"
                ></button-container>
              </div>
            </div>
          </div>
        </div>
      </Slide>

      <template #addons>
        <Pagination />
      </template>
    </Carousel>
  </div>
</template>

<script>
import { Carousel, Slide, Pagination } from "vue3-carousel";
import "vue3-carousel/dist/carousel.css";

export default {
  components: {
    Pagination,
    Carousel,
    Slide,
  },
  props: ["path", "movies"],
  data() {
    return {
      settings: {
        itemsToShow: 1,
        snapAlign: "center",
      },
      trailers: [],
      trailerLink: "",
      iFrameLink: "",
    };
  },
  methods: {
    async playTrailer(movieId) {
      await this.$store.dispatch("movies/loadVideos", movieId);
      this.trailers = await this.$store.getters["movies/videos"];
      console.log(this.trailers);
      this.trailers.forEach((t) => {
        if (t.type === "Trailer") {
          this.trailerLink = `https://www.youtube.com/watch?v=${t.key}`;
          this.iFrameLink = `https://www.youtube.com/embed/${t.key}`;
        }
      });
      let windowFeatures = "width=1500,height=1000";
      // window.open(this.trailerLink, "youtubetrailer", windowFeatures);
      console.log("iframe: ", this.iFrameLink);
      window.open(this.iFrameLink, "youtubetrailer", windowFeatures);
    },
    async openMovie(movie) {
      console.log("movie: ", movie.title);
      await this.$store.dispatch("movies/loadMovieDetails", movie.id);
      await this.$store.dispatch("movies/loadMovieCredits", movie.id);
      await this.$store.dispatch("movies/movieVideos", movie.id);
      await this.$store.dispatch("movies/userReviews", movie.id);
      this.$router.replace(`/movies/${movie.id}`);
    },
  },
};
</script>


<style scoped>
.popular {
  display: flex;
  justify-content: center;
  border: 1px solid teal;
  border-radius: 20px;
}
.popularContainer {
  width: 70vw;
  height: 60vh;
  border-radius: 15px;
  display: flex;
  overflow: hidden;
  position: relative;
  justify-content: space-evenly;
}
.bc-image {
  opacity: 0.3;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: auto;
}
.image {
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
}
.desc {
  width: 40vw;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  height: 37vh;
  font-size: 15px;
}
.imageContent {
  border-radius: 15px;
  border: 1px solid white;
}
.buttonContainer {
  display: flex;
  justify-content: space-between;
  width: 40%;
  position: relative;
}
</style>
