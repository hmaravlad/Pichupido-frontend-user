<template>
  <div class="loader-wrapper">
    <div class="loader">
      <span></span>
      <span></span>
      <span></span>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({})
export default class AppLoader extends Vue {}
</script>

<style lang="sass" scoped>
.loader-wrapper
  text-align: center
  height: 20px
  display: flex
  justify-content: center

.loader
  display: flex
  align-items: center

span
  margin: 0 4px
  display: block
  height: 20px
  width: 1px
  transition: .5s all
  background-color: #000
  &:first-child
    animation: anim 1s linear 0ms infinite
  &:nth-child(2)
    animation: anim 1s linear 200ms infinite
  &:last-child
    animation: anim 1s linear 400ms infinite

@keyframes anim
  0%
    height: 20px
  50%
    height: 8px
  100%
    height: 20px
</style>
