<template>
  <div class="movieContainer" v-if="!showAllCast && !showAllVideos">
    <img
      class="bc-image"
      :src="imagePath + movieDetails.backdrop_path"
      alt="Movies"
      width="200"
      height="275"
    />
    <div class="infoContainer">
      <div>
        <img
          :src="imagePath + movieDetails.poster_path"
          alt="Movies"
          width="225"
          height="325"
          class="imageContent"
        />
      </div>
      <div class="content">
        <div>
          <h1>{{ movieDetails.title }}</h1>
          <p class="tagline">{{ movieDetails.tagline }}</p>
          <div class="user"></div>
        </div>

        <div class="overview">
          <div>
            <h3>Overview</h3>
            <p>{{ movieDetails.overview }}</p>
          </div>
          <div class="actions">
            <button-container
              title="Play Trailer"
              @click="playTrailer(movieDetails.id)"
            ></button-container>
            <div class="watchlist">
              <font-awesome
                icon="heart"
                @click="likeContent(movieDetails)"
                v-bind:style="{
                  color: liked ? 'red' : 'white',
                  fontSize: '30px',
                  cursor: 'pointer',
                }"
              />
              <font-awesome
                v-if="!checked"
                icon="plus"
                style="font-size: 30px; cursor: pointer; color: white"
                @click="addContent(movieDetails)"
              />
              <font-awesome
                v-if="checked"
                icon="check"
                style="font-size: 30px; cursor: pointer; color: green"
                @click="removeContent()"
              />
            </div>
          </div>
        </div>
      </div>

      <div style="padding-left: 100px">
        <div class="movieDetails">
          <div>
            <h3>Genre:</h3>
            <p>{{ genres.toString() }}</p>
          </div>
          <div>
            <h3>Released:</h3>
            <p>{{ movieDetails.release_date }}</p>
          </div>
          <div>
            <h3>Runtime:</h3>
            <p>
              {{ Math.floor(movieDetails.runtime / 60) }}h
              {{ movieDetails.runtime % 60 }}min
            </p>
          </div>
          <div>
            <h3>User Rating:</h3>
            <div
              class="rating"
              v-bind:style="{
                borderColor:
                  movieDetails.vote_average >= 7
                    ? 'green'
                    : movieDetails.vote_average < 7 &&
                      movieDetails.vote_average >= 4
                    ? 'yellow'
                    : movieDetails.vote_average < 4
                    ? 'red'
                    : '',
              }"
            >
              <p class="number">
                {{ Math.round(movieDetails.vote_average * 10) }}%
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="castTitle">
      <h1>Cast</h1>
      <button-container
        title="View All"
        @click="viewAllCast"
      ></button-container>
    </div>
    <div class="cast">
      <div
        v-for="(cast, index) in spliceCast"
        :key="cast.name"
        class="actor"
        @mouseover="showOptions(index)"
        @mouseleave="hideOptions"
        v-bind:style="{
          opacity: hovered && index === hoveredIndex ? '0.3' : '1',
          cursor: 'pointer',
        }"
        @click="openCeleb(cast)"
      >
        <img
          :src="
            cast.profile_path !== null ? imagePath + cast.profile_path : noImage
          "
          alt="Movies"
          width="150"
          height="200"
          class="imageContent"
        />
        <p class="name">{{ cast.name }}</p>
        <p class="char">{{ cast.character }}</p>
      </div>
    </div>
  </div>

  <div v-if="showAllCast">
    <div class="castTitle">
      <h1>Cast</h1>
      <button-container title="Go Back" @click="goBack"></button-container>
    </div>
    <div class="allCast">
      <div
        v-for="(cast, index) in allCast"
        :key="cast.name"
        class="actor"
        @mouseover="showOptions(index)"
        @mouseleave="hideOptions"
        v-bind:style="{
          opacity: hovered && index === hoveredIndex ? '0.3' : '1',
          cursor: 'pointer',
        }"
        @click="openCeleb(cast)"
      >
        <img
          :src="
            cast.profile_path !== null ? imagePath + cast.profile_path : noImage
          "
          alt="Movies"
          width="150"
          height="200"
          class="imageContent"
        />
        <p class="name">{{ cast.name }}</p>
        <p class="char">{{ cast.character }}</p>
      </div>
    </div>
  </div>
  <div class="castTitle" v-if="!showAllCast && !showAllVideos">
    <h1>Movie Videos</h1>
    <button-container
      title="View All"
      @click="viewAllVideos"
      v-if="movieVideos.length > 3"
    ></button-container>
  </div>
  <div style="padding: 10px; display: flex; flex-wrap: wrap">
    <div
      v-for="(video, index) of movieVideos"
      :key="video.key"
      style="padding: 30px"
    >
      <YouTube
        :src="youtube + video.key"
        @ready="movie"
        ref="youtube"
        width="500"
        v-if="index < 3 && !showAllVideos && !showAllCast"
      />
      <YouTube
        :src="youtube + video.key"
        @ready="movie"
        ref="youtube"
        width="500"
        v-if="showAllVideos"
      />
    </div>
  </div>
  <div style="margin-left: 30px" v-if="!showAllCast && !showAllVideos">
    <h1>User Reviews</h1>
  </div>
  <div>
    <div
      v-for="(review, index) of userReviews"
      :key="review.id"
      style="padding: 15px"
    >
      <div v-if="index < 3 && !showAllVideos && !showAllCast" class="reviews">
        <h3>{{ review.author }}</h3>
        <p>
          Rating:
          {{
            review.author_details.rating !== null
              ? `${review.author_details.rating}/10`
              : "No Rating"
          }}
        </p>
        <p>
          {{ review.content }}
        </p>
      </div>
    </div>
    <button-container
      title="View All Reviews"
      @click="viewAllReviews"
      v-if="userReviews.length > 3"
    ></button-container>
    <a-modal
      v-model:visible="visible"
      title="User Reviews"
      @ok="handleOk"
      bodyStyle="height: 600px; overflow-y: scroll"
    >
      <div v-for="review of userReviews" :key="review.id" style="padding: 15px">
        <div>
          <h3 style="color: black">{{ review.author }}</h3>
          <p style="color: black">
            Rating:
            {{
              review.author_details.rating !== null
                ? `${review.author_details.rating}/10`
                : "No Rating"
            }}
          </p>
          <p style="color: black">
            {{ review.content }}
          </p>
        </div>
        <hr />
      </div>
    </a-modal>
  </div>
</template>

<script>
import { store } from "../../store.js";
export default {
  data() {
    return {
      movieDetails: [],
      imagePath: "https://image.tmdb.org/t/p/w500",
      noImage:
        "https://thumbs.dreamstime.com/b/no-image-available-icon-photo-camera-flat-vector-illustration-132483141.jpg",
      movieCredits: [],
      allCast: [],
      genres: [],
      spliceCast: [],
      showAllCast: false,
      hovered: false,
      hoveredIndex: -1,
      liked: false,
      checked: false,
      movieVideos: [],
      youtube: "https://www.youtube.com/watch?v=",
      showAllVideos: false,
      userReviews: [],
      showAllReviews: false,
      visible: false,
      likedMovies: [],
      watchlistMovies: [],
      // isLiked: false
    };
  },
  created() {
    this.loadMovieDetails();
  },
  methods: {
    async loadMovieDetails() {
      this.movieDetails = await this.$store.getters["movies/movieDetails"];
      this.movieCredits = await this.$store.getters["movies/movieCredits"];
      this.movieVideos = await this.$store.getters["movies/movieVideos"];
      this.userReviews = await this.$store.getters["movies/movieReviews"];
      this.allCast = this.movieCredits.cast.filter(
        (cast) => cast.known_for_department === "Acting"
      );
      this.movieDetails.genres.forEach((g) => {
        this.genres.push(" " + g.name);
      });
      console.log(this.userReviews);
      this.movieVideos.forEach((video) => {
        console.log(video);
      });
      const cloneCast = this.allCast.slice(0);
      this.spliceCast = cloneCast.splice(0, 10);
      console.log(this.allCast, this.spliceCast);
      await this.$store.dispatch("movies/getLikedMovies", {
        username: store.loggedInUsername,
      });
      this.likedMovies = await this.$store.getters["movies/likedMovies"];
      this.liked =
        this.likedMovies.filter((f) => f.title === this.movieDetails.title)
          .length > 0;
      await this.$store.dispatch("movies/getWatchlistMovies", {
        username: store.loggedInUsername,
      });
      this.watchlistMovies = await this.$store.getters[
        "movies/watchlistMovies"
      ];
      this.checked =
        this.watchlistMovies.filter((f) => f.title === this.movieDetails.title)
          .length > 0;
    },
    viewAllCast() {
      console.log("clicked");
      this.showAllCast = true;
    },
    goBack() {
      this.showAllCast = false;
      this.showAllVideos = false;
    },
    viewAllVideos() {
      this.showAllVideos = true;
    },
    showOptions(i) {
      this.hovered = true;
      this.hoveredIndex = i;
    },
    hideOptions() {
      // this.hovered = false;
    },
    async openCeleb(cast) {
      await this.$store.dispatch("celebs/loadCelebDetails", cast.id);
      await this.$store.dispatch("celebs/loadCelebCredits", cast.id);
      this.$router.replace(`/celebs/${cast.id}`);
    },
    async likeContent(movie) {
      this.liked = !this.liked;
      let moviePayload = movie;
      moviePayload = { ...movie, username: store.loggedInUsername };
      await this.$store.dispatch("movies/addToLikedMovies", moviePayload);
    },
    async addContent(movie) {
      this.checked = true;
      let moviePayload = movie;
      moviePayload = { ...movie, username: store.loggedInUsername };
      await this.$store.dispatch("movies/addToWatchlistMovies", moviePayload);
    },
    removeContent() {
      this.checked = false;
    },
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
    viewAllReviews() {
      this.visible = true;
    },
    handleOk() {
      this.visible = false;
    },
    // onReady() {
    //   this.$refs.youtube.playVideo();
    // },
  },
};
</script>


<style scoped>
h1 {
  color: white;
  margin: 0px;
}
p {
  color: white;
}
h3 {
  color: white;
}
.movieContainer {
  width: 99vw;
  height: 93.4vh;
  border-radius: 15px;
  display: flex;
  overflow: hidden;
  position: relative;
  flex-direction: column;
}
.bc-image {
  opacity: 0.1;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: auto;
}
.cast {
  display: flex;
  padding: 10px;
  position: relative;
}
.actor {
  padding: 20px;
}
.infoContainer {
  display: flex;
  padding: 65px;
}
.content {
  padding-left: 100px;
  width: 55%;
  display: flex;
  flex-direction: column;
}
.tagline {
  color: gray;
  font-size: 18px;
  margin-top: -5px;
  font-style: italic;
  /* margin-top: 5px; */
}
.release {
  display: flex;
  justify-content: space-between;
  width: 70%;
  margin-top: -20px;
}
.rating {
  border: 2px solid;
  border-radius: 25px;
  width: 40px;
  height: 40px;
}
.number {
  padding-left: 5px;
  margin-top: 7px;
}
.castTitle {
  display: flex;
  justify-content: space-between;
  margin-left: 30px;
  margin-right: 30px;
  margin-top: 35px;
  position: relative;
}
.name {
  margin-bottom: 7px;
}
.char {
  color: gray;
  font-size: 13px;
}
.allCast {
  display: flex;
  padding: 10px;
  position: relative;
  flex-wrap: wrap;
}
.user {
  display: flex;
  justify-content: space-between;
  width: 20%;
}
.watchlist {
  display: flex;
  justify-content: space-between;
  width: 100px;
  margin-top: 7px;
  position: relative;
}
.ratingContainer {
  display: flex;
  justify-content: center;
  margin-top: 15px;
}
.actions {
  position: relative;
  display: flex;
  justify-content: space-between;
  width: 30%;
}
.overview {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 65%;
}
.movieDetails {
  border: 3px solid teal;
  border-radius: 20px;
  padding: 20px;
  width: 250px;
}
.reviews {
  border: 3px solid teal;
  border-radius: 15px;
  padding: 20px;
}
</style>