<template>
  <ValidationObserver
    @submit.prevent="submitOrder"
    tag="form"
    ref="form"
    id="form-example"
    class="modal-checkout"
  >
    <div @click="close" class="close cup">
      <app-icon name="close"/>
    </div>
    <div class="modal-title">Оформлення замовлення</div>

    <div class="container">
      <div class="columns is-multiline">
        <div class="payment-block column is-half is-full-mobile">
          <h3 class="title-pink ">Будь ласка введіть дані оплати</h3>
          <div class="payment">
            <app-switcher class="is-marginless" v-model="byCard">Готівка</app-switcher>
            <div v-if="!byCard">
              <p class="payment-title">Номер картки</p>
              <div class="card-number">
                <card-number
                  class="stripe-card"
                  :stripe="stripePublicKey"
                  :options="stripeOptions"
                  @change="number = $event.complete"
                />
              </div>
              <div class="fields is-2">
                <div class="field">
                  <p class="payment-title">Expiry date</p>
                  <card-expiry
                    class="stripe-card"
                    :stripe="stripePublicKey"
                    :options="stripeOptions"
                    @change="expiry = $event.complete"
                  />
                </div>
                <div class="field">
                  <p class="payment-title">CVV number</p>
                  <card-cvc
                    class="stripe-card"
                    :stripe="stripePublicKey"
                    :options="stripeOptions"
                    @change="cvc = $event.complete"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="base-restaurant column is-half is-full-mobile">
          <h3 class="title-pink">Інформація про замовлення</h3>
          <div class="order">
            <div class="restaurant">
              <div class="restaurant-logo">
                <img :src="restaurant.logo" :alt="restaurant.name" />
              </div>
              <div class="restaurant-info">
                <p class="restaurant-name">{{ restaurant.name }}</p>
                <p class="restaurant-location">{{ restaurant.location }}</p>
              </div>
            </div>
            <hr />
            <order-check/>
            <p class="error">{{ errorMessage }}</p>
            <button
              v-if="!loading"
              type="submit"
              class="btn-pink submit"
              :class="{ isDisablePayButton }"
              form="form-example"
            >
              Підтвердити та оплатити £ {{ fullPrice }}
            </button>
            <div v-if="loading" class="loader">
              <app-loader />
            </div>
          </div>
        </div>
        <div class="base-info column is-half is-full-mobile">
          <h3 class="title-pink">Додаткова інформація</h3>
          <app-textarea name="KitchenNotes" v-model="kitchenNotes">Побажання щодо приготування</app-textarea>
        </div>
      </div>
    </div>
  </ValidationObserver>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import http from '@/_shared/utils/http';
import { ICartDish } from '@/store';
import { RestaurantInfo } from '@/components/Menu.vue';
import {
  confirmPaymentIntent, CardNumber, CardExpiry, CardCvc,
} from 'vue-stripe-elements-plus';
import Environment from '@/environment';
import ModalHub from './modal-hub';

@Component({
  components: {
    CardNumber,
    CardExpiry,
    CardCvc,
  },
})
export default class ModalCheckout extends Vue {
  public $refs!: {
    form: HTMLFormElement;
  };

  public byCard = false;

  public stripePublicKey = Environment.stripePublicKey;

  public stripeOptions = {};

  public isDisablePayButton = false;

  public cart: ICartDish[] = [];

  public deliveryNotes = '';

  public kitchenNotes = '';

  public errorMessage = '';

  public loading = false;

  public number = false;

  public cvc = false;

  public expiry = false;

  public deliveryInfo: IDeliveryInfo = {
    processesDurationMins: {
      preparation: 1,
      delivery: 0,
    },
    deliverToTime: '',
    address: {
      flatAndBuilding: '',
      street: '',
      postcode: '',
    },
    contactPhone: '',
    paymentMethod: 'creditcard',
  };

  public restaurant: RestaurantInfo | null = {
    id: 1,
    name: 'Тататія',
    logo: 'https://storage.googleapis.com/foodstufff-stage/vendors/logos/1598543125742.png',
    description: 'Дуже смачна їда',
    cover: 'https://storage.googleapis.com/foodstufff-stage/vendors/covers/1599779520376.jpg',
    location: 'Київ',
    todayWorkHours: 'До 20:00',
  };

  get restaurantId() {
    if (this.$route.params.id) {
      return this.$route.params.id;
    }
    return this.$store.getters.lastRestaurant;
  }

  get postCode() {
    return this.$store.getters.postcode;
  }

  public pay(clientSecret: string) {
    return confirmPaymentIntent(clientSecret);
  }

  public close() {
    ModalHub.$emit('close');
  }

  mounted() {
    this.cart = this.$store.getters.cart;
    // http.get(`/restaurants/${this.restaurantId}/menu?postcode=${this.postCode}`).then((result: any) => {
    //   this.restaurant = result.restaurant;
    // });
  }

  async submitOrder() {
    const isValid = await this.$refs.form.validate();
    if (!isValid) {
      return;
    }
    const resultOrder: any = this.deliveryInfo;
    const dishes = this.cart.map((dish: any) => ({
      id: dish.id,
      name: dish.name,
      amount: dish.amount,
      price: dish.price,
      modificators: dish.modificators.map((mod: any) => {
        if (mod.amount) {
          return {
            id: mod.id,
            name: mod.name,
            price: mod.price,
            amount: mod.amount,
          };
        }
        return {
          id: mod.id,
          name: mod.name,
          price: mod.price,
        };
      }),
    }));
    const cart = {
      dishes,
      restaurantId: this.$store.getters.lastRestaurant, // || this.$route.params.id
    };
    resultOrder.cartPrice = this.subtotal;
    resultOrder.totalPrice = this.fullPrice;
    resultOrder.cart = cart;
    resultOrder.deliveryNotes = this.deliveryNotes;
    resultOrder.kitchenNotes = this.kitchenNotes;

    if (this.number && this.cvc && this.expiry) {
      this.loading = true;
      let orderId: string;
      http
        .post('/orders', resultOrder)
        .then((res: any) => {
          orderId = res.id;
          localStorage.setItem('preparedOrderId', orderId);

          return http.post(`/orders/${res.id}/payments`, {});
        })
        .then((res: any) => this.pay(res.clientSecret))
        .then((res: any) => {
          if (res.error) {
            throw new Error(res.error.message);
          }
          if (res.paymentIntent.status !== 'succeeded') {
            this.loading = false;
            throw new Error('Something went wrong with payment');
          }
          this.isDisablePayButton = true;
          return http.post(`/orders/${orderId}/payments/confirm`, {});
        })
        .catch((err: any) => {
          this.loading = false;
          this.errorMessage = err;
        });
    }
  }

  @Watch('isDisablePayButton')
  public finishOrder() {
    if (this.isDisablePayButton) {
      localStorage.removeItem('preparedOrderId');
      ModalHub.$emit('close', {
        preventCloseOnBackgroundClick: {
          component: 'modal-cart-overview',
          status: false,
        },
      });
      ModalHub.$emit('open', 'modal-success-order');
      this.$store.commit('clearCart');
    }
  }

  error() {
    ModalHub.$emit('open', 'modal-error-order');
  }

  get subtotal() {
    let subtotal = 0;
    this.cart.forEach((elem: any) => {
      subtotal = Math.round((subtotal + elem.price) * 100) / 100;
    });
    return subtotal;
  }

  get fullPrice() {
    return Math.round(this.subtotal * 100) / 100;
  }
}

export interface IDeliveryInfo {
  processesDurationMins: {
    preparation: number;
    delivery: number;
  };
  deliverToTime: string;
  address: {
    flatAndBuilding: string;
    street: string;
    postcode: string;
  };
  contactPhone: string;
  paymentMethod: string;
}
</script>

<style lang="sass" scoped>
.modal-checkout
  width: 100%
  height: 100%
  top: 0
  left: 0
#form-example
  @include bp-480
    padding: 10px 10px 60px
.modal-title
  text-align: center
  margin: 20px 0 80px
  font-size: 14px
.close
  position: absolute
  left: 40px
  top: 40px
.title-pink
  margin-bottom: 40px
.columns
  display: flex
  width: 100%
  &.is-2
    .column
      width: 50%
      padding: 0 30px
  .base-info
    margin-top: -250px
    @include bp-768
      order: 1
  .base-restaurant
    @include bp-768
      order: 3
  .payment-block
    @include bp-768
      order: 2

.fields
  display: flex
  width: 100%
  justify-content: space-between
  @include bp-768
    flex-direction: column
  &.is-2
    .field
      display: flex
      flex-direction: column
      width: 50%
      margin-right: 20px
      @include bp-768
        width: 100%
      &:last-child
        margin-right: 0

.restaurant
  display: flex
  align-items: center
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
  &-location
    font-size: 14px
    margin-top: 10px

.payment
  padding: 20px 20px
  background: #F8F8F8
  .card-number
    width: 100%
    margin: 0

.payment-title
  margin-top: 10px
  font-family: $Montserrat
  font-style: normal
  font-weight: 300
  font-size: 14px
  line-height: 150%
  @include bp-768
    font-size: 12px
.select-title
  font-family: $Montserrat
  font-style: normal
  font-weight: 300
  font-size: 14px
  line-height: 150%
  color: $dark
  margin-bottom: 5px

.submit
  width: 100%
  margin-top: 40px
  margin-bottom: 60px

.stripe-card
  border: 1px solid #C4C4C4
  border-radius: 6px
  padding: 10px 10px
  margin-top: 5px
  background-color: $white

.payment-wrapper
  display: flex
  flex-direction: column
  &.half
    width: 50%
  p
    font-family: $Montserrat
    font-style: normal
    font-weight: 300
    font-size: 14px
    line-height: 150%
    color: $dark
    margin-top: 10px

.error
  font-family: $Montserrat
  font-style: normal
  font-weight: 300
  font-size: 14px
  line-height: 150%
  color: #FF0000
  margin-top: 20px
.isDisablePayButton
  display: none
</style>
