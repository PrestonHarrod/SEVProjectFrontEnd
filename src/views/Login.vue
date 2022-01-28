<template>
  <v-container>
        <v-row>
            <v-col>
              <SocialLogin/>
            </v-col>
        </v-row>
    </v-container>
</template>


<script>
import SocialLogin from '@/components/SocialLogin'
export default {
  name: 'login',
  components: {
    SocialLogin
  }
}
</script>