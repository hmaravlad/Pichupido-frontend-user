<template>

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

    private modalHub = ModalHub;

    public errorMessage = '';

    public facebookAuthUrl = AuthService.facebookAuthUrl;

    public async submitForm() {
      const isValid = await this.$refs.form.validate();
      if (isValid) {
        http
          .post('/accounts/sign-in', this.form)
          .then((res: AuthResponse) => {
            AuthService.saveUser(res);
            this.modalHub.$emit('close');
            if (this.$store.getters.cart.length) {
              ModalHub.$emit('open', 'modal-cart');
            }
          })
          .catch((msg: string) => (this.errorMessage = msg));
      }
    }

    public openModalSignUp() {
      this.modalHub.$emit('open', 'modal-sign-up', { animation: 'slide-left' });
    }

    public openModalForgotPassword() {
      this.modalHub.$emit('open', 'modal-forgot-password', { animation: 'slide-left' });
    }
}
</script>

<style scoped>

</style>
