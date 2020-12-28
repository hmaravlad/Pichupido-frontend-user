<template>
  <div id="app">
    <div id="scroll">
      <router-view />
    </div>
    <modal-view v-on:open="open" v-on:close="close" />
    <app-footer />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Footer from '@/_shared/components/footer.vue';

@Component({
  components: {
    'app-footer': Footer,
  },
})
export default class App extends Vue {
    open = () => {
      console.log('aaaa');
      document.body.classList.add('scroll-in-body');
    };

    close = () => {
      document.body.classList.remove('scroll-in-body');
    };
}
</script>

<style lang="sass">
  @import "_sass/app"
  .scroll-in-body
    overflow: hidden
  .no-scroll-in-body
    overflow: auto
</style>
