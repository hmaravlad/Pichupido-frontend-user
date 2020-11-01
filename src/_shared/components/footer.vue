<template>
  <p>FOOTER</p>
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
