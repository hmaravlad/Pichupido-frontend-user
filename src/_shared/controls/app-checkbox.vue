<template>
  <label class="c-checkbox">
    <input type="checkbox" :name="name" :checked="!!value" ref="field" @change="update" :disabled="disabled" />
    <span>
      <span class="square">
        <icon-radio></icon-radio>
      </span>
      <slot></slot>
    </span>
  </label>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import IconRadio from '../../_assets/icons/icon-radio.svg';

@Component({
  components: {
    IconRadio,
  },
})
export default class AppCheckbox extends Vue {
  @Prop() value: any;

  @Prop() disabled: any;

  @Prop() name: any;

  public update(e: any) {
    this.$emit('input', e.target.checked);
  }
}
</script>

<style lang="sass" scoped>
.c-checkbox
  margin-bottom: 20px
  cursor: pointer
  display: block
  font-size: 14px
  font-weight: 300
  user-select: none
  span
    display: inline-flex
    align-items: center
    .square
      margin-right: 10px
      height: 30px
      width: 30px
      min-width: 30px
      border: 1px solid #7F7E81
      justify-content: center
      transition: .5s all
      @include bp-1440
        height: 24px
        width: 24px
        min-width: 24px
      svg
        opacity: 0
  input
    visibility: hidden
    opacity: 0
    position: absolute
  input:checked + span
    .square
      background-color: $pink
      border-color: $pink
      svg
        transition: .5s all
        opacity: 1
  input:disabled + span
    opacity: .5
</style>
