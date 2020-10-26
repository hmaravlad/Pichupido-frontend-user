<template>
  <div v-if="data" class="modal-restaurant">
    <div class="back" @click="modalHub.$emit('close')">
      <app-icon name="back" />
    </div>
    <div class="subtitle">Коротко про ресторан</div>

    <div class="logo">
      <img :src="data.logo" :alt="data.name" />
    </div>

    <div class="restaurant-name">{{ data.name }}</div>
    <div class="restaurant-description">{{ data.description }}</div>

    <div class="restaurant-title"><app-icon name="location"></app-icon>Location</div>
    <div class="restaurant-text">{{ data.location }}</div>

    <div class="restaurant-title"><app-icon name="clock"></app-icon>Open times</div>
    <div class="restaurant-text">{{ data.todayWorkHours }}</div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import ModalHub from '@/_shared/modals/modal-hub';
import { RestaurantInfo } from '@/components/Menu.vue';

@Component({})
export default class ModalRestaurant extends Vue {
  @Prop() public data!: RestaurantInfo;

  public restaurant: RestaurantInfo | null = null;

  private modalHub = ModalHub;
}
</script>

<style lang="sass" scoped>

.modal-restaurant
  max-width: 380px
  left: 0

.subtitle
  margin-bottom: 40px
  font-size: 14px
  text-align: center

.back
  position: absolute
  top: 40px
  left: 40px
  cursor: pointer

.logo
  height: 120px
  width: 120px
  border-radius: 50%
  img
    width: 100%
    height: 100%

.restaurant-name
  font-weight: 600
  font-size: 16px
  margin: 40px 0

.restaurant-description
  line-height: 180%
  font-size: 16px
  font-weight: 300

.restaurant-title
  font-size: 14px
  font-weight: 300
  margin: 40px 0 20px
  &/deep/svg
    margin-right: 10px
    *
      fill: $dark

.restaurant-text
  font-weight: 600
  line-height: 140%

.restaurant-link
  font-weight: 500
  color: $pink
  margin-top: 10px
  display: inline-block
</style>
