<template>
  <div class="footer">
    <div class="logo container">
      <router-link tag="a" to="/">
        <app-logo />
      </router-link>
    </div>
    <div class="container sections">
      <ul class="section links">
        <li>
          <router-link tag="a" :to="{ path: 'vendor', query: { open: 'modal-vendor-sign-up' } }">
            <app-icon name="store" /> Become a vendor</router-link
          >
        </li>
        <li>
          <router-link tag="a" :to="{ path: 'vendor', query: { open: 'modal-vendor-sign-in' } }">
            <app-icon name="key" /> Vendor login</router-link
          >
        </li>
      </ul>

      <ul class="section links">
        <li><router-link :to="{ path: '/about' }" tag="a">About us</router-link></li>
        <!--<li><router-link :to="{ path: '/faq' }" tag="a">FAQs</router-link></li>-->
        <li><router-link :to="{ path: '/privacy-policy' }" tag="a">Privacy policy</router-link></li>
        <li><router-link :to="{ path: '/terms-of-service' }" tag="a">Terms of Service</router-link></li>
        <li><router-link :to="{ path: '/cookie-policy' }" tag="a">Cookie Policy</router-link></li>
        <li><router-link :to="{ path: '/contact' }" tag="a">Contact us</router-link></li>
      </ul>

      <div class="section social">
        <div class="social-links">
          <a href="https://www.facebook.com/foodstuffcambs/" target="_blank"><app-icon name="facebook"/></a>
          <a href="https://www.instagram.com/foodstuffcambs/" target="_blank"><app-icon name="instagram"/></a>
        </div>
        <p class="copyright">© 2020 Foodstufff.</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({})
export default class Footer extends Vue {}
</script>

<style lang="sass" scoped>

.footer
  justify-content: space-between
  align-items: center
  padding-bottom: 40px
  border-top: 1px solid #E4E8EB
  .logo
    padding: 40px 0
  .container
    display: flex
  .links
    &:nth-child(2)
      margin: 0 auto 0 120px
    li
      margin-bottom: 25px
    a
      font-family: $Montserrat
      color: $dark
      font-size: 16px
  .copyright
    color: rgba(0,0,0, .5)
    font-size: 16px
    font-weight: 300
    margin-top: 90px
    font-family: $Montserrat
  .social
    .social-links
      display: flex
      justify-content: flex-end
      align-items: center
      a
        &:last-child
          margin-left: 40px
  .links
    a
      display: inline-flex
      justify-content: center
    .icon
      margin-right: 10px
  @include bp-768
    .logo
      padding: 40px 20px
    .sections
      flex-wrap: wrap
      .section
        width: 100%
        margin: 15px 0
        .social-links
          justify-content: flex-start
</style>
