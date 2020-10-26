<template>
  <div
    class="modal"
    @click.self="closeModal"
    :class="{ active }">
    <transition :name="animation">
      <component v-if="active" :is="component" :data="componentData" class="modal-inner" />
    </transition>
  </div>
</template>

<script lang="ts">
import ModalHub from '@/_shared/modals/modal-hub.ts';
import { Component, Vue } from 'vue-property-decorator';
import ModalRestaurant from '@/components/modal-restaurant.vue';
import ModalDish from '@/components/modal-dish.vue';
import ModalCart from '@/_shared/modals/modal-cart.vue';
import ModalCheckout from '@/_shared/modals/modal-checkout.vue';

@Component({
  components: {
    ModalRestaurant,
    ModalDish,
    ModalCart,
    ModalCheckout,
  },
})
export default class ModalView extends Vue {
  public active = false;

  public component = '';

  public animation = 'fade';

  public componentData: any;

  public openModal(component: string, options?: ModalOptions) {
    this.active = true;
    this.component = component;
    this.animation = options && options.animation ? options.animation : 'fade';
    this.componentData = options && options.data ? options.data : null;
    this.$emit('open');
  }

  public closeModal() {
    this.active = false;
    this.$emit('close');
  }

  public mounted() {
    this.$nextTick(() => {
      ModalHub.$on('open', this.openModal);
      ModalHub.$on('close', this.closeModal);
    });
  }
}

interface ModalOptions {
  animation?: string;
  data?: any;
  preventCloseOnBackgroundClick?: {
    component: string;
    status: boolean;
  };
}
</script>

<style lang="sass" scoped>
.modal
  position: fixed
  z-index: 2000
  left: 0
  top: 0
  width: 100%
  height: 100%
  background-color: rgba(255,255,255, .3)
  pointer-events: none
  transition: .3s opacity
  opacity: 0
  &.active
    opacity: 1
    pointer-events: auto
  &.preventCloseOnBackgroundClick
    background-color: rgba(255,255,255, 0)
    height: 7%
    top: 91%

.modal-inner
  background-color: $white
  padding: 40px
  top: 0
  right: 0
  width: 100%
  position: absolute
  height: 100vh
  box-shadow: 0 4px 60px rgba(0, 0, 0, 0.1)
  overflow-y: scroll
  &::-webkit-scrollbar
    display: none
</style>
