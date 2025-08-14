<template>
  <div>
    <Carousel :settings="settings" :breakpoints="breakpoints">
      <Slide v-for="(item, index) in content" :key="item[type]">
        <div>
          <div>
            <div class="content">
              <img
                :src="path + item[img]"
                alt="Movies"
                width="200"
                height="275"
                class="imageContent"
                @mouseover="showOptions(index)"
                @mouseleave="hideOptions"
                v-if="type !== 'name'"
                v-bind:style="{
                  opacity: hovered && index === hoveredIndex ? '0.3' : '1',
                }"
              />
              <img
                :src="item[img] !== null ? path + item[img] : noImage"
                alt="Movies"
                width="200"
                height="275"
                class="imageContent"
                v-else
                @click="openMovie(item)"
                @mouseover="showOptions(index)"
                @mouseleave="hideOptions"
                v-bind:style="{
                  opacity: hovered && index === hoveredIndex ? '0.3' : '1',
                }"
              />
              <p>{{ item[type] }}</p>
            </div>
          </div>
        </div>
        <div class="rating" v-if="type !== 'name'">
          <div
            class="percent"
            v-bind:style="{
              borderColor:
                item.vote_average >= 7
                  ? 'green'
                  : item.vote_average < 7 && item.vote_average >= 4
                  ? 'yellow'
                  : item.vote_average < 4
                  ? 'red'
                  : '',
            }"
          >
            <p class="vote">{{ item.vote_average * 10 }}%</p>
          </div>
          <div v-if="hovered && index === hoveredIndex" class="fontIcons">
            <font-awesome
              icon="heart"
              @click="likeContent(item, type, index)"
              v-bind:style="{
                color: isLiked(index) ? 'red' : 'white',
                fontSize: '35px',
                cursor: 'pointer',
              }"
            />
            <font-awesome
              v-if="!isAdded(index)"
              icon="plus"
              style="font-size: 35px; cursor: pointer"
              @click="addContent(item, type, index)"
            />
            <font-awesome
              v-if="isAdded(index)"
              icon="check"
              style="font-size: 35px; cursor: pointer; color: green"
              @click="removeContent()"
            />
          </div>
          <div class="moreOptions" v-if="hovered && index === hoveredIndex">
            <button-container
              title="View More"
              @click="openMovie(item)"
            ></button-container>
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
import { store } from "./../../store.js";

export default {
  components: {
    Pagination,
    Carousel,
    Slide,
  },
  props: ["path", "content", "type", "img", "filter"],
  data() {
    return {
      hovered: false,
      hoveredIndex: -1,
      liked: false,
      checked: false,
      likedIndex: [],
      addedIndex: [],
      likedMovies: [],
      watchlistMovies: [],
      likedTv: [],
      watchlistTv: [],
      noImage:
        "https://thumbs.dreamstime.com/b/no-image-available-icon-photo-camera-flat-vector-illustration-132483141.jpg",
      settings: {
        itemsToShow: 7,
        snapAlign: "center",
      },
      breakpoints: {
        // 700px and up
        1024: {
          itemsToShow: 5,
          snapAlign: "center",
        },
        // 1024 and up
        1600: {
          itemsToShow: 7,
          snapAlign: "start",
        },
      },
    };
  },
  created() {
    this.loadDetails();
  },
  methods: {
    async loadDetails() {
      await this.$store.dispatch("movies/getLikedMovies", {
        username: store.loggedInUsername,
      });
      this.likedMovies = await this.$store.getters["movies/likedMovies"];
      await this.$store.dispatch("movies/getWatchlistMovies", {
        username: store.loggedInUsername,
      });
      this.watchlistMovies = await this.$store.getters[
        "movies/watchlistMovies"
      ];
      await this.$store.dispatch("movies/getLikedTv", {
        username: store.loggedInUsername,
      });
      await this.$store.dispatch("movies/getWatchlistTv", {
        username: store.loggedInUsername,
      });
      this.likedTv = await this.$store.getters["movies/likedTv"];
      this.watchlistTv = await this.$store.getters["movies/watchlistTv"];
      console.log(this.content, this.filter);
      if (this.filter === "Movie") {
        this.content.forEach((element, i) => {
          if (
            this.likedMovies.filter((m) => m.title === element.title).length > 0
          ) {
            this.likedIndex.push(i);
          }
          if (
            this.watchlistMovies.filter((m) => m.title === element.title)
              .length > 0
          ) {
            this.addedIndex.push(i);
          }
        });
      } else if (this.filter === "Tv") {
        this.content.forEach((element, i) => {
          if (this.likedTv.filter((m) => m.title === element.name).length > 0) {
            this.likedIndex.push(i);
          }
          if (
            this.watchlistTv.filter((m) => m.title === element.name).length > 0
          ) {
            this.addedIndex.push(i);
          }
        });
      }

      console.log(this.likedIndex, this.addedIndex);
    },
    showOptions(i) {
      this.hovered = true;
      this.hoveredIndex = i;
    },
    hideOptions() {
      // this.hovered = false;
    },
    async openMovie(movie) {
      console.log("movie: ", movie.title, this.filter);
      if (this.filter === "Movie") {
        await this.$store.dispatch("movies/loadMovieDetails", movie.id);
        await this.$store.dispatch("movies/loadMovieCredits", movie.id);
        this.$router.replace(`/movies/${movie.id}`);
      } else if (this.filter === "Tv") {
        await this.$store.dispatch("tv/loadTvDetails", movie.id);
        await this.$store.dispatch("tv/loadTvCredits", movie.id);
        this.$router.replace(`/tv/${movie.id}`);
      } else if (this.filter === "Celeb") {
        await this.$store.dispatch("celebs/loadCelebDetails", movie.id);
        await this.$store.dispatch("celebs/loadCelebCredits", movie.id);
        this.$router.replace(`/celebs/${movie.id}`);
      }
    },
    async likeContent(movie, type, index) {
      this.liked = true;
      this.likedIndex.push(index);
      console.log(movie, store.loggedInUsername);
      let moviePayload = movie;
      moviePayload = { ...movie, username: store.loggedInUsername };

      if (type === "title") {
        await this.$store.dispatch("movies/addToLikedMovies", moviePayload);
      } else {
        await this.$store.dispatch("movies/addToLikedTv", moviePayload);
      }
    },
    async addContent(movie, type, index) {
      this.checked = true;
      this.addedIndex.push(index);
      let moviePayload = movie;
      moviePayload = { ...movie, username: store.loggedInUsername };
      if (type === "title") {
        await this.$store.dispatch("movies/addToWatchlistMovies", moviePayload);
      } else {
        await this.$store.dispatch("movies/addToWatchlistTv", moviePayload);
      }
    },
    isLiked(i) {
      if (this.likedIndex.includes(i)) {
        return true;
      }
    },
    isAdded(i) {
      console.log(this.addedIndex);
      if (this.addedIndex.includes(i)) {
        return true;
      } else {
        return false;
      }
    },
    removeContent() {
      this.checked = false;
    },
  },
};
</script>


<style scoped>
.content {
  color: white;
  cursor: pointer;
}
.imageContent {
  border-radius: 15px;
  border: 1px solid teal;
}
.rating {
  color: white;
  border: 1px solid white;
  width: 40px;
  height: 40px;
  padding-top: 10px;
  border-radius: 20px;
  position: absolute;
  top: 255px;
  left: 15px;
  background-color: black;
}
.percent {
  border: 2px solid;
  width: 40px;
  height: 40px;
  border-radius: 20px;
  margin-top: -11px;
  margin-left: -1px;
  font-size: 13px;
}
.vote {
  margin-top: 10px;
}
.moreOptions {
  top: -50px;
  position: absolute;
  left: 55px;
}
.fontIcons {
  top: -150px;
  position: absolute;
  left: 55px;
  display: flex;
  justify-content: space-between;
  width: 120px;
  padding: 10px;
}
</style>
