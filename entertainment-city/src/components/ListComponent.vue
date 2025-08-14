<template>
  <a-collapse>
    <a-collapse-panel key="1" header="Liked Movies" style="color: white">
      <div>
        <Carousel :settings="settings">
          <Slide v-for="movie in likedMovies" :key="movie.movieId">
            <div>
              <div>
                <div class="content">
                  <img
                    :src="path + movie.poster"
                    alt="Movies"
                    width="200"
                    height="275"
                    class="imageContent"
                  />
                  <p>{{ movie.title }}</p>
                </div>
              </div>
            </div>
            <div class="rating">
              <div
                class="percent"
                v-bind:style="{
                  borderColor:
                    movie.rating >= 7
                      ? 'green'
                      : movie.rating < 7 && movie.rating >= 4
                      ? 'yellow'
                      : movie.rating < 4
                      ? 'red'
                      : '',
                }"
              >
                <p class="vote">{{ movie.rating * 10 }}%</p>
              </div>
              <!-- <div class="moreOptions" v-if="hovered && index === hoveredIndex">
            <button-container
              title="View More"
              @click="openMovie(item)"
            ></button-container>
          </div> -->
            </div>
          </Slide>

          <template #addons>
            <Pagination />
          </template>
        </Carousel>
      </div>
    </a-collapse-panel>
    <a-collapse-panel key="2" header="In Watchlist Movies" style="color: white">
      <div>
        <Carousel :settings="settings">
          <Slide v-for="movie in watchlistMovies" :key="movie.movieId">
            <div>
              <div>
                <div class="content">
                  <img
                    :src="path + movie.poster"
                    alt="Movies"
                    width="200"
                    height="275"
                    class="imageContent"
                  />
                  <p>{{ movie.title }}</p>
                </div>
              </div>
            </div>
            <div class="rating">
              <div
                class="percent"
                v-bind:style="{
                  borderColor:
                    movie.rating >= 7
                      ? 'green'
                      : movie.rating < 7 && movie.rating >= 4
                      ? 'yellow'
                      : movie.rating < 4
                      ? 'red'
                      : '',
                }"
              >
                <p class="vote">{{ movie.rating * 10 }}%</p>
              </div>
              <!-- <div class="moreOptions" v-if="hovered && index === hoveredIndex">
            <button-container
              title="View More"
              @click="openMovie(item)"
            ></button-container>
          </div> -->
            </div>
          </Slide>

          <template #addons>
            <Pagination />
          </template>
        </Carousel>
      </div>
    </a-collapse-panel>
    <a-collapse-panel key="3" header="Liked TV" style="color: white">
      <div>
        <Carousel :settings="settings">
          <Slide v-for="tv in likedTv" :key="tv.tvId">
            <div>
              <div>
                <div class="content">
                  <img
                    :src="path + tv.poster"
                    alt="Movies"
                    width="200"
                    height="275"
                    class="imageContent"
                  />
                  <p>{{ tv.title }}</p>
                </div>
              </div>
            </div>
            <div class="rating">
              <div
                class="percent"
                v-bind:style="{
                  borderColor:
                    tv.rating >= 7
                      ? 'green'
                      : tv.rating < 7 && tv.rating >= 4
                      ? 'yellow'
                      : tv.rating < 4
                      ? 'red'
                      : '',
                }"
              >
                <p class="vote">{{ tv.rating * 10 }}%</p>
              </div>
              <!-- <div class="moreOptions" v-if="hovered && index === hoveredIndex">
            <button-container
              title="View More"
              @click="openMovie(item)"
            ></button-container>
          </div> -->
            </div>
          </Slide>

          <template #addons>
            <Pagination />
          </template>
        </Carousel>
      </div>
    </a-collapse-panel>
    <a-collapse-panel key="4" header="In Watchlist TV" style="color: white">
      <div>
        <Carousel :settings="settings">
          <Slide v-for="tv in watchlistTv" :key="tv.tvId">
            <div>
              <div>
                <div class="content">
                  <img
                    :src="path + tv.poster"
                    alt="Movies"
                    width="200"
                    height="275"
                    class="imageContent"
                  />
                  <p>{{ tv.title }}</p>
                </div>
              </div>
            </div>
            <div class="rating">
              <div
                class="percent"
                v-bind:style="{
                  borderColor:
                    tv.rating >= 7
                      ? 'green'
                      : tv.rating < 7 && tv.rating >= 4
                      ? 'yellow'
                      : tv.rating < 4
                      ? 'red'
                      : '',
                }"
              >
                <p class="vote">{{ tv.rating * 10 }}%</p>
              </div>
              <!-- <div class="moreOptions" v-if="hovered && index === hoveredIndex">
            <button-container
              title="View More"
              @click="openMovie(item)"
            ></button-container>
          </div> -->
            </div>
          </Slide>

          <template #addons>
            <Pagination />
          </template>
        </Carousel>
      </div>
    </a-collapse-panel>
  </a-collapse>
</template>

<script>
import { Carousel, Slide, Pagination } from "vue3-carousel";
import "vue3-carousel/dist/carousel.css";
import { store } from "../store.js";

export default {
  components: {
    Pagination,
    Carousel,
    Slide,
  },
  data() {
    return {
      likedMovies: [],
      watchlistMovies: [],
      likedTv: [],
      watchlistTv: [],
      path: "https://image.tmdb.org/t/p/w500",
      settings: {
        itemsToShow: 7,
        snapAlign: "center",
      },
    };
  },
  created() {
    this.getAllMovies();
    this.getAllTv();
  },
  methods: {
    async getAllMovies() {
      await this.$store.dispatch("movies/getLikedMovies", {
        username: store.loggedInUsername,
      });
      this.likedMovies = await this.$store.getters["movies/likedMovies"];
      console.log(this.likedMovies);
      this.likedMovies.forEach((element) => {
        console.log(element);
      });
      await this.$store.dispatch("movies/getWatchlistMovies", {
        username: store.loggedInUsername,
      });
      this.watchlistMovies = await this.$store.getters[
        "movies/watchlistMovies"
      ];
      console.log(this.likedMovies);
    },
    async getAllTv() {
      await this.$store.dispatch("movies/getLikedTv", {
        username: store.loggedInUsername,
      });
      await this.$store.dispatch("movies/getWatchlistTv", {
        username: store.loggedInUsername,
      });
      this.likedTv = await this.$store.getters["movies/likedTv"];
      this.watchlistTv = await this.$store.getters["movies/watchlistTv"];
      console.log(this.likedMovies);
    },
  },
};
</script>


<style scoped>
h3 {
  color: white;
}
p {
  color: white;
}
.percent {
  border: 2px solid;
  width: 40px;
  height: 40px;
  border-radius: 20px;
  font-size: 13px;
  top: 20;
  position: absolute;
  top: 250px;
  left: 20px;
  background-color: black;
}
.imageContent {
  border: 1px solid teal;
  border-radius: 15px;
}
</style>