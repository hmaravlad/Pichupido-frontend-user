<template>
  <div>
    <ValidationProvider tag="div" :name="name" :rules="rules" v-slot="{ errors, validate }" :bails="false">
      <label class="app-file">
        <input type="file" @change="validate" @input="handleFileChange" />
        <slot></slot>
        <span class="error">{{ errors[0] }}</span>
      </label>
    </ValidationProvider>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({})
export default class AppFile extends Vue {
  @Prop() rules: any;

  @Prop() name: any;

  public async handleFileChange(event: any) {
    const file = event.target.files[0];
    // TODO: refactor full validation process for files.
    if (file.size < 2 * 1024 * 1024 && ['image/png', 'image/gif', 'image/jpeg'].includes(file.type)) {
      this.$emit('input', file);
    }
  }
}
</script>

<style lang="sass" scoped>
.app-file
  input
    display: none
.error
  margin-top: 20px
</style>
