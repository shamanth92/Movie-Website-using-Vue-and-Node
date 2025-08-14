<template>
  <div class="searchAndSwitch">
    <a-radio-group v-model:value="tvOption" button-style="solid">
      <a-radio-button value="Top Rated" style="width: 150px"
        >Top Rated</a-radio-button
      >
      <a-radio-button value="Popular" style="width: 150px"
        >Popular</a-radio-button
      >
      <a-radio-button value="Airing Today" style="width: 150px"
        >Airing Today</a-radio-button
      >
    </a-radio-group>
    <div class="searchInput">
      <search-component type="tv"></search-component>
    </div>
  </div>
  <div class="tvContainer" v-if="tvOption === 'Top Rated'">
    <div v-for="(tv, index) of topRatedTv" :key="tv.name" class="movieContent">
      <div class="content" @click="openTv(tv)">
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
              :src="imagePath + tv.poster_path"
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
        <div class="title">{{ tv.name }}</div>
      </div>
    </div>
  </div>
  <button-container
    v-if="tvOption === 'Top Rated'"
    title="Load More"
    @click="loadMoreTv('topRated')"
  ></button-container>
  <div class="tvContainer" v-if="tvOption === 'Popular'">
    <div
      v-for="(tv, index) of onTelevision"
      :key="tv.name"
      class="movieContent"
    >
      <div class="content" @click="openTv(tv)">
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
              :src="imagePath + tv.poster_path"
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
        <div class="title">{{ tv.name }}</div>
      </div>
    </div>
  </div>
  <button-container
    v-if="tvOption === 'Popular'"
    title="Load More"
    @click="loadMoreTv('popular')"
  ></button-container>
  <div class="tvContainer" v-if="tvOption === 'Airing Today'">
    <div
      v-for="(tv, index) of airingTodayTv"
      :key="tv.name"
      class="movieContent"
    >
      <div class="content" @click="openTv(tv)">
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
              :src="imagePath + tv.poster_path"
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
        <div class="title">{{ tv.name }}</div>
      </div>
    </div>
  </div>
  <button-container
    v-if="tvOption === 'Airing Today'"
    title="Load More"
    @click="loadMoreTv('airingToday')"
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
      topRated: true,
      onTv: false,
      airingToday: false,
      topRatedTv: [],
      onTelevision: [],
      airingTodayTv: [],
      loadTopRated: [],
      topRatedNumber: 1,
      loadOnTv: [],
      onTvNumber: 1,
      loadAiring: [],
      airingNumber: 1,
      imagePath: "https://image.tmdb.org/t/p/w500",
      hovered: false,
      hoveredIndex: -1,
      activeKey: ref("1"),
      tvOption: ref("Top Rated"),
    };
  },
  async created() {
    await this.$store.dispatch("tv/loadTopRatedTv", this.topRatedNumber);
    this.topRatedTv = await this.$store.getters["tv/topRatedTv"];
    // await this.$store.dispatch("tv/loadOnTv");
    // this.onTelevision = await this.$store.getters["tv/onTv"];
    this.onTelevision = await this.$store.getters["tv/popularTv"];
    await this.$store.dispatch("tv/loadAiringToday", this.airingNumber);
    this.airingTodayTv = await this.$store.getters["tv/airingToday"];
    console.log(this.topRatedTv);
  },
  methods: {
    setTopRated() {
      this.topRated = true;
      this.onTv = false;
      this.airingToday = false;
      console.log(this.popularMovies);
    },
    setOnTv() {
      this.topRated = false;
      this.onTv = true;
      this.airingToday = false;
    },
    setAiringToday() {
      this.topRated = false;
      this.onTv = false;
      this.airingToday = true;
    },
    showOptions(i) {
      this.hovered = true;
      this.hoveredIndex = i;
    },
    hideOptions() {
      this.hovered = false;
    },
    async loadMoreTv(tab) {
      if (tab === "topRated") {
        this.topRatedNumber = this.topRatedNumber + 1;
        await this.$store.dispatch("tv/loadTopRatedTv", this.topRatedNumber);
        this.loadTopRated = await this.$store.getters["tv/topRatedTv"];
        this.loadTopRated.forEach((movie) => {
          this.topRatedTv.push(movie);
        });
      } else if (tab === "popular") {
        this.onTvNumber = this.onTvNumber + 1;
        await this.$store.dispatch("tv/loadPopularTv", this.onTvNumber);
        this.loadOnTv = await this.$store.getters["tv/popularTv"];
        this.loadOnTv.forEach((movie) => {
          this.onTelevision.push(movie);
        });
      } else if (tab === "airingToday") {
        this.airingNumber = this.airingNumber + 1;
        await this.$store.dispatch("tv/loadAiringToday", this.airingNumber);
        this.loadAiring = await this.$store.getters["tv/airingToday"];
        this.loadAiring.forEach((movie) => {
          this.airingTodayTv.push(movie);
        });
      }
    },
    async openTv(tv) {
      await this.$store.dispatch("tv/loadTvDetails", tv.id);
      await this.$store.dispatch("tv/loadTvCredits", tv.id);
      this.$router.replace(`/tv/${tv.id}`);
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
  border-radius: 25px;
  /* box-shadow: 0px 0px 2px 2px white; */
}
.imageContent {
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
.tvContainer {
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
