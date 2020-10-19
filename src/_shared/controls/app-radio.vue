<template>
  <label class="c-radio">
    <input
      :value="option"
      @change="update"
      :name="name || 'radio'"
      type="radio"
      :checked="isChecked"
      :disabled="disabled"
    />
    <span>
      <span class="circle">
        <icon-radio />
      </span>
      <slot />
    </span>
  </label>
</template>

<!--checked-->

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import IconRadio from '../../_assets/icons/icon-radio.svg';

@Component({
  components: {
    IconRadio,
  },
})
export default class AppRadio extends Vue {
  // Note we need to paste to option value that we want to get, if user mark this radio as checked!
  @Prop() option!: string;

  @Prop() value!: string;

  @Prop() name!: string;

  @Prop() disabled!: string;

  public update(e: any) {
    this.$emit('input', e.target.value);
  }

  get isChecked() {
    return this.option === this.value;
  }
}
</script>

<style lang="sass" scoped>
.c-radio
  margin-bottom: 20px
  cursor: pointer
  display: block
  font-size: 14px
  font-weight: 300
  user-select: none
  span
    display: inline-flex
    align-items: center
    .circle
      margin-right: 10px
      height: 30px
      width: 30px
      min-width: 30px
      border: 1px solid #7F7E81
      border-radius: 50%
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
    .circle
      background-color: $pink
      border-color: $pink
      svg
        transition: .5s all
        opacity: 1
  input:disabled + span
    opacity: .5
</style>
