<template>
  <div class="header-wrapper" :class="{ 'sticky black active': isHeaderFixed }">
    <div class="header">
      <div class="container">
        <slot v-if="subtotal === 0" />

        <button class="checkout-btn btn-white" @click="openCartModal">
          Замовлення ₴ {{ this.subtotal }}
        </button>

      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  Component, Vue,
} from 'vue-property-decorator';
import ModalHub from '@/_shared/modals/modal-hub';

@Component({})
export default class AppHeader extends Vue {
  public isHeaderFixed = false;

  get cart() {
    return this.$store.getters.cart;
  }

  public openCartModal() {
    if (this.subtotal > 0) {
      ModalHub.$emit('open', 'modal-cart');
    }
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
