<template>
  <v-app>
    <v-main>
      <v-container>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="#48111c">
                <v-toolbar-title>Team 3 Tutoring Software</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <SocialLogin />
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import SocialLogin from "@/components/SocialLogin";
export default {
  name: "login",
  components: {
    SocialLogin,
  },
};
</script>
