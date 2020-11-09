<template>
  <div class="thanks">
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="40" cy="40" r="39" stroke="#030208" stroke-width="2" />
      <circle cx="40" cy="40" r="40" fill="#C36CA1" />
      <path d="M24 38L34.6667 48L56 28" stroke="white" stroke-width="2" />
    </svg>
    <div class="title">Thank you!</div>
    <div class="subtitle">We have received your order.</div>
    <button @click="openOrderStatus" class="btn-pink">Track Order</button>
    <button @click="close" class="btn-white">Back to menu</button>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import ModalHub from '@/_shared/modals/modal-hub';

  @Component({})
export default class ModalSuccessOrder extends Vue {
    @Prop() data!: { message: string };

    public close() {
      ModalHub.$emit('close');
    }

    openOrderStatus() {
      ModalHub.$emit('open', 'modal-order-status');
    }

    get message() {
      return this.data ? this.data.message : 'We will contact you soon';
    }
}
</script>

<style lang="sass" scoped>
  .thanks
    &.modal-inner
      width: 375px
      height: auto
      left: 50%
      top: 50%
      transform: translateX(-50%) translateY(-50%)
      text-align: center
  .title
    font-size: 20px
    margin: 20px 0 10px
  .subtitle
    font-size: 16px
    margin-bottom: 20px
  .btn-white
    background-color: #f8f8f8
    width: 80%
  .btn-pink
    margin-top: 20px
    margin-bottom: 20px
    width: 80%
</style>
