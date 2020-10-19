<template>
  <div class="accordion" :class="{ open }">
    <div @click="open = !open" class="accordion-head">
      <app-icon class="accordion-icon" name="dropdown" />
      <slot name="head" />
    </div>
    <div class="accordion-body">
      <slot name="body" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({})
export default class AppAccordion extends Vue {
  @Prop({ default: false }) isOpen!: boolean;

  public open = false;

  mounted() {
    this.open = this.isOpen;
  }
}
</script>

<style lang="sass" scoped>
.accordion
  background-color: $lightgray
  margin-bottom: 20px
  max-height: 80px
  overflow: hidden
  transition: .5s all
  .accordion-icon
    transition: .5s all
    transform: rotate(-90deg)
    margin-right: 10px
  &.open
    max-height: 600px
    overflow: auto
    & > .accordion-head
      color: $pink
      .accordion-icon
        transform: rotate(0)
  &-head
    height: 80px
    padding: 20px
    display: flex
    align-items: center
    justify-content: center
    cursor: pointer
    user-select: none
    color: $dark
    transition: .5s all
  &-body
    padding: 20px
  &::-webkit-scrollbar
    display: none
</style>
