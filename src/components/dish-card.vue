<template>
  <div v-if="dish.id" class="dish" :class="{ disabled: dish.sold }">
    <div class="dish-info">
      <div class="dish-title">{{ dish.name }}</div>
      <div v-if="dish.sold" class="dish-availability">Немає у наявності</div>
      <div class="dish-text">{{ dish.description | truncate(170) }}</div>
      <div class="dish-price">
        <span v-if="dish.discountedPrice">₴ {{ dish.discountedPrice }}</span>
        <span :class="{ discounted: dish.discountedPrice }">₴ {{ dish.price }}</span>
      </div>
    </div>
    <div class="dish-image">
      <img :src="dish.photo" alt="dish.name" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({})
export default class DishCard extends Vue {
    @Prop() public dish!: Dish;
}

export interface Dish {
    name: string;
    description: string;
    photo: string;
    isAlcohol: boolean;
    sold?: boolean;
    categoryId?: number;
    id: number;
    price: number;
    discountedPrice: number;
    discountPercents: number;
    weight: number;
  }
</script>

<style lang="sass" scoped>
  .dish
    padding: 40px
    background-color: $lightgray
    display: flex
    width: 100%
    height: 300px
    transition: .5s all
    cursor: pointer
    @include bp-768
      flex-direction: column
      height: auto
      padding: 20px
    @include bp-480
      padding: 10px
    &.disabled
      opacity: .5
    &-info
      display: flex
      flex-flow: column
      min-width: 50%
      justify-content: space-between
    &-title
      font-weight: 600
      line-height: 150%
      font-size: 20px
    &-availability
      color: $pink
      font-size: 16px
      font-weight: 500
      margin-top: 10px
      margin-bottom: 10px

    &-text
      font-size: 14px
      line-height: 150%
      opacity: .5
      margin: auto 0 20px 0
      padding-right: 15px
    &-price
      font-size: 26px
      font-weight: bold
      color: $pink
      .discounted
        text-decoration: line-through
        margin-left: 10px
        color: lighten($pink, 20)
    &-image
      min-width: 50%
      @include bp-768
        margin-bottom: 20px
        display: flex
        justify-content: center
        order: -5
      img
        width: 100%
        height: 100%
        object-fit: cover
        object-position: center
        @include bp-768
          height: 300px
        @include bp-480
          height: 200px
</style>
