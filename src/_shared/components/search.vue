<template>
  <div class="search">
    <div class="input-container">
      <input
        :value="value"
        ref="field"
        @input="dataUpdate()"
        class="input"
        type="text"
        @focus="isFocused = true"
        @blur="isFocused = false"
        placeholder="Search..."
      />
      <span class="icon-container">
        <app-icon v-if="!isFocused" class="icon-search" name="search" />
        <app-icon v-if="isFocused" class="icon-close" name="close" />
      </span>
    </div>

    <!--<div class="dropdown" :class="{ open: isFocused }">-->
    <!--<div class="restaurant">-->
    <!--<div class="restaurant-logo">-->
    <!--<img src="../_assets/content/ugly-logo.jpg" alt="" />-->
    <!--</div>-->
    <!--<div class="restaurant-info">-->
    <!--<p class="restaurant-name">Ugly dumpling</p>-->
    <!--<p class="restaurant-time">Today 9:00-20:00</p>-->
    <!--<p class="restaurant-distance"><app-icon name="distance"></app-icon>1,2 miles away</p>-->
    <!--</div>-->
    <!--</div>-->

    <!--<div class="restaurant">-->
    <!--<div class="restaurant-logo">-->
    <!--<img src="../_assets/content/ugly-logo.jpg" alt="" />-->
    <!--</div>-->
    <!--<div class="restaurant-info">-->
    <!--<p class="restaurant-name">Ugly dumpling</p>-->
    <!--<p class="restaurant-time closed">Now closed</p>-->
    <!--<p class="restaurant-distance"><app-icon name="distance"></app-icon>1,2 miles away</p>-->
    <!--</div>-->
    <!--</div>-->

    <!--<div class="show-more">-->
    <!--<span>Show all 10 results</span>-->
    <!--</div>-->
    <!--</div>-->
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({})
export default class Search extends Vue {
  @Prop() value: any;

  public isFocused = false;

  public keyword = '';

  public dataUpdate() {
    this.$emit('input', (this.$refs.field as Vue & { value: () => string }).value);
  }
}
</script>

<style lang="sass" scoped>
.search
  position: relative
  z-index: 1000

.input-container
  width: 300px
  position: relative
  .icon-container
    position: absolute
    top: 50%
    right: 5%
    transform: translateY(-50%)
    cursor: pointer
    display: flex
    justify-content: center

.input
  width: 300px
  background-color: $lightgray
  font-size: 16px
  padding-right: 50px
  transition: .5s all
  +placeholder
    font-weight: 300
    font-size: 16px
    font-style: italic
  &:focus
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1)
    background-color: $white
.dropdown
  background-color: $white
  position: absolute
  margin-top: 10px
  width: 300px
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1)
  border-radius: 6px
  max-height: 0
  overflow: hidden
  transition: .5s all
  .show-more
    font-size: 14px
    color: $pink
    height: 60px
    border-top: 1px solid #E4E8EB
    display: flex
    align-items: center
    justify-content: center
    span
      cursor: pointer
      user-select: none
      &:hover
        color: darken($pink, 20)
  &.open
    max-height: 1000px

.restaurant
  display: flex
  align-items: center
  padding: 20px
  cursor: pointer
  user-select: none
  &:hover
    .restaurant-name
      color: $pink
  &-logo
    height: 60px
    width: 60px
    border-radius: 50%
    overflow: hidden
    img
      height: 100%
      width: 100%
      object-fit: cover
  &-info
    margin-left: 20px
  &-name
    color: $dark
    font-size: 16px
    font-family: $Montserrat
    font-weight: 600
    transition: .5s all
  &-time
    color: $darkgray
    font-size: 12px
    margin: 6px 0
    &.closed
      font-weight: bold
      color: $pink
  &-distance
    color: $darkgray
    font-size: 12px
    .icon
      margin-right: 5px
</style>
