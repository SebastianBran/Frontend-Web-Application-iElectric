<template>
  <v-container class="d-flex flex-lg-row flex-column mt-5 container">
    <v-container>
      <h1>Login</h1>
      <v-img
          src="../../assets/img/user.png"
          max-width="200px"
          alt="user image"
          class="mx-auto mt-10"
      ></v-img>
    </v-container>
    <v-container>
      <h2 class="mb-6">Welcome back</h2>

      <v-form
          ref="form"
          v-model="form.isValid"
      >
        <p
            class="mb-4 red--text"
            :class="wrongEmailOrPassword ? 'd-block' : 'd-none'"
        >Wrong email or password</p>

        <v-text-field
            v-model="form.email"
            label="Email"
            :rules="[rules.required, rules.email]"
            outlined
        ></v-text-field>
        <v-text-field
            v-model="form.password"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required]"
            :type="showPassword ? 'text' : 'password'"
            name="input-password"
            label="Password"
            outlined
            @click:append="showPassword = !showPassword"
        ></v-text-field>

        <div class="d-flex">
          <a>I forgot my password</a>

          <v-spacer></v-spacer>

          <v-btn
              color="primary"
              :disabled="!this.form.isValid"
              @click="login()"
          >
            Login
          </v-btn>
        </div>
      </v-form>
    </v-container>
  </v-container>
</template>

<script>
import ClientsApiService from '../../core/services/clients-api-service';
import TechniciansApiService from '../../core/services/technicians-api-service';
import AdministratorsApiService from '../../core/services/administrators-api-service';

export default {
  name: "Login",
  data() {
    return {
      showPassword: false,
      form: {
        email: "",
        password: "",
        isValid: false
      },
      rules: {
        required: v => !!v || 'Required',
        email: v => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(v) || 'Invalid e-mail.'
        }
      },
      wrongEmailOrPassword: false
    }
  },
  methods: {
    submit() {
      this.form = { email: "", password: "" };
    },
    async login() {
      let noLogin = true;

      await ClientsApiService.getByEmailAndPassword(this.form.email, this.form.password)
        .then(response => {
          if (response.data.length !== 0) {
            localStorage.setItem('userId', response.data[0].id.toString());
            noLogin = false;
            this.$router.push("/client");
          }
        })
        .catch(e => {
          console.log(e);
        });

      if (noLogin) {
        await TechniciansApiService.getByEmailAndPassword(this.form.email, this.form.password)
          .then(response => {
            if (response.data.length !== 0) {
              localStorage.setItem('userId', response.data[0].id.toString());
              noLogin = false;
              this.$router.push("/technician");
            }
          })
          .catch(e => {
            console.log(e);
          });
      }

      if (noLogin) {
        await AdministratorsApiService.getByEmailAndPassword(this.form.email, this.form.password)
          .then(response => {
            if (response.data.length !== 0) {
              localStorage.setItem('userId', response.data[0].id.toString());
              noLogin = false;
              this.$router.push("/administrator");
            }
          })
          .catch(e => {
            console.log(e);
          });
      }

      if (noLogin) {
        this.wrongEmailOrPassword = true;
      }
      else {
        this.submit();
      }
    }
  }
}
</script>

<style scoped>
  .container {
    max-width: 1200px;
  }
</style>