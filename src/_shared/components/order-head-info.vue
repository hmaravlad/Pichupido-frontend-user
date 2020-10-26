<template>
  <div class="order-row">
    <div v-if="order" class="restaurant">
      <div class="restaurant-logo">
        <img :src="order.restaurant.vendor.logo" :alt="order.restaurant.name" />
      </div>
      <div class="restaurant-info">
        <p class="restaurant-name">{{ order.restaurant.name }}</p>
        <p class="restaurant-time">{{ orderDate() }}</p>
        <p class="restaurant-summary">₴ {{ order.totalPrice }}</p>
      </div>
    </div>
    <div class="order-slot">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({})
export default class OrderHeadInfo extends Vue {
  @Prop() order: any;

  public orderDate() {
    const date = new Date(this.order.createdAt);
    return (
      `${date.getFullYear()
      }-${
        date.getMonth() + 1
      }-${
        date.getDate()
      } ${
        date.getHours()
      }:${
        date.getMinutes()
      }:${
        date.getSeconds()}`
    );
  }
}
</script>

<style lang="sass" scoped>
.order-row
  display: flex
  align-items: center
  .order-slot
    display: flex
    width: 100%
  @include bp-768
    flex-wrap: wrap
    padding-bottom: 20px

.restaurant
  display: flex
  align-items: center
  padding: 20px 0
  cursor: pointer
  user-select: none
  min-width: 300px
  &:hover
    .restaurant-name
      color: $pink
    .restaurant-more
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
    padding-left: 20px
    text-align: left
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
  &-summary
    color: $pink
    font-weight: 600
    font-size: 14px
  @include bp-768
    flex-wrap: wrap
    &-info
      width: calc(100% - 60px)
      margin-bottom: 20px
</style>
