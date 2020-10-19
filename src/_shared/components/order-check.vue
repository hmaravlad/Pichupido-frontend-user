<template>
  <div>
    <div v-for="(dish, index) of cart" :key="dish.id + index" class="dish">
      <div class="order-row">
        <div>
          <div class="order-row-title">{{ dish.amount }}x - {{ dish.name }}</div>
          <div class="order-row-subtitle">
            {{ dish.modificators.map(d => (d.amount ? `${d.amount}x - ${d.name}` : `${d.name}`)).join(', ') }}
          </div>
        </div>
        <div class="order-row-price">£ {{ dish.price }}</div>
      </div>
    </div>
    <hr />
    <div class="order-row">
      <div class="order-row-title">Subtotal</div>
      <div class="order-row-price">£ {{ subtotal }}</div>
    </div>
    <div class="order-row">
      <div class="order-text">Service fee</div>
      <div class="order-text-gray" v-html="serviceFee.text" />
    </div>
    <div class="order-row">
      <div class="order-text">Delivery fee</div>
      <div class="order-text-gray" v-html="quote.price.text" />
    </div>
    <div class="order-row">
      <div class="order-text">Delivery time</div>
      <div class="order-text-gray">{{ quote.time }} minutes</div>
    </div>
    <hr />
    <div class="order-row">
      <p class="order-row-total">Total</p>
      <p class="order-row-total-price">£ {{ fullPrice }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import http from '@/_shared/utils/http';

@Component({})
export default class OrderCheck extends Vue {
  public cart: [] = [];

  public quote = {
    time: '',
    price: {
      text: '',
      value: 0,
    },
  };

  public serviceFee = {
    text: '',
    value: 0,
  };

  // get restaurantId() {
  //   if (this.$route.params.id) {
  //     return this.$route.params.id;
  //   }
  //   return this.$store.getters.lastRestaurant;
  // }

  mounted() {
    // this.cart = this.$store.getters.cart;
    // this.serviceFee = getServiceFee();
    // this.quote = { time: getQuoteTime(), price: getQuotePrice() };
  }

  get subtotal() {
    let subtotal = 0;
    this.cart.forEach((elem) => {
      subtotal = Math.round((subtotal + elem.price) * 100) / 100;
    });
    return subtotal;
  }

  get fullPrice() {
    return Math.round((this.subtotal + this.quote.price.value) * 100) / 100 + this.serviceFee.value;
  }
}
</script>

<style lang="sass" scoped>
.order
  .btn-pink
    width: 100%
    margin-top: 40px
  &-row
    display: flex
    align-items: center
    justify-content: space-between
    margin-top: 20px
  &-row-title
    font-size: 14px
    font-weight: 600
    margin-bottom: 5px
  &-row-subtitle
    font-size: 12px
    font-weight: 300
  &-row-price
    font-size: 14px
    font-weight: 600
    color: $pink
  &-row-total
    font-size: 20px
    font-weight: 600
  &-row-total-price
    color: $pink
    font-weight: 600
    font-size: 20px
  &-text
    font-size: 14px
    color: $dark
  &-text-gray
    font-size: 14px
    color: $dark
    opacity: .5
.loader
  width: 100%
  display: flex
  justify-content: center
  height: 20px
  margin-bottom: 20px
</style>
