import Vue from 'vue';
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate';
import {
  confirmed, min, required, image, size, ext,
} from 'vee-validate/dist/rules';

extend('image', {
  message: 'File which you upload is not a picture',
  ...image,
});
extend('size', {
  message: 'Please upload a picture smaller than 2 MB',
  ...size,
});

extend('ext', {
  message: 'We only support PNG, GIF or JPG pictures',
  ...ext,
});

extend('confirmed', confirmed);

extend('min', {
  message: (field, schema: any) => `${field} should be longer than ${schema.length} characters`,
  ...min,
});

extend('required', {
  message: (field) => `${field} is required`,
  ...required,
});

extend('email', {
  message: () => 'Please enter correct email',
  validate: (value: string) => {
    const re = /^(\S+)@([a-z0-9-]+)(\.)([a-z]{2,4})(\.?)([a-z]{0,4})+$/;
    return re.test(value);
  },
});

extend('phone', {
  message: () => 'Please enter correct phone number',
  validate(value) {
    const re = /(((\+44)? ?(\(0\))? ?)|(0))( ?[0-9]{3,4}){3}/;
    return re.test(value);
  },
});

Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);
