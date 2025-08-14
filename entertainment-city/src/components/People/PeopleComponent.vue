<template>
  <h2 style="padding: 15px; color: white">Popular Celebs</h2>
  <div class="movieContainer">
    <div
      v-for="(celeb, index) of celebs"
      :key="celeb.name"
      class="movieContent"
    >
      <div class="content">
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
              :src="imagePath + celeb.profile_path"
              alt="Movies"
              height="225"
              class="imageContent"
              @mouseover="showOptions(index)"
              @mouseleave="hideOptions"
              @click="openCeleb(celeb)"
              v-bind:style="{
                opacity: hovered && index === hoveredIndex ? '0.3' : '1',
                cursor: 'pointer',
              }"
            />
          </template>
        </a-card>
        <div class="title">{{ celeb.name }}</div>
      </div>
    </div>
  </div>
  <button-container
    title="Load More"
    @click="loadMoreCelebs()"
  ></button-container>
</template>

<script>
export default {
  data() {
    return {
      celebs: [],
      imagePath: "https://image.tmdb.org/t/p/w500",
      hovered: false,
      hoveredIndex: -1,
      celebNumber: 1,
      loadCelebs: [],
    };
  },
  async created() {
    this.celebs = await this.$store.getters["celebs/celebs"];
  },
  methods: {
    showOptions(i) {
      this.hovered = true;
      this.hoveredIndex = i;
    },
    hideOptions() {
      this.hovered = false;
    },
    async loadMoreCelebs() {
      this.celebNumber = this.celebNumber + 1;
      await this.$store.dispatch("celebs/loadCelebs", this.celebNumber);
      this.loadCelebs = await this.$store.getters["celebs/celebs"];
      this.loadCelebs.forEach((movie) => {
        this.celebs.push(movie);
      });
    },
    async openCeleb(celeb) {
      await this.$store.dispatch("celebs/loadCelebDetails", celeb.id);
      await this.$store.dispatch("celebs/loadCelebCredits", celeb.id);
      this.$router.replace(`/celebs/${celeb.id}`);
    },
  },
};
</script>

<style scoped>
div {
  color: white;
}
h1 {
  color: white;
}
.content {
  /* width: 225px; */
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
.movieContainer {
  display: flex;
  flex-wrap: wrap;
}
</style>
