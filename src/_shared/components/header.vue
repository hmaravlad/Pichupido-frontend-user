<template>
  <div class="header-wrapper" :class="{ 'sticky black active': isHeaderFixed }">
    <div class="header">
      <div class="container">
        <div class="logo">
          <router-link to="/" tag="a">
            <app-logo />
          </router-link>
        </div>

        <!--If you need to paste some components from page directly (search/buttons/icons etc)-->
        <slot v-if="subtotal === 0" />

        <button v-if="subtotal > 0 && screenWidth > 480" class="checkout-btn btn-white" @click="openCartModal">
          Checkout £ {{ this.subtotal }}
        </button>

        <div v-if="isOrderExist" @click="openOrderStatusModal" class="order-status black-bag">
          <button class="btn-blue">Track order</button>
        </div>

        <div v-if="!user" @click="openSignInModal" class="nav-toggle"><span /></div>

        <div v-else class="header-right">
          <div class="avatar" @click="openUserMenuModal">
            <img :src="user.photo" :alt="user.firstName + ' ' + user.lastName" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  Component, Prop, Vue, Watch,
} from 'vue-property-decorator';
import http from '@/_shared/utils/http';
// import UserIcon from '../../_assets/user.svg';

@Component({
  // components: {
  //   UserIcon,
  // },
})
export default class AppHeader extends Vue {
  @Prop() public type!: string;

  @Prop() public hasVendorBtn!: boolean;

  public isHeaderFixed = false;

  public isOrderExist = false;

  public user = null;

  public screenWidth: number = window.innerWidth;

  public mounted() {
    this.getUser();
    window.addEventListener('scroll', this.checkScroll);
    window.addEventListener('resize', this.onResize);
  }

  public onResize() {
    this.screenWidth = window.innerWidth;
  }

  beforeDestroy() {
    window.removeEventListener('resize', this.onResize);
  }

  get cart() {
    // return this.$store.getters.cart;
    return [];
  }

  public openCartModal() {
    // if (!this.$store.getters.postcode.length) {
    //   ModalHub.$emit('open', 'modal-location', { data: { isCart: true } });
    // } else {
    //   ModalHub.$emit('open', 'modal-cart');
    // }
  }

  public openUserMenuModal() {
    // ModalHub.$emit('open', 'modal-user-menu', { animation: 'slide-left' });
  }

  public openSignInModal() {
    // ModalHub.$emit('open', 'modal-sign-in', { animation: 'slide-left' });
  }

  public openOrderStatusModal() {
    // ModalHub.$emit('open', 'modal-order-status', { animation: 'slide-left' });
  }

  public getUser() {
    const user = localStorage.getItem('user');
    this.user = user ? JSON.parse(user) : null;
    if (user) {
      this.getUserOrders();
    }
  }

  public getUserOrders() {
    http.get('/orders?statuses=new,preparing,ready_for_delivery,delivering').then((res: any) => {
      if (res.length > 0) {
        this.isOrderExist = true;
      }
    });
  }

  private checkScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    this.isHeaderFixed = scrollTop > 100;
    this.$forceUpdate();
  }

  get subtotal() {
    let subtotal = 0;
    this.cart.forEach((elem: any) => {
      subtotal = Math.round((subtotal + elem.price) * 100) / 100;
    });
    return subtotal;
  }
}
</script>

<style lang="sass" scoped>
.logo
  @include bp-480
    width: 115px
.header-wrapper
  &.black
    .header
      background-color: #fff
      border-color: #f3f4f8
      .nav-toggle
        span, span:before, span:after
          background: $dark
  &.transparent
    .header
      background-color: transparent
      border-color: transparent
    &.sticky
      .header
        background-color: #fff
        border-color: #f3f4f8
  &.sticky
    /* To handle space by wrapper when header goes absolute*/
    height: 100px
    transition: .5s all
    .header
      position: fixed
      z-index: 1000
      top: 0
      left: 0
      width: 100%
      height: 100px
    @include bp-1440
      height: 80px
      .header
        height: 80px
    .btn-white
      border: 1px solid $dark
    .black-bag
      &/deep/svg>circle
        transition: .5s all
        fill: white
        stroke: black
      &/deep/svg>path
        transition: .5s all
        fill: black
        stroke: black
      &:hover
        &/deep/svg>circle
          fill: black
          stroke: black
        &/deep/svg>path
          fill: white
          stroke: white
    @include bp-480
      .btn-white
        width: 24%

.header
  height: 100px
  border-bottom: 1px solid transparent
  button + button
    margin-left: 0
  @include bp-480
    button + button
      margin-left: auto
    .container
      padding: 5px
  .container
    height: 100%
    display: flex
    justify-content: space-between
    align-items: center
  @include bp-1440
    height: 80px

.nav-toggle
  position: relative
  display: block
  cursor: pointer
  padding: 10px 20px 16px 0
  span, span:before, span:after
    cursor: pointer
    border-radius: 2px
    height: 1px
    width: 20px
    background: #fff
    position: absolute
    display: block
    content: ''
    transition: all 500ms ease-in-out
  span
    &:before
      top: -9px
    &:after
      bottom: -9px
  &.active span
    background-color: transparent
    &:before, &:after
      top: 0
    &:before
      transform: rotate(45deg)
    &:after
      transform: rotate(-45deg)
  @include bp-480
    margin-left: 10%
.avatar
  height: 40px
  width: 40px
  background-color: #fff
  border-radius: 50%
  overflow: hidden
  cursor: pointer
  img
    width: 100%
    height: 100%
    object-fit: cover
    object-position: center

.checkout-btn
  margin-left: auto
  margin-right: 40px
  @include bp-480
    width: 23%
    line-height: 16px
    font-size: 10px
    margin-right: 5%
    padding: 0 10px

.header-right
  display: flex
  flex-direction: row
  align-items: center
  .btn-white
    margin-right: 20px

.order-status
  margin: 0 40px 0 auto
  cursor: pointer
  width: 18%
  white-space: nowrap
  @include bp-480
    width: 25%
  margin-right: 4%
  &/deep/svg>circle
    transition: .5s all
  &/deep/svg>path
    transition: .5s all
  &:hover
    &/deep/svg>circle
      transition: .5s all
      fill: white
    &/deep/svg>path
      transition: .5s all
      fill: black
      stroke: black
  .btn-blue
    width: 100%
    padding: 2px

button + .order-status
  margin-left: 0
</style>
