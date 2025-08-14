import { reactive } from "vue";

export const store = reactive({
  options: ["Home", "Movies", "TV", "Celebs", "List"],
  loggedInUsername: "",
  onLogin(username) {
    this.options.push(username + " (Logout)");
  },
  onLogout() {
    this.options = ["Home", "Movies", "TV", "Celebs", "List"];
  },
  setUsername(username) {
    this.loggedInUsername = username;
  },
});
