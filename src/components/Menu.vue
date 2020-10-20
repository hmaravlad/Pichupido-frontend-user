<template>
  <div v-if="restaurant">
    <div class="head" :style="`background-image: url(${restaurant.cover});`">
      <app-header class="restaurant-header" />
      <div class="container">
        <span @click="$router.go(-1)" class="back">
          <app-icon name="back" />
          BACK
        </span>
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
          <div
            v-if="restaurant.todayWorkHours !== 'Not working today' && !restaurant.isClosed"
            class="restaurant-info-block"
            :class="{ closed: !restaurant.isClosed }"
          >
            <p class="restaurant-info-title"><app-icon name="clock" />Open times</p>
            <p class="restaurant-info-text">{{ restaurant.todayWorkHours }}</p>
          </div>
        </div>
      </div>
    </div>

    <div v-if="categoryId" class="menu" :class="{ closed: restaurant.isClosed }">
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
            <div class="dish-wrapper" @click="!d.sold ? onDishClick(d.id, c.id) : null" v-for="d of dishes" :key="d.id">
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
import { Component, Vue, Watch } from 'vue-property-decorator';
import DishCard from '@/components/dish-card.vue';
import http from '@/_shared/utils/http';

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
    ];

    public category: Category | null = null;

    public dishes: any | null = null;

    public categoryId: number | any = null;

    public mounted() {
      // this.getRestaurant();
    }

    @Watch('$route', { immediate: true, deep: true })
    onUrlChange() {
      this.checkCategory();
      this.checkDish();
    }

    public isCategory(categoryId: number) {
      return this.categoryId === categoryId;
    }

    public setCategory(category: Category) {
      this.$router.replace({
        name: 'restaurant-category',
        params: { id: this.restaurantId, categoryId: `${category.id}` },
      });
    }

    public onDishClick(dishId: number, categoryId: number) {
      if (dishId === this.dishId) {
        this.openDishModal(dishId, categoryId);
      } else {
        this.$router.push({
          name: 'restaurant-dish',
          params: {
            id: this.restaurantId,
            categoryId: this.categoryId.toString(),
            dishId: dishId.toString(),
          },
        });
      }
    }

    public openDishModal(dishId: number, categoryId: number) {
      // ModalHub.$emit('open', 'modal-dish', { data: { dishId, categoryId } });
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
        this.openDishModal(this.dishId, this.categoryId);
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
    margin: 60px 0
    height: 120px
    width: 120px
    border-radius: 50%
    overflow: hidden
    img
      height: 100%
      width: 100%
      object-fit: cover

  .restaurant-info
    margin-top: 80px
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
    padding-bottom: 40px
    overflow-x: auto
    ul
      display: flex
      @include bp-480
        width: 250%
    li
      margin: 0 20px
      padding: 40px 0
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
    margin-bottom: 40px
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
