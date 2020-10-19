<template>
  <div class="app-counter" :class="{ disabled: disabled }">
    <span class="app-counter-control" @click="counter > min ? counter-- : null">-</span>
    <span class="app-counter-value">{{ counter }}</span>
    <span class="app-counter-control" @click="counter < max ? counter++ : null">+</span>
  </div>
</template>

<script lang="ts">
import {
  Component, Prop, Vue, Watch,
} from 'vue-property-decorator';

@Component({})
export default class AppCounter extends Vue {
  @Prop() value!: number;

  @Prop() disabled!: boolean;

  @Prop({ default: 1 }) min!: number;

  @Prop({ default: 100 }) max!: number;

  public counter: number = this.value;

  @Watch('counter')
  public change() {
    this.$emit('input', this.counter);
  }

  @Watch('value')
  public changeCounter() {
    this.counter = this.value;
  }
}
</script>

<style lang="sass" scoped>
.app-counter
  background-color: $lightgray
  display: flex
  height: 60px
  min-width: 130px
  font-size: 20px
  font-weight: bold
  padding: 0 20px
  border-radius: 6px
  justify-content: space-between
  align-items: center
  user-select: none
  &.disabled
    pointer-events: none
    .app-counter-control
      opacity: .4
    .app-counter-value
      opacity: .4
  @include bp-1440
    height: 50px
  span
    display: inline-block
  &-control
    height: 40px
    width: 40px
    background-color: #fff
    border-radius: 50%
    text-align: center
    line-height: 40px
    cursor: pointer
    user-select: none
    transition: .5s all
    &:hover
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1)
    @include bp-1440
      height: 24px
      width: 24px
      font-size: 16px
      line-height: 24px
  &-value
    margin-left: 10px
    margin-right: 10px
</style>
