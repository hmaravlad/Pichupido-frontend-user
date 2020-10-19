<template>
  <div class="app-textarea">
    <label :for="name" class="label">
      <slot />
    </label>
    <ValidationProvider :name="name" :rules="rules" v-slot="{ errors }" :bails="false">
      <textarea :type="type" :value="value" ref="field" :placeholder="placeholder" @input="dataUpdate()" />
      <span v-for="(error, i) in errors" :key="i" class="error">{{ error }}</span>
    </ValidationProvider>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({})
export default class AppTextarea extends Vue {
  @Prop() settings: object | undefined;

  @Prop() value: any;

  @Prop() rules: any;

  @Prop() name: any;

  @Prop() type: any;

  @Prop() placeholder: any;

  public dataUpdate() {
    this.$emit('input', (this.$refs.field as Vue & { value: () => string }).value);
  }
}
</script>

<style lang="sass" scoped>
.app-textarea
  margin-bottom: 20px
  &.is-marginless
    margin-bottom: 0
textarea
  outline: none
  overflow: auto
  resize: vertical
  max-height: 120px
  min-height: 80px
  border: 1px solid #C4C4C4
  border-radius: 6px
  width: 100%
  padding: 20px
  font-family: $Montserrat
  font-style: normal
  font-weight: normal
  font-size: 14px
  line-height: 150%
  color: #030208

  &::-webkit-scrollbar
    width: 14px
    height: 18px
  &::-webkit-scrollbar-thumb
    height: 6px
    border: 4px solid rgba(0, 0, 0, 0)
    background-clip: padding-box
    -webkit-border-radius: 7px
    background-color: $pink
    -webkit-box-shadow: inset -1px -1px 0px rgba(0, 0, 0, 0.05), inset 1px 1px 0px rgba(0, 0, 0, 0.05)
  &::-webkit-scrollbar-button
    width: 0
    height: 0
    display: none
  &::-webkit-scrollbar-corner
    background-color: transparent
.label
    margin-bottom: 10px
.error
  display: block
  font-size: 12px
  margin-top: 5px
  color: $red
</style>
