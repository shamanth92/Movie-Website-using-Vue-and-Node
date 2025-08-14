<template>
  <div style="background: linear-gradient(to right, teal, black, teal)">
    <the-header></the-header>
    <router-view></router-view>
  </div>
</template>


<script>
import TheHeader from "./components/TheHeader.vue";

export default {
  components: {
    TheHeader,
  },
};
</script>

<style>
body {
  padding: 0px;
  margin: 0px;
}
/* html {
  background-color: #121212;
} */
</style>

// - Login/Register API
// - Save data based on user
// - Show saved on load
// - Media Queries
// - Fixes
// - Folder Structure

