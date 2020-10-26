<template>
  <div v-if="restaurant">
    <div class="head" :style="`background-image: url(${restaurant.cover});`">
      <app-header class="restaurant-header" />
      <div class="container">
        <div class="restaurant-logo">
          <img :src="restaurant.logo" :alt="restaurant.name" />
        </div>
        <div class="title title-white">{{ restaurant.name }}</div>

        <div class="restaurant-info">
          <div class="restaurant-info-block">
            <button @click="openRestaurantModal" class="btn-white-o">Venue information</button>
          </div>
          <div class="restaurant-info-block">
            <p class="restaurant-info-title"><app-icon name="location" />Location</p>
            <p class="restaurant-info-text">{{ restaurant.location }}</p>
          </div>
          <div class="restaurant-info-block">
            <p class="restaurant-info-title"><app-icon name="clock" />Open times</p>
            <p class="restaurant-info-text">{{ restaurant.todayWorkHours }}</p>
          </div>
        </div>
      </div>
    </div>

    <div v-if="categoryId" class="menu">
      <div class="container">
        <div class="tabs">
          <ul>
            <li
              v-for="c of categories"
              @click="setCategory(c)"
              :key="c.id"
              class="checked"
              :class="{ 'is-active': isCategory(c.id) }"
            >
              {{ c.name }}
            </li>
          </ul>
        </div>

        <div v-if="category.availability" class="category-availability">
          <app-icon name="clock" />
          {{ category.availability }}
        </div>

        <div v-for="c of categories" :key="c.id">
          <div v-if="isCategory(c.id)" class="dishes" v-bind:class="{ 'menu-close': c.isClosed }">
            <div class="dish-wrapper" @click="!d.sold ? onDishClick(d) : null" v-for="d of dishes" :key="d.id">
              <dish-card :dish="d" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else>
      <div class="subtitle menu-holder">
        Menu for this restaurant is coming soon...
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import DishCard, { Dish } from '@/components/dish-card.vue';
import http from '@/_shared/utils/http';
import ModalHub from '@/_shared/modals/modal-hub';

@Component({
  components: {
    DishCard,
  },
})
export default class Restaurant extends Vue {
  public restaurant: RestaurantInfo | null = {
    id: 1,
    name: 'Dima restaurants',
    logo: 'https://via.placeholder.com/512',
    description: 'Дуже смачна їда',
    cover: 'https://storage.googleapis.com/foodstufff-stage/vendors/logos/1594332161764.png',
    location: 'Київ',
    todayWorkHours: 'До 20:00',
  };

  public categories: Category[] = [
    {
      id: 1,
      availability: '10:00-13:00',
      name: 'Сніданок',
      isClose: false,
    },
    {
      id: 2,
      availability: '13:00-19:00',
      name: 'Обід',
      isClose: false,
    },
    {
      id: 3,
      availability: '19:00-23:00',
      name: 'Вечеря',
      isClose: false,
    },
  ];

  public category: Category | null = {
    id: 1,
    availability: '10:00-13:00',
    name: 'Сніданок',
    isClose: false,
  };

  public dishes: Dish[] | null = [
    {
      name: 'Піца',
      description: 'Дуже смачна піца',
      photo: 'https://storage.googleapis.com/foodstufff/dishes/1602536527928.jpg',
      isAlcohol: false,
      sold: false,
      id: 1,
      price: 20,
      discountedPrice: 0,
      discountPercents: 0,
      weight: 100,
    },
    {
      name: 'Суші',
      description: 'Дуже смачні суші',
      // eslint-disable-next-line max-len
      photo: 'https://gurmans.dp.ua/giuseppe/7980-large_default/sushi-set-kaliforniya.jpg',
      isAlcohol: false,
      sold: false,
      id: 2,
      price: 600,
      discountedPrice: 540,
      discountPercents: 10,
      weight: 300,
    },
  ];

  public categoryId: number | any = 1;

  public mounted() {
    console.log('aaaaaaa');
    // this.getRestaurant();
  }

  public isCategory(categoryId: number) {
    return this.categoryId === categoryId;
  }

  public setCategory(category: Category) {
    this.categoryId = category.id;
  }

  public onDishClick(dish: Dish) {
    ModalHub.$emit('open', 'modal-dish', { data: { dish } });
  }

  public openRestaurantModal() {
    ModalHub.$emit('open', 'modal-restaurant', { data: this.restaurant, animation: 'slide-right' });
  }

  get restaurantId() {
    return this.$route.params.id;
  }

  get dishId() {
    return parseInt(this.$route.params.dishId, 10);
  }

  get paramsCategoryId() {
    return parseInt(this.$route.params.categoryId, 10);
  }

  private getRestaurant() {
    http
      .get(`/restaurants/${this.restaurantId}/menu`)
      .then((res: { restaurant: RestaurantInfo; menuCategories: Category[] }) => {
        this.restaurant = res.restaurant;
        this.categories = res.menuCategories;
        this.loadCategory();
      });
  }

  private loadCategory() {
    if (this.categoryId) {
      for (const c of this.categories) {
        if (c.id === this.categoryId) {
          this.category = c;
        }
      }
    } else {
      [this.category] = this.categories;
      this.categoryId = this.category.id;
    }
    this.getDishes();
  }

  private checkCategory() {
    if (this.paramsCategoryId) {
      this.categoryId = this.paramsCategoryId;
      this.loadCategory();
    }
  }

  private checkDish() {
    if (!this.dishId) {
      return false;
    }
    setTimeout(() => {
      this.onDishClick(this.dishes);
    }, 100);
  }

  private getDishes() {
    http.get(`/restaurants/${this.restaurantId}/category/${this.categoryId}`).then((res: { dishes: any }) => {
      this.dishes = res.dishes;
    });
  }
}

export interface RestaurantInfo {
  id: number;
  name: string;
  logo: string;
  description: string;
  cover: string;
  location: string;
  todayWorkHours: string;
}

interface Category {
  id: number;
  availability: string;
  name: string;
  isClose: boolean;
}
</script>

<style lang="sass" scoped>
  .head
    background-image: url(../_assets/content/ugly-big-cover.jpg)
    background-position: center
    background-size: cover
    min-height: 600px
    position: relative
    &:after
      content: ''
      position: absolute
      left: 0
      top: 0
      height: 100%
      width: 100%
      background-color: $black
      opacity: .3
      z-index: 1
    .container
      position: relative
      z-index: 2
    .restaurant-header
      position: relative
      z-index: 3

  .restaurant-logo
    margin: 10px 0 60px
    height: 120px
    width: 120px
    border-radius: 50%
    overflow: hidden
    img
      height: 100%
      width: 100%
      object-fit: cover

  .restaurant-info
    margin-top: 160px
    display: flex
    align-items: center
    flex-wrap: wrap
    @include bp-960
      margin-top: 40px
      padding-bottom: 40px
    &-block
      width: 25%
      padding: 20px 30px
      min-width: 256px
      color: $white
      font-size: 14px
      line-height: 150%
      &:first-child
        padding-left: 0
      &.restaurant-closed
        margin-left: auto
      @include bp-960
        padding-left: 0
      .btn-white-o
        width: 100%
        max-width: 276px
    &-title
      font-weight: 300
      display: flex
      align-items: center
      .icon
        margin-right: 10px
      .icon-clock
        margin-top: -2px
    &-text
      font-weight: 600

  .tabs
    padding-bottom: 20px
    overflow-x: auto
    ul
      display: flex
      @include bp-480
        width: 250%
    li
      margin: 0 20px
      padding: 15px 0
      font-size: 20px
      font-weight: 600
      cursor: pointer
      transition: .5s all
      border-bottom: 2px solid transparent
      &:hover
        color: $pink
        border-color: $pink
      &.is-active
        color: $black
        border-color: $black
        opacity: .2

  .category-availability
    font-size: 14px
    margin-bottom: 20px
    color: $darkgray
    .icon
      margin-left: 20px
      margin-right: 10px
    .icon/deep/ svg *
      fill: $darkgray

  .restaurant-closed
    background-color: $red
    height: 60px
    padding: 10px 20px
    max-width: 276px

  .dishes
    display: flex
    flex-wrap: wrap
    margin: -10px
    padding-bottom: 80px
    min-height: 300px

  .dish-wrapper
    width: calc(50% - 20px)
    margin: 10px
    user-select: none
    @include bp-960
      width: 100%

  .menu-holder
    padding: 200px 0
    text-align: center
  .back
    color: $white
    background-color: rgba(140, 140, 140, 0.5)
    padding: 12px 22px
    border-radius: 6px
    align-items: center
    cursor: pointer
    display: inline-block
    font-size: 14px
    font-weight: 500
    margin-top: 20px
    &/deep/svg
      margin-right: 10px
      *
        fill: $white

  .menu
    &.closed
      opacity: .5
      pointer-events: none

  .menu-close
    opacity: .5
    pointer-events: none
</style>
