<template>
  <div v-if="dish" class="dish-modal">
    <span @click="modalHub.$emit('close')" class="close cup"> <app-icon class="back" name="back" /> назад </span>

    <div class="dish-image">
      <img :src="dish.photo" alt="smoky kebab" />
    </div>
    <div class="dish-title">{{ dish.name }}</div>
    <div class="dish-text">{{ dish.description }}</div>

    <div class="buttons-bottom">
      <app-counter @input="updatePrice" class="counter" v-model="counter" />
      <button @click="addDishToCart" class="btn-pink">Додати ₴ {{ totalPrice }}</button>
    </div>
    <div class="kitchen-notes">
      <p>Маєте якісь особливі побажання для кухарів?</p>
      <p>Ви можете додати їх під час оплати.</p>
    </div>
  </div>
</template>

<script lang="ts">
import {
  Component, Prop, Vue,
} from 'vue-property-decorator';
import ModalHub from '@/_shared/modals/modal-hub';

@Component({})
export default class ModalDish extends Vue {
    public modalHub = ModalHub;

    @Prop() data!: { dish: Dish};

    public dish: Dish | null = ({ ...this.data.dish });

    public totalPrice = this.dish?.price;

    public counter = 1;

    updatePrice() {
      if (!this.dish) {
        return false;
      }
      this.totalPrice = this.round(this.dish.price * this.counter);
    }

    public addDishToCart() {
      const cartDish: any = this.dish;

      cartDish.amount = this.counter;
      cartDish.price = this.totalPrice;

      if (!!this.dish && this.dish.isAlcohol) {
        this.modalHub.$emit('close');
        this.modalHub.$emit('open', 'modal-alcohol', {
          data: {
            dish: this.dish,
            id: this.$route.params.id,
          },
        });
      } else {
        this.$store.commit('addDish', this.dish);
        this.modalHub.$emit('close');
      }
    }

    get cart() {
      // return this.$store.getters.cart;
      return ['bla'];
    }

    private round(num: number) {
      return Math.round(num * 100) / 100;
    }
}

export interface Dish {
  id: number;
  name: string;
  description: string;
  photo: string;
  price: number;
  isAlcohol: boolean;
  newPrice?: number;
}
</script>

<style lang="sass" scoped>
  .dish-modal
    max-width: 653px
    height: 100vh
    padding: 40px
    overflow-y: auto
    @include bp-1440
      max-width: 460px
    @include bp-480
      &.modal-inner
        padding: 40px 15px

  .close
    position: absolute
    z-index: 1
    color: $white
    font-weight: 500
    background-color: rgba(140, 140, 140, 0.5)
    padding: 12px 22px
    border-radius: 6px
    align-items: center
    cursor: pointer
    display: inline-block
    font-size: 14px
    margin-top: 20px
    .icon
      margin-right: 10px
    &/deep/svg *
      fill: $white

  .btn-pink-t
    text-transform: uppercase
    width: 100%

  .dish
    &-image
      margin: -40px -40px 40px
      height: 550px
      @include bp-1440
        height: 460px
      @include bp-768
        margin: -40px -14px 40px -40px
        height: 300px
      img
        width: 100%
        height: 100%
        object-position: center
    &-title
      font-weight: 600
      line-height: 100%
      font-size: 40px
      margin-bottom: 40px
    &-text
      font-size: 14px
      line-height: 150%
      color: $dark
    &-subtitle
      font-size: 16px
      font-weight: 600
      margin: 40px 0 20px
      &+.text-pink
        margin-top: -10px

  .text-pink
    color: $pink
    margin-bottom: 20px

  .error
    margin: -10px 0 20px

  .text-gray
    color: #818184
    margin-bottom: 20px

  .control
    background-color: $lightgray
    padding: 20px
    margin-bottom: 10px
    &/deep/label
      margin-bottom: 0
    .text-pink
      margin-left: 10px
      margin-bottom: 0

  .buttons-bottom
    display: flex
    margin: 20px -10px 20px
    @include bp-480
      flex-direction: column
      justify-content: space-around
      align-items: center
    .counter, .btn-pink
      width: 50%
      margin: 0 10px
      @include bp-480
        width: 100%
        margin-top: 10px
    .counter
      @include bp-480
        padding: 10px
    .btn-pink
      @include bp-480
        margin-bottom: 10px

  .option-row
    display: flex
    .control
      width: 100%
    .counter
      /*pointer-events: none*/
      margin-left: auto
      height: 64px
      border-radius: 0
      margin-bottom: 20px
  .option-price
    min-width: 40px
  .kitchen-notes
    margin-top: 30px
    text-align: center
</style>
