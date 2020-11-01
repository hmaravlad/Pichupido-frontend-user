<template>
  <div class="modal-cart">
    <div class="modal-head">
      <div class="close" @click="modalHub.$emit('close')">
        <app-icon name="close" />
      </div>
      Страви
    </div>

    <div v-for="(dish, index) of cart" :key="`${dish.id} + ${index}`" class="dish">
      <div class="dish-info">
        <div class="dish-name">{{ dish.name }}</div>
        <div class="dish-price">₴ {{ dish.price }}</div>
      </div>
      <div class="dish-counter">
        <app-counter @input="updatePrice(index)" v-model="dish.amount" />
        <span @click="deleteDish(index)">
          <app-icon name="close"/>
        </span>
      </div>
    </div>

    <hr />

    <div class="columns is-mobile">
      <div class="column h3">Total</div>
      <div class="column has-text-right fs-20 is-bold is-pink">₴ {{ fullPrice || 0 }}</div>
    </div>

    <div class="checkout-block">
      <button @click="openCheckout" class="btn-pink" v-if="fullPrice">Оплатити ₴ {{ fullPrice }}</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ModalHub from '@/_shared/modals/modal-hub';
// import http from '@/_shared/utils/http';

@Component({})
export default class ModalCart extends Vue {
  private modalHub = ModalHub;

  public postCode: string | null = '';

  public cart = [];

  public restaurantId: any;

  public user: any = null;

  public serviceFee = {
    text: '',
    value: 0,
  };

  public openCheckout() {
    // const dishes = this.cart.map((dish: any) => ({
    //   id: dish.id,
    //   amount: dish.amount,
    //   name: dish.name,
    //   price: dish.price,
    // }));

    // const cart = {
    //   dishes,
    // };

    ModalHub.$emit('close');

    this.modalHub.$emit('open', 'modal-checkout');

    // http
    //   .post('/cart/validation', { cart, totalPrice: this.subtotal })
    //   .then(() => this.modalHub.$emit('open', 'modal-checkout'))
    //   .catch(() => this.modalHub.$emit('open', 'modal-error-order'));
  }

  public async beforeMount() {
    this.cart = this.$store.getters.cart;

    this.cart.forEach((elem: any) => {
      // eslint-disable-next-line no-param-reassign
      elem.startingPrice = elem.price / elem.amount;
    });
  }

  get subtotal() {
    let subtotal = 0;
    this.cart.forEach((elem: any) => {
      subtotal = Math.round((subtotal + elem.price) * 100) / 100;
    });
    return subtotal;
  }

  get fullPrice() {
    return Math.round(this.subtotal * 100) / 100 + this.serviceFee.value;
  }

  public updatePrice(ind: number) {
    const elem: any = this.cart[ind];
    const dish = {
      index: ind,
      price: 0,
    };

    dish.price = Math.round(elem.startingPrice * elem.amount * 100) / 100;
    this.$store.commit('updateDishPrice', dish);
  }

  public deleteDish(ind: number) {
    this.$store.commit('deleteDish', ind);
    if (this.$store.getters.cart.length === 0) {
      this.modalHub.$emit('close');
      this.modalHub.$emit('close', {
        preventCloseOnBackgroundClick: {
          component: 'modal-cart-overview',
          status: false,
        },
      });
    }
  }

  public getUser() {
    const user = localStorage.getItem('user');
    this.user = user ? JSON.parse(user) : null;
  }
}
</script>

<style lang="sass" scoped>
.modal-cart
  &.modal-inner
    max-width: 425px
    width: 100%
    overflow-x: hidden
    @include bp-1440
      max-width: 375px
    @include bp-480
      top: 0
      height: 100vh
      padding-bottom: 30px
      width: 100vw
      max-width: 100vw
.modal-head
  font-size: 14px
  text-align: center
  position: relative
  margin-bottom: 40px
  .close
    position: absolute
    top: 0
    left: 0
    cursor: pointer

.dish
  background-color: $lightgray
  margin: 20px -20px
  padding: 20px
  display: flex
  &-info
    width: 50%
  &-counter
    display: flex
    width: 50%
    flex-direction: row
    justify-content: space-between
    align-items: center
    @include bp-360
      justify-content: center
  &-name
    font-weight: 600
    font-size: 16px
    margin-bottom: 5px
  &-modificators
    font-size: 12px
    color: $dark
    opacity: .5
  &-price
    margin-top: 5px
    font-size: 16px
    color: $pink
    font-weight: bold

.btn-pink
  width: 100%
  margin-top: 40px
  @include bp-480
    margin-bottom: 60px

.columns
  font-size: 14px

.auth-block
  background-color: $lightgray
  margin: 40px -40px 0
  padding: 40px 40px
  h3
    font-weight: 600
    margin-bottom: 40px

.delivery-error
  padding: 20px 0
  color: $darkgray
  line-height: 24px
  font-size: 16px
  text-align: center
</style>
