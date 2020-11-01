<template>
  <div class="home">
    <img @click="openRestaurant" alt="Vue logo" src="../_assets/logo.png">
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({})
export default class Home extends Vue {
  public openRestaurant() {
    this.$router.push('/restaurants/1');
  }
}
</script>
