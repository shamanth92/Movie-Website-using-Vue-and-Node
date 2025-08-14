<template>
  <div class="header">
    <p class="title">
      <img
        src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg"
        width="25"
        height="25"
      />
      Entertainment City
    </p>
    <div class="options">
      <p
        v-for="(header, index) in headerOptions"
        :key="header"
        @click="routeTo(header, index)"
        v-bind:style="{
          color: headerIndex === index ? 'teal' : 'white',
        }"
      >
        {{ header }}
      </p>
    </div>
    <!-- <a-modal
      v-model:visible="openLogin"
      title="Login to your Account"
      @ok="handleOk"
      bodyStyle="height: 300px;"
    >
      <template #footer>
      </template>
    </a-modal> -->
  </div>
</template>

<script>
import { reactive } from "vue";
import { store } from "./../store.js";

export default {
  data() {
    return {
      headerOptions: store.options,
      headerIndex: 0,
      openLogin: false,
      loginFormState: {},
      openRegister: false,
      registerFormState: {},
      showStatus: false,
      message: "",
    };
  },
  created() {
    this.loginFormState = reactive({
      username: "",
      password: "",
    });
    this.registerFormState = reactive({
      username: "",
      password: "",
      confirmPassword: "",
      email: "",
    });
  },
  methods: {
    routeTo(header, index) {
      console.log(header.includes("Logout"));
      if (header.includes("Logout") === false) {
        this.$router.replace(`/${header.toLowerCase()}`);
        this.headerIndex = index;
      } else {
        localStorage.removeItem("access-token");
        store.onLogout();
        console.log(store.options);
        this.headerOptions = store.options;
        this.$router.replace(`/`);
      }
    },
    handleOk() {
      this.openLogin = false;
      this.openRegister = false;
      this.loginFormState = reactive({
        username: "",
        password: "",
      });
      this.registerFormState = reactive({
        username: "",
        password: "",
        confirmPassword: "",
        email: "",
      });
    },
    handleLogin() {
      console.log(this.loginFormState);
      fetch("http://localhost:5000/api/movies/loginUser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: this.loginFormState.username,
          password: this.loginFormState.password,
        }),
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);
          if (data.status) {
            this.openLogin = false;
            this.openRegister = false;
          } else {
            this.showStatus = true;
            this.message = data.msg;
          }
        });
    },
    async handleRegister() {
      if (this.openRegister) {
        console.log(this.registerFormState);
        // await this.$store.dispatch("movies/registerNewUser", {
        //   username: this.registerFormState.username,
        //   password: this.registerFormState.password,
        //   email: this.registerFormState.email,
        // });
        fetch("http://localhost:5000/api/movies/registerNewUser", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: this.registerFormState.username,
            password: this.registerFormState.password,
            email: this.registerFormState.email,
          }),
        })
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            console.log(data);
            if (data.status) {
              this.showStatus = true;
              this.message = data.msg;
              this.openRegister = !this.openRegister;
            } else {
              this.showStatus = true;
              this.message = data.msg;
            }
          });
      } else {
        this.openRegister = !this.openRegister;
      }
    },
  },
};
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  background-color: black;
  color: white;
}
.title {
  margin-left: 35px;
  font-size: 20px;
  font-weight: bold;
  margin-top: 10px;
}
.options {
  display: flex;
  justify-content: space-between;
  width: 600px;
  margin-top: 14px;
  padding-right: 100px;
  cursor: pointer;
  font-size: 16px;
}
</style>
