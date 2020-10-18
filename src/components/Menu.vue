<template>
<div>
  Bla
</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import http from '../_shared/utils/http';

@Component({})
export default class SignInComponent extends Vue {
    public $refs!: {
      form: HTMLFormElement;
    };

    public form: any = {
      email: '',
      password: '',
    };

    public errorMessage = '';
}
</script>

<style scoped>

</style>
