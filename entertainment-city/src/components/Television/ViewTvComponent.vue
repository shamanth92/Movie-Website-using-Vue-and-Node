<template>
  <div class="movieContainer" v-if="!showAllCast">
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
          <h1>
            {{ movieDetails.original_name }} ({{
              movieDetails.first_air_date.split("-")[0]
            }}
            -
            {{
              movieDetails.status === "Ended"
                ? movieDetails.last_air_date.split("-")[0]
                : " "
            }})
          </h1>
          <p class="tagline">{{ movieDetails.tagline }}</p>
          <!-- <div class="release">
            <p>{{ genres.toString() }}</p>
            <p>First Air Date: {{ movieDetails.first_air_date }}</p>
            <p>
              Runtime: {{ Math.floor(runTime[0] / 60) }}h
              {{ runTime[0] % 60 }}min
            </p>
          </div> -->
          <!-- <div class="user">
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
              <p class="number">{{ movieDetails.vote_average * 10 }}%</p>
            </div>
            
          </div> -->
        </div>

        <div class="overview">
          <div>
            <h3>Overview</h3>
            <p>{{ movieDetails.overview }}</p>
          </div>
          <div class="stream">
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
            <div style="margin-top: 10px">
              <h3>Stream On: {{ movieDetails.networks[0].name }}</h3>
            </div>
            <div style="margin-top: 10px">
              <h3>
                <a @click="openGuide()">View All Seasons and Episodes</a>
              </h3>
              <a-modal
                v-model:visible="visible"
                title="Seasons & Episodes"
                @ok="handleOk"
                bodyStyle="height: 600px; overflow-y: scroll"
              >
                <a-tabs v-model:activeKey="activeKey">
                  <a-tab-pane
                    v-for="(season, index) in allEpisodes"
                    :key="index"
                    :tab="`Season ${index + 1}`"
                  >
                    <div
                      v-for="episode in season"
                      :key="episode.id"
                      style="margin-bottom: 20px"
                    >
                      <div
                        style="display: flex; justify-content: space-between"
                      >
                        <h3 style="color: black">{{ episode.name }}</h3>
                        <p style="color: grey; font-style: italic">
                          Rating: {{ episode.vote_average.toFixed(1) }}
                        </p>
                        <p style="color: grey; font-style: italic">
                          Aired On: {{ episode.air_date }}
                        </p>
                      </div>
                      <p style="color: grey">
                        {{ episode.overview }} ({{ episode.runtime }}min)
                      </p>
                      <hr />
                    </div>
                  </a-tab-pane>
                </a-tabs>
              </a-modal>
            </div>
            <!-- <div class="network">
              <p>Watch now:</p>
              <a :href="streamLink" target="_blank"
                ><img
                  :src="imagePath + movieDetails.networks[0].logo_path"
                  alt="Movies"
                  width="125"
                  height="40"
                  class="imageContent"
              /></a>
            </div> -->
          </div>
        </div>
      </div>
      <div style="padding-left: 100px">
        <div class="tvDetails">
          <div>
            <h3>Genre:</h3>
            <p>{{ genres.toString() }}</p>
          </div>
          <div>
            <h3>First Air Date:</h3>
            <p>{{ movieDetails.first_air_date }}</p>
          </div>
          <div>
            <h3>Season and Episodes:</h3>
            <p>
              {{ movieDetails.number_of_seasons }} seasons,
              {{ movieDetails.number_of_episodes }} episodes
            </p>
          </div>
          <div class="user">
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
          <!-- <div>
            <p>Status:</p>
            <p>{{ movieDetails.status }}</p>
          </div> -->
        </div>
      </div>
    </div>
    <div class="castTitle">
      <h3>Cast</h3>
      <button-container
        title="View All"
        @click="viewAllCast"
      ></button-container>
    </div>
    <div class="allCast">
      <div v-for="(cast, index) in spliceCast" :key="cast.name" class="actor">
        <img
          :src="imagePath + cast.profile_path"
          alt="Movies"
          width="150"
          height="200"
          class="imageContent"
          @mouseover="showOptions(index)"
          @mouseleave="hideOptions"
          v-bind:style="{
            opacity: hovered && index === hoveredIndex ? '0.3' : '1',
            cursor: 'pointer',
          }"
          @click="openCeleb(cast)"
        />
        <p class="name">{{ cast.name }}</p>
        <p class="char">{{ cast.character }}</p>
      </div>
    </div>
  </div>

  <div v-if="showAllCast">
    <div class="castTitle">
      <h3>Cast</h3>
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
          :src="imagePath + cast.profile_path"
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
</template>

<script>
import setLinks from "../../links.js";
import { useRoute } from "vue-router";
import { ref } from "vue";
import { store } from "../../store.js";

export default {
  data() {
    return {
      movieDetails: [],
      imagePath: "https://image.tmdb.org/t/p/w500",
      movieCredits: [],
      allCast: [],
      genres: [],
      runTime: [],
      streamLink: "",
      trailers: [],
      spliceCast: [],
      showAllCast: false,
      hovered: false,
      hoveredIndex: -1,
      liked: false,
      checked: false,
      iFrameLink: "",
      episodesAndseasons: [],
      visible: false,
      allEpisodes: [],
      activeKey: ref(0),
      likedTv: [],
      watchlistTv: [],
    };
  },
  created() {
    this.loadMovieDetails();
  },
  methods: {
    async loadMovieDetails() {
      this.movieDetails = await this.$store.getters["tv/tvDetails"];
      this.movieCredits = await this.$store.getters["tv/tvCredits"];
      this.allCast = this.movieCredits.cast.filter(
        (cast) => cast.known_for_department === "Acting"
      );
      this.movieDetails.genres.forEach((g) => {
        this.genres.push(" " + g.name);
      });
      this.movieDetails.episode_run_time.forEach((t) => {
        this.runTime.push(t);
      });
      const cloneCast = this.allCast.slice(0);
      this.spliceCast = cloneCast.splice(0, 10);
      this.streamLink = setLinks(this.movieDetails.networks[0].name);
      const route = useRoute();
      console.log(route.params);
      for (let i = 0; i < this.movieDetails.number_of_seasons; i++) {
        await this.$store.dispatch("tv/loadTvEpisodesAndSeasons", {
          id: route.params.id,
          num: i + 1,
        });
        this.episodesAndseasons = await this.$store.getters[
          "tv/tvEpisodesAndSeasons"
        ];
        this.allEpisodes.push(this.episodesAndseasons);
      }
      console.log(this.allEpisodes);
      await this.$store.dispatch("movies/getLikedTv", {
        username: store.loggedInUsername,
      });
      await this.$store.dispatch("movies/getWatchlistTv", {
        username: store.loggedInUsername,
      });
      this.likedTv = await this.$store.getters["movies/likedTv"];
      console.log(this.likedTv, this.movieDetails);
      this.liked =
        this.likedTv.filter((f) => f.title === this.movieDetails.name).length >
        0;
      this.watchlistTv = await this.$store.getters["movies/watchlistTv"];
      this.checked =
        this.watchlistTv.filter((f) => f.title === this.movieDetails.name)
          .length > 0;
    },
    async playTrailer(movieId) {
      await this.$store.dispatch("tv/loadTvVideos", movieId);
      this.trailers = await this.$store.getters["tv/tvVideos"];
      console.log(this.trailers);
      this.trailers.forEach((t) => {
        if (t.type === "Trailer") {
          this.trailerLink = `https://www.youtube.com/watch?v=${t.key}`;
          this.iFrameLink = `https://www.youtube.com/embed/${t.key}`;
        }
      });
      let windowFeatures = "width=1500,height=1000";
      // window.open(this.trailerLink, "youtubetrailer", windowFeatures);
      window.open(this.iFrameLink, "youtubetrailer", windowFeatures);
    },
    viewAllCast() {
      this.showAllCast = true;
    },
    goBack() {
      this.showAllCast = false;
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
    async likeContent(tv) {
      this.liked = !this.liked;
      let tvPayload = tv;
      tvPayload = { ...tv, username: store.loggedInUsername };
      await this.$store.dispatch("movies/addToLikedTv", tvPayload);
    },
    async addContent(tv) {
      this.checked = true;
      let tvPayload = tv;
      tvPayload = { ...tv, username: store.loggedInUsername };
      await this.$store.dispatch("movies/addToWatchlistTv", tvPayload);
    },
    removeContent() {
      this.checked = false;
    },
    async openGuide() {
      this.visible = true;
    },
    handleOk() {
      this.visible = false;
    },
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
  width: 100vw;
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
.tagline {
  color: gray;
  font-size: 20px;
}
.release {
  display: flex;
  justify-content: space-between;
  width: 75%;
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
.seasons {
  display: flex;
  justify-content: space-between;
  width: 20%;
  margin-top: -20px;
}
.content {
  padding-left: 100px;
  width: 60%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.castTitle {
  display: flex;
  justify-content: space-between;
  margin-left: 30px;
  margin-right: 30px;
  position: relative;
}
.name {
  margin-bottom: 7px;
}
.char {
  color: gray;
  font-size: 13px;
}
.stream {
  color: white;
  position: relative;
  display: flex;
  justify-content: space-between;
  width: 90%;
}
.network {
  display: flex;
  justify-content: space-between;
  width: 225px;
  position: relative;
}
.allCast {
  display: flex;
  padding: 10px;
  position: relative;
  flex-wrap: wrap;
}
/* .user {
  display: flex;
  justify-content: space-between;
  width: 20%;
} */
.watchlist {
  display: flex;
  justify-content: space-between;
  width: 100px;
  margin-top: 7px;
  position: relative;
}
.overview {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 65%;
}
.tvDetails {
  border: 3px solid teal;
  border-radius: 20px;
  padding: 20px;
  width: 250px;
}
</style>