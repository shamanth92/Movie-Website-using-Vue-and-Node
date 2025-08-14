<template>
  <div>
    <div class="container">
      <div class="celeb">
        <div style="padding: 20px">
          <img
            :src="imagePath + celebDetails.profile_path"
            alt="Movies"
            width="200"
            height="270"
            class="imageContent"
          />
          <div>
            <p style="margin-bottom: 0px; font-size: 20px; font-weight: bold">
              {{ celebDetails.name }}
            </p>
            <p style="margin-bottom: 0px; color: grey">
              Born: {{ celebDetails.birthday }}
            </p>
            <p style="margin-bottom: 0px; color: grey">
              Place of Birth: {{ celebDetails.place_of_birth }}
            </p>
          </div>
        </div>
        <div>
          <div
            style="padding: 20px; display: flex; height: 55%; margin-top: 20px"
          >
            <p>{{ celebDetails.biography }}</p>
            <div
              style="
                padding-left: 25px;
                display: flex;
                min-width: 200px;
                flex-wrap: wrap;
                max-height: 200px;
              "
            >
              <div v-for="image in firstRowImages" :key="image.vote_count">
                <div>
                  <!-- <a-image :width="150" :src="imagePath + image.file_path" /> -->
                  <img
                    :src="
                      image.file_path !== null
                        ? imagePath + image.file_path
                        : noImage
                    "
                    alt="Movies"
                    width="85"
                    height="110"
                    class="gallery"
                  />
                </div>
              </div>
            </div>
            <div
              style="
                position: absolute;
                right: 360px;
                top: 222px;
                color: teal;
                font-size: 18px;
                cursor: pointer;
              "
              @click="handleGallery()"
            >
              <p>View Image Gallery</p>
            </div>
            <a-modal
              v-model:visible="showImageGallery"
              title="Images"
              @ok="handleOk"
              bodyStyle="height: 600px; overflow-y: scroll"
            >
              <div style="display: flex; flex-wrap: wrap">
                <div
                  v-for="image in profileImages"
                  :key="image.vote_count"
                  style="padding: 3px"
                >
                  <a-image :width="145" :src="imagePath + image.file_path" />
                </div>
              </div>
            </a-modal>
          </div>
          <div>
            <p>Top Rated Movies/TV</p>
            <div style="display: flex; justify-content: space-evenly">
              <div v-for="(credit, index) in topCredits" :key="credit.id">
                <img
                  :src="
                    credit.poster_path !== null
                      ? imagePath + credit.poster_path
                      : noImage
                  "
                  alt="Movies"
                  width="110"
                  height="170"
                  class="imageContent"
                  @click="openImageCredit(credit)"
                  @mouseover="highlightImage(index)"
                  @mouseleave="disableHighlightImage()"
                  v-bind:style="{
                    opacity:
                      highlightImageCredit && index === highlightIndex
                        ? 0.3
                        : 1,
                    cursor: 'pointer',
                  }"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div style="display: flex; justify-content: center">
      <div style="background-color: white; border-radius: 15px; width: 70vw">
        <!-- <img
        src="https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bW92aWV8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"
        alt="Movies"
        width="200"
        height="270"
        class="credits"
      /> -->
        <div style="padding: 20px">
          <h2>Credits</h2>
        </div>
        <div style="display: flex; justify-content: space-around">
          <div>
            <h3 style="color: black">Movies</h3>
            <div
              v-for="(movie, index) of movieCredits"
              :key="movie.title"
              style="display: flex; padding: 10px"
            >
              <img
                :src="
                  movie.poster_path !== null
                    ? imagePath + movie.poster_path
                    : noImage
                "
                alt="Movies"
                width="70"
                height="100"
                class="imageContent"
              />
              <!-- <p
          v-bind:style="{
            color:
              movie.vote_average >= 7
                ? 'green'
                : movie.vote_average < 7 && movie.vote_average >= 4
                ? 'yellow'
                : movie.vote_average < 4
                ? 'red'
                : '',
          }"
        >
          {{ movie.vote_average * 10 }}%
        </p> -->
              <div style="margin-top: 10px">
                <p
                  @mouseover="highlightMovie(index)"
                  @mouseleave="disableHighlightMovie()"
                  v-bind:style="{
                    color:
                      highlightMovieCredit && index === highlightIndex
                        ? 'deepskyblue'
                        : 'black',
                    cursor: 'pointer',
                  }"
                  @click="openMovieCredit(movie)"
                  style="margin-bottom: 0px"
                >
                  &nbsp; &nbsp; {{ movie.title }} ({{
                    movie.release_date ? movie.release_date.split("-")[0] : ""
                  }})
                </p>
                <p style="color: grey">
                  &nbsp; &nbsp; <i>{{ movie.character }}</i>
                </p>
              </div>
            </div>
          </div>

          <div>
            <h3 style="color: black">TV</h3>
            <div
              v-for="(tv, index) of tvCredits"
              :key="tv.original_name"
              style="display: flex; padding: 10px"
            >
              <img
                :src="
                  tv.poster_path !== null ? imagePath + tv.poster_path : noImage
                "
                alt="Movies"
                width="70"
                height="100"
                class="imageContent"
              />
              <!-- <p
                v-bind:style="{
                  color:
                    tv.vote_average * 10 >= 7
                      ? 'green'
                      : tv.vote_average * 10 < 7 && tv.vote_average * 10 >= 4
                      ? 'yellow'
                      : 'red',
                  cursor: 'pointer',
                }"
              >
                {{ tv.vote_average * 10 }}%
              </p> -->
              <div>
                <p
                  @mouseover="highlightTv(index)"
                  @mouseleave="disableHighlightTv()"
                  v-bind:style="{
                    color:
                      highlightTvCredit && index === highlightIndex
                        ? 'deepskyblue'
                        : 'black',
                    cursor: 'pointer',
                  }"
                  @click="openTvCredit(tv)"
                  style="margin-bottom: 0px"
                >
                  &nbsp; &nbsp; {{ tv.original_name }} ({{
                    tv.first_air_date ? tv.first_air_date.split("-")[0] : ""
                  }})
                </p>
                <p class="character">
                  &nbsp; &nbsp; <i>{{ tv.character }}</i>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { Carousel, Slide, Pagination } from "vue3-carousel";
// import "vue3-carousel/dist/carousel.css";
import { APIKEY } from "../../apiKey";

export default {
  // components: {
  //   Pagination,
  //   Carousel,
  //   Slide,
  // },
  data() {
    return {
      celebDetails: [],
      celebCredits: [],
      topCredits: [],
      imagePath: "https://image.tmdb.org/t/p/w500",
      imdbName: "https://www.imdb.com/name/",
      movieCredits: [],
      tvCredits: [],
      highlightMovieCredit: false,
      highlightTvCredit: false,
      highlightImageCredit: false,
      highlightIndex: -1,
      profileImages: [],
      firstRowImages: [],
      showImageGallery: false,
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
      settingsImg: {
        itemsToShow: 8,
        snapAlign: "center",
      },
      breakpointsImg: {
        // 700px and up
        1024: {
          itemsToShow: 7,
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
    this.loadCelebDetails();
  },
  methods: {
    async loadCelebDetails() {
      this.celebDetails = await this.$store.getters["celebs/celebDetails"];
      this.celebCredits = await this.$store.getters["celebs/celebCredits"];
      fetch(
        `https://api.themoviedb.org/3/person/${this.celebDetails.id}/images?api_key=${APIKEY}`,
        {
          headers: { "Content-type": "application/json" },
        }
      )
        .then((res) => res.json())
        .then((response) => {
          console.log(response);
          this.profileImages = response.profiles;
          this.firstRowImages = response.profiles.splice(0, 4);
        })
        .catch((error) => {
          console.log("Looks like there was a problem: \n", error);
        });
      this.topCredits = this.celebCredits.filter(
        (credit) => credit.vote_average >= 7
      );
      this.movieCredits = this.celebCredits.filter(
        (credit) => credit.media_type === "movie"
      );
      this.tvCredits = this.celebCredits.filter(
        (credit) => credit.media_type === "tv"
      );
      console.log(this.movieCredits);
      console.log(this.celebCredits);
      this.topCredits = this.topCredits.splice(0, 8);
    },
    highlightMovie(i) {
      this.highlightMovieCredit = true;
      this.highlightIndex = i;
    },
    disableHighlightMovie() {
      this.highlightMovieCredit = false;
    },
    highlightTv(i) {
      this.highlightTvCredit = true;
      this.highlightIndex = i;
    },
    disableHighlightTv() {
      this.highlightTvCredit = false;
    },
    highlightImage(i) {
      this.highlightImageCredit = true;
      this.highlightIndex = i;
    },
    disableHighlightImage() {
      this.highlightImageCredit = false;
    },
    handleOk() {
      this.showImageGallery = false;
    },
    handleGallery() {
      this.showImageGallery = true;
    },
    async openMovieCredit(movie) {
      await this.$store.dispatch("movies/loadMovieDetails", movie.id);
      await this.$store.dispatch("movies/loadMovieCredits", movie.id);
      this.$router.replace(`/movies/${movie.id}`);
    },
    async openTvCredit(tv) {
      await this.$store.dispatch("tv/loadTvDetails", tv.id);
      await this.$store.dispatch("tv/loadTvCredits", tv.id);
      this.$router.replace(`/tv/${tv.id}`);
    },
    async openImageCredit(credit) {
      if (credit.media_type === "movie") {
        await this.$store.dispatch("movies/loadMovieDetails", credit.id);
        await this.$store.dispatch("movies/loadMovieCredits", credit.id);
        this.$router.replace(`/movies/${credit.id}`);
      } else if (credit.media_type === "tv") {
        await this.$store.dispatch("tv/loadTvDetails", credit.id);
        await this.$store.dispatch("tv/loadTvCredits", credit.id);
        this.$router.replace(`/tv/${credit.id}`);
      }
    },
  },
};
</script>

<style scoped>
.imageContent {
  border-radius: 10px;
  border: 1px solid teal;
}
.container {
  display: flex;
  justify-content: center;
  margin-top: 25px;
}
.celeb {
  background-color: white;
  height: 58vh;
  width: 65vw;
  border-radius: 10px;
  display: flex;
}
.gallery {
  opacity: 0.4;
}
.credits {
  opacity: 0.2;
  position: absolute;
  /* left: 0;
  top: 0;*/
  width: 99.1vw;
  height: auto;
}
</style>
