<template>
  <div class="thanks">
    <app-icon name="wine"/>
    <div class="title">Ordering alcohol?</div>
    <div class="subtitle">Are you over 18 years old to order alcohol?</div>
    <button @click="addDishToCart" class="btn-pink">Yes, I turned 18</button>
    <button @click="modalHub.$emit('close')" class="btn">Back to menu</button>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import ModalHub from '@/_shared/modals/modal-hub';

@Component({})
export default class ModalErrorOrder extends Vue {
  @Prop() data!: { dish: any; id: number };

  private modalHub = ModalHub;

  public close() {
    this.modalHub.$emit('close');
  }

  public addDishToCart() {
    this.$store.commit('addDish', this.data.dish);
    this.modalHub.$emit('close');
  }
}
</script>

<style lang="sass" scoped>
.thanks
  &.modal-inner
    width: 380px
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
  margin-top: 10px
  margin-bottom: 20px
  width: 80%
.btn
  margin-bottom: 20px
  width: 80%
</style>
