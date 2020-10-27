<template>
  <label class="app-switcher">
    <input class="apple-switch" type="checkbox" @change="changeVal" ref="select" :checked="!!value" />
    <div class="app-switcher-label">
      <slot></slot>
    </div>
  </label>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  @Component({})
  export default class AppSwitcher extends Vue {
    @Prop() value: any;
    public changeVal(e: any) {
      this.$emit('input', e.target.checked);
    }
  }
</script>

<style lang="sass" scoped>
  .app-switcher
    display: flex
    align-items: center
    cursor: pointer
    user-select: none
    margin-bottom: 20px
    &.is-marginless
      margin: 0
    &:hover
      .app-switcher-label
        color: $pink
  .app-switcher-label
    transition: .5s all
    font-size: 14px
    margin-left: 10px
  $gray: #818184
  input.apple-switch
    position: relative
    -webkit-appearance: none
    outline: none
    width: 40px
    height: 24px
    background-color: $white
    border: 1px solid $gray
    border-radius: 40px
    transition: .4s all
    cursor: pointer
    margin: 0
  input.apple-switch:after
    content: ""
    position: absolute
    top: 0
    left: 0
    background: $gray
    width: 22px
    height: 22px
    border-radius: 50%
    box-shadow: 0 1px 3px $dark
    transition: .3s all
  input.apple-switch:checked
    background-color: $pink
    box-shadow: inset 20px 0 0 0 $pink
    border-color: $pink
  input.apple-switch:checked:after
    left: 16px
    background-color: $white
    box-shadow: -2px 4px 3px rgba(0,0,0,0.05)
</style>
