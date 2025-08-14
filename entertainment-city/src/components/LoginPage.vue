<template>
  <div
    style="
      height: 93.4vh;
      display: flex;
      align-items: center;
      justify-content: center;
    "
  >
    <img
      class="bc-image"
      src="https://images.pexels.com/photos/1040159/pexels-photo-1040159.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      alt="Movies"
      width="200"
      height="275"
    />
    <div
      style="
        background-color: black;
        height: 55vh;
        width: 35vw;
        border-radius: 15px;
      "
    >
      <div
        style="
          display: flex;
          align-items: center;
          flex-direction: column;
          margin-top: 15px;
        "
      >
        <p style="color: teal; font-size: 24px">
          Welcome to Entertainment City!
        </p>
        <p style="color: teal; font-size: 20px">
          Create a new account or login to explore movies and tv shows
        </p>
      </div>
      <div
        v-if="!this.openRegister"
        style="
          height: 300px;
          padding: 30px;
          display: flex;
          justify-content: center;
        "
      >
        <a-form
          :model="loginFormState"
          name="basic"
          :label-col="{ span: 8 }"
          :wrapper-col="{ span: 16 }"
          autocomplete="off"
        >
          <a-form-item
            label="Username"
            name="username"
            :rules="[
              { required: true, message: 'Please input your username!' },
            ]"
          >
            <a-input v-model:value="loginFormState.username" />
          </a-form-item>

          <a-form-item
            label="Password"
            name="password"
            :rules="[
              { required: true, message: 'Please input your password!' },
            ]"
          >
            <a-input-password v-model:value="loginFormState.password" />
          </a-form-item>
        </a-form>
      </div>

      <div
        v-if="this.openRegister"
        style="
          height: 300px;
          padding: 30px;
          display: flex;
          justify-content: center;
        "
      >
        <a-form
          :model="registerFormState"
          name="basic"
          :label-col="{ span: 8 }"
          :wrapper-col="{ span: 16 }"
          autocomplete="off"
        >
          <a-form-item
            label="Username"
            name="username"
            :rules="[
              { required: true, message: 'Please input your username!' },
            ]"
          >
            <a-input v-model:value="registerFormState.username" />
          </a-form-item>

          <a-form-item
            label="Password"
            name="password"
            :rules="[
              { required: true, message: 'Please input your password!' },
            ]"
          >
            <a-input-password v-model:value="registerFormState.password" />
          </a-form-item>

          <a-form-item
            label="Confirm Password"
            name="confirmPassword"
            :rules="[
              { required: true, message: 'Please input your password!' },
            ]"
          >
            <a-input-password
              v-model:value="registerFormState.confirmPassword"
            />
          </a-form-item>

          <a-form-item
            label="Email"
            name="email"
            :rules="[{ required: true, message: 'Please input your email!' }]"
          >
            <a-input v-model:value="registerFormState.email" />
          </a-form-item>
        </a-form>
      </div>
      <div style="color: red; display: flex; justify-content: center">
        <p v-if="showStatus">{{ message }}</p>
      </div>

      <div
        style="
          display: flex;
          justify-content: space-between;
          width: 35%;
          float: right;
          padding: 20px;
        "
      >
        <a-button v-if="this.openRegister" key="back" @click="handleOk"
          >Cancel</a-button
        >
        <a-button
          key="submit"
          type="primary"
          :loading="loading"
          @click="handleLogin"
          v-if="!this.openRegister"
          >Login</a-button
        >
        <a-button
          key="submit"
          type="primary"
          :loading="loading"
          @click="handleRegister"
          >{{ !this.openRegister ? "New User?" : "Register" }}</a-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from "vue";
import { store } from "./../store.js";

export default {
  data() {
    return {
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
            store.onLogin(this.loginFormState.username);
            store.setUsername(this.loginFormState.username);
            this.$router.replace(`/home`);
            localStorage.setItem("access-token", data.token);
          } else {
            this.showStatus = true;
            this.message = data.msg;
          }
        });
    },
    async handleRegister() {
      if (this.openRegister) {
        console.log(this.registerFormState);
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
.bc-image {
  opacity: 0.2;
  position: absolute;
  left: 0;
  top: 62px;
  width: 100%;
  height: auto;
}
</style>